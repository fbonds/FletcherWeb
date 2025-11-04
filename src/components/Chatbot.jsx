import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIsMobile } from '../hooks/useMediaQuery'

// Knowledge base from Fletcher's resume and testimonials
const KNOWLEDGE_BASE = {
  summary: 'Senior Quality Assurance & Test Engineering Professional with over 20 years of experience in software testing, quality strategy, and systems validation across diverse industries',
  location: 'Gig Harbor, WA',
  contact: {
    phone: '253-202-6719',
    email: 'fbonds@gmail.com'
  },
  skills: {
    testing: ['Selenium', 'Playwright', 'Cypress', 'Appium', 'K6.io', 'TestComplete', 'JMeter'],
    languages: ['Python (Pytest)', 'JavaScript', 'Ruby', 'SQL', 'Shell Scripting (Bash)'],
    automation: ['Test Automation', 'API Testing', 'Performance Testing', 'Load Testing', 'Vulnerability Testing'],
    methodologies: ['Manual & Exploratory Testing', 'BDD/TDD', 'Agile/Scrum', 'Kanban'],
    cicd: ['Jenkins', 'GitLab CI', 'Git', 'GitHub', 'Docker', 'Kubernetes', 'Terraform'],
    tools: ['Jira', 'Confluence', 'TestRail', 'Xray', 'Zephyr', 'Testlink', 'Postman', 'REST-Assured'],
    cloud: ['AWS', 'Microsoft Azure', 'VMware vSphere'],
    systems: ['Linux (Red Hat, Debian, Ubuntu)', 'Windows', 'macOS', 'Android', 'iOS']
  },
  experience: [
    {
      role: 'Senior QA Engineer',
      company: 'Ad Hoc LLC',
      period: 'June 2023 - Present',
      highlights: [
        'Drives quality assurance strategy for Office of Head Start TTA Hub',
        'Develops test automation with JavaScript and Playwright',
        'Leads QA process improvements and efficiency initiatives',
        'Enhanced testing frameworks for VA Health Enrollment project'
      ]
    },
    {
      role: 'Application Analyst',
      company: 'RedLine Performance Solutions',
      period: 'February 2023 - June 2023',
      highlights: [
        'Validated NOAA Weather Service Alerts system',
        'Performance and vulnerability testing with JavaScript and K6.io',
        'Designed test plans and collaborated in Jira'
      ]
    },
    {
      role: 'QA Engineer III / Site Reliability Engineer',
      company: 'F5 Networks',
      period: 'July 2014 - October 2022',
      highlights: [
        'Led manual and exploratory testing for iHealth product',
        'Automated UI tests using Python and Selenium',
        'Managed system monitoring ensuring 99.9% uptime',
        'Recruited and mentored offshore QA personnel',
        'Node.js automation with Cypress and Mocha'
      ]
    },
    {
      role: 'QA Lead',
      company: 'Topia Technology',
      period: 'July 2013 - June 2014',
      highlights: [
        'Owned end-to-end testing for desktop and mobile (iOS)',
        'Developed automation framework with Python and Selenium',
        'REST API testing and iOS testing with Xcode'
      ]
    },
    {
      role: 'QA Lead',
      company: 'CHI-LLC',
      period: 'August 2012 - July 2013',
      highlights: [
        'Led team of four QA engineers',
        'Implemented TestComplete automation framework',
        'Integrated QA metrics into project management'
      ]
    },
    {
      role: 'Software Test Engineer',
      company: 'Microsoft (via contractors)',
      period: 'Multiple periods 1997-2004',
      highlights: [
        'Windows 98 host connectivity testing',
        'ZAW/TCO initiatives for Internet Explorer',
        'Third-party network testing',
        'Credited contributor to Windows 98 Resource Kit'
      ]
    }
  ],
  certifications: [
    'Certified Associate in Project Management (CAPM)',
    'Certified ScrumMaster (CSM)',
    'Microsoft Certified: Azure Fundamentals',
    'AZ-104 Microsoft Azure Administrator',
    'Terraform Fundamentals'
  ],
  education: 'University of Washington - Multiple certificate programs including UNIX/Linux Systems Administration, Project Management, JavaScript, Ruby, Cybersecurity (2000-2023)',
  strengths: [
    'Detail-Oriented',
    'Team Player', 
    'Quick Learner',
    'Versatile',
    'Customer-Focused',
    'Proactive',
    'Reliable',
    'Methodical'
  ],
  totalRecommendations: 42,
  topQuotes: [
    '"Best Tester I know" - James Fecteau',
    '"Five Star service. Best all around systems guy we\'ve ever had" - Jorge Reingold',
    '"Instant impact on high visibility deliverable" - Adam Handford',
    '"Technical wiz" - Todd Sweetser',
    '"True utility player" - Scott Jones',
    '"Obsession with customer experience" - Jon Gross',
    '"Subject matter expert in multiple areas" - Scott Clark'
  ],
  companies: [
    'Ad Hoc LLC', 'RedLine Performance Solutions', 'F5 Networks', 'Topia Technology',
    'CHI-LLC', 'Hewlett Packard Enterprise', 'Microsoft', 'Cisco', 'Marchex',
    'Netpulse', 'Wall Data', 'Attachmate', 'NOAA', 'VA.gov', 'FBI NGI Project'
  ]
}

