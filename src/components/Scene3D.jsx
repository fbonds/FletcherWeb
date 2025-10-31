import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float, Text, Box } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function TechIcon({ position, text, speed, icon }) {
  const groupRef = useRef()
  
  useFrame((state) => {
    groupRef.current.rotation.y = state.clock.getElapsedTime() * speed
    groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * speed * 0.5) * 0.3
  })

  return (
    <Float speed={3} rotationIntensity={2} floatIntensity={4}>
      <group ref={groupRef} position={position}>
        <Box args={[2.5, 2.5, 0.3]}>
          <meshStandardMaterial 
            color="#c0c0c0"
            metalness={1}
            roughness={0.1}
            envMapIntensity={2}
            transparent
            opacity={0.9}
          />
        </Box>
        <Text
          position={[0, 0.5, 0.2]}
          fontSize={1.2}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.05}
          outlineColor="#000000"
          fillOpacity={1}
          outlineOpacity={1}
        >
          {icon}
        </Text>
        <Text
          position={[0, -0.5, 0.2]}
          fontSize={0.28}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          maxWidth={2.2}
          outlineWidth={0.02}
          outlineColor="#000000"
          fillOpacity={1}
          outlineOpacity={1}
        >
          {text}
        </Text>
      </group>
    </Float>
  )
}

function Particles() {
  const particlesRef = useRef()
  const particleCount = 500
  
  const positions = new Float32Array(particleCount * 3)
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 50
    positions[i * 3 + 1] = (Math.random() - 0.5) * 50
    positions[i * 3 + 2] = (Math.random() - 0.5) * 50
  }

  useFrame((state) => {
    particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.05
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="#8b5cf6" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

export default function Scene3D() {
  const techStack = [
    { text: 'IBM Mainframe', icon: '🖥️', position: [-12, 6, -8], speed: 0.3 },
    { text: 'AS/400', icon: '💼', position: [15, 4, -5], speed: 0.35 },
    { text: 'Sun Solaris', icon: '☀️', position: [-10, -5, 3], speed: 0.4 },
    { text: 'Linux', icon: '🐧', position: [12, -3, 5], speed: 0.38 },
    { text: 'Windows', icon: '🪟', position: [-18, 2, 0], speed: 0.32 },
    { text: 'macOS', icon: '🍎', position: [16, 1, -3], speed: 0.42 },
    { text: 'iOS', icon: '📱', position: [-8, 8, 2], speed: 0.45 },
    { text: 'Android', icon: '🤖', position: [10, -7, 1], speed: 0.36 },
    { text: 'Cloud', icon: '☁️', position: [0, 5, -10], speed: 0.3 },
    { text: 'Server', icon: '🔧', position: [-5, -8, -5], speed: 0.39 },
    { text: 'Ubuntu', icon: '🟠', position: [8, 7, 6], speed: 0.33 },
    { text: 'RedHat', icon: '🎩', position: [2, -2, 8], speed: 0.41 },
    { text: 'Debian', icon: '🌀', position: [-14, -4, 4], speed: 0.37 },
    { text: 'CentOS', icon: '⚙️', position: [14, 6, -2], speed: 0.34 },
    { text: 'Azure', icon: '☁️', position: [-6, 9, -6], speed: 0.36 },
    { text: 'AWS', icon: '📦', position: [18, -5, 3], speed: 0.4 },
  ]

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 15], fov: 90 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#8b5cf6" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#ec4899" />
        <pointLight position={[0, 10, 5]} intensity={1} color="#06b6d4" />
        <pointLight position={[10, -10, 0]} intensity={1} color="#10b981" />
        <spotLight position={[0, 15, 0]} intensity={1.5} angle={0.5} penumbra={1} color="#ffffff" />
        
        {techStack.map((tech, index) => (
          <TechIcon
            key={index}
            position={tech.position}
            text={tech.text}
            icon={tech.icon}
            speed={tech.speed}
          />
        ))}
        
        <Particles />
        
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
      </Canvas>
    </div>
  )
}
