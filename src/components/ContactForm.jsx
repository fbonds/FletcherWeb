import { motion } from 'framer-motion'
import { useState } from 'react'

export default function ContactForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('Sending...')
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '',
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          from_name: formData.name,
          to_email: 'fbonds@gmail.com'
        }),
      })

      const result = await response.json()

      if (result.success) {
        setStatus('Message sent successfully! 🎉')
        setTimeout(() => {
          setFormData({ name: '', email: '', subject: '', message: '' })
          setStatus('')
          onClose()
        }, 2000)
      } else {
        setStatus('Failed to send message. Please try again.')
      }
    } catch (error) {
      setStatus('Error sending message. Please try again.')
      console.error('Form submission error:', error)
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="glass-panel p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold glow-text">
            <span className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
              Contact Me
            </span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-3xl leading-none transition-colors"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 text-white placeholder-gray-500 transition-colors"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 text-white placeholder-gray-500 transition-colors"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 text-white placeholder-gray-500 transition-colors"
              placeholder="Project Inquiry"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="6"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 text-white placeholder-gray-500 transition-colors resize-none"
              placeholder="Tell me about your project or inquiry..."
            />
          </div>

          {status && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-cyan-400 text-center"
            >
              {status}
            </motion.p>
          )}

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg font-semibold hover:from-purple-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105"
            >
              Send Message
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 glass-panel hover:bg-white/10 rounded-lg font-semibold transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
