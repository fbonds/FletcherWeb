import { motion, AnimatePresence, useMotionValue } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect, useCallback } from 'react'
import { useIsMobile } from '../hooks/useMediaQuery'

const TESTIMONIALS = [
  {
    name: 'Dan Munz',
    title: 'Public service-oriented digital leader',
    relationship: 'Senior colleague',
    date: 'May 31, 2024',
    quote: "Fletcher's a talented, experienced engineer and technologist, willing and able to apply his varied skillset to a diverse set of challenges, and pick up new skills and techniques as the work demands. His combination of expertise and curiosity is an asset to any team!",
    tags: ['Versatile', 'Quick Learner', 'Team Player']
  },
  {
    name: 'Heather Justice',
    title: 'Sr Product Manager',
    relationship: 'Teammate',
    date: 'May 30, 2024',
    quote: "Fletcher was a great partner and easy to work with. Fletcher's experience was evident in his approach to ensuring high quality and integrity in our products. Fletcher demonstrated a deep understanding of the complexities of our forms and the Veteran audience they serve, ensuring that all functionalities were rigorously tested and compliant with VA.gov standards. Fletcher proactively identified potential issues and suggested improvements where possible, which contributed to the success of the team.",
    tags: ['Detail-Oriented', 'Team Player', 'Proactive']
  },
  {
    name: 'Josh Carroll',
    title: 'Systems Engineer',
    relationship: 'Teammate',
    date: 'June 17, 2023',
    quote: "Fletcher and I worked together for a few months on a project for a federal contract with NOAA. Aspects of the work were outside of Fletcher's comfort zone, but he rose to the challenge and coded some comprehensive tests with Grafana's K6 Cloud. His analytical approach and thorough QA expertise would make him a valuable addition to any organization.",
    tags: ['Quick Learner', 'Detail-Oriented', 'Analytical']
  },
  {
    name: 'Jon Gross',
    title: 'Engineering Director',
    relationship: 'Manager',
    date: 'October 19, 2022',
    quote: "Fletcher combines a number of essential qualities as a test engineer, among them: an obsession with the customer experience, a deep investment in doing extremely high quality work, an attention to detail, and a willingness to question everything. In addition to this, Fletcher delivers all these qualities in an easy-going, friendly, supportive approach to his work and his team mates.",
    tags: ['Detail-Oriented', 'Customer-Focused', 'Team Player']
  },
  {
    name: 'Scott Clark',
    title: 'Swiss Army Knife',
    relationship: 'Colleague',
    date: 'November 11, 2022',
    quote: "Had the pleasure of working alongside Fletcher throughout his tenure at F5. His ability to innovate through adversity is always present. Through our co-worker journey Fletcher has established himself as a SME in multiple areas and a valued resource for others across the enterprise in CI/CD capabilities, testing frameworks, and team development.",
    tags: ['Innovative', 'Versatile', 'Team Player']
  },
  {
    name: 'Melissa Bohnenkamp',
    title: 'Principal Software Engineer at F5',
    relationship: 'Teammate',
    date: 'October 24, 2022',
    quote: "Fletcher and I worked together for a couple years while I was a developer on the iHealth team and he's very personable and a team player. As a test engineer, he has a tremendous amount of domain knowledge which he brings to the projects he contributes to. He's diligent in his testing and finds subtle bugs. Fletcher has also showed a great aptitude to learn.",
    tags: ['Detail-Oriented', 'Quick Learner', 'Team Player']
  },
  {
    name: 'Olga Mill',
    title: 'Linux Application Admin at VUMC',
    relationship: 'Teammate',
    date: 'November 21, 2022',
    quote: "I had a pleasure to work with Fletcher at F5; I must say he is a very detail oriented and very thorough and knowledgeable tester. He is also a great team player and does well under stress. He is also a skilled communicator and does very good while performing complex test procedures.",
    tags: ['Detail-Oriented', 'Team Player', 'Communicator']
  },
  {
    name: 'James Fecteau',
    title: 'Systems Engineer',
    relationship: 'Teammate',
    date: 'June 20, 2008',
    quote: "Fletcher is the best Tester I know. He has great understanding and mastery of multiple platforms. He has a way of challenging me that allows me to explore my personal understanding and perspective. Also constantly raises the bar in performance at work. I learned and continue to learn a great deal from him.",
    tags: ['Expert', 'Versatile', 'Mentor']
  },
  {
    name: 'Scott Jones',
    title: 'Principal Software Engineer at Microsoft',
    relationship: 'Senior colleague',
    date: 'June 3, 2013',
    quote: "Fletcher was an outstanding hire at CHI-LLC. He made a unanimously good impression during interviews, combining a seasoned skillset with a realistic enthusiasm for the work. Fletcher's experience is deep and wide, and very appealing for a small company looking for those who can wear many hats. He has a knack for digging deep into technology to seek bedrock understanding. Fletcher is a true utility player and would be an asset to any organization needing one.",
    tags: ['Versatile', 'Expert', 'Quick Learner']
  },
  {
    name: 'Jorge Reingold',
    title: 'Accountant and Business Owner',
    relationship: 'Client',
    date: 'August 15, 2010',
    quote: "Fletcher delivers high value for your IT dollar; Five Star service. Best all around systems guy we've ever had...",
    tags: ['Expert', 'Customer-Focused', 'Versatile']
  },
  {
    name: 'Adam Handford',
    title: 'Software Engineer',
    relationship: 'Teammate',
    date: 'July 20, 2012',
    quote: "Fletcher was able make an instant impact on a high visibility deliverable on a project with a very aggressive schedule and extremely steep ramp. His ability to quickly establish a strong product knowledge and maintain composure under intense customer scrutiny was exemplary.",
    tags: ['Quick Learner', 'Proactive', 'Customer-Focused']
  },
  {
    name: 'Matt Teemer',
    title: 'Chief Information Officer',
    relationship: 'Manager',
    date: 'March 16, 2011',
    quote: "I knew Fletcher for several years at Microsoft prior to us working together on this team. During our time on the same project Fletcher proved what I already knew about him: he is an excellent test engineer. Fletcher is extremely detail oriented and thorough, key traits in a test environment.",
    tags: ['Detail-Oriented', 'Expert', 'Thorough']
  },
  {
    name: 'Tom Wasner',
    title: 'Working on personal projects',
    relationship: 'Senior colleague',
    date: 'January 15, 2011',
    quote: "He is one of the few people that I know who can move from Windows, to UNIX/LINUX, to Apple products with ease. Fletch is also great at building internal networks with other functional areas in a company. This collaboration competency often makes him a key player to resolving issues in a cooperative and successful manner.",
    tags: ['Versatile', 'Team Player', 'Expert']
  },
  {
    name: 'Chris Curwood',
    title: 'Sr Solution Architect',
    relationship: 'Teammate',
    date: 'April 28, 2012',
    quote: "It was a great pleasure working with Mr. Bonds. On our team, it was very easy to rely and depend on Fletcher in critical times of need because his work had so much quality and he was extremely reliable. It was easy to notice how intelligent he is and how quickly he would learn new materials. He regularly demonstrated his professionalism and worked extremely well during our acceptance test.",
    tags: ['Reliable', 'Quick Learner', 'Detail-Oriented']
  },
  {
    name: 'Todd Sweetser',
    title: 'Sr Partner Tech Strategist @ Microsoft',
    relationship: 'Teammate',
    date: 'April 4, 2007',
    quote: "Fletcher is a technical wiz, but can comfortably communicate technical issues to non-techies. As a Support Specialist, he was smart, driven, goal-oriented, customer-focused, and successful. He exudes professionalism and integrity.",
    tags: ['Expert', 'Communicator', 'Customer-Focused']
  },
  {
    name: 'Dr Adam Sandford',
    title: 'Doctor',
    relationship: 'Manager',
    date: 'June 20, 2008',
    quote: "Fletcher Bonds worked for me throughout the Windows 98 project. During that time, he was solely responsible for all host connectivity related black box testing for the entire 98 project. He was efficient, focused and effective, as well as thorough in his documentation. His passion (and ability) for driving issues to closure led to numerous team meeting recognitions.",
    tags: ['Detail-Oriented', 'Thorough', 'Proactive']
  },
  {
    name: 'Michael Martin',
    title: 'Senior Software Engineer II at Crystal Dynamics',
    relationship: 'Teammate',
    date: 'June 4, 2013',
    quote: "Fletcher's various past experiences and desire to learn new technologies was instrumental in improving our QA process. Fletcher's attention to detail and desire for quality were unsurpassed. It was a pleasure working with him.",
    tags: ['Detail-Oriented', 'Quick Learner', 'Expert']
  },
  {
    name: 'Ivy Cheung',
    title: 'Technical Program Management',
    relationship: 'Manager',
    date: 'June 7, 2013',
    quote: "Fletcher did an amazing job at CHI. He created a suite of test case automation scripts to speed up our testing process in a very short period of time. He is a quick learner and highly motivated to learn new technologies and all aspects of our software product. Fletcher is customer focused and contribute valuable input to improve user experience.",
    tags: ['Quick Learner', 'Innovative', 'Customer-Focused']
  }
]

