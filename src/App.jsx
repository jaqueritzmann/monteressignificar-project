import React from 'react'
import Hero from './components/Hero'
import Tagline from './components/Tagline'
import About from './components/About'
import Projects from './components/Projects'
import Team from './components/Team'
import HowToHelp from './components/HowToHelp'
import CallToAction from './components/CallToAction'
import PixSection from './components/PixSection'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Tagline />
      <About />
      <Projects />
      <Team />
      <HowToHelp />
      <CallToAction />
      <PixSection />
      <Footer />
    </div>
  )
}

export default App

