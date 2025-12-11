import { useState, useEffect } from 'react'
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
  Globe,
  ScanSearch,
  SmilePlus,
  FileText,
  Twitter,
  Linkedin,
  Github,
  Mail,
  Send
} from 'lucide-react'

const HomePage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    companyName: '',
    website: '',
    category: '',
    location: ''
  })
  
  const [typedText, setTypedText] = useState('')
  const [showText, setShowText] = useState(true)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [activeSection, setActiveSection] = useState('home')
  const [companyPlaceholder, setCompanyPlaceholder] = useState(0)
  
  const rotatingTexts = [
    'AI Search Visibility',
    'Sentiment Score',
    'Ranking Position',
    'Competitor Insights',
    'Information Depth',
    'Growth Potential'
  ]
  
  const companyNames = [
    'Amazon',
    'Google',
    'Apple',
    'Netflix',
    'Nike',
    'Starbucks',
    'Tesla',
    'Tata',
    'Flipkart',
    'Microsoft'
  ]
  
  const websiteUrls = [
    'https://www.amazon.com',
    'https://www.google.com',
    'https://www.apple.com',
    'https://www.netflix.com',
    'https://www.nike.com',
    'https://www.starbucks.com',
    'https://www.tesla.com',
    'https://www.tata.com',
    'https://www.flipkart.com',
    'https://www.microsoft.com'
  ]
  
  // Rotate company name placeholders
  useEffect(() => {
    const interval = setInterval(() => {
      setCompanyPlaceholder((prev) => (prev + 1) % companyNames.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])
  
  // Scroll detection for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'features', 'pricing']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        } else if (section === 'home' && scrollPosition < 400) {
          setActiveSection('home')
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    let currentIndex = 0
    const currentText = rotatingTexts[currentTextIndex]
    
    const typingInterval = setInterval(() => {
      if (currentIndex <= currentText.length) {
        setTypedText(currentText.slice(0, currentIndex))
        setShowText(true)
        currentIndex++
      } else {
        // Fade out after a pause
        setTimeout(() => {
          setShowText(false)
          // Reset and move to next text after fade completes
          setTimeout(() => {
            currentIndex = 0
            setTypedText('')
            setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length)
          }, 1000) // Wait for fade animation to complete
        }, 1000)
      }
    }, 100)
    
    return () => clearInterval(typingInterval)
  }, [currentTextIndex])

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
      <nav className="fixed top-0 left-0 w-full z-50 bg-transparent">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center h-16">
            {/* Left - Brand Name */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute left-4"
            >
              <span className="text-2xl  text-white hover:text-White transition-colors">AI Visibility Checker</span>
              
            </motion.div>
            
            {/* Center - Navigation Links */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="hidden md:flex items-center space-x-2 absolute left-[40%] border-1 border-white rounded-full px-2 py-1 bg-white relative"
            >
              <a 
                href="#home" 
                className={`text-base px-3 py-1 rounded-full transition-all duration-300 relative z-10 ${
                  activeSection === 'home' ? 'text-white' : 'text-black hover:text-gray-700'
                }`}
              >
                Home
              </a>
              <a 
                href="#about" 
                className={`text-base px-3 py-1 rounded-full transition-all duration-300 relative z-10 ${
                  activeSection === 'about' ? 'text-white' : 'text-black hover:text-gray-700'
                }`}
              >
                About Us
              </a>
              <a 
                href="#features" 
                className={`text-base px-3 py-1 rounded-full transition-all duration-300 relative z-10 ${
                  activeSection === 'features' ? 'text-white' : 'text-black hover:text-gray-700'
                }`}
              >
                Features
              </a>
              <a 
                href="#pricing" 
                className={`text-base px-3 py-1 rounded-full transition-all duration-300 relative z-10 ${
                  activeSection === 'pricing' ? 'text-white' : 'text-black hover:text-gray-700'
                }`}
              >
                Pricing
              </a>
              
              {/* Animated background */}
              <motion.div
                className="absolute bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
                animate={{
                  x: activeSection === 'home' ? -7 : 
                     activeSection === 'about' ? 70 : 
                     activeSection === 'features' ? 168 : 
                     activeSection === 'pricing' ? 259 : -5,
                  width: activeSection === 'home' ? 78 : 
                          activeSection === 'about' ? 100 : 
                          activeSection === 'features' ? 88 : 
                          activeSection === 'pricing' ? 85 : 75
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                style={{ top: '0.01rem', bottom: '0.01rem', left: 0 }}
              />
            </motion.div>

            {/* Right - Auth Buttons */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4 ml-auto"
            >
              <button className="text-xl text-white hover:text-gray-900 transition-colors">Log In</button>
              <button className="text-base text-white hover:text-white transition-colors border-2 border-gray-300 rounded px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-600 hover:from-indigo-700 hover:to-indigo-700">Sign Up</button>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
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
              {/* <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6">
                <Zap className="w-4 h-4" />
                <span className="text-sm font-medium">Powered by Advanced AI Analysis</span>
              </div> */}
              
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Discover Your Brand's{' '}
                <span className={`bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent transition-opacity duration-1000 ${showText ? 'opacity-100' : 'opacity-0'}`}>
                  {typedText}
                  <span className="animate-pulse">|</span>
                </span>
              </h1>
              
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Uncover strengths, gaps, and opportunities to improve your AI Search Visibility.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-blue-100">AI Visibility Review</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-blue-100">Brand Insights</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-blue-100">Optimization Tips</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-300">98%</div>
                  <div className="text-sm text-blue-200">Accuracy Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-300">50+</div>
                  <div className="text-sm text-blue-200">AI Queries</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-300">1 Min</div>
                  <div className="text-sm text-blue-200">Analysis Time</div>
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
                  Begin Your AI Visibility Analysis
                </h2>
                <p className="text-black-600">
                  Understand how AI search engines interpret your brand instantly.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-bold font-medium text-black-700 mb-2">
                    Company name 
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    placeholder={`${companyNames[companyPlaceholder]}`}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-bold font-medium text-black-700 mb-2">
                    Website URL 
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    required
                    placeholder={websiteUrls[companyPlaceholder]}
                    className="input-field"
                  />
                </div>

                <button type="submit" className="w-full btn-primary group">
                  <span className="flex items-center justify-center">
                    Analyze Brand
                    <ScanSearch className="w-15 h-15 ml-2 group-hover:scale-110 transition-transform" />
                  </span>
                </button>

                <p className="text-xs text-black-500 text-center">
                  • Instant AI scan • Preview insights  • Detailed results available
                </p>
              </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-slate-900/50">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why AI Search Grader?
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Your Brand Deserves to Be{' '}
              <span className="bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent">Seen & Heard</span>
            </h3>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              AI Search Grader reveals how your brand appears across AI-powered search engines and assistants. It analyzes visibility, sentiment, rankings, and what AI actually knows about your company. The result is a clear visibility score with insights and steps to improve your presence in AI-driven search results.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-effect rounded-2xl p-8 text-center hover:scale-105 transition-transform relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-semibold text-black mb-2">AI-First</h3>
                <p className="text-black-100">
                  Built specifically for the new era of AI-powered search engines like ChatGPT, Claude, and Perplexity
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-effect rounded-2xl p-8 text-center hover:scale-105 transition-transform relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-semibold text-black mb-2">Instant Insights</h3>
                <p className="text-black-100">
                  Get comprehensive visibility reports in minutes, not days. Know exactly where you stand right now
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="glass-effect rounded-2xl p-8 text-center hover:scale-105 transition-transform relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-3xl font-semibold text-black mb-2">Actionable</h3>
                <p className="text-black-100">
                  Don't just see the data—get clear, step-by-step recommendations to improve your AI visibility
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 relative bg-blue-950/30">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              See Your Brand Through AI's Eyes
            </h2>
            <p className="text-xl text-blue-100">
              Clear insights and visibility metrics to analyze your brand's presence across AI platforms
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {[
              {
                icon: <BarChart3 className="w-10 h-10" />,
                title: 'AI Visibility Score',
                description: 'Determines how frequently your brand appears in AI-generated answers across multiple platforms and queries.',
                color: 'blue'
              },
              {
                icon: <SmilePlus className="w-10 h-10" />,
                title: 'Sentiment Analysis',
                description: 'Classifies AI responses about your brand into positive, neutral, or negative tones to understand perception.',
                color: 'orange'
              },
              {
                icon: <Search className="w-10 h-10" />,
                title: 'Information Depth Score',
                description: 'Measures how much detailed information AI knows about your company, services, pricing, and differentiators.',
                color: 'indigo'
              },
              {
                icon: <TrendingUp className="w-10 h-10 text-orange-600" />,
                title: 'Brand Ranking Checks',
                description: 'Evaluates if your brand appears in AI-generated lists like "Top companies for {service}" or "Best providers in {location}".',
                color: 'pink'
              },
              {
                icon: <Target className="w-10 h-10 text-green-600" />,
                title: 'Actionable Recommendations',
                description: 'Get 5-7 personalized, step-by-step strategies to improve your AI search visibility and brand presence.',
                color: 'orange'
              },
              {
                icon: <FileText className="w-10 h-10 text-yellow-600" />,
                title: 'Full Report (Shareable)',
                description: 'Download a structured report with all insights, scores, and recommendations. Share it with your team via link.',
                color: 'yellow'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="w-[360px] h-[240px] glass-effect rounded-2xl p-6 group relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Default State - Only Title */}
                <div className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-[-20px]">
                  <div className={`w-16 h-16 rounded-2xl bg-${feature.color}-100 flex items-center justify-center mb-4 text-${feature.color}-600`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-black">
                    {feature.title}
                  </h3>
                </div>

                {/* Hover State - Full Details */}
                <div className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center opacity-0 translate-y-[20px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  <h3 className="text-xl font-semibold text-black mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-black leading-relaxed text-sm mb-6">
                    {feature.description}
                  </p>
                  <button 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Try Out
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 relative bg-indigo-950/40">
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
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-200 px-4 py-2 rounded-full mb-4 border border-blue-400/30">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Simple & Fast Process</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
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
                bgColor: 'bg-gradient-to-br from-blue-200 to-blue-300',
                iconColor: 'text-blue-700'
              },
              {
                step: '02',
                title: 'AI Analysis Running',
                description: 'Our AI queries multiple search engines and analyzes the responses in real-time.',
                icon: <Brain className="w-12 h-12" />,
                bgColor: 'bg-gradient-to-br from-blue-200 to-blue-300',
                iconColor: 'text-blue-700'
              },
              {
                step: '03',
                title: 'Get Your Report',
                description: 'Receive a comprehensive report with scores, insights, and recommendations.',
                icon: <BarChart3 className="w-12 h-12" />,
                bgColor: 'bg-gradient-to-br from-blue-200 to-blue-300',
                iconColor: 'text-blue-700'
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
                    <div className={`w-24 h-24 mx-auto mb-6 rounded-2xl ${step.bgColor} flex items-center justify-center ${step.iconColor} group-hover:scale-110 transition-transform shadow-lg`}>
                      {step.icon}
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-2xl font-semibold text-black mb-4">
                      {step.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-black leading-relaxed">
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
            {/* <p className="text-black-50 mb-6">Ready to see how visible your brand is?</p> */}
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

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 relative bg-slate-900/40">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Simple Pricing</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-12">
            Get started with our free analysis, or upgrade for advanced features and ongoing monitoring.
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="glass-effect rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-black mb-4">Free Analysis</h3>
              <p className="text-black-100 mb-6">Perfect for getting started</p>
              <div className="text-4xl font-bold text-blue-300 mb-6">₹0</div>
              <ul className="text-left space-y-3 mb-8">
                <li className="flex items-center text-black-100"><CheckCircle className="w-5 h-5 text-green-400 mr-2" />Basic visibility snapshot</li>
                <li className="flex items-center text-black-100"><CheckCircle className="w-5 h-5 text-green-400 mr-2" />Partial sentiment preview</li>
                <li className="flex items-center text-black-100"><CheckCircle className="w-5 h-5 text-green-400 mr-2" />Limited information fields</li>
                <li className="flex items-center text-black-100"><CheckCircle className="w-5 h-5 text-green-400 mr-2" />One sample recommendation</li>
                <li className="flex items-center text-black-100"><CheckCircle className="w-5 h-5 text-green-400 mr-2" />Shows locked sections</li>
              </ul>
            </div>
            <div className="glass-effect rounded-2xl p-8 border-2 border-blue-400">
              <h3 className="text-2xl font-semibold text-black mb-4">Pro Visibility Suite</h3>
              <p className="text-black-100 mb-6">Unlock full AI insights & optimization</p>
              <div className="text-4xl font-bold text-blue-300 mb-6">₹1200<span className="text-lg text-blue-200">/mo</span></div>
              <ul className="text-left space-y-3 mb-8">
                <li className="flex items-center text-black-100"><CheckCircle className="w-5 h-5 text-green-400 mr-2" />Full visibility score</li>
                <li className="flex items-center text-black-100"><CheckCircle className="w-5 h-5 text-green-400 mr-2" />Complete sentiment analysis</li>
                <li className="flex items-center text-black-100"><CheckCircle className="w-5 h-5 text-green-400 mr-2" />Full information depth scoring</li>
                <li className="flex items-center text-black-100"><CheckCircle className="w-5 h-5 text-green-400 mr-2" />Priority support</li>
                <li className="flex items-center text-black-100"><CheckCircle className="w-5 h-5 text-green-400 mr-2" />5–7 recommendations</li>
                <li className="flex items-center text-black-100"><CheckCircle className="w-5 h-5 text-green-400 mr-2" />Complete sharable report</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-950/20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto glass-effect rounded-3xl p-12 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>
          <div className="relative z-10">
          <Globe className="w-16 h-16 mx-auto mb-6 text-blue-300" />
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Dominate AI Search?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
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
      <footer className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Top Section - Newsletter */}
          <div className="mb-12 pb-12 border-b border-white/10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-200 to-indigo-200 bg-clip-text text-transparent">
                  Stay Ahead in AI Search
                </h3>
                <p className="text-blue-100">
                  Get weekly insights, tips, and updates on AI search optimization
                </p>
              </div>
              <div className="flex gap-3">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl">
                  <Send className="w-4 h-4" />
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Main Footer Content */}
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">AI Search Grader</span>
              </div>
              <p className="text-blue-100 mb-6 leading-relaxed">
                Empowering brands to dominate AI-powered search results. Measure, optimize, and track your presence across ChatGPT, Perplexity, and more.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group">
                  <Twitter className="w-5 h-5 text-blue-200 group-hover:text-white transition-colors" />
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group">
                  <Linkedin className="w-5 h-5 text-blue-200 group-hover:text-white transition-colors" />
                </a>
                {/* <a href="#" className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group">
                  <Github className="w-5 h-5 text-blue-200 group-hover:text-white transition-colors" />
                </a> */}
                <a href="#" className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group">
                  <Mail className="w-5 h-5 text-blue-200 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>
            
            {/* Product Links */}
            <div>
              <h4 className="font-semibold mb-4 text-lg">Product</h4>
              <ul className="space-y-3 text-blue-100">
                <li><a href="#features" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Features</a></li>
                <li><a href="#pricing" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Pricing</a></li>
                <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">API Access</a></li>
                <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Integrations</a></li>
              </ul>
            </div>
            
            {/* Company Links */}
            <div>
              <h4 className="font-semibold mb-4 text-lg">Company</h4>
              <ul className="space-y-3 text-blue-100">
                <li><a href="#about" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">About Us</a></li>
                <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Blog</a></li>
                <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Careers</a></li>
                <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Contact</a></li>
              </ul>
            </div>
            
            {/* Legal Links */}
            <div>
              <h4 className="font-semibold mb-4 text-lg">Legal</h4>
              <ul className="space-y-3 text-blue-100">
                <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">GDPR</a></li>
              </ul>
            </div>
          </div>

          {/* Trust Badges */}
          {/* <div className="mb-8 pb-8 border-b border-white/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="glass-effect-dark rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-200">500+</div>
                <div className="text-sm text-blue-100">Brands Analyzed</div>
              </div>
              <div className="glass-effect-dark rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-200">10K+</div>
                <div className="text-sm text-blue-100">Reports Generated</div>
              </div>
              <div className="glass-effect-dark rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-200">98%</div>
                <div className="text-sm text-blue-100">Accuracy Rate</div>
              </div>
              <div className="glass-effect-dark rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-200">24/7</div>
                <div className="text-sm text-blue-100">AI Monitoring</div>
              </div>
            </div>
          </div>
           */}
          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-blue-100 text-sm">
            <p>&copy; 2025 AI Search Grader. All rights reserved.</p>
            {/* <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Status</a>
              <a href="#" className="hover:text-white transition-colors">Documentation</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
            </div> */}
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
