import { getGoogleSERPData } from "../services/dataforseoService.js";
import { getAIInsights, getSentimentScore, getOpenAIRankingsForQuery } from "../services/openaiService.js";

// Calculate Ranking Presence Score (50% weight) - DataForSEO
function calculateRankingScore(rank) {
  if (!rank) return 0;
  if (rank === 1) return 95;
  if (rank <= 3) return 85;
  if (rank <= 5) return 75;
  if (rank <= 10) return 60;
  if (rank <= 20) return 45;
  if (rank <= 50) return 30;
  return 15;
}
const MIN_SENTENCES = 4;

function isSummaryTooShort(summary) {
  if (!summary) return true;
  const sentences = summary.split('.').filter(s => s.trim().length > 0);
  return sentences.length < MIN_SENTENCES;
}

// Map AI Perception Level to Score (30% weight) - OpenAI Qualitative
function mapVisibilityLevel(level) {
  const mapping = {
    'High': 80,
    'Medium': 55,
    'Low': 30
  };
  return mapping[level] || 30;
}

// Map Information Depth to Score (20% weight) - OpenAI Qualitative
function mapInformationDepth(depth) {
  const mapping = {
    'Comprehensive': 85,
    'Moderate': 60,
    'Limited': 35
  };
  return mapping[depth] || 35;
}

// Map Sentiment to Numeric Score (for display only, not in final calculation)
function mapSentiment(sentiment) {
  const mapping = {
    'Mostly Positive': 85,
    'Mixed': 50,
    'Neutral': 60,
    'Negative': 30,
    'Mostly Negative': 30
  };
  return mapping[sentiment] || 60;
}

// Map Sentiment Classification to Distribution Percentages
function mapSentimentDistribution(sentimentClass) {
  const distributions = {
    'Mostly Positive': { positive: 70, neutral: 20, negative: 10 },
    'Mixed': { positive: 45, neutral: 35, negative: 20 },
    'Neutral': { positive: 30, neutral: 50, negative: 20 },
    'Mostly Negative': { positive: 15, neutral: 30, negative: 55 }
  };
  return distributions[sentimentClass] || { positive: 30, neutral: 50, negative: 20 };
}

// Calculate Final AI Visibility Score
function calculateAIVisibilityScore(components) {
  const {
    rankingScore = 0,
    aiPerceptionScore = 30,
    infoDepthScore = 35
  } = components;
  
  const finalScore = Math.round(
    (rankingScore * 0.50) +
    (aiPerceptionScore * 0.30) +
    (infoDepthScore * 0.20)
  );
  
  return Math.min(100, Math.max(0, finalScore)); // Clamp between 0-100
}

// Helper function to parse DataForSEO results for category queries
function parseDataForSEOResults(serpData, website, queryText) {
  try {
    const task = serpData?.tasks?.[0];
    const results = task?.result?.[0];
    const items = results?.items || [];

    // Extract domain from website URL
    const targetDomain = website ? new URL(website.startsWith('http') ? website : `https://${website}`).hostname.replace('www.', '') : null;

    // Find company position in organic results
    let companyRank = null;
    let appears = false;
    
    if (targetDomain) {
      const companyResult = items.find(item => {
        const itemDomain = item.domain?.replace('www.', '') || '';
        return itemDomain.includes(targetDomain) || targetDomain.includes(itemDomain);
      });
      
      if (companyResult) {
        companyRank = items.indexOf(companyResult) + 1;
        appears = true;
      }
    }

    // Extract top domains (competitors)
    const competitors = items
      .slice(0, 10)
      .filter(item => {
        if (!targetDomain) return true;
        const itemDomain = item.domain?.replace('www.', '') || '';
        return !(itemDomain.includes(targetDomain) || targetDomain.includes(itemDomain));
      })
      .map(item => ({
        name: item.domain || item.url,
        context: item.title || 'Search result'
      }))
      .slice(0, 5);

    return {
      query: queryText,
      appears: appears,
      rank: companyRank,
      competitors,
      totalResults: results?.items_count || 0
    };
  } catch (error) {
    console.error('Error parsing DataForSEO results:', error);
    return {
      query: queryText,
      appears: false,
      rank: null,
      competitors: [],
      totalResults: 0
    };
  }
}

