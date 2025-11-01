import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import HolographicGif from './HolographicGif'
import { useIsMobile } from '../hooks/useMediaQuery'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const isMobile = useIsMobile()
  
  useEffect(() => {
    if (hoveredSkill && isMobile) {
      const timer = setTimeout(() => {
        setHoveredSkill(null)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [hoveredSkill, isMobile])

  const skills = [
    { 
      name: 'IBM Mainframe', 
      color: '#0530AD',
      gifUrl: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExejgxMHFwZGFiZDZtd25lcnpuemw2NzAxMGdobnllOXFtdTJnNTdyeSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3oz8y0fIoBvzUEv88E/giphy.gif'
    },
    { 
      name: 'Linux/Unix', 
      color: '#FCC624',
      gifUrl: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXowZ2plbWgzbW84NGVhb2NueWoxdGV4NHRsNDB1cGVqbHBjMmd3cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/P8ef3Dkynk0xLx1h1T/giphy.gif'
    },
    { 
      name: 'Windows Server', 
      color: '#00A4EF',
      gifUrl: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGhiZ3g2eThuMWhueGVtazg1OHMyMXpjM2N4YXpjZHRjdXIweGxhOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/J08r3aXHt0BDATrfyT/giphy.gif'
    },
    { 
      name: 'macOS/iOS', 
      color: '#A3AAAE',
      gifUrl: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDJwaWJ6MXNnNnY3MjAybTR6MW05eGp4dWFhZ2JtOGp5azZkZ3ZhcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l4pThMAKS4BOtz8d2/giphy.gif'
    },
    { 
      name: 'Android', 
      color: '#3DDC84',
      gifUrl: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzFjeXM4OHpsenVtbXpzZXR5Z2NzMXViMGRlbDNhYjJ5ank2ZHZ3NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/10mzF0YmVmZNuw/giphy.gif'
    },
    { 
      name: 'Cloud Tech', 
      color: '#4285F4',
      gifUrl: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdTB2MGxoeXNjN3RsbWt3bng3N2V4Y2JoNThnaWI0a295ZjBuMHdtMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ohhwucrl3sH0GjGzm/giphy.gif'
    },
    { 
      name: 'VS Code', 
      color: '#22d3ee',
      gifUrl: 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGx6d24xa292empmdm84OXA0NWxvd2RsYmd5aDdnZjM1Y3oyZWJkMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26tn33aiTi1jkl6H6/giphy.gif'
    },
    { 
      name: 'Factory.AI', 
      color: '#a855f7',
      gifUrl: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXl4NDR3eDY5cG9oM213bzhkOHg5enR5bWNpcWp0MDZvbjQ5NWd4ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/THf4SfOn2szSrNl8r1/giphy.gif'
    },
    { 
      name: 'Software Testing', 
      color: '#10b981',
      gifUrl: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmR4bTk2dzIwZ2dzaXZsbDEzaHYwc3VlNXA5a3BhMHEzamg5eDcybCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7692c5v3NGGBWSKm3s/giphy.gif'
    },
  ]

  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center px-4 py-20" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 md:mb-12 text-center glow-text">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>

          <div className="glass-panel p-4 sm:p-6 md:p-8 lg:p-12 mb-8 md:mb-12">
            <motion.p 
              className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed mb-4 md:mb-6"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Welcome to my digital realm. Over my long career, I&apos;ve worked with IBM mainframes, 
              AS/400s, Sun Solaris systems, every major Linux distribution, all versions of Windows and 
              Microsoft Server products, macOS, iOS, Android, and cloud technologies.
            </motion.p>
            <motion.p 
              className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed mb-4 md:mb-6"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              As a software tester and IT systems support professional, I&apos;m now exploring the incredible 
              world of AI-assisted development. This website is proof that you don&apos;t need to be a 
              developer to create amazing things.
            </motion.p>
            <motion.p 
              className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed"
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
            <h3 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 text-center text-purple-400 glow-text-blue">
              Technology Experience
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="glass-panel overflow-hidden text-center hover:bg-white/10 transition-all duration-300 cursor-pointer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: isMobile ? 1 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => !isMobile && setHoveredSkill(skill)}
                  onMouseLeave={() => !isMobile && setHoveredSkill(null)}
                  onClick={() => isMobile && setHoveredSkill(hoveredSkill?.name === skill.name ? null : skill)}
                >
                  {hoveredSkill?.name === skill.name && isMobile ? (
                    <div className="relative w-full" style={{ paddingBottom: '75%' }}>
                      <img 
                        src={skill.gifUrl} 
                        alt={skill.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="p-3 sm:p-4 md:p-6">
                      <span className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold" style={{ color: skill.color }}>
                        {skill.name}
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Holographic GIF Display */}
      {hoveredSkill && (
        <HolographicGif
          isVisible={!!hoveredSkill}
          gifUrl={hoveredSkill.gifUrl}
          color={hoveredSkill.color}
          title={hoveredSkill.name}
        />
      )}
    </section>
  )
}
