// Get OpenAI-based brand rankings for a specific query
export async function getOpenAIRankingsForQuery(query, industry = "", location = "") {
  try {
    const prompt = `For the search query: "${query}", list the top relevant brands in order of relevance for this category. Consider brand recall, market presence, and service relevance. Do NOT include explanations or the brand running this analysis. Only return a JSON array of objects in this format:\n\n{\n  \"query\": \"${query}\",\n  \"rankings\": [\n    { \"brand\": \"Brand1\", \"rank\": 1 },\n    { \"brand\": \"Brand2\", \"rank\": 2 }\n  ]\n}\n\nRules:\n- Only include brands, not generic terms.\n- Do not include the brand running this analysis.\n- Use only public perception and market presence.\n- List 3-7 brands per query.\n- No explanations, just the JSON.`;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are an expert in market research and brand visibility."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.2
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI Brand Ranking API Error:", error.response?.data || error.message);
    throw new Error(`OpenAI Brand Ranking API failed: ${error.message}`);
  }
}
import axios from "axios";

// Get detailed AI insights about a company in a strict JSON format
export async function getAIInsights(companyName = "OpenAI", website = "") {
  try {
    console.log(`Calling OpenAI API for: ${companyName}...`);

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are an AI brand perception analyst. Evaluate companies with industry context and comparative analysis. Be critical, conservative, and realistic. Return ONLY categorical assessments - NO numeric scores or percentages."
          },
          {
            role: "user",
            content: `Perform a 3-STEP contextual sentiment analysis for "${companyName}"${
              website ? ` (${website})` : ""
            }.

Return ONLY valid JSON in this exact format:
{
  "overview": "Single paragraph (4-6 sentences) about brand perception, market position, and competitive standing.",
  "industry": "Primary industry/sector",
  "market_type": "B2B | B2C | Marketplace | SaaS | Enterprise | Retail | Other",
  "location": "Primary market/country (e.g., India, USA, Global)",
  "category_queries": ["4-6 category-level search queries users would search for", "Example: best grocery delivery apps", "Example: top food delivery services in India"],
  "visibility_level": "High | Medium | Low",
  "overall_sentiment": "Mostly Positive | Mixed | Neutral | Mostly Negative",
  "information_depth": "Comprehensive | Moderate | Limited",
  "positive_drivers": ["Specific positive theme 1", "Specific positive theme 2"],
  "negative_drivers": ["Specific negative theme 1", "Specific negative theme 2"],
  "sentiment_themes": {
    "positive": ["What users typically like - product experience, service quality, value, convenience"],
    "neutral": ["Mixed or factual mentions - features users acknowledge without strong opinions"],
    "negative": ["Common complaints - pricing, limitations, support, reliability, accessibility"]
  },
  "ai_knowledge": {
    "about": {
      "knowledge_level": "Strong | Moderate | Limited",
      "summary": "What AI systems typically know about this company"
    },
    "services": {
      "knowledge_level": "Strong | Moderate | Limited",
      "summary": "How AI describes products/services offered"
    },
    "pricing": {
      "knowledge_level": "Strong | Moderate | Limited",
      "summary": "AI's understanding of pricing model and costs"
    },
    "case_studies": {
      "knowledge_level": "Strong | Moderate | Limited",
      "summary": "AI's knowledge of use cases or customer success stories"
    },
    "testimonials": {
      "knowledge_level": "Strong | Moderate | Limited",
      "summary": "AI's access to customer feedback or reviews"
    },
    "ideal_customer": {
      "knowledge_level": "Strong | Moderate | Limited",
      "summary": "AI's understanding of target audience and customer profile"
    },
    "differentiators": {
      "knowledge_level": "Strong | Moderate | Limited",
      "summary": "AI's perception of unique value propositions and competitive advantages"
    }
  },
  "competitors": {
    "direct": [
      {
        "name": "Company name",
        "reason": "Brief reason why mentioned as competitor"
      }
    ],
    "alternative": [
      {
        "name": "Company name",
        "reason": "Brief reason why mentioned as alternative"
      }
    ]
  },
  "recommendations": [
    {
      "title": "Recommendation title",
      "description": "Specific actionable description (2-3 sentences)",
      "priority": "High | Medium | Low",
      "trigger": "Which signal/gap caused this recommendation"
    }
  ]
}

CATEGORY QUERIES RULES:
- Generate 4-6 category-level search queries (NOT brand-name queries)
- Queries should be what users search when looking for solutions in this category
- Include market/location if relevant (e.g., "in India", "in USA")
- Focus on discovery queries, not branded queries
- Examples:
  * E-commerce: "best online shopping sites", "top e-commerce platforms in India"
  * Food Delivery: "best food delivery apps", "top restaurant delivery services"
  * SaaS: "best project management tools", "top CRM software for small business"
  * Finance: "best digital payment apps", "top online banking platforms"

3-STEP EVALUATION PROCESS:

STEP 1 - Industry Context:
- Identify the primary industry and market type
- Consider industry-specific challenges and expectations

STEP 2 - Industry Baseline:
- What are common positive attributes in this industry?
- What are common negative issues in this industry?
- What is the competitive intensity?

STEP 3 - Comparative Sentiment:
- Compare this company to TYPICAL companies in the same industry
- Be CRITICAL and REALISTIC - not all companies are "Mostly Positive"
- Consider: market position, competitive pressure, customer satisfaction, innovation level

SENTIMENT CLASSIFICATION (Be Realistic and Nuanced):

"Mostly Positive" (70% positive, 20% neutral, 10% negative):
- Industry leaders with strong market reputation
- Consistently positive customer feedback
- Clear competitive advantages and innovation
- Strong brand loyalty and trust
- Examples: Apple, Amazon, Google, Microsoft, Tesla, Stripe, Shopify
- Regional leaders with excellent local reputation

"Mixed" (45% positive, 35% neutral, 20% negative):
- Established companies with both strengths and weaknesses
- Competitive market position but facing challenges
- Some customer complaints alongside positive reviews
- Growing companies with mixed reception
- Examples: Uber, traditional banks, many retail brands
- Companies undergoing transformation

"Neutral" (30% positive, 50% neutral, 20% negative):
- Generic service providers without strong differentiation
- Commodity products or basic services
- Functional but unremarkable reputation
- Limited brand recognition or emotional connection
- Examples: Generic software tools, basic utilities
- New/unknown companies with minimal public perception

"Mostly Negative" (15% positive, 30% neutral, 55% negative):
- Widespread customer dissatisfaction
- Declining market position or reputation damage
- Frequent controversies or quality issues
- Strong competitive threats
- Examples: Companies with major scandals, failing products

EVALUATION RULES:
✓ Compare to OTHER companies in same industry (not absolute perfection)
✓ Consider actual market position and customer sentiment
✓ Well-known successful companies CAN be "Mostly Positive"
✓ Differentiate: Amazon ≠ small local store
✓ Industry leaders typically deserve positive sentiment
✓ Be honest but fair - recognize genuine success

visibility_level:
- "High": Only global household names (Google, Apple, Amazon, Microsoft, Nike, Tesla)
- "Medium": Regional leaders, well-known in their sector (Zepto in India, Swiggy, Uber)
- "Low": Niche players, local brands, emerging companies

information_depth:
- "Comprehensive": Extensive public data on products, pricing, customers, differentiators
- "Moderate": Basic company info and main offerings
- "Limited": Minimal publicly available information

sentiment_themes (Company-Specific User Sentiment):

POSITIVE THEMES (2-3 items):
✓ What users typically LIKE or PRAISE about this company
✓ Focus on: product experience, service quality, value proposition, convenience
✓ Be SPECIFIC to this company and industry
✓ Examples (industry-specific):
  - E-commerce: "Fast delivery", "Easy returns", "Product variety"
  - SaaS: "Intuitive interface", "Reliable uptime", "Helpful support"
  - Food delivery: "Quick service", "Hot food arrival", "Wide restaurant selection"
  - Financial: "Secure transactions", "Cashback rewards", "Easy payment process"
❌ NOT generic: "Great service", "Good quality", "Popular brand"

NEUTRAL THEMES (2-3 items):
✓ Mixed opinions or factual mentions
✓ Features users acknowledge without strong feelings
✓ Aspects that are "just okay" or "expected"
✓ Examples:
  - "Standard pricing for the category"
  - "Limited to certain regions"
  - "Basic mobile app features"
  - "Typical delivery times"

NEGATIVE THEMES (2-3 items):
✓ What users commonly COMPLAIN about or find frustrating
✓ Focus on: pricing issues, limitations, support problems, reliability concerns
✓ Be REALISTIC - identify actual pain points
✓ Examples (industry-specific):
  - E-commerce: "High shipping fees", "Delayed deliveries", "Complex return process"
  - SaaS: "Steep learning curve", "Limited integrations", "Expensive for small teams"
  - Food delivery: "Surge pricing", "Order accuracy issues", "Limited customer support"
  - Financial: "Hidden fees", "Slow refund processing", "App crashes during peak times"
❌ NOT vague: "Some issues", "Could be better", "Not perfect"

CRITICAL RULES FOR SENTIMENT THEMES:
❌ Do NOT use generic marketing language
❌ Do NOT repeat same themes for different companies
❌ Do NOT include percentages or scores
✓ Make themes SPECIFIC to the company's industry and user base
✓ Think like an actual customer - what would they say?
✓ Use concrete, relatable language

-----------------------------------
AI KNOWLEDGE ASSESSMENT (CRITICAL - NO EMPTY SECTIONS)
-----------------------------------

Assess how well AI systems (ChatGPT, Claude, etc.) can describe this company across 7 dimensions.
This measures AI's perceived knowledge based on public information, NOT factual verification.

MANDATORY RULES:
1. NEVER skip any section
2. NEVER return empty fields or "See qualitative assessment"
3. If info is strong → provide clear summary
4. If info is limited → explicitly say "Limited" and explain what AI typically mentions instead
5. If info is unclear → state that AI responses are vague or high-level

about:
- knowledge_level: Strong (well-documented company history) | Moderate (basic info available) | Limited (minimal public data)
- summary: What AI typically knows about company founding, mission, business model

services:
- knowledge_level: Strong (detailed product catalog) | Moderate (main offerings known) | Limited (vague or generic descriptions)
- summary: How AI describes products/services offered

pricing:
- knowledge_level: Strong (specific pricing known) | Moderate (pricing model understood) | Limited (no pricing details)
- summary: AI's understanding of pricing structure and costs

case_studies:
- knowledge_level: Strong (specific examples) | Moderate (general use cases) | Limited (no specific cases)
- summary: AI's knowledge of customer success stories or use cases

testimonials:
- knowledge_level: Strong (quotes/reviews) | Moderate (general sentiment) | Limited (no customer feedback)
- summary: AI's access to customer reviews or feedback

ideal_customer:
- knowledge_level: Strong (clear profile) | Moderate (general audience) | Limited (unclear target)
- summary: AI's understanding of target customer profile

differentiators:
- knowledge_level: Strong (unique features identified) | Moderate (general advantages) | Limited (unclear differentiation)
- summary: AI's perception of competitive advantages

Be realistic: Smaller/regional brands will naturally show more "Limited" knowledge levels. This is VALID insight, not failure.

-----------------------------------
COMPETITOR IDENTIFICATION (MANDATORY - MUST PROVIDE AT LEAST 3 COMPETITORS)
-----------------------------------

You MUST identify at least 3 competitors for EVERY company. DO NOT return empty arrays.

Identify competitors based on:
1. Industry category (e.g., food delivery, e-commerce, SaaS)
2. Target market/geography
3. How users would search for alternatives
4. Companies solving similar problems

CRITICAL RULES:
✓ ALWAYS provide at least 3-5 total competitors
✓ Include both well-known and relevant regional players
✓ Focus on brands users would compare when making decisions
✓ If global brand → include global competitors
✓ If regional brand → include regional + global competitors in same category
❌ NEVER return empty competitor arrays
❌ Do NOT include the company itself
❌ Do NOT include completely unrelated brands

competitors.direct (Provide 2-4 companies):
- Direct market competitors with similar offerings
- Brands solving the SAME problem with SAME approach
- Users would compare these when making purchase decisions

competitors.alternative (Provide 1-2 companies):
- Different approach to same user need
- Adjacent categories or business models
- May not be direct competition but address similar pain points

For each competitor provide:
- name: Exact company name (not generic)
- reason: Specific reason why mentioned (10-15 words max)

-----------------------------------
ACTIONABLE RECOMMENDATIONS (MANDATORY - PROVIDE 5-7 RECOMMENDATIONS)
-----------------------------------

Generate 5-7 SPECIFIC, ACTIONABLE recommendations based on detected gaps and opportunities.

Recommendations MUST be:
✓ Tailored to THIS specific company's weaknesses
✓ Directly tied to measurable gaps (visibility_level, information_depth, sentiment, competitors)
✓ Realistic and actionable (not vague advice)
✓ Focused on improving AI discoverability and perception
✓ Different for each company based on their unique situation

ANALYZE THESE SIGNALS TO IDENTIFY GAPS:

1. visibility_level (High/Medium/Low)
   - If Low → Recommend creating structured content, rich snippets, FAQ pages
   - If Medium → Recommend expanding content depth, industry leadership content

2. information_depth (Comprehensive/Moderate/Limited)
   - If Limited → Recommend publishing detailed product/service pages

3. ai_knowledge sections with "Limited" knowledge_level:
   - pricing Limited → Recommend transparent pricing page with structured data
   - case_studies Limited → Recommend publishing customer success stories
   - testimonials Limited → Recommend collecting and displaying customer reviews
   - services Limited → Recommend detailed product/service documentation
   - differentiators Limited → Recommend highlighting unique value propositions

4. overall_sentiment (Mostly Positive/Mixed/Neutral/Mostly Negative)
   - If Mixed/Negative → Address specific negative_drivers
   - If strong negative themes → Recommend reputation management

5. Competitor context:
   - If strong competitors identified → Recommend differentiation strategies
   - If many direct competitors → Recommend niche positioning

PRIORITY LEVELS:
- High: Critical gaps affecting core discoverability (visibility_level Low, multiple Limited knowledge areas)
- Medium: Important improvements (specific knowledge gaps, sentiment issues)
- Low: Optimization opportunities (already decent but could improve)

CRITICAL RULES FOR RECOMMENDATIONS:
❌ Do NOT use generic advice like "improve SEO" without specifics
❌ Do NOT recommend tools, agencies, or paid advertising
❌ Do NOT repeat the same recommendations for different companies
❌ Do NOT include marketing fluff or sales language
✓ BE SPECIFIC about what to create/improve
✓ EXPLAIN why this addresses a detected gap
✓ MAKE recommendations defensible in a client discussion
✓ PRIORITIZE based on severity of gaps

MANDATORY: Provide 5-7 recommendations tailored to THIS company's specific gaps.`
          }
        ],
        temperature: 0.3
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error(
      "OpenAI Insights API Error:",
      error.response?.data || error.message
    );
    throw new Error(`OpenAI Insights API failed: ${error.message}`);
  }
}

