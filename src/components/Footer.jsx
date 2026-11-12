const LINK = 'hover:text-cyan-300 underline transition-colors'

export default function Footer() {
  return (
    <footer className="relative px-4 pb-12 text-center">
      <div className="glass-panel p-4 md:p-8 inline-block max-w-full">
        <p className="text-gray-400 text-xs md:text-sm">
          © 2025 Fletcher Bonds. All rights reserved.
        </p>
        <p className="text-cyan-400 text-xs md:text-sm mt-2">
          Built with{' '}
          <a href="https://code.visualstudio.com/" target="_blank" rel="noopener noreferrer" className={`${LINK} break-words`}>
            VS Code
          </a>
          {' '}+{' '}
          <a href="https://factory.ai" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 underline transition-colors">
            Droid from Factory.AI
          </a>
          {' '}+{' '}
          <a href="https://claude.com/product/claude-code" target="_blank" rel="noopener noreferrer" className={LINK}>
            Claude Code
          </a>
        </p>
      </div>
    </footer>
  )
}