const FEATURED_QUOTES = [
  { text: "Best Tester I know", author: "James Fecteau" },
  { text: "Five Star service", author: "Jorge Reingold" },
  { text: "Instant impact", author: "Adam Handford" },
  { text: "Technical wiz", author: "Todd Sweetser" },
  { text: "True utility player", author: "Scott Jones" }
]

const ALL_TAGS = [
  'Detail-Oriented',
  'Team Player',
  'Quick Learner',
  'Versatile',
  'Expert',
  'Customer-Focused',
  'Proactive',
  'Innovative',
  'Analytical',
  'Communicator',
  'Reliable',
  'Thorough',
  'Mentor'
]

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [tagCounts, setTagCounts] = useState({})
  const isMobile = useIsMobile()
  const dragX = useMotionValue(0)

  useEffect(() => {
    const randomStart = Math.floor(Math.random() * TESTIMONIALS.length)
    setCurrentIndex(randomStart)

    const counts = {}
    TESTIMONIALS.forEach(testimonial => {
      testimonial.tags.forEach(tag => {
        counts[tag] = (counts[tag] || 0) + 1
      })
    })
    setTagCounts(counts)
  }, [])

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length)
      }, 9000)
      return () => clearInterval(interval)
    }
  }, [isPaused])

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  }, [])

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length)
  }, [])

  const handleSurpriseMe = useCallback(() => {
    let randomIndex
    do {
      randomIndex = Math.floor(Math.random() * TESTIMONIALS.length)
    } while (randomIndex === currentIndex)
    setCurrentIndex(randomIndex)
  }, [currentIndex])

  const handleDotClick = useCallback((index) => {
    setCurrentIndex(index)
  }, [])
  
  const handleDragEnd = useCallback(() => {
    const x = dragX.get()
    if (x < -50) {
      handleNext()
    } else if (x > 50) {
      handlePrevious()
    }
    dragX.set(0)
  }, [dragX, handleNext, handlePrevious])

  const currentTestimonial = TESTIMONIALS[currentIndex]

  return (
    <section id="testimonials" className="relative min-h-screen flex items-center justify-center px-4 py-20" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 md:mb-12 text-center glow-text">
            <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
              What People Say
            </span>
          </h2>

          {/* Featured Quotes */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12">
            {FEATURED_QUOTES.map((featured, index) => (
              <motion.div
                key={featured.text}
                className="glass-panel px-4 py-2 md:px-6 md:py-3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              >
                <span className="text-cyan-400 font-semibold text-xs md:text-sm">"{featured.text}"</span>
              </motion.div>
            ))}
          </div>

          {/* Key Themes/Tags */}
          <motion.div
            className="mb-8 md:mb-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center text-purple-400">Key Strengths</h3>
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              {ALL_TAGS.map((tag) => {
                const count = tagCounts[tag] || 0
                const isActive = currentTestimonial?.tags.includes(tag)
                return (
                  <motion.div
                    key={tag}
                    className={`glass-panel px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm transition-all duration-300 ${
                      isActive ? 'neon-border' : ''
                    }`}
                    style={{
                      '--glow-color': isActive ? '#a855f7' : '#8b5cf6'
                    }}
                    animate={isActive ? {
                      scale: [1, 1.05, 1],
                      boxShadow: [
                        '0 0 10px #a855f7',
                        '0 0 20px #a855f7',
                        '0 0 10px #a855f7'
                      ]
                    } : {}}
                    transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
                  >
                    <span className={isActive ? 'text-purple-300' : 'text-gray-400'}>
                      {tag} <span className="text-xs">({count})</span>
                    </span>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Main Carousel */}
          <div 
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <motion.div 
              className="glass-panel p-4 sm:p-6 md:p-8 lg:p-12 min-h-[350px] md:min-h-[400px] flex flex-col justify-between"
              drag={isMobile ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              style={{ x: dragX }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="mb-4 md:mb-6">
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed mb-4 md:mb-6 italic">
                      "{currentTestimonial.quote}"
                    </p>
                  </div>
                  
                  <div className="flex items-start justify-between flex-wrap gap-3 md:gap-4">
                    <div>
                      <p className="text-base sm:text-lg md:text-xl font-bold text-purple-400">{currentTestimonial.name}</p>
                      <p className="text-xs sm:text-sm text-gray-400">{currentTestimonial.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{currentTestimonial.relationship} • {currentTestimonial.date}</p>
                    </div>
                    <div className="flex gap-1.5 md:gap-2 flex-wrap">
                      {currentTestimonial.tags.map((tag) => (
                        <span
                          key={tag}
                          className="glass-panel px-2 py-0.5 md:px-3 md:py-1 text-xs text-cyan-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between mt-6 md:mt-8 pt-4 md:pt-6 border-t border-white/10">
                <button
                  onClick={handlePrevious}
                  className="glass-panel p-2 md:p-3 hover:bg-white/10 transition-all duration-300 neon-border"
                  style={{ '--glow-color': '#8b5cf6' }}
                  aria-label="Previous testimonial"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <div className="flex items-center gap-2 md:gap-3 flex-col sm:flex-row">
                  {/* Dots Indicator */}
                  <div className="flex gap-1.5 md:gap-2 overflow-x-auto max-w-[200px] md:max-w-none">
                    {TESTIMONIALS.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handleDotClick(index)}
                        className={`transition-all duration-300 rounded-full flex-shrink-0 ${
                          index === currentIndex 
                            ? 'w-6 md:w-8 h-1.5 md:h-2 bg-purple-500' 
                            : 'w-1.5 md:w-2 h-1.5 md:h-2 bg-gray-600 hover:bg-gray-500'
                        }`}
                        aria-label={`Go to testimonial ${index + 1}`}
                      />
                    ))}
                  </div>

                  {/* Surprise Me Button */}
                  <button
                    onClick={handleSurpriseMe}
                    className="glass-panel px-3 py-1.5 md:px-4 md:py-2 hover:bg-white/10 transition-all duration-300 neon-border sm:ml-4"
                    style={{ '--glow-color': '#ec4899' }}
                  >
                    <span className="text-pink-400 text-xs md:text-sm font-semibold">Surprise Me</span>
                  </button>
                </div>

                <button
                  onClick={handleNext}
                  className="glass-panel p-2 md:p-3 hover:bg-white/10 transition-all duration-300 neon-border"
                  style={{ '--glow-color': '#8b5cf6' }}
                  aria-label="Next testimonial"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Testimonial Counter */}
              <div className="text-center mt-3 md:mt-4">
                <span className="text-xs md:text-sm text-gray-500">
                  {currentIndex + 1} of {TESTIMONIALS.length} recommendations
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
