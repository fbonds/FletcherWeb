import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4">
      <div className="max-w-6xl mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-6"
            animate={{ 
              textShadow: [
                '0 0 20px #8b5cf6, 0 0 40px #8b5cf6',
                '0 0 30px #ec4899, 0 0 60px #ec4899',
                '0 0 20px #06b6d4, 0 0 40px #06b6d4',
                '0 0 20px #8b5cf6, 0 0 40px #8b5cf6',
              ]
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
              Fletcher Bonds
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-400 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <span className="glow-text-cyan">Software Tester</span> · <span className="glow-text-pink">Desktop Support</span> · <span className="glow-text-blue">AI Explorer</span>
          </motion.p>

          <motion.div
            className="flex gap-4 justify-center flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <a 
              href="#about" 
              className="glass-panel px-8 py-3 hover:bg-white/10 transition-all duration-300 neon-border hover:scale-105"
              style={{ '--glow-color': '#8b5cf6' }}
            >
              <span className="text-purple-400 font-semibold">Explore</span>
            </a>
            <a 
              href="#contact" 
              className="glass-panel px-8 py-3 hover:bg-white/10 transition-all duration-300 neon-border hover:scale-105"
              style={{ '--glow-color': '#ec4899' }}
            >
              <span className="text-pink-400 font-semibold">Connect</span>
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
    </section>
  )
}
