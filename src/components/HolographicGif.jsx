import { motion, AnimatePresence } from 'framer-motion'

export default function HolographicGif({ isVisible, gifUrl, color, title }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="relative"
            initial={{ scale: 0.5, rotateX: 45, rotateY: -15, opacity: 0 }}
            animate={{ 
              scale: 1, 
              rotateX: 0, 
              rotateY: 0, 
              opacity: 1,
              y: [0, -10, 0],
            }}
            exit={{ 
              scale: 0.5, 
              rotateX: 45, 
              rotateY: 15, 
              opacity: 0,
            }}
            transition={{ 
              duration: 0.6,
              y: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            style={{
              perspective: '1000px',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Holographic container with glowing border */}
            <div 
              className="relative p-1 rounded-lg"
              style={{
                background: `linear-gradient(135deg, ${color}40, ${color}20)`,
                boxShadow: `0 0 30px ${color}, 0 0 60px ${color}80, inset 0 0 30px ${color}40`,
              }}
            >
              {/* Inner frame */}
              <div className="relative bg-black/80 rounded-lg overflow-hidden backdrop-blur-sm">
                {/* Scanlines overlay */}
                <div 
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, transparent 1px, transparent 2px, rgba(255,255,255,0.03) 3px)',
                    animation: 'scanlines 8s linear infinite',
                  }}
                />
                
                {/* Glitch overlay */}
                <motion.div
                  className="absolute inset-0 pointer-events-none z-10"
                  animate={{
                    opacity: [0, 0.1, 0, 0.15, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    times: [0, 0.1, 0.2, 0.5, 1],
                  }}
                  style={{
                    background: `linear-gradient(90deg, transparent, ${color}40, transparent)`,
                  }}
                />

                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 z-20" style={{ borderColor: color }} />
                <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 z-20" style={{ borderColor: color }} />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 z-20" style={{ borderColor: color }} />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 z-20" style={{ borderColor: color }} />

                {/* GIF */}
                <img 
                  src={gifUrl} 
                  alt={title}
                  className="w-[500px] h-[350px] object-cover"
                  style={{
                    filter: 'contrast(1.1) brightness(1.1)',
                  }}
                />

                {/* Bottom label */}
                <div 
                  className="absolute bottom-0 left-0 right-0 py-2 px-4 text-center font-bold text-sm z-20"
                  style={{
                    background: `linear-gradient(to top, ${color}40, transparent)`,
                    color: color,
                    textShadow: `0 0 10px ${color}`,
                  }}
                >
                  {title}
                </div>

                {/* Particle effects */}
                <motion.div
                  className="absolute inset-0 pointer-events-none z-30"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${color}20, transparent 70%)`,
                  }}
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </div>

            {/* Floating particles around the hologram */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  backgroundColor: color,
                  boxShadow: `0 0 10px ${color}`,
                  left: `${20 + i * 15}%`,
                  top: `${10 + (i % 3) * 30}%`,
                }}
                animate={{
                  y: [-20, 20, -20],
                  x: [0, (i % 2 ? 10 : -10), 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2 + i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