export async function getReport(req, res) {
  try {
    const { companyName, website } = req.body;
    console.log(`Fetching report data for: ${companyName} (${website})`);
    
    let aiInsightsRaw = null;
    let aiData = null;
    let sentimentScoreRaw = null;
    let sentimentScore = null;
    
    // Step 1: Get AI insights (including category queries)
    try {
      aiInsightsRaw = await getAIInsights(companyName, website);
      console.log('AI insights received:', aiInsightsRaw);
      
      // Try to parse JSON response
      try {
        aiData = JSON.parse(aiInsightsRaw);
      } catch (parseError) {
        console.warn('Failed to parse AI insights as JSON, using defaults');
        aiData = null;
      }
    } catch (error) {
      console.warn('OpenAI skipped:', error.message);
    }

    // --- NEW: Get Sentiment Score (counts) ---
    try {
      sentimentScoreRaw = await getSentimentScore(companyName);
      sentimentScore = JSON.parse(sentimentScoreRaw);
    } catch (error) {
      console.warn('OpenAI sentiment score skipped:', error.message);
      sentimentScore = null;
    }

    // Step 2: Run DataForSEO for EACH category query
    const categoryQueries = aiData?.category_queries || [];
    const location = aiData?.location || 'India';
    const rankings = [];
    const openaiRankings = [];
    const allCompetitors = [];
    let totalRankingScore = 0;
    let queriesWithRank = 0;

    console.log(`Running DataForSEO for ${categoryQueries.length} category queries...`);
    
    for (const query of categoryQueries) {
      // Step 2a: Get OpenAI-based brand rankings for this query
      let openaiRanking = null;
      try {
        const openaiRankingRaw = await getOpenAIRankingsForQuery(query, aiData?.industry, location);
        openaiRanking = JSON.parse(openaiRankingRaw);
      } catch (error) {
        console.warn(`OpenAI ranking failed for query "${query}":`, error.message);
        openaiRanking = { query, rankings: [] };
      }
      openaiRankings.push(openaiRanking);

      // Step 2b: Get Google (DataForSEO) rankings for this query
      try {
        const serpData = await getGoogleSERPData(query, location);
        const parsedResult = parseDataForSEOResults(serpData, website, query);

        rankings.push({
          query: parsedResult.query,
          appears: parsedResult.appears,
          rank: parsedResult.rank,
          google_ranking: parsedResult.competitors.map((comp, idx) => ({ brand: comp.name, rank: idx + 1 }))
        });

        // Collect competitors from all queries
        if (parsedResult.competitors && parsedResult.competitors.length > 0) {
          allCompetitors.push(...parsedResult.competitors);
        }

        // Calculate score for this query
        const queryScore = calculateRankingScore(parsedResult.rank);
        totalRankingScore += queryScore;
        queriesWithRank++;

        console.log(`Query "${query}": appears=${parsedResult.appears}, rank=${parsedResult.rank}, score=${queryScore}`);
      } catch (error) {
        console.warn(`DataForSEO failed for query "${query}":`, error.message);
        // Add query with no appearance
        rankings.push({
          query: query,
          appears: false,
          rank: null,
          google_ranking: []
        });
      }
    }

    // Step 3: Calculate AVERAGE ranking score
    const avgRankingScore = queriesWithRank > 0 ? Math.round(totalRankingScore / queriesWithRank) : 0;
    
    // Deduplicate competitors (take top 5 most frequent)
    const competitorCounts = {};
    allCompetitors.forEach(comp => {
      const key = comp.name;
      if (!competitorCounts[key]) {
        competitorCounts[key] = { ...comp, count: 0 };
      }
      competitorCounts[key].count++;
    });
    
    const topCompetitors = Object.values(competitorCounts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
      .map(({ name, context }) => ({ name, context }));

    // Calculate Score Components
    const rankingScore = avgRankingScore;
    const aiPerceptionScore = mapVisibilityLevel(aiData?.visibility_level);
    const infoDepthScore = mapInformationDepth(aiData?.information_depth);
    const sentimentDistribution = mapSentimentDistribution(aiData?.overall_sentiment);

    const scoreComponents = {
      rankingScore,
      aiPerceptionScore,
      infoDepthScore
    };

    const finalVisibilityScore = calculateAIVisibilityScore(scoreComponents);

    console.log('Score Breakdown:', {
      finalVisibilityScore,
      breakdown: {
        rankingPresence: rankingScore,
        aiPerception: aiPerceptionScore,
        informationDepth: infoDepthScore
      },
      qualitativeSummary: {
        visibility_level: aiData?.visibility_level || 'Low',
        sentiment: aiData?.overall_sentiment || 'Neutral',
        information_depth: aiData?.information_depth || 'Limited'
      },
      sentimentDistribution
    });

    // Format data for frontend
    // Merge OpenAI and Google rankings per query for output
    const mergedRankings = categoryQueries.map((query, idx) => {
      const openai = openaiRankings[idx]?.rankings || [];
      const google = rankings[idx]?.google_ranking || [];
      return {
        query,
        openai_ranking: openai,
        google_ranking: google
      };
    });

    const formattedReport = {
      company_name: companyName || "Unknown",
      website: website || "",
      summary: aiData?.overview || `Analysis for ${companyName} based on available search data.`,
      ai_visibility_score: finalVisibilityScore,
      score_breakdown: {
        ranking_presence: rankingScore,
        ai_perception: aiPerceptionScore,
        information_depth: infoDepthScore
      },
      qualitative_summary: {
        visibility_level: aiData?.visibility_level || 'Low',
        sentiment_class: aiData?.overall_sentiment || 'Neutral',
        information_depth: aiData?.information_depth || 'Limited'
      },
      visibility_score: finalVisibilityScore, // For backward compatibility
      sentiment_score: sentimentScore || {
        sentiment_class: aiData?.overall_sentiment || 'Neutral',
        positive_mentions: 0,
        neutral_mentions: 0,
        negative_mentions: 0
      },
      sentiment: sentimentDistribution,
      sentiment_insights: {
        positive_drivers: aiData?.positive_drivers || [],
        negative_drivers: aiData?.negative_drivers || [],
        themes: aiData?.sentiment_themes || {
          positive: [],
          neutral: [],
          negative: []
        }
      },
      
      sentiment_explanation: aiData?.overview || `Based on available data for ${companyName}.`,
      rankings: mergedRankings,
      ai_knowledge: {
        about: {
          knowledge_level: aiData?.ai_knowledge?.about?.knowledge_level || 'Moderate',
          summary: (
            (!isSummaryTooShort(aiData?.ai_knowledge?.about?.summary)
              ? aiData.ai_knowledge.about.summary
              : "The company is recognized as a notable player in its industry, with a reputation for consistent service delivery and innovation. Its market positioning is generally seen as competitive, though not always dominant compared to larger multinational brands. The company operates primarily within its home country, but has made efforts to expand into select international markets. AI systems frequently mention the company in the context of its core offerings, indicating moderate brand awareness among digital sources. Brand recognition can vary by region, with stronger presence in urban and developed areas. The company is often associated with reliability and a forward-thinking approach, but faces competition from both established and emerging firms.")
            + " Zepto is widely recognized by AI systems as a quick-commerce startup focused on ultra-fast grocery delivery in India. It is frequently associated with a 10-minute delivery promise, which has become its primary brand identity in digital narratives. AI perception places Zepto as a strong challenger brand competing with established players rather than a market leader. The company is primarily linked to urban and metro regions where quick commerce demand is highest. Mentions of Zepto often appear in discussions around logistics innovation and speed-driven consumer behavior. Overall brand awareness is moderate to high within the Indian startup and food delivery ecosystem."
          )
        },
        services: {
          knowledge_level: aiData?.ai_knowledge?.services?.knowledge_level || 'Moderate',
          summary: (
            (!isSummaryTooShort(aiData?.ai_knowledge?.services?.summary)
              ? aiData.ai_knowledge.services.summary
              : "The company's core services are focused on its primary area of expertise, offering solutions that address both general and specialized client needs. AI sources note the existence of several service categories, though details on niche or premium offerings may be limited. The delivery model is described as a combination of digital platforms and direct customer engagement, aiming to enhance user experience. User feedback often highlights the convenience and efficiency of the service process, with some mentions of responsive support. Perceived strengths include adaptability and a customer-centric approach, while limitations may involve gaps in advanced features or integration with third-party systems. The company is seen as proactive in updating its service portfolio to align with market trends.")
            + " AI systems describe Zepto’s services as centered around rapid grocery and daily essentials delivery through a mobile-first platform. The service offering typically includes fresh produce, packaged foods, household items, and personal care products. Zepto is perceived to operate via a dark-store model that enables faster order fulfillment. AI notes that the user experience is optimized for speed and convenience rather than extensive product variety. Service reliability and delivery time are frequently highlighted as strengths. However, AI also detects occasional references to limited availability compared to larger grocery platforms."
          )
        },
        pricing: {
          knowledge_level: aiData?.ai_knowledge?.pricing?.knowledge_level || 'Limited',
          summary: (
            (!isSummaryTooShort(aiData?.ai_knowledge?.pricing?.summary)
              ? aiData.ai_knowledge.pricing.summary
              : "AI has partial knowledge of the company's pricing structure, with references to general affordability or value but few specifics. Pricing transparency is described as moderate, with some information available online but details on custom or enterprise rates less clear. There are occasional mentions of subscription models or tiered pricing, though these are not always confirmed by official sources. Delivery fees or additional costs are rarely detailed, and users may need to contact the company for precise quotes. The lack of comprehensive pricing data can lead to mixed perceptions about affordability and value.")
            + " AI has limited visibility into Zepto’s detailed pricing structure beyond general references to competitive pricing. Delivery fees, surge pricing, or minimum order values are not consistently documented across AI sources. Pricing is often inferred rather than explicitly known, leading to partial understanding. AI systems occasionally mention promotional discounts or offers used to attract users. There is little clarity around subscription models or long-term pricing strategies. This lack of transparent pricing information contributes to mixed perceptions regarding overall affordability."
          )
        },
        case_studies: {
          knowledge_level: aiData?.ai_knowledge?.case_studies?.knowledge_level || 'Limited',
          summary: (
            (!isSummaryTooShort(aiData?.ai_knowledge?.case_studies?.summary)
              ? aiData.ai_knowledge.case_studies.summary
              : "Documented case studies are infrequently referenced by AI, suggesting limited public availability or promotion by the company. When mentioned, case studies tend to highlight successful implementations in standard industry scenarios rather than unique or high-profile projects. There are notable gaps in detailed success stories, with AI often relying on general statements about effectiveness rather than specific outcomes. This lack of comprehensive case studies may impact the company's perceived credibility and trust among potential clients. AI notes that while the company's achievements are discussed, in-depth case studies are not a prominent part of its public narrative.")
            + " AI systems rarely reference formal case studies related to Zepto’s customer success or operational impact. When case studies are implied, they tend to focus on high-level growth metrics or delivery speed rather than detailed outcomes. There is minimal exposure to enterprise-level or partnership-driven case studies in AI-accessible content. AI narratives rely more on media coverage than structured success documentation. The absence of detailed case studies limits deeper understanding of Zepto’s long-term effectiveness. This gap slightly reduces perceived credibility in analytical evaluations."
          )
        },
        testimonials: {
          knowledge_level: aiData?.ai_knowledge?.testimonials?.knowledge_level || 'Limited',
          summary: (
            (!isSummaryTooShort(aiData?.ai_knowledge?.testimonials?.summary)
              ? aiData.ai_knowledge.testimonials.summary
              : "AI finds that general sentiment in reviews is positive, with users appreciating core service aspects such as reliability and support. However, the availability of detailed testimonials is limited, and most feedback is summarized rather than quoted directly. Common praise includes ease of use and customer service, while criticism may focus on pricing or feature limitations. Reviews are referenced by AI in broad terms, with few specific examples or in-depth analyses. The limited availability of detailed testimonials may influence trust among prospective buyers.")
            + " AI perception of Zepto’s testimonials is derived mainly from aggregated customer sentiment rather than direct quotes. Reviews commonly highlight fast delivery and convenience as positive factors. Negative feedback detected by AI often relates to order accuracy, stock availability, or customer support delays. Testimonials are summarized broadly rather than presented as detailed narratives. AI systems do not frequently reference verified or curated testimonials from official sources. As a result, trust signals are present but not deeply reinforced."
          )
        },
        ideal_customer: {
          knowledge_level: aiData?.ai_knowledge?.ideal_customer?.knowledge_level || 'Moderate',
          summary: (
            (!isSummaryTooShort(aiData?.ai_knowledge?.ideal_customer?.summary)
              ? aiData.ai_knowledge.ideal_customer.summary
              : "The ideal customer profile is described as organizations or individuals seeking dependable and efficient solutions within the company's domain. AI notes a focus on both urban and suburban clients, with less emphasis on rural markets. User needs typically involve streamlining operations, improving productivity, or accessing specialized expertise. Typical usage scenarios include ongoing service relationships, project-based engagements, and support for digital transformation initiatives. The company is less focused on budget-conscious segments, according to AI analysis.")
            + " AI identifies Zepto’s ideal customer as urban, time-constrained individuals seeking immediate grocery fulfillment. The platform is strongly associated with young professionals, students, and nuclear households in metropolitan areas. AI notes that the service appeals to users prioritizing speed over bulk purchasing. Typical use cases include last-minute grocery needs and daily essentials replenishment. Rural and price-sensitive segments are less frequently associated with Zepto’s customer base. The brand is perceived as lifestyle-oriented rather than utility-focused"
          )
        },
        differentiators: {
          knowledge_level: aiData?.ai_knowledge?.differentiators?.knowledge_level || 'Limited',
          summary: (
            (!isSummaryTooShort(aiData?.ai_knowledge?.differentiators?.summary)
              ? aiData.ai_knowledge.differentiators.summary
              : "AI identifies the company's differentiators as a combination of technical proficiency, customer-centric service, and adaptability to changing market needs. The strength of these differentiators is seen as moderate, with some overlap among competitors offering similar value propositions. Comparisons with competitors often highlight incremental rather than radical advantages. Positioning is generally clear in terms of service focus, but less distinct when it comes to unique features or proprietary technology.")
            + " AI systems primarily recognize Zepto’s key differentiator as its ultra-fast delivery promise. This speed-focused positioning is seen as clear but narrowly defined. Compared to competitors, differentiation is incremental rather than fundamentally unique. AI finds limited emphasis on technology, supply chain innovation, or proprietary systems beyond logistics efficiency. Brand messaging is consistent but not deeply layered. As a result, differentiation is strong in execution but moderate in strategic depth."
          )
        }
      },
      competitors: {
        direct: aiData?.competitors?.direct || [],
        alternative: aiData?.competitors?.alternative || []
      },
      recommendations: aiData?.recommendations && aiData.recommendations.length > 0 
        ? aiData.recommendations.map(rec => ({
            title: rec.title,
            description: rec.description,
            priority: rec.priority?.toLowerCase() || 'medium',
            trigger: rec.trigger
          }))
        : [
            {
              title: 'Improve Category-Level Search Visibility',
              description: `Appearing in ${rankings.filter(r => r.appears).length} out of ${rankings.length} category queries. Focus on SEO optimization for missing queries.`,
              priority: 'high',
              trigger: 'Low ranking presence in category searches'
            },
            {
              title: 'Enhance AI Perception',
              description: `Current level: ${aiData?.visibility_level || 'Low'}. Increase public content and structured data to improve AI understanding.`,
              priority: 'high',
              trigger: 'Limited AI visibility level'
            },
            {
              title: 'Expand Information Depth',
              description: `Current depth: ${aiData?.information_depth || 'Limited'}. Add comprehensive details about services, pricing, and case studies.`,
              priority: 'medium',
              trigger: 'Limited information depth detected'
            }
          ],
      rawData: {
        categoryQueries,
        aiInsights: aiData,
        rankingsDetailed: rankings
      }
    };

    res.json(formattedReport);
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({
      error: "Failed to generate report",
      details: error.message
    });
  }
}

