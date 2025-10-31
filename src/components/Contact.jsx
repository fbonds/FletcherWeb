import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import ContactForm from './ContactForm'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [showContactForm, setShowContactForm] = useState(false)

  const socials = [
    { name: 'GitHub', icon: '🐙', url: 'https://github.com/fbonds', color: '#a855f7' },
    { name: 'LinkedIn', icon: '💼', url: 'https://www.linkedin.com/in/fletcherbonds/', color: '#3b82f6' },
    { name: 'WhatsApp', icon: '💬', url: 'https://wa.me/12532026719', color: '#25D366' },
    { name: 'Email', icon: '📧', url: null, color: '#ec4899', action: () => setShowContactForm(true) },
  ]

  return (
    <section id="contact" className="relative min-h-screen flex items-center justify-center px-4 py-20" ref={ref}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-8 glow-text">
            <span className="bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent">
              Let&apos;s Connect
            </span>
          </h2>

          <motion.p 
            className="text-xl text-gray-300 mb-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Curious about AI-assisted development? Let&apos;s connect and explore the possibilities.
          </motion.p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {socials.map((social, index) => {
              const Component = social.url ? motion.a : motion.button
              const props = social.url 
                ? { href: social.url, target: '_blank', rel: 'noopener noreferrer' }
                : { onClick: social.action, type: 'button' }
              
              return (
                <Component
                  key={social.name}
                  {...props}
                  className="glass-panel p-6 hover:bg-white/10 transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                    {social.icon}
                  </div>
                  <div className="text-sm font-semibold" style={{ color: social.color }}>
                    {social.name}
                  </div>
                </Component>
              )
            })}
          </div>

          <motion.div
            className="glass-panel p-8 inline-block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <p className="text-gray-400 text-sm">
              © 2025 Fletcher Bonds. All rights reserved.
            </p>
            <p className="text-cyan-400 text-xs mt-2">
              Built with{' '}
              <a 
                href="https://code.visualstudio.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-cyan-300 underline transition-colors"
              >
                VS Code
              </a>
              {' '}+{' '}
              <a 
                href="https://factory.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-purple-400 underline transition-colors"
              >
                Droid from Factory.AI
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>

      {showContactForm && <ContactForm onClose={() => setShowContactForm(false)} />}
    </section>
  )
}