const COMMON_QUESTIONS = [
  "What are your key skills?",
  "Tell me about your experience",
  "What do people say about you?",
  "Where are you located?",
  "What testing tools do you use?",
  "What companies have you worked for?",
  "What certifications do you have?",
  "Tell me about your education"
]

function generateResponse(question) {
  const q = question.toLowerCase()
  
  // AI/ML Tools
  if (q.includes('ai') || q.includes('artificial intelligence') || q.includes('machine learning') || q.includes('ml')) {
    return `While Fletcher's documented experience doesn't specifically focus on AI/ML development, he has relevant capabilities:

• Strong automation and scripting background that translates well to ML workflows
• Experience with Python - the primary language for AI/ML tools
• Test automation expertise applicable to ML model validation
• Quick learner with 42 recommendations emphasizing adaptability

As AI becomes more integrated into QA and testing (AI-assisted test generation, intelligent test selection, automated defect prediction), his combination of testing expertise and technical depth positions him well to leverage AI tools in QA contexts.

Given his track record of mastering new technologies "outside his comfort zone," he would quickly become proficient with AI-powered testing tools and platforms.`
  }
  
  // About/Summary
  if (q.includes('about') || q.includes('summary') || q.includes('who are you') || q.includes('tell me about yourself')) {
    return `${KNOWLEDGE_BASE.summary}

Based in ${KNOWLEDGE_BASE.location}

${KNOWLEDGE_BASE.totalRecommendations} professional recommendations from colleagues and managers highlight his expertise, reliability, and collaborative approach.`
  }
  
  // Skills
  if (q.includes('skill') || q.includes('technology') || q.includes('tech stack') || 
      (q.includes('what') && (q.includes('know') || q.includes('tools') || q.includes('use'))) ||
      q.includes('capabilities') || q.includes('expertise')) {
    return `Fletcher has deep expertise across multiple technical areas:

Testing Tools: ${KNOWLEDGE_BASE.skills.testing.join(', ')}

Languages: ${KNOWLEDGE_BASE.skills.languages.join(', ')}

CI/CD & DevOps: ${KNOWLEDGE_BASE.skills.cicd.join(', ')}

Cloud Platforms: ${KNOWLEDGE_BASE.skills.cloud.join(', ')}

He's known for being versatile and quick to adapt to new technologies.`
  }
  
  // Experience
  if (q.includes('experience') || q.includes('work history') || q.includes('job') || q.includes('career') ||
      q.includes('background') || (q.includes('where') && q.includes('work')) ||
      (q.includes('what') && q.includes('do'))) {
    const recent = KNOWLEDGE_BASE.experience.slice(0, 3)
    return `Fletcher has 20+ years of experience in QA and testing:

${recent.map(exp => `• ${exp.company} (${exp.period}): ${exp.role}
  ${exp.highlights[0]}`).join('\n\n')}

He has worked across government, enterprise, and startup environments with proven leadership in QA process improvement.`
  }
  
  // Testimonials
  if (q.includes('testimonial') || q.includes('recommend') || q.includes('say about') || q.includes('people say')) {
    return `Fletcher has ${KNOWLEDGE_BASE.totalRecommendations} professional recommendations highlighting:

${KNOWLEDGE_BASE.strengths.slice(0, 5).map(s => `• ${s}`).join('\n')}

Top quotes:
${KNOWLEDGE_BASE.topQuotes.slice(0, 4).map(q => `• ${q}`).join('\n')}`
  }
  
  // Testing specific
  if ((q.includes('test') || q.includes('qa') || q.includes('quality')) && 
      (q.includes('tool') || q.includes('framework') || q.includes('automation') || 
       q.includes('experience') || q.includes('approach') || q.includes('method'))) {
    return `Fletcher is expert with modern testing tools and frameworks:

Test Automation: ${KNOWLEDGE_BASE.skills.testing.join(', ')}

Testing Types: ${KNOWLEDGE_BASE.skills.automation.join(', ')}

Methodologies: ${KNOWLEDGE_BASE.skills.methodologies.join(', ')}

Project Management: ${KNOWLEDGE_BASE.skills.tools.join(', ')}

Known as "the best tester I know" by colleagues.`
  }
  
  // Location
  if (q.includes('location') || q.includes('where') || q.includes('based') || q.includes('live')) {
    return `Fletcher is based in ${KNOWLEDGE_BASE.location}.`
  }
  
  // Contact
  if (q.includes('contact') || q.includes('reach') || q.includes('email') || q.includes('hire')) {
    return `You can reach Fletcher at:

Email: ${KNOWLEDGE_BASE.contact.email}
Phone: ${KNOWLEDGE_BASE.contact.phone}

Or use the contact form and social links in the Contact section below.`
  }
  
  // Companies
  if (q.includes('company') || q.includes('companies') || q.includes('organization') ||
      (q.includes('where') && (q.includes('work') || q.includes('employed'))) ||
      q.includes('employers') || q.includes('clients')) {
    return `Fletcher has worked with notable organizations including:

Recent: ${KNOWLEDGE_BASE.companies.slice(0, 6).join(', ')}

Also: ${KNOWLEDGE_BASE.companies.slice(6, 12).join(', ')}

Experience spans government (VA, NOAA, FBI), enterprise (F5, Microsoft, HP), and startups.`
  }
  
  // Certifications
  if (q.includes('certif') || q.includes('credential') || q.includes('licensed')) {
    return `Fletcher holds several professional certifications:

${KNOWLEDGE_BASE.certifications.map(c => `• ${c}`).join('\n')}

Plus ongoing professional development through University of Washington certificate programs.`
  }
  
  // Education
  if (q.includes('educat') || q.includes('degree') || q.includes('university') || q.includes('school')) {
    return `${KNOWLEDGE_BASE.education}

Certificate programs completed include:
• UNIX/Linux Systems Administration
• Project Management
• JavaScript & Ruby Programming
• Cybersecurity
• Writing (Fiction & Professional)

Continuous learner with 20+ years of hands-on technical experience.`
  }
  
  // Strengths
  if (q.includes('strength') || q.includes('good at') || q.includes('best at')) {
    return `According to ${KNOWLEDGE_BASE.totalRecommendations} professional recommendations, Fletcher's key strengths are:

${KNOWLEDGE_BASE.strengths.map(s => `• ${s}`).join('\n')}

Particularly noted for attention to detail, reliability, and being a collaborative team player.`
  }
  
  // Languages/Programming
  if (q.includes('language') || q.includes('programming') || q.includes('code')) {
    return `Fletcher is proficient in:

${KNOWLEDGE_BASE.skills.languages.join(', ')}

Also experienced with scripting, automation, and test framework development across multiple languages and platforms.`
  }
  
  // Cloud
  if (q.includes('cloud') || q.includes('aws') || q.includes('azure')) {
    return `Fletcher has cloud platform expertise:

${KNOWLEDGE_BASE.skills.cloud.join(', ')}

Experience includes cloud migration, testing cloud-based applications, and ensuring 99.9% uptime for critical services.`
  }
  
  // Unknown technology - check if asking about specific tech not in resume
  const techKeywords = [
    'react', 'vue', 'angular', 'svelte', 'next.js', 'nuxt', 'django', 'flask', 'spring',
    'kotlin', 'swift', 'rust', 'go', 'golang', 'typescript', 'c++', 'c#', 'java',
    'postgresql', 'mongodb', 'redis', 'cassandra', 'graphql', 'rest api',
    'microservices', 'serverless', 'lambda', 'firebase', 'supabase',
    'ansible', 'puppet', 'chef', 'prometheus', 'grafana', 'elk', 'splunk',
    'react native', 'flutter', 'xamarin', 'unity', 'unreal',
    'sass', 'less', 'webpack', 'vite', 'rollup', 'parcel',
    'chatgpt', 'copilot', 'claude', 'gemini', 'llm', 'gpt', 'openai'
  ]
  
  const mentionedTech = techKeywords.find(tech => q.includes(tech))
  
  if (mentionedTech && (q.includes('know') || q.includes('experience') || q.includes('familiar') || 
      q.includes('work with') || q.includes('use') || q.includes('used') || q.includes('skill') ||
      q.includes('what') || q.includes('have you'))) {
    // Check if it's actually in our knowledge base
    const allSkills = [
      ...KNOWLEDGE_BASE.skills.testing,
      ...KNOWLEDGE_BASE.skills.languages,
      ...KNOWLEDGE_BASE.skills.automation,
      ...KNOWLEDGE_BASE.skills.cicd,
      ...KNOWLEDGE_BASE.skills.tools,
      ...KNOWLEDGE_BASE.skills.cloud,
      ...KNOWLEDGE_BASE.skills.systems
    ].map(s => s.toLowerCase())
    
    if (!allSkills.some(skill => skill.includes(mentionedTech.toLowerCase()))) {
      // Check if it's a complex/difficult technology that requires longer learning
      const complexTech = ['c++', 'rust', 'kernel', 'assembly', 'cuda', 'webassembly']
      const isComplex = complexTech.some(tech => mentionedTech.includes(tech))
      
      // Technology not in resume - provide learning-focused response
      const learningPhrase = isComplex 
        ? 'his track record suggests he has the aptitude and dedication to build proficiency over time'
        : 'his track record strongly suggests he could master it quickly'
      
      // Build relevant experience section
      let relevantExp = ''
      if (mentionedTech.match(/react|vue|angular|svelte|next/)) {
        relevantExp = '\n\nRelevant transferable skills:\n• JavaScript frameworks and libraries\n• Frontend development and testing'
      } else if (mentionedTech.match(/python|ruby|javascript|typescript/)) {
        relevantExp = '\n\nRelevant transferable skills:\n• Multiple programming languages including Python, JavaScript, Ruby\n• Quick adaptation to project requirements'
      } else if (mentionedTech.match(/c\+\+|c#|rust|go|golang|java|kotlin|swift/)) {
        relevantExp = '\n\nRelevant transferable skills:\n• Experience with multiple programming paradigms\n• Systems-level understanding from Linux/Unix administration\n• Testing compiled applications and understanding their behavior'
      } else if (mentionedTech.match(/docker|kubernetes|terraform|ansible/)) {
        relevantExp = '\n\nRelevant transferable skills:\n• DevOps tools: Docker, Kubernetes, Terraform\n• Infrastructure and deployment automation'
      } else if (mentionedTech.match(/aws|azure|cloud|serverless|lambda/)) {
        relevantExp = '\n\nRelevant transferable skills:\n• Cloud platforms: AWS, Azure\n• Cloud-based application testing'
      } else if (mentionedTech.match(/api|graphql|rest/)) {
        relevantExp = '\n\nRelevant transferable skills:\n• API testing with Postman, REST-Assured\n• Backend systems testing'
      }
      
      const closingStatement = isComplex
        ? `While this doesn't substitute for hands-on ${mentionedTech} experience, his learning aptitude and technical foundation would allow him to become productive with appropriate onboarding time.`
        : `His proven track record of quickly mastering new tools suggests he could become productive with ${mentionedTech} relatively quickly, though direct experience would still be valuable.`
      
      return `While ${mentionedTech} isn't specifically listed in Fletcher's documented experience, ${learningPhrase}:

• ${KNOWLEDGE_BASE.totalRecommendations} recommendations emphasize his ability to rapidly learn new technologies
• Known as "Quick Learner" across multiple recommendations
• Colleagues note: "willing and able to pick up new skills and techniques as the work demands"
• "Rose to the challenge" when working with tools "outside his comfort zone" at NOAA
• Auto-didactic by nature - continuously self-teaches through UW certificate programs (2000-2023)${relevantExp}

${closingStatement}`
    }
  }
  
  // Default
  return `I can help answer questions about Fletcher's:

• Professional background and summary
• Technical skills and expertise
• Work experience (20+ years)
• ${KNOWLEDGE_BASE.totalRecommendations} professional recommendations
• Certifications and education
• Companies and projects
• Contact information

Try asking: "${COMMON_QUESTIONS[Math.floor(Math.random() * COMMON_QUESTIONS.length)]}"`
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "Hi! I'm Fletcher's AI assistant. Ask me anything about his skills, experience, or background!\n\nPlease use 👍/👎 to rate my responses - thumbs down helps me improve by sending feedback to Fletcher.",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [feedbackStatus, setFeedbackStatus] = useState({})
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const isMobile = useIsMobile()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = {
      type: 'user',
      text: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate thinking delay
    setTimeout(() => {
      const botResponse = {
        type: 'bot',
        text: generateResponse(input),
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 800)
  }

  const handleQuickQuestion = (question) => {
    setInput(question)
    setTimeout(() => handleSend(), 100)
  }

  const handleFeedback = async (messageIndex, isPositive) => {
    const message = messages[messageIndex]
    const previousMessage = messages[messageIndex - 1]
    
    // Update feedback status
    setFeedbackStatus(prev => ({
      ...prev,
      [messageIndex]: isPositive ? 'positive' : 'negative'
    }))

    // If negative feedback, send email
    if (!isPositive && previousMessage) {
      try {
        // Using a simple mailto approach - in production, you'd want a backend API
        const _subject = encodeURIComponent('FLETCHERBONDS.COM - Chat Box Issue')
        const _body = encodeURIComponent(
          `User Feedback: Thumbs Down\n\n` +
          `Question: ${previousMessage.text}\n\n` +
          `Response: ${message.text}\n\n` +
          `Timestamp: ${new Date().toISOString()}\n\n` +
          `Note: User indicated this response missed the mark or was too generalized.`
        )
        
        // For production, you'd use a service like EmailJS, SendGrid, or your own backend
        // For now, we'll use Web3Forms (free service that doesn't require backend)
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '',
            subject: 'FLETCHERBONDS.COM - Chat Box Issue',
            from_name: 'Chatbot Feedback System',
            message: `User Feedback: Thumbs Down\n\nQuestion: ${previousMessage.text}\n\nResponse: ${message.text}\n\nTimestamp: ${new Date().toISOString()}\n\nNote: User indicated this response missed the mark or was too generalized.`,
            email: 'fbonds@gmail.com'
          })
        })

        if (response.ok) {
          console.log('Feedback sent successfully')
        }
      } catch (error) {
        console.error('Error sending feedback:', error)
      }
    }
  }

  return (
    <>
      {/* Floating Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 glass-panel p-4 rounded-full neon-border hover:scale-110 transition-all duration-300"
        style={{ '--glow-color': '#a855f7' }}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle chatbot"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="close"
              className="w-6 h-6 text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              className="w-6 h-6 text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`fixed ${isMobile ? 'inset-4' : 'bottom-24 right-6 w-96 h-[600px]'} z-40 glass-panel flex flex-col`}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <div>
                  <h3 className="font-bold text-purple-400">Ask About Fletcher</h3>
                  <p className="text-xs text-gray-400">AI Assistant</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.type === 'user'
                        ? 'bg-purple-500/20 text-purple-100'
                        : 'bg-cyan-500/10 text-gray-200'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{msg.text}</p>
                  </div>
                  
                  {/* Feedback buttons for bot messages (skip first welcome message) */}
                  {msg.type === 'bot' && idx > 0 && (
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleFeedback(idx, true)}
                        className={`text-xs px-2 py-1 rounded transition-all ${
                          feedbackStatus[idx] === 'positive'
                            ? 'bg-green-500/30 text-green-300'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                        }`}
                        disabled={feedbackStatus[idx]}
                        aria-label="Thumbs up"
                      >
                        👍 {feedbackStatus[idx] === 'positive' ? 'Helpful' : ''}
                      </button>
                      <button
                        onClick={() => handleFeedback(idx, false)}
                        className={`text-xs px-2 py-1 rounded transition-all ${
                          feedbackStatus[idx] === 'negative'
                            ? 'bg-red-500/30 text-red-300'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                        }`}
                        disabled={feedbackStatus[idx]}
                        aria-label="Thumbs down"
                      >
                        👎 {feedbackStatus[idx] === 'negative' ? 'Feedback sent' : ''}
                      </button>
                    </div>
                  )}
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="bg-cyan-500/10 p-3 rounded-lg">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="p-4 border-t border-white/10">
                <p className="text-xs text-gray-400 mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {COMMON_QUESTIONS.slice(0, 3).map((q, idx) => (
                    <button
                      key={idx}
                      className="text-xs px-3 py-1 glass-panel hover:bg-white/10 transition-colors duration-200 text-cyan-400"
                      onClick={() => handleQuickQuestion(q)}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="glass-panel p-2 rounded-lg neon-border hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  style={{ '--glow-color': '#a855f7' }}
                >
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
