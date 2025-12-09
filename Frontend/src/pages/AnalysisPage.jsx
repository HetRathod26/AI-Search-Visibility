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
  Target
} from 'lucide-react'

const AnalysisPage = () => {
  const { jobId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const formData = location.state || {}

  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

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
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-3xl w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-6 shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Analyzing {formData.companyName || 'Your Brand'}
          </h1>
          <p className="text-xl text-gray-600">
            Sit tight! We're analyzing your AI search visibility across multiple engines
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-effect rounded-2xl p-8 mb-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
          <div className="relative z-10">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Overall Progress</span>
              <span className="text-sm font-semibold text-blue-600">{Math.round(progress)}%</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Estimated Time */}
          <div className="text-center text-sm text-gray-600">
            <Loader2 className="w-4 h-4 inline-block animate-spin mr-2" />
            Estimated time remaining: {Math.max(0, Math.ceil((100 - progress) / 10))} seconds
          </div>
          </div>
        </motion.div>

        {/* Steps */}
        <div className="space-y-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`glass-effect rounded-xl p-6 transition-all duration-300 ${
                index === currentStep 
                  ? 'border-2 border-blue-500 shadow-lg' 
                  : index < currentStep 
                  ? 'opacity-75' 
                  : 'opacity-50'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                  index < currentStep
                    ? 'bg-green-100 text-green-600'
                    : index === currentStep
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  {index < currentStep ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    step.icon
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900">{step.title}</h3>
                    {index === currentStep && (
                      <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                    )}
                    {index < currentStep && (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6"
        >
          <p className="text-sm text-blue-800 text-center">
            <strong>Pro Tip:</strong> We're testing your brand across 50+ unique queries to ensure comprehensive results. 
            This analysis typically takes 2-3 minutes for the most accurate insights.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default AnalysisPage
