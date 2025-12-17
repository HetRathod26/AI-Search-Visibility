import axios from "axios";

export async function getAIInsights(companyName = 'OpenAI', website = '') {
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
            content:
              `Perform a 3-STEP contextual sentiment analysis for "${companyName}"${website ? ` (${website})` : ''}.

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
- Example (Strong): "AI accurately describes Tesla as an EV and clean energy company founded by Elon Musk, with mission to accelerate sustainable transportation"
- Example (Limited): "AI provides basic company name and industry but lacks detail on history, founding, or mission"

services:
- knowledge_level: Strong (detailed product catalog) | Moderate (main offerings known) | Limited (vague or generic descriptions)
- summary: How AI describes products/services offered
- Example (Strong): "AI clearly identifies Model S, Model 3, Model X, Model Y, Cybertruck, Solar Roof, and Powerwall"
- Example (Limited): "AI mentions general product category (e.g., 'grocery delivery') but lacks specific service details"

pricing:
- knowledge_level: Strong (specific pricing known) | Moderate (pricing model understood) | Limited (no pricing details)
- summary: AI's understanding of pricing structure and costs
- Example (Strong): "AI provides specific vehicle prices ranging from $40k-$120k, though may be outdated"
- Example (Limited): "AI does not reference pricing, suggesting lack of public pricing information"

case_studies:
- knowledge_level: Strong (specific examples) | Moderate (general use cases) | Limited (no specific cases)
- summary: AI's knowledge of customer success stories or use cases
- Example (Moderate): "AI mentions general adoption metrics but lacks specific customer testimonials"
- Example (Limited): "AI does not reference specific case studies or customer success stories"

testimonials:
- knowledge_level: Strong (quotes/reviews) | Moderate (general sentiment) | Limited (no customer feedback)
- summary: AI's access to customer reviews or feedback
- Example (Moderate): "AI mentions high satisfaction scores but rarely quotes direct customer reviews"
- Example (Limited): "AI lacks access to customer testimonials or review data"

ideal_customer:
- knowledge_level: Strong (clear profile) | Moderate (general audience) | Limited (unclear target)
- summary: AI's understanding of target customer profile
- Example (Strong): "AI identifies target as environmentally conscious consumers, early adopters, tech enthusiasts interested in premium EVs"
- Example (Limited): "AI provides vague audience description without specific demographic or psychographic details"

differentiators:
- knowledge_level: Strong (unique features identified) | Moderate (general advantages) | Limited (unclear differentiation)
- summary: AI's perception of competitive advantages
- Example (Strong): "AI recognizes proprietary Supercharger network, OTA updates, Autopilot, and vertical battery integration"
- Example (Limited): "AI does not clearly articulate what differentiates this brand from competitors"

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

EXAMPLES BY INDUSTRY:
- Food Delivery: Zepto → direct: [Swiggy Instamart, Blinkit, BigBasket, Amazon Fresh]
- E-commerce: Amazon → direct: [Walmart, Flipkart, eBay, Alibaba]
- Payment: Stripe → direct: [PayPal, Square, Razorpay, Braintree]
- Ride-sharing: Uber → direct: [Lyft, Ola, Grab, Bolt]
- Streaming: Netflix → direct: [Amazon Prime Video, Disney+, HBO Max, Hulu]
- SaaS CRM: Salesforce → direct: [HubSpot, Zoho CRM, Microsoft Dynamics]

competitors.alternative (Provide 1-2 companies):
- Different approach to same user need
- Adjacent categories or business models
- May not be direct competition but address similar pain points

EXAMPLES:
- Food Delivery → alternative: [Cloud kitchens, Meal kit services]
- E-commerce → alternative: [Direct brand websites, Social commerce platforms]
- Ride-sharing → alternative: [Public transit apps, Bike/scooter sharing]
- Streaming → alternative: [YouTube, Cable TV services]

For each competitor provide:
- name: Exact company name (not generic)
- reason: Specific reason why mentioned (10-15 words max)

IMPORTANT EXAMPLES:

For "Zepto" (quick commerce):
{
  "direct": [
    {"name": "Swiggy Instamart", "reason": "Quick grocery delivery platform competing in Indian market"},
    {"name": "Blinkit", "reason": "Fast commerce service delivering groceries in minutes"},
    {"name": "BigBasket", "reason": "Online grocery platform with rapid delivery options"}
  ],
  "alternative": [
    {"name": "Dunzo", "reason": "Hyperlocal delivery service offering similar quick commerce"},
    {"name": "Amazon Fresh", "reason": "E-commerce giant's grocery delivery alternative"}
  ]
}

For "Tesla" (electric vehicles):
{
  "direct": [
    {"name": "Rivian", "reason": "Electric vehicle manufacturer targeting premium segment"},
    {"name": "Lucid Motors", "reason": "Luxury EV brand competing in high-end market"},
    {"name": "BYD", "reason": "Major electric vehicle producer with global presence"}
  ],
  "alternative": [
    {"name": "Ford", "reason": "Traditional automaker expanding into electric vehicle market"},
    {"name": "Polestar", "reason": "Performance electric vehicle brand from Volvo"}
  ]
}

REMEMBER: Empty competitor arrays are NOT acceptable. Always identify at least 3 total competitors by thinking about the industry category.

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

RECOMMENDATION EXAMPLES:

For company with Limited pricing knowledge:
{
  "title": "Publish Transparent Pricing Information",
  "description": "Create a dedicated pricing page with clear plan tiers, costs, and value propositions. Use schema markup to help AI systems understand your pricing structure. This addresses the current gap where AI cannot accurately describe your pricing model.",
  "priority": "High",
  "trigger": "AI knowledge for pricing marked as Limited"
}

For company with Low visibility_level:
{
  "title": "Establish Thought Leadership Content",
  "description": "Publish industry insights, whitepapers, or blog posts addressing common questions in your category. This will increase mentions in AI responses when users ask about industry topics, improving your visibility from Low to Medium.",
  "priority": "High",
  "trigger": "Overall visibility_level assessed as Low"
}

For company with Limited testimonials:
{
  "title": "Showcase Customer Success Stories",
  "description": "Create detailed case studies with measurable outcomes and customer quotes. Feature these prominently on your website with structured data to ensure AI systems can reference specific customer experiences when discussing your brand.",
  "priority": "Medium",
  "trigger": "AI has Limited access to customer testimonials"
}

For company with negative sentiment themes:
{
  "title": "Address Customer Service Concerns",
  "description": "The analysis shows users commonly complain about support responsiveness. Create comprehensive self-service resources, publish support response time commitments, and showcase improved customer satisfaction metrics to counter negative perceptions.",
  "priority": "High",
  "trigger": "Negative sentiment theme: Limited customer support"
}

For company with strong competitors:
{
  "title": "Clarify Competitive Differentiation",
  "description": "AI struggles to distinguish you from competitors like [competitor names]. Create comparison pages, highlight unique features, and publish content explaining your specific advantages to help AI systems articulate what makes you different.",
  "priority": "Medium",
  "trigger": "Multiple direct competitors with unclear differentiation"
}

For regional brand competing with global brands:
{
  "title": "Emphasize Regional Expertise",
  "description": "Highlight your deep understanding of the local market, regional customer support, and market-specific features. This positions you as the expert choice for regional customers versus global competitors.",
  "priority": "Medium",
  "trigger": "Competing with global brands in regional market"
}

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

    console.log('OpenAI response received');
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error:', error.response?.data || error.message);
    throw new Error(`OpenAI API failed: ${error.message}`);
  }
}
