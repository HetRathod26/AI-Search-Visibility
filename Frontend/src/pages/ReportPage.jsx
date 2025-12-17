import { useState, useRef, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { 
  Lock, 
  CheckCircle,
  XCircle,
  ArrowLeft,
  Sparkles,
  ExternalLink
} from 'lucide-react'
import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

const ReportPage = () => {
  const { reportId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const formData = location.state || {}
  
  const [isUnlocked, setIsUnlocked] = useState(true)
  const [activeSection, setActiveSection] = useState('sentiment')
  const [reportData, setReportData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Section refs for scrolling
  const sentimentRef = useRef(null)
  const rankingsRef = useRef(null)
  const knowledgeRef = useRef(null)
  const competitorsRef = useRef(null)
  const recommendationsRef = useRef(null)

  // Switch to section
  const scrollToSection = (sectionRef, sectionName) => {
    setActiveSection(sectionName)
  }

  // Fetch data from backend
  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true)
        const response = await fetch('http://localhost:5000/api/report', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            companyName: formData.companyName || 'OpenAI',
            website: formData.website || 'https://openai.com'
          })
        })
        if (!response.ok) {
          throw new Error('Failed to fetch report')
        }
        const data = await response.json()
        setReportData(data)
        console.log('Backend data:', data)
        console.log('Competitors data:', data.competitors)
        console.log('Competitors direct:', data.competitors?.direct)
        console.log('Competitors alternative:', data.competitors?.alternative)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching report:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchReport()
  }, [])

  // Demo data
  const mockReport = {
    company_name: formData.companyName || 'Tesla',
    website: formData.website || 'tesla.com',
    summary: 'Tesla is frequently mentioned in AI responses related to electric vehicles and sustainable energy, with strong visibility in innovation and technology queries.',
    visibility_score: 67,
    sentiment: {
      positive: 72,
      neutral: 20,
      negative: 8
    },
    sentiment_explanation: 'AI engines predominantly describe Tesla in positive terms, emphasizing innovation, electric vehicle leadership, and technological advancement. Neutral mentions typically relate to factual company information. Negative sentiment appears in discussions about pricing and service challenges.',
    rankings: [
      { query: 'Best electric vehicle companies', appears: true, rank: 2 },
      { query: 'Top EV manufacturers 2024', appears: true, rank: 1 },
      { query: 'Sustainable energy companies', appears: true, rank: 4 },
      { query: 'Innovation leaders in automotive', appears: true, rank: 3 },
      { query: 'Self-driving car companies', appears: true, rank: 2 },
      { query: 'Renewable energy technology firms', appears: false, rank: null },
    ],
    ai_knowledge: {
      about: 'AI engines accurately describe Tesla as an electric vehicle and clean energy company founded by Elon Musk. The company\'s mission to accelerate sustainable transportation is well-documented across AI responses.',
      services: 'Primary products are clearly identified: Model S, Model 3, Model X, Model Y, Cybertruck, Solar Roof, and Powerwall. However, newer services like Tesla Insurance are inconsistently mentioned.',
      pricing: 'Vehicle pricing is generally accurate but may be outdated. AI responses vary in including federal tax credits and incentives.',
      case_studies: 'Limited specific customer success stories. Most AI responses reference general adoption metrics rather than individual testimonials.',
      testimonials: 'Customer reviews are rarely quoted directly. AI engines mention high satisfaction scores but lack detailed testimonial content.',
      ideal_customer: 'Target audience is well understood: environmentally conscious consumers, early adopters, and tech enthusiasts interested in premium electric vehicles.',
      differentiators: 'Key differentiators are clearly recognized: proprietary charging network, over-the-air updates, Autopilot technology, and vertical integration of battery production.'
    },
    competitors: {
      direct: [
        { name: 'Rivian', reason: 'Electric vehicle manufacturer targeting premium segment' },
        { name: 'Lucid Motors', reason: 'Luxury EV brand competing in high-end market' },
      ],
      alternative: [
        { name: 'Ford', reason: 'Traditional automaker expanding into electric vehicle market' },
        { name: 'BYD', reason: 'Major electric vehicle producer with global presence' },
      ]
    },
    recommendations: [
      {
        title: 'Update Product Information Regularly',
        description: 'AI knowledge bases contain outdated pricing and product details. Ensure your website has current, structured data that AI can easily index.',
        priority: 'high'
      },
      {
        title: 'Publish Customer Success Stories',
        description: 'AI engines lack specific customer testimonials. Creating detailed case studies with measurable outcomes will improve credibility in AI responses.',
        priority: 'high'
      },
      {
        title: 'Clarify Service Offerings',
        description: 'Newer services like Tesla Insurance are inconsistently mentioned. Create dedicated, well-structured pages for each service offering.',
        priority: 'medium'
      },
      {
        title: 'Address Common Concerns',
        description: 'Negative sentiment around pricing and service should be addressed through transparent FAQ content and service improvement documentation.',
        priority: 'medium'
      },
      {
        title: 'Expand Renewable Energy Content',
        description: 'To appear in renewable energy queries beyond automotive, create more content about solar and energy storage solutions.',
        priority: 'low'
      }
    ]
  }

  // Use fetched data if available, otherwise use mock data
  const displayReport = reportData || mockReport

  // Sentiment chart data - use displayReport
  const sentimentData = [
    { category: 'Positive', value: displayReport.sentiment.positive },
    { category: 'Neutral', value: displayReport.sentiment.neutral },
    { category: 'Negative', value: displayReport.sentiment.negative }
  ]

  const getScoreLevel = (score) => {
    if (score >= 80) return 'Strong'
    if (score >= 60) return 'Moderate'
    if (score >= 40) return 'Fair'
    return 'Low'
  }

  const getScoreColor = (score) => {
    if (score >= 80) return '#10b981'
    if (score >= 60) return '#3b82f6'
    if (score >= 40) return '#f59e0b'
    return '#ef4444'
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Generating your AI visibility report...</p>
          <p className="text-gray-500 text-sm mt-2">Fetching data from DataForSEO and OpenAI</p>
        </div>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Failed to Load Report</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors mr-2"
          >
            Retry
          </button>
          <button 
            onClick={() => navigate('/')}
            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto mb-6">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </button>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* 1. REPORT HEADER */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            AI Visibility Report for {displayReport.company_name}
          </h1>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-start gap-2">
              <Sparkles className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {displayReport.summary}
              </div>
            </div>
          </div>
        </div>

        {/* 2. AI VISIBILITY SCORE & SENTIMENT ANALYSIS - Side by Side */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* AI Visibility Score */}
          <div className="bg-white/60 backdrop-blur-lg border border-white/80 rounded-lg shadow-lg p-4 flex flex-col">
            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
              AI Visibility Score
            </h3>
            <div className="text-center flex-1 flex flex-col justify-between">
              {/* Gauge Visualization */}
              <div className="relative w-64 h-40 mx-auto mb-3">
                <svg className="w-full h-full" viewBox="0 0 200 120">
                  {/* Background arc */}
                  <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="16"
                    strokeLinecap="round"
                  />
                  {/* Progress arc */}
                  <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke={getScoreColor(displayReport.visibility_score)}
                    strokeWidth="16"
                    strokeLinecap="round"
                    strokeDasharray={`${(displayReport.visibility_score / 100) * 251.2} 251.2`}
                  />
                </svg>
                
                {/* Score text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ top: '10px' }}>
                  <div className="text-2xl font-bold text-gray-900">
                    {displayReport.visibility_score} <span className="text-lg text-gray-500">/100</span>
                  </div>
                  <div className="text-xl font-bold text-gray-900 mt-2">
                    {getScoreLevel(displayReport.visibility_score)}
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-3 mt-4">
                <p className="text-sm text-gray-700">
                  {displayReport.visibility_score >= 80 
                    ? 'Your brand has excellent visibility! AI assistants frequently mention and recommend your company when answering related questions.'
                    : displayReport.visibility_score >= 60 
                    ? 'Your brand has good visibility. AI assistants recognize your company, but there\'s room to appear more often in their responses.'
                    : displayReport.visibility_score >= 40
                    ? 'Your brand has moderate visibility. AI assistants sometimes mention your company, but you could improve your presence significantly.'
                    : 'Your brand has low visibility. AI assistants rarely mention your company. Strategic improvements are needed to increase awareness.'}
                </p>
              </div>
            </div>
          </div>

          {/* Sentiment Score */}
          <div className="bg-white/60 backdrop-blur-lg border border-white/80 rounded-lg shadow-lg p-4 flex flex-col">
            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
              Sentiment Score
            </h3>
            
            <div className="flex-1 flex flex-col justify-between">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={sentimentData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="category" type="category" width={80} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>

              <div className="bg-blue-50 rounded-lg p-3 mt-4">
                <p className="text-sm text-gray-700">
                  {displayReport.sentiment.positive >= 70
                    ? 'AI responses are predominantly positive, reflecting strong brand perception'
                    : displayReport.sentiment.positive >= 50
                    ? 'Mostly positive sentiment with some neutral mentions'
                    : displayReport.sentiment.positive >= 30
                    ? 'Mixed sentiment - balance of positive and neutral responses'
                    : 'Sentiment needs improvement - focus on addressing concerns'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. SECTION NAVIGATION */}
        <div className="bg-white rounded-t-lg shadow-sm p-4 sticky top-4 z-10">
          <nav className="flex justify-between text-sm">
            <button
              onClick={() => scrollToSection(sentimentRef, 'sentiment')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeSection === 'sentiment' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sentiment Analysis
            </button>
            <button
              onClick={() => scrollToSection(rankingsRef, 'rankings')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeSection === 'rankings' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Rankings
            </button>
            <button
              onClick={() => scrollToSection(knowledgeRef, 'knowledge')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeSection === 'knowledge' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              AI Knowledge
            </button>
            <button
              onClick={() => scrollToSection(competitorsRef, 'competitors')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeSection === 'competitors' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Competitors
            </button>
            <button
              onClick={() => scrollToSection(recommendationsRef, 'recommendations')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeSection === 'recommendations' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Recommendations
            </button>
          </nav>
        </div>

        {/* 4. SENTIMENT ANALYSIS DETAILS */}
        {activeSection === 'sentiment' && (
        <div ref={sentimentRef} className="bg-white rounded-b-lg shadow-sm p-8 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Sentiment Analysis
          </h3>
          <p className="text-gray-600 mb-6 text-sm">
            Detailed breakdown of where positive, neutral, and negative mentions originated
          </p>

          {/* Positive Reviews */}
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <h4 className="text-lg font-semibold text-gray-900">Positive ({displayReport.sentiment.positive}%)</h4>
            </div>
            <div className="space-y-3 ml-5">
              {displayReport.sentiment_insights?.themes?.positive?.map((theme, index) => (
                <div key={index} className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4">
                  <p className="text-gray-800">
                    <span className="text-green-700 font-semibold"></span> Users appreciate that {theme.toLowerCase()}
                  </p>
                </div>
              )) || (
                <div className="rounded-lg p-4">
                  <p className="text-gray-700">No positive themes available</p>
                </div>
              )}
            </div>
          </div>

          {/* Neutral Reviews */}
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
              <h4 className="text-lg font-semibold text-gray-900">Neutral ({displayReport.sentiment.neutral}%)</h4>
            </div>
            <div className="space-y-3 ml-5">
              {displayReport.sentiment_insights?.themes?.neutral?.map((theme, index) => (
                <div key={index} className="bg-gray-50 border-l-4 border-gray-400 rounded-lg p-4">
                  <p className="text-gray-800">
                    <span className="text-gray-600 font-semibold"></span> Users acknowledge that {theme.toLowerCase()}
                  </p>
                </div>
              )) || (
                <div className="rounded-lg p-4">
                  <p className="text-gray-700">No neutral themes available</p>
                </div>
              )}
            </div>
          </div>

          {/* Negative Reviews */}
          <div>
            <div className="flex items-center mb-3">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <h4 className="text-lg font-semibold text-gray-900">Negative ({displayReport.sentiment.negative}%)</h4>
            </div>
            <div className="space-y-3 ml-5">
              {displayReport.sentiment_insights?.themes?.negative?.map((theme, index) => (
                <div key={index} className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
                  <p className="text-gray-800">
                    <span className="text-red-700 font-semibold"></span> Users express concerns about {theme.toLowerCase()}
                  </p>
                </div>
              )) || (
                <div className="rounded-lg p-4">
                  <p className="text-gray-700">No negative themes available</p>
                </div>
              )}
            </div>
          </div>
        </div>
        )}

        {/* 5. RANKING PRESENCE */}
        {activeSection === 'rankings' && (
        <div ref={rankingsRef} className="bg-white rounded-b-lg shadow-sm p-8 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Ranking Presence
          </h3>
          <p className="text-gray-600 mb-6 text-sm">
            Visibility of the brand's official website in category-level Google search results
          </p>

          {/* Informational message if no rankings found */}
          {displayReport.rankings && displayReport.rankings.length > 0 && !displayReport.rankings.some(r => r.appears) && (
            <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-800">
                    <strong>Analytical Insight:</strong> The brand does not currently rank directly for these category-level queries. 
                    Visibility may be driven through third-party platforms, articles, or marketplaces instead. 
                    This measures SEO ownership of the official website, not overall brand awareness.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Modern Card-Based Layout */}
          <div className="space-y-4">
            {displayReport.rankings && displayReport.rankings.length > 0 ? (
              displayReport.rankings.map((item, index) => (
                <div 
                  key={index} 
                  className={`group relative bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl p-5 transition-all duration-300 hover:shadow-lg hover:border-blue-300 ${
                    !isUnlocked && index >= 2 ? 'blur-sm pointer-events-none' : ''
                  }`}
                >
                  {/* Query Title */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <h4 className="text-base font-semibold text-gray-900 capitalize group-hover:text-blue-600 transition-colors">
                          {item.query}
                        </h4>
                      </div>
                    </div>
                    
                    {/* Ranking Badge */}
                    {item.rank && (
                      <div className="flex-shrink-0">
                        <div className={`px-4 py-2 rounded-lg font-bold text-lg ${
                          item.rank === 1 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-md' :
                          item.rank <= 3 ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-md' :
                          item.rank <= 5 ? 'bg-gradient-to-r from-green-400 to-green-500 text-white shadow-md' :
                          'bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-md'
                        }`}>
                          #{item.rank}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Status Row */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      {item.appears ? (
                        <>
                          <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span className="text-sm font-semibold text-green-700">Website Found</span>
                          </div>
                          {item.rank && (
                            <div className="bg-blue-50 px-4 py-2 rounded-lg">
                              <span className="text-sm text-blue-700">
                                <strong>Position:</strong> {
                                  item.rank === 1 ? '🥇 First place' :
                                  item.rank === 2 ? '🥈 Second place' :
                                  item.rank === 3 ? '🥉 Third place' :
                                  `Top ${item.rank}`
                                }
                              </span>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
                          <div className="w-5 h-5 flex items-center justify-center">
                            <span className="text-gray-400 font-bold">—</span>
                          </div>
                          <span className="text-sm text-gray-500">Not ranking in top 10</span>
                        </div>
                      )}
                    </div>

                    {/* Performance Indicator */}
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((bar) => (
                        <div
                          key={bar}
                          className={`w-2 h-8 rounded-full transition-all ${
                            item.rank && bar <= (6 - Math.min(item.rank, 5))
                              ? item.rank === 1 ? 'bg-yellow-500' :
                                item.rank <= 3 ? 'bg-blue-500' :
                                'bg-green-500'
                              : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                <div className="animate-pulse">
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <p className="text-gray-500">Analyzing category-level search queries...</p>
                </div>
              </div>
            )}
          </div>

          {!isUnlocked && displayReport.rankings && displayReport.rankings.length > 2 && (
            <div className="mt-6 text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center justify-center gap-2 mb-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="text-sm font-semibold text-gray-700">
                  {displayReport.rankings.length - 2} more {displayReport.rankings.length - 2 === 1 ? 'query' : 'queries'} available
                </span>
              </div>
              <button 
                onClick={() => setIsUnlocked(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl text-sm font-semibold transform hover:scale-105"
              >
                Unlock Full Ranking Analysis
              </button>
            </div>
          )}
        </div>
        )}

        {/* 6. WHAT AI KNOWS ABOUT YOU */}
        {activeSection === 'knowledge' && (
        <div ref={knowledgeRef} className="bg-white rounded-b-lg shadow-sm p-8 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            What AI Knows About You
          </h3>
          <p className="text-gray-600 mb-6 text-sm">
            Analysis of AI engine knowledge across key business dimensions
          </p>

          <div className="space-y-4">
            {Object.entries(displayReport.ai_knowledge).map(([key, value], index) => {
              // Get knowledge level badge color
              const getKnowledgeLevelColor = (level) => {
                if (level === 'Strong') return 'bg-green-100 text-green-700 border-green-300';
                if (level === 'Moderate') return 'bg-blue-100 text-blue-700 border-blue-300';
                return 'bg-gray-100 text-gray-700 border-gray-300';
              };

              return (
                <div 
                  key={key} 
                  className={`p-5 border border-gray-200 rounded-xl hover:shadow-md transition-shadow ${
                    !isUnlocked && index >= 2 ? 'blur-sm pointer-events-none' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-gray-900 text-lg capitalize">
                      {key.replace(/_/g, ' ')}
                    </h4>
                    {value.knowledge_level && (
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getKnowledgeLevelColor(value.knowledge_level)}`}>
                        {value.knowledge_level}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {value.summary || value}
                  </p>
                </div>
              );
            })}
          </div>

          {!isUnlocked && (
            <div className="mt-4 text-center">
              <button 
                onClick={() => setIsUnlocked(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                View Complete Analysis
              </button>
            </div>
          )}
        </div>
        )}

        {/* 7. COMPETITOR COMPARISON */}
        {activeSection === 'competitors' && (
        <div ref={competitorsRef} className="bg-white rounded-b-lg shadow-sm p-8 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Competitor Mentions
          </h3>
          <p className="text-gray-600 mb-6 text-sm">
            Companies commonly mentioned alongside your brand based on AI perception
          </p>
          
          <div className={!isUnlocked ? 'relative' : ''}>
            {!isUnlocked && (
              <div className="absolute inset-0 backdrop-blur-sm bg-white/50 flex items-center justify-center z-10 rounded-lg">
                <div className="text-center">
                  <Lock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-700 font-medium mb-3">Unlock to view competitor analysis</p>
                  <button 
                    onClick={() => setIsUnlocked(true)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    Unlock Now
                  </button>
                </div>
              </div>
            )}

            <div className={!isUnlocked ? 'blur-md' : ''}>
              {/* Direct Competitors */}
              {displayReport.competitors?.direct && displayReport.competitors.direct.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-6 bg-red-500 rounded"></div>
                    <h4 className="text-lg font-semibold text-gray-900">Direct Competitors</h4>
                  </div>
                  <div className="space-y-3">
                    {displayReport.competitors.direct.map((comp, index) => (
                      <div key={index} className="group bg-gradient-to-r from-red-50 to-white border border-red-200 rounded-xl p-5 hover:shadow-lg transition-all">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                            <span className="text-red-600 font-bold text-lg">{comp.name.charAt(0)}</span>
                          </div>
                          <div className="flex-1">
                            <h5 className="font-semibold text-gray-900 mb-1 group-hover:text-red-600 transition-colors">{comp.name}</h5>
                            <p className="text-sm text-gray-600">{comp.reason}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Alternative Solutions */}
              {displayReport.competitors?.alternative && displayReport.competitors.alternative.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-6 bg-blue-500 rounded"></div>
                    <h4 className="text-lg font-semibold text-gray-900">Alternative Solutions</h4>
                  </div>
                  <div className="space-y-3">
                    {displayReport.competitors.alternative.map((comp, index) => (
                      <div key={index} className="group bg-gradient-to-r from-blue-50 to-white border border-blue-200 rounded-xl p-5 hover:shadow-lg transition-all">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                            <span className="text-blue-600 font-bold text-lg">{comp.name.charAt(0)}</span>
                          </div>
                          <div className="flex-1">
                            <h5 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{comp.name}</h5>
                            <p className="text-sm text-gray-600">{comp.reason}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* No competitors found */}
              {(!displayReport.competitors?.direct || displayReport.competitors.direct.length === 0) && 
               (!displayReport.competitors?.alternative || displayReport.competitors.alternative.length === 0) && (
                <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p className="text-gray-600 font-medium mb-1">No clear competitors identified</p>
                  <p className="text-gray-500 text-sm">This may indicate a unique market position or niche category</p>
                </div>
              )}
            </div>
          </div>
        </div>
        )}

        {/* 8. RECOMMENDATIONS */}
        {activeSection === 'recommendations' && (
        <div ref={recommendationsRef} className="bg-white rounded-b-lg shadow-sm p-8 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Recommendations
          </h3>
          
          <div className={!isUnlocked ? 'relative' : ''}>
            {!isUnlocked && (
              <div className="absolute inset-0 backdrop-blur-sm bg-white/50 flex items-center justify-center z-10 rounded-lg">
                <div className="text-center">
                  <Lock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-700 font-medium mb-3">Unlock to view actionable recommendations</p>
                  <button 
                    onClick={() => setIsUnlocked(true)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    Unlock Now
                  </button>
                </div>
              </div>
            )}

            <div className={!isUnlocked ? 'blur-md' : ''}>
              <div className="space-y-4">
                {displayReport.recommendations.map((rec, index) => (
                  <div key={index} className="group bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">{rec.title}</h4>
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase shadow-sm ${
                        rec.priority === 'high' 
                          ? 'bg-gradient-to-r from-red-500 to-red-600 text-white' 
                          : rec.priority === 'medium'
                          ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white'
                          : 'bg-gradient-to-r from-gray-400 to-gray-500 text-white'
                      }`}>
                        {rec.priority}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed mb-3">{rec.description}</p>
                    {rec.trigger && (
                      <div className="flex items-start gap-2 mt-3 pt-3 border-t border-gray-200">
                        <svg className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-xs text-gray-600">
                          <strong>Why this matters:</strong> {rec.trigger}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        )}

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 py-8">
          Report generated for {displayReport.company_name} • {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  )
}

export default ReportPage
