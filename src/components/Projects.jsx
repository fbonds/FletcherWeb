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
  {
    id: 'bugpacker',
    title: 'Bugpacker',
    description: 'Free Chrome extension. Record a bug while you reproduce it, and get one file to attach.',
    url: 'https://bugpacker.com/',
    embed: true,
  },
  {
    id: 'project-kit',
    title: 'Project-Kit',
    description: 'Three Markdown files you copy into your repo so your AI coding agent always knows where the project stands.',
    url: 'https://fbonds.github.io/project-kit/',
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 text-center glow-text">
            <span className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>

          {PROJECTS.length > 1 && (
            <div className="flex flex-wrap justify-center gap-2 mb-3">
              {PROJECTS.map((project) =>
                project.embed ? (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => setSelectedId(project.id)}
                    aria-pressed={project.id === selectedId}
                    title={project.description}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      project.id === selectedId
                        ? 'bg-cyan-400/20 text-cyan-300 ring-1 ring-cyan-400/60'
                        : 'text-gray-300 hover:text-cyan-400 hover:bg-white/5'
                    }`}
                  >
                    {project.title}
                  </button>
                ) : (
                  <a
                    key={project.id}
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={project.description}
                    className="px-3 py-1 rounded-full text-sm font-medium text-gray-300 hover:text-cyan-400 hover:bg-white/5 transition-colors"
                  >
                    {project.title} ↗
                  </a>
                )
              )}
            </div>
          )}

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
