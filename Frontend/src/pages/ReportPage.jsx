import { useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Sparkles, 
  Lock, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  XCircle,
  Star,
  Users,
  Target,
  Lightbulb,
  Share2,
  Download,
  ArrowLeft,
  CreditCard
} from 'lucide-react'
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'

const ReportPage = () => {
  const { reportId } = useParams()
  const location = useLocation()
  const formData = location.state || {}
  
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  // Demo data
  const mockReport = {
    visibility_score: 67,
    sentiment_score: {
      positive: 65,
      neutral: 25,
      negative: 10
    },
    info_depth_score: 72,
    top_queries: [
      { query: 'Best CRM software for small business', rank: 3, mentioned: true },
      { query: 'Top project management tools', rank: 7, mentioned: true },
      { query: 'Affordable business software solutions', rank: null, mentioned: false },
      { query: 'Cloud-based collaboration platforms', rank: 5, mentioned: true },
      { query: 'Customer support automation tools', rank: null, mentioned: false }
    ],
    ai_knowledge: {
      about: 'AI engines have a good understanding of your company\'s core business model and value proposition.',
      services: 'Primary services are well-documented, but some newer offerings are not yet indexed.',
      pricing: 'Pricing information is inconsistent across different AI responses.',
      case_studies: 'Limited case study data available in AI knowledge bases.',
      ideal_customer: 'Target audience is clearly identified in most AI responses.',
      testimonials: 'Customer reviews and testimonials are rarely mentioned.',
      differentiators: 'Key differentiators are mentioned but not emphasized strongly.'
    },
    rankings: [
      { category: 'Project Management', rank: 5, total: 10 },
      { category: 'Team Collaboration', rank: 3, total: 10 },
      { category: 'CRM Software', rank: 7, total: 10 },
      { category: 'Business Tools', rank: 4, total: 10 }
    ],
    competitor_mentions: [
      { name: 'Competitor A', mentions: 23 },
      { name: 'Competitor B', mentions: 18 },
      { name: 'Your Brand', mentions: 15 },
      { name: 'Competitor C', mentions: 12 },
      { name: 'Competitor D', mentions: 8 }
    ],
    recommendations: [
      {
        title: 'Optimize Your Content for AI Training',
        description: 'Create structured, high-quality content that AI models can easily parse and understand.',
        priority: 'high',
        impact: 'Increase visibility by 25-30%'
      },
      {
        title: 'Improve Pricing Transparency',
        description: 'Make pricing information clear and accessible on your website to help AI engines provide accurate responses.',
        priority: 'high',
        impact: 'Boost sentiment score by 15%'
      },
      {
        title: 'Publish More Case Studies',
        description: 'Add detailed case studies showing real results to strengthen your brand authority.',
        priority: 'medium',
        impact: 'Improve depth score by 20%'
      },
      {
        title: 'Leverage Customer Testimonials',
        description: 'Feature customer testimonials prominently to improve sentiment and trust signals.',
        priority: 'medium',
        impact: 'Enhance positive sentiment by 10%'
      },
      {
        title: 'Create Comparison Content',
        description: 'Develop content comparing your solution to competitors to rank in "best of" queries.',
        priority: 'high',
        impact: 'Improve ranking position by 2-3 spots'
      }
    ]
  }

  // Radar chart data
  const radarData = [
    { subject: 'Visibility', value: mockReport.visibility_score, fullMark: 100 },
    { subject: 'Sentiment', value: mockReport.sentiment_score.positive, fullMark: 100 },
    { subject: 'Info Depth', value: mockReport.info_depth_score, fullMark: 100 },
    { subject: 'Rankings', value: 65, fullMark: 100 },
    { subject: 'Authority', value: 58, fullMark: 100 }
  ]

  // Sentiment pie data
  const sentimentData = [
    { name: 'Positive', value: mockReport.sentiment_score.positive, color: '#10b981' },
    { name: 'Neutral', value: mockReport.sentiment_score.neutral, color: '#6b7280' },
    { name: 'Negative', value: mockReport.sentiment_score.negative, color: '#ef4444' }
  ]

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreGradient = (score) => {
    if (score >= 80) return 'from-green-500 to-emerald-600'
    if (score >= 60) return 'from-yellow-500 to-orange-600'
    return 'from-red-500 to-pink-600'
  }

  const handleUnlockClick = () => {
    setShowPaymentModal(true)
  }

  const handlePayment = () => {
    // Simulate payment
    setTimeout(() => {
      setIsUnlocked(true)
      setShowPaymentModal(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <button 
          onClick={() => window.history.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              AI Visibility Report
            </h1>
            <p className="text-gray-600">
              For <span className="font-semibold">{formData.companyName || 'Your Company'}</span> • 
              Report ID: {reportId.slice(0, 12)}...
            </p>
          </div>
          
          <div className="flex gap-3">
            <button className="btn-secondary flex items-center">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </button>
            <button className="btn-secondary flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Main Score Card - Always Visible */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect rounded-3xl p-8 mb-8 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
          <div className="relative z-10">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Overall Score */}
            <div className="text-center">
              <div className="mb-4">
                <div className={`text-6xl font-bold ${getScoreColor(mockReport.visibility_score)} mb-2`}>
                  {mockReport.visibility_score}
                </div>
                <div className="text-sm text-gray-600">out of 100</div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                AI Visibility Score
              </h3>
              <p className="text-sm text-gray-600">
                Your brand has <span className="font-semibold">moderate visibility</span> on AI search engines
              </p>
            </div>

            {/* Sentiment */}
            <div className="text-center">
              <div className="mb-4">
                <div className="text-6xl font-bold text-green-600 mb-2">
                  {mockReport.sentiment_score.positive}%
                </div>
                <div className="text-sm text-gray-600">positive</div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Sentiment Score
              </h3>
              <p className="text-sm text-gray-600">
                Most AI responses about your brand are <span className="font-semibold">positive</span>
              </p>
            </div>

            {/* Info Depth */}
            <div className="text-center">
              <div className="mb-4">
                <div className={`text-6xl font-bold ${getScoreColor(mockReport.info_depth_score)} mb-2`}>
                  {mockReport.info_depth_score}%
                </div>
                <div className="text-sm text-gray-600">coverage</div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Information Depth
              </h3>
              <p className="text-sm text-gray-600">
                AI has <span className="font-semibold">good understanding</span> of your business
              </p>
            </div>
          </div>
          </div>
        </motion.div>

        {/* Unlock Banner - Show if not unlocked */}
        {!isUnlocked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 mb-8 text-white text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
            <div className="relative z-10">
            <Lock className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-3">
              Unlock Your Full Report
            </h2>
            <p className="text-lg mb-6 text-blue-100">
              Get detailed insights, competitor analysis, and actionable recommendations to improve your AI visibility
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Detailed Rankings</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Competitor Analysis</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>AI Knowledge Gaps</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>5+ Recommendations</span>
              </div>
            </div>
            <button 
              onClick={handleUnlockClick}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-lg text-lg"
            >
              Unlock Full Report - $49
            </button>
            <p className="text-sm text-blue-100 mt-4">
              One-time payment • Instant access • Shareable link
            </p>
            </div>
          </motion.div>
        )}

        {/* Preview Content - Partially Blurred */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Performance Overview
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar name="Your Brand" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Sentiment Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Sentiment Analysis
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Blurred Sections */}
        <div className={`relative ${!isUnlocked ? 'pointer-events-none' : ''}`}>
          {!isUnlocked && (
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white z-10 flex items-center justify-center backdrop-blur-sm">
              <div className="text-center">
                <Lock className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-xl font-semibold text-gray-700 mb-2">
                  Unlock to view full details
                </p>
                <button 
                  onClick={handleUnlockClick}
                  className="btn-primary"
                >
                  Unlock Now
                </button>
              </div>
            </div>
          )}

          <div className={!isUnlocked ? 'blur-sm' : ''}>
            {/* Top Queries */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card mb-8"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Query Performance
              </h3>
              <div className="space-y-4">
                {mockReport.top_queries.map((query, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{query.query}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      {query.mentioned ? (
                        <>
                          <span className="flex items-center text-green-600">
                            <CheckCircle className="w-5 h-5 mr-1" />
                            Mentioned
                          </span>
                          {query.rank && (
                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                              Rank #{query.rank}
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="flex items-center text-red-600">
                          <XCircle className="w-5 h-5 mr-1" />
                          Not Found
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* AI Knowledge Depth */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card mb-8"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                What AI Engines Know About You
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(mockReport.ai_knowledge).map(([key, value], index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2 capitalize">
                      {key.replace('_', ' ')}
                    </h4>
                    <p className="text-sm text-gray-600">{value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Rankings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card mb-8"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Category Rankings
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockReport.rankings}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="rank" fill="#3b82f6" name="Your Rank" />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Competitor Analysis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card mb-8"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Competitor Mentions
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockReport.competitor_mentions} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Bar dataKey="mentions" fill="#6366f1" />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Actionable Recommendations
                </h3>
                <Lightbulb className="w-6 h-6 text-yellow-500" />
              </div>
              <div className="space-y-4">
                {mockReport.recommendations.map((rec, index) => (
                  <div 
                    key={index}
                    className={`p-5 rounded-xl border-2 ${
                      rec.priority === 'high' 
                        ? 'border-red-200 bg-red-50' 
                        : 'border-yellow-200 bg-yellow-50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-gray-900 text-lg">
                        {rec.title}
                      </h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        rec.priority === 'high' 
                          ? 'bg-red-600 text-white' 
                          : 'bg-yellow-600 text-white'
                      }`}>
                        {rec.priority.toUpperCase()} PRIORITY
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3">{rec.description}</p>
                    <div className="flex items-center text-sm">
                      <TrendingUp className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-green-700 font-medium">
                        Expected Impact: {rec.impact}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Unlock Full Report
              </h3>
              <p className="text-gray-600">
                Get complete access to all insights and recommendations
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-700">Full Report Access</span>
                <span className="text-2xl font-bold text-gray-900">$49</span>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Complete analysis & insights
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Competitor benchmarking
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Actionable recommendations
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Lifetime access & sharing
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button 
                onClick={handlePayment}
                className="w-full btn-primary"
              >
                Proceed to Payment
              </button>
              <button 
                onClick={() => setShowPaymentModal(false)}
                className="w-full btn-secondary"
              >
                Maybe Later
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              Secure payment • Money-back guarantee • Instant access
            </p>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default ReportPage
