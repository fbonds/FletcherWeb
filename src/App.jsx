import Scene3D from './components/Scene3D'
import Hero from './components/Hero'
import About from './components/About'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Chatbot from './components/Chatbot'

function App() {
  return (
    <div className="relative">
      <Scene3D />
      <Hero />
      <About />
      <Testimonials />
      <Contact />
      <Chatbot />
    </div>
  )
}

export default App
