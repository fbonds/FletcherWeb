import { motion } from 'framer-motion'
import { useState, useCallback, useEffect } from 'react'
import profileImage from '../assets/me-transparent-bkgrnd.png'
import { getPersonalizedGreeting } from '../utils/personalization'
import { useIsMobile } from '../hooks/useMediaQuery'

const TEXT_GLOW_ANIMATION = [
  '0 0 20px #8b5cf6, 0 0 40px #8b5cf6',
  '0 0 30px #ec4899, 0 0 60px #ec4899',
  '0 0 20px #06b6d4, 0 0 40px #06b6d4',
  '0 0 20px #8b5cf6, 0 0 40px #8b5cf6',
]

const ROLES = [
  { text: 'Software Tester', className: 'glow-text-cyan' },
  { text: 'IT Systems Support', className: 'glow-text-pink' },
  { text: 'AI Explorer', className: 'glow-text-blue' }
]

export default function Hero() {
  const [isHovering, setIsHovering] = useState(false)
  const [greeting, setGreeting] = useState(null)
  const isMobile = useIsMobile()
  
  const handleMouseEnter = useCallback(() => setIsHovering(true), [])
  const handleMouseLeave = useCallback(() => setIsHovering(false), [])
  
  useEffect(() => {
    setGreeting(getPersonalizedGreeting())
  }, [])
  
  useEffect(() => {
    if (isMobile) {
      setIsHovering(true)
    }
  }, [isMobile])

  return (
    <section className="relative min-h-screen flex items-center md:justify-center justify-start px-4 pt-24 md:pt-0">
      <div className="max-w-6xl mx-auto text-center z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1 
            className="text-5xl sm:text-6xl md:text-6xl lg:text-8xl font-bold mb-4 md:mb-6"
            animate={{ 
              textShadow: TEXT_GLOW_ANIMATION
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <span 
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent cursor-pointer flex flex-col md:inline"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span className="block md:inline">Fletcher</span>
              <span className="block md:inline md:ml-4">Bonds</span>
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 mb-6 md:mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            {ROLES.map((role, index) => (
              <motion.span
                key={role.text}
                className={role.className}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.2, duration: 0.8 }}
              >
                {role.text}{index < ROLES.length - 1 && ' · '}
              </motion.span>
            ))}
          </motion.p>

          {greeting && (
            <motion.div
              className="mb-6 md:mb-8 flex items-center justify-center gap-2 px-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <span className="text-xl md:text-2xl flex-shrink-0">{greeting.emoji}</span>
              <motion.p
                className="text-sm sm:text-base md:text-lg text-cyan-400 font-mono text-left"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.7, duration: 1 }}
              >
                <span className="text-purple-400">⟩</span> {greeting.text}
              </motion.p>
            </motion.div>
          )}

          <motion.div
            className="flex gap-3 md:gap-4 justify-center flex-wrap px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <a 
              href="#about" 
              className="glass-panel px-6 py-2.5 md:px-8 md:py-3 hover:bg-white/10 transition-all duration-300 neon-border hover:scale-105"
              style={{ '--glow-color': '#8b5cf6' }}
            >
              <span className="text-purple-400 font-semibold text-sm md:text-base">Explore</span>
            </a>
            <a 
              href="#contact" 
              className="glass-panel px-6 py-2.5 md:px-8 md:py-3 hover:bg-white/10 transition-all duration-300 neon-border hover:scale-105"
              style={{ '--glow-color': '#ec4899' }}
            >
              <span className="text-pink-400 font-semibold text-sm md:text-base">Connect</span>
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg className="w-8 h-8 mx-auto text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-950 pointer-events-none" />
      
      <motion.div
        className="fixed left-0 bottom-0 z-20 pointer-events-none"
        initial={{ y: '100%' }}
        animate={{ y: isHovering ? '0%' : '100%' }}
        transition={{ 
          type: 'spring',
          stiffness: 100,
          damping: 20,
          duration: 0.8
        }}
        style={{ 
          height: 'auto',
          maxHeight: isMobile ? '50vh' : '70vh'
        }}
      >
        <img 
          src={profileImage} 
          alt="Fletcher Bonds"
          className="h-full w-auto object-contain object-bottom"
          style={{ maxHeight: isMobile ? '50vh' : '70vh' }}
        />
      </motion.div>
    </section>
  )
}