// --- SENTIMENT SCORE ONLY ---
export async function getSentimentScore(companyName = "OpenAI") {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              `You are an unbiased brand sentiment analyst.\nYour task is to summarize general public sentiment based on commonly reported opinions from reviews, articles, and discussions.\nDo not exaggerate sentiment.\nIf sentiment is mixed, reflect that accurately.\nReturn structured output only.`
          },
          {
            role: "user",
            content:
              `Analyze the overall public sentiment for the brand: "${companyName}".\n\nBased on commonly observed opinions across reviews, articles, and online discussions, do the following:\n\n1. Classify the overall sentiment into ONE of the following categories:\n   - Mostly Positive\n   - Mixed\n   - Neutral\n   - Mostly Negative\n\n2. Provide an approximate count of sentiment signals used to form this conclusion:\n   - positive_mentions\n   - neutral_mentions\n   - negative_mentions\n\nImportant rules:\n- The counts must be realistic and proportional (not equal unless truly neutral).\n- Use relative estimation, not exact real-world data.\n- Ensure positive + neutral + negative counts > 0.\n- Keep the total count between 15 and 40.\n\nReturn the result in the following JSON format ONLY:\n\n{\n  "sentiment_class": "",\n  "positive_mentions": 0,\n  "neutral_mentions": 0,\n  "negative_mentions": 0\n}`
          }
        ],
        temperature: 0.3
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error(
      "OpenAI Sentiment Score API Error:",
      error.response?.data || error.message
    );
    throw new Error(`OpenAI Sentiment Score API failed: ${error.message}`);
  }
}
// --- END SENTIMENT SCORE ONLY ---


