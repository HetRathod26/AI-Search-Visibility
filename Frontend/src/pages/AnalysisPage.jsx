import { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Loader2, 
  CheckCircle, 
  Sparkles,
  Search,
  Brain,
  BarChart3,
  TrendingUp,
  Target,
  Eye,
  Smile,
  FileText
} from 'lucide-react'

const AnalysisPage = () => {
  const { jobId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const formData = location.state || {}

  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [currentFeature, setCurrentFeature] = useState(0)

  const steps = [
    {
      icon: <Search className="w-8 h-8" />,
      title: 'Generating AI Search Queries',
      description: 'Creating relevant search queries to test AI engines',
      duration: 2000
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'Querying AI Engines',
      description: 'Testing with ChatGPT, Claude, Perplexity, and more',
      duration: 3000
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Analyzing Responses',
      description: 'Processing sentiment, accuracy, and depth',
      duration: 2500
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Calculating Scores',
      description: 'Computing visibility and ranking metrics',
      duration: 2000
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Generating Recommendations',
      description: 'Creating personalized improvement strategies',
      duration: 2500
    }
  ]

  const features = [
    {
      icon: <Eye className="w-12 h-12" />,
      title: 'AI Visibility Score',
      description: 'Tracking brand presence across AI platforms',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <Smile className="w-12 h-12" />,
      title: 'Sentiment Analysis',
      description: 'Analyzing AI perception of your brand',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: <Search className="w-12 h-12" />,
      title: 'Information Depth',
      description: 'Measuring AI knowledge about your company',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: 'Brand Rankings',
      description: 'Checking position in AI-generated lists',
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: <Target className="w-12 h-12" />,
      title: 'Actionable Insights',
      description: 'Generating optimization recommendations',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: <FileText className="w-12 h-12" />,
      title: 'Detailed Report',
      description: 'Compiling comprehensive analysis',
      color: 'from-teal-500 to-teal-600'
    }
  ]

  // Feature card rotation effect
  useEffect(() => {
    const featureInterval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 2500) // Change card every 2.5 seconds

    return () => clearInterval(featureInterval)
  }, [])

  useEffect(() => {
    // Simulate progress
    const totalDuration = steps.reduce((sum, step) => sum + step.duration, 0)
    let elapsed = 0

    const interval = setInterval(() => {
      elapsed += 100
      const newProgress = Math.min((elapsed / totalDuration) * 100, 100)
      setProgress(newProgress)

      // Update current step
      let stepDuration = 0
      for (let i = 0; i < steps.length; i++) {
        stepDuration += steps[i].duration
        if (elapsed < stepDuration) {
          setCurrentStep(i)
          break
        }
      }

      if (elapsed >= totalDuration) {
        clearInterval(interval)
        // Navigate to report after completion
        setTimeout(() => {
          const reportId = 'report_' + Math.random().toString(36).substr(2, 9)
          navigate(`/report/${reportId}`, { state: { ...formData, jobId } })
        }, 500)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-200 via-pink-100 to-pink-200 flex items-center justify-center px-4 py-12">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="text-2xl font-bold text-gray-900 mb-2">
            Analyzing {formData.companyName || 'Your Brand'}
          </p>
          <p className="text-lg text-gray-600">
            Mapping {formData.companyName || 'Your Brand'}'s destiny in the Generative AI frontier...
          </p>
        </motion.div>

        {/* AI Engines Being Queried - Side Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {['ChatGPT', 'DataForSeo','Gemini'].map((engine, i) => (
            <motion.div
              key={engine}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/30 backdrop-blur-md border border-white/50 rounded-xl p-4 text-center"
            >
              <div className="flex items-center justify-center gap-2">
                <div className={`w-2 h-2 rounded-full ${progress > (i * 25) ? 'bg-green-500' : 'bg-gray-400'} animate-pulse`}></div>
                <span className="text-sm font-medium text-gray-800">{engine}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature Cards - Single Centered Card with Rotation */}
        <div className="flex justify-center items-center mb-8 min-h-[320px]">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: currentFeature === index ? 1 : 0,
                scale: currentFeature === index ? 1 : 0.8,
                y: currentFeature === index ? 0 : 20
              }}
              transition={{ 
                duration: 0.8,
                ease: "easeInOut"
              }}
              className={`absolute ${currentFeature === index ? 'z-10' : 'z-0'}`}
            >
              {/* Ultra Transparent Glassmorphism Card */}
              <div className="relative w-[480px] h-[280px] bg-white/10 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-2xl overflow-hidden">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-blue-50/5 to-purple-50/5"></div>
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                
                {/* Glowing border effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 blur-xl"></div>
                
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
                  {/* Icon with glow */}
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 text-white shadow-2xl transform transition-transform duration-300 hover:scale-110`}>
                    <div className="relative">
                      {feature.icon}
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} blur-lg opacity-50`}></div>
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 drop-shadow-sm">
                    {feature.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-base text-gray-800 leading-relaxed max-w-md">
                    {feature.description}
                  </p>
                  
                  {/* Loading indicator */}
                  <div className="mt-6 flex items-center space-x-2">
                    <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                    <span className="text-sm text-gray-700 font-medium">Processing...</span>
                  </div>
                </div>

                {/* Progress indicator dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {features.map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        idx === currentFeature 
                          ? 'bg-blue-600 w-8' 
                          : 'bg-gray-400/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Compact Status Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-8"
        >
          <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md border border-white/40 rounded-full px-6 py-3 shadow-lg">
            <Loader2 className="w-5 h-5 animate-spin text-sky-500" />
            <span className="text-sm font-medium text-gray-700">
              {Math.round(progress)}% Complete
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AnalysisPage
