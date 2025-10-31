# Fletcher Bonds - Dark Trippy High-Tech Website

A dark, trippy, high-tech animated React website featuring 3D graphics and smooth animations.

## Features

### 🎨 Styling & Design
- **Tailwind CSS v4** with custom dark theme
- **Glassmorphism** UI with backdrop blur effects
- **Neon glow effects** on text and borders
- **Color palette**: Deep blacks, purple, pink, cyan, blue gradients

### 🌌 3D Animations
- **React Three Fiber** - 3D WebGL rendering
- **Animated geometric spheres** with wireframe materials and distortion effects
- **Particle system** with 500 floating particles
- **Auto-rotating camera** for immersive experience
- **Multiple point lights** for dynamic lighting

### ✨ Animations & Interactions
- **Framer Motion** - Smooth page transitions and scroll-based animations
- **Hover effects** on buttons and cards with scale transforms
- **Text animations** - Pulsing glow effects that cycle through colors
- **Floating animations** on 3D objects
- **Scroll indicators** with infinite loop animations

### 📱 Sections
1. **Hero** - Large animated title with gradient text and glowing effects
2. **About** - Info section with animated tech stack cards
3. **Contact** - Social links with hover animations

## Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Tech Stack
- React 19
- Vite 7
- Tailwind CSS 4
- Three.js
- React Three Fiber & Drei
- Framer Motion

## Color Variables
Custom CSS variables defined in `src/index.css`:
- `--color-cyber-darker`: #050508 (background)
- `--color-cyber-purple`: #8b5cf6
- `--color-cyber-pink`: #ec4899
- `--color-cyber-cyan`: #06b6d4
- And more neon variants

## Deployment
Ready to deploy to fletcherbonds.com - just build and upload the `dist` folder to your hosting provider.
