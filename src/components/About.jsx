import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const skills = [
    { name: 'IBM Mainframe', color: '#0530AD' },
    { name: 'Linux/Unix', color: '#FCC624' },
    { name: 'Windows Server', color: '#00A4EF' },
    { name: 'macOS/iOS', color: '#A3AAAE' },
    { name: 'Android', color: '#3DDC84' },
    { name: 'Cloud Tech', color: '#4285F4' },
    { name: 'VS Code', color: '#22d3ee' },
    { name: 'Factory.AI', color: '#a855f7' },
    { name: 'Software Testing', color: '#10b981' },
  ]

  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center px-4 py-20" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-12 text-center glow-text">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>

          <div className="glass-panel p-8 md:p-12 mb-12">
            <motion.p 
              className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Welcome to my digital realm. Over my long career, I&apos;ve worked with IBM mainframes, 
              AS/400s, Sun Solaris systems, every major Linux distribution, all versions of Windows and 
              Microsoft Server products, macOS, iOS, Android, and cloud technologies.
            </motion.p>
            <motion.p 
              className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              As a software tester and desktop support professional, I&apos;m now exploring the incredible 
              world of AI-assisted development. This website is proof that you don&apos;t need to be a 
              developer to create amazing things.
            </motion.p>
            <motion.p 
              className="text-lg md:text-xl text-gray-300 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              Built entirely using VS Code and Droid from Factory.AI, this site showcases what&apos;s possible 
              when human creativity meets AI capabilities. The floating tech logos in the background represent 
              my journey through decades of technology evolution.
            </motion.p>
          </div>

          <div>
            <h3 className="text-3xl font-bold mb-8 text-center text-purple-400 glow-text-blue">
              Technology Experience
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="glass-panel p-6 text-center hover:bg-white/10 transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-xl font-semibold" style={{ color: skill.color }}>
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
