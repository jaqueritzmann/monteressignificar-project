import React from 'react'
import Navbar from './Navbar'

const Hero = () => {
  return (
    <section 
      className="relative min-h-[80vh] flex items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: 'url(/img/hero-section-atualizada.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'right center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Navbar */}
      <Navbar />
      
      {/* Overlay em degradê terracota da esquerda para direita - mais suave à direita */}
      <div className="absolute inset-0 bg-gradient-to-r from-terracotta/80 via-terracotta/40 to-transparent"></div>
      
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-[550px] pt-[130px] pb-[140px] lg:pt-[150px] lg:pb-[160px]">
          <h1 className="font-title text-[46px] leading-[1.15] font-bold text-white">
            Ressignificando infâncias,<br />
            Reconstruindo futuros.
          </h1>
          
          <p className="font-body text-[24px] leading-[1.5] text-white max-w-[520px] mt-4 mb-10">
            Lutamos todos os dias para que cada criança encontre proteção, amor e a chance de escrever uma nova história.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-0">
            <a href="#doacao-pix">
              <button 
                className="px-10 py-4 bg-yellow text-terracotta rounded-full font-body font-bold text-[18px] hover:bg-yellow/90 transition-all duration-300"
                aria-label="Contribuir agora para a Monte Ressignificar"
              >
                Contribuir agora
              </button>
            </a>
            <a href="#sobre">
              <button 
                className="px-10 py-4 border border-white rounded-full font-body text-white text-[18px] ml-4 hover:bg-white/10 transition-all duration-300"
                aria-label="Saiba mais sobre a Monte Ressignificar"
              >
                Saiba mais
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

