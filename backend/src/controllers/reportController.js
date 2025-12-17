import { getGoogleSERPData } from "../services/dataforseoService.js";
import { getAIInsights } from "../services/openaiService.js";

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

    // Step 2: Run DataForSEO for EACH category query
    const categoryQueries = aiData?.category_queries || [];
    const location = aiData?.location || 'India';
    const rankings = [];
    const allCompetitors = [];
    let totalRankingScore = 0;
    let queriesWithRank = 0;

    console.log(`Running DataForSEO for ${categoryQueries.length} category queries...`);
    
    for (const query of categoryQueries) {
      try {
        const serpData = await getGoogleSERPData(query, location);
        const parsedResult = parseDataForSEOResults(serpData, website, query);
        
        rankings.push({
          query: parsedResult.query,
          appears: parsedResult.appears,
          rank: parsedResult.rank
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
          rank: null
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
      rankings: rankings,
      ai_knowledge: {
        about: {
          knowledge_level: aiData?.ai_knowledge?.about?.knowledge_level || 'Limited',
          summary: aiData?.ai_knowledge?.about?.summary || "Limited information available about this company."
        },
        services: {
          knowledge_level: aiData?.ai_knowledge?.services?.knowledge_level || 'Limited',
          summary: aiData?.ai_knowledge?.services?.summary || "AI has limited knowledge of specific products or services offered."
        },
        pricing: {
          knowledge_level: aiData?.ai_knowledge?.pricing?.knowledge_level || 'Limited',
          summary: aiData?.ai_knowledge?.pricing?.summary || "Pricing information is not well-documented in public sources accessible to AI."
        },
        case_studies: {
          knowledge_level: aiData?.ai_knowledge?.case_studies?.knowledge_level || 'Limited',
          summary: aiData?.ai_knowledge?.case_studies?.summary || "AI does not have access to specific customer case studies or success stories."
        },
        testimonials: {
          knowledge_level: aiData?.ai_knowledge?.testimonials?.knowledge_level || 'Limited',
          summary: aiData?.ai_knowledge?.testimonials?.summary || "Customer testimonials and reviews are not readily available to AI systems."
        },
        ideal_customer: {
          knowledge_level: aiData?.ai_knowledge?.ideal_customer?.knowledge_level || 'Limited',
          summary: aiData?.ai_knowledge?.ideal_customer?.summary || "AI has limited understanding of the target customer profile or ideal audience."
        },
        differentiators: {
          knowledge_level: aiData?.ai_knowledge?.differentiators?.knowledge_level || 'Limited',
          summary: aiData?.ai_knowledge?.differentiators?.summary || "AI struggles to identify clear competitive differentiators or unique value propositions."
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

