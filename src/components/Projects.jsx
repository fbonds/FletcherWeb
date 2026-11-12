import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

// Add a project by adding an entry. Set embed to false for a site that refuses to be framed.
const PROJECTS = [
  {
    id: 'vibe-coding-howto',
    title: 'Vibe Coding How-To',
    description: "A beginner's guide to building programs with Claude Code and GitHub.",
    url: 'https://fbonds.github.io/vibe-coding-howto/',
    embed: true,
  },
]

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [selectedId, setSelectedId] = useState(
    PROJECTS.find((p) => p.embed)?.id ?? null
  )
  const selected = PROJECTS.find((p) => p.id === selectedId)

  return (
    <section id="projects" className="relative min-h-screen px-4 py-20" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 md:mb-12 text-center glow-text">
            <span className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
            {PROJECTS.map((project) => {
              const isSelected = project.id === selectedId
              return (
                <div
                  key={project.id}
                  className={`glass-panel p-4 md:p-6 text-left transition-all duration-300 ${
                    isSelected ? 'ring-2 ring-cyan-400/70' : ''
                  }`}
                >
                  {project.embed ? (
                    <button
                      type="button"
                      onClick={() => setSelectedId(project.id)}
                      aria-pressed={isSelected}
                      className="block w-full text-left"
                    >
                      <h3 className="text-lg md:text-xl font-semibold text-cyan-400 mb-2">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-300">{project.description}</p>
                    </button>
                  ) : (
                    <>
                      <h3 className="text-lg md:text-xl font-semibold text-cyan-400 mb-2">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-300">{project.description}</p>
                    </>
                  )}
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-sm text-pink-400 hover:text-pink-300 underline transition-colors"
                  >
                    Open in new tab
                  </a>
                </div>
              )
            })}
          </div>

          {selected && (
            <div className="glass-panel p-2 md:p-3">
              <iframe
                key={selected.id}
                src={selected.url}
                title={selected.title}
                loading="lazy"
                className="w-full h-[80vh] rounded-lg"
              />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
