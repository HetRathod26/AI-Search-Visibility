import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Sparkles, 
  Search, 
  TrendingUp, 
  Target, 
  Brain, 
  CheckCircle,
  ArrowRight,
  BarChart3,
  Zap,
  Shield,
  Globe
} from 'lucide-react'

const HomePage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    companyName: '',
    website: '',
    category: '',
    location: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Generate a mock job ID and navigate to analysis page
    const jobId = 'job_' + Math.random().toString(36).substr(2, 9)
    navigate(`/analysis/${jobId}`, { state: formData })
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-effect border-b border-white/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">AI Visibility Checker</span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden md:flex items-center space-x-6"
            >
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors">How it Works</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">Pricing</a>
              <button className="btn-secondary">Sign In</button>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6">
                <Zap className="w-4 h-4" />
                <span className="text-sm font-medium">Powered by Advanced AI Analysis</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Measure Your Brand's{' '}
                <span className="gradient-text">AI Search Visibility</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Discover how AI search engines like ChatGPT, Claude, and Perplexity perceive your brand. 
                Get actionable insights to dominate the AI-powered search revolution.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Instant Analysis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Detailed Insights</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Actionable Tips</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">98%</div>
                  <div className="text-sm text-gray-600">Accuracy Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600">50+</div>
                  <div className="text-sm text-gray-600">AI Queries</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">5 Min</div>
                  <div className="text-sm text-gray-600">Analysis Time</div>
                </div>
              </div>
            </motion.div>

            {/* Right Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-effect rounded-3xl p-8 md:p-10 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
              <div className="relative z-10">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Start Your Free Analysis
                </h2>
                <p className="text-gray-600">
                  Get instant insights into your AI search visibility
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    placeholder="e.g., TechCorp Inc."
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website URL *
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    required
                    placeholder="https://www.example.com"
                    className="input-field"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Industry
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="">Select...</option>
                      <option value="technology">Technology</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="finance">Finance</option>
                      <option value="retail">Retail</option>
                      <option value="education">Education</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g., USA"
                      className="input-field"
                    />
                  </div>
                </div>

                <button type="submit" className="w-full btn-primary group">
                  <span className="flex items-center justify-center">
                    Start Analysis
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>

                <p className="text-xs text-gray-500 text-center">
                  No credit card required • Free preview included • Full report available
                </p>
              </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive AI Visibility Analysis
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to understand and improve your AI search presence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <BarChart3 className="w-8 h-8" />,
                title: 'Visibility Score',
                description: 'Get a comprehensive score showing how often and accurately AI engines mention your brand.',
                color: 'blue'
              },
              {
                icon: <Brain className="w-8 h-8" />,
                title: 'Sentiment Analysis',
                description: 'Understand the emotional tone and perception AI engines have about your brand.',
                color: 'indigo'
              },
              {
                icon: <Search className="w-8 h-8" />,
                title: 'Information Depth',
                description: 'Measure how much detailed and accurate information AI knows about your business.',
                color: 'purple'
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: 'Ranking Analysis',
                description: 'See where your brand ranks in AI-generated lists and recommendations.',
                color: 'pink'
              },
              {
                icon: <Target className="w-8 h-8" />,
                title: 'Competitor Insights',
                description: 'Compare your AI visibility with competitors and identify opportunities.',
                color: 'orange'
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: 'Actionable Recommendations',
                description: 'Receive personalized strategies to improve your AI search visibility.',
                color: 'green'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card group hover:scale-105 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                <div className={`w-14 h-14 rounded-xl bg-${feature.color}-100 flex items-center justify-center mb-4 text-${feature.color}-600 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Simple & Fast Process</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get your AI visibility report in three simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Lines */}
            <div className="hidden md:block absolute top-24 left-1/3 right-1/3 h-1 bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200"></div>
            
            {[
              {
                step: '01',
                title: 'Enter Your Details',
                description: 'Provide your company name and website URL to start the analysis.',
                icon: <Target className="w-12 h-12" />,
                color: 'blue'
              },
              {
                step: '02',
                title: 'AI Analysis Running',
                description: 'Our AI queries multiple search engines and analyzes the responses in real-time.',
                icon: <Brain className="w-12 h-12" />,
                color: 'indigo'
              },
              {
                step: '03',
                title: 'Get Your Report',
                description: 'Receive a comprehensive report with scores, insights, and recommendations.',
                icon: <BarChart3 className="w-12 h-12" />,
                color: 'purple'
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="glass-effect rounded-2xl p-8 text-center group hover:scale-105 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-indigo-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    {/* Icon Container */}
                    <div className={`w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-${step.color}-100 to-${step.color}-200 flex items-center justify-center text-${step.color}-600 group-hover:scale-110 transition-transform shadow-lg`}>
                      {step.icon}
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {step.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
                
                {/* Arrow Between Steps */}
                {index < 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.3 }}
                    className="hidden md:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-20 w-8 h-8 items-center justify-center bg-white rounded-full shadow-lg"
                  >
                    <ArrowRight className="w-5 h-5 text-blue-600" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
          
          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-center mt-12"
          >
            <p className="text-gray-600 mb-6">Ready to see how visible your brand is?</p>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="btn-primary inline-flex items-center group"
            >
              Get Started Now
              <Sparkles className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto glass-effect rounded-3xl p-12 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>
          <div className="relative z-10">
          <Globe className="w-16 h-16 mx-auto mb-6 text-blue-600" />
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ready to Dominate AI Search?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join hundreds of brands optimizing their AI visibility today
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="btn-primary"
          >
            Start Free Analysis
          </button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold">AI Visibility</span>
              </div>
              <p className="text-gray-400">
                Measure and improve your brand's presence in AI search engines.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 AI Visibility Checker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
