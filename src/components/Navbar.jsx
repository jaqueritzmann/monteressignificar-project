import React, { useState } from 'react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 w-full">
      <div className="max-w-container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between py-6">
          {/* Logo à esquerda */}
          <div className="flex items-center">
            <a href="#sobre" aria-label="Voltar ao topo">
              <img 
                src="/img/logo.svg" 
                alt="Monte Ressignificar" 
                className="h-9 md:h-10 lg:h-12 w-auto"
              />
            </a>
          </div>

          {/* Menu desktop */}
          <div className="hidden md:flex items-center gap-8">
            <a 
              href="#sobre" 
              className="font-body text-white hover:text-yellow transition-colors text-base"
            >
              Sobre nós
            </a>
            <a 
              href="#projetos" 
              className="font-body text-white hover:text-yellow transition-colors text-base"
            >
              Nossos projetos
            </a>
            <a 
              href="#ajudar" 
              className="font-body text-white hover:text-yellow transition-colors text-base"
            >
              Como ajudar
            </a>
            <a 
              href="#contato" 
              className="font-body text-white hover:text-yellow transition-colors text-base"
            >
              Contatos
            </a>
            <a href="#doacao-pix">
              <button 
                className="font-body font-bold text-green-olive bg-yellow px-6 py-2 rounded-full hover:bg-yellow/90 transition-all duration-300 text-base"
                aria-label="Doe agora para a Monte Ressignificar"
              >
                Doe Já
              </button>
            </a>
          </div>

          {/* Menu mobile - botão hamburger */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Menu mobile expandido */}
        {isMenuOpen && (
          <div className="md:hidden bg-terracotta/95 rounded-lg mt-4 p-4 space-y-3">
            <a 
              href="#sobre" 
              className="block font-body text-white hover:text-yellow transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre nós
            </a>
            <a 
              href="#projetos" 
              className="block font-body text-white hover:text-yellow transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Nossos projetos
            </a>
            <a 
              href="#ajudar" 
              className="block font-body text-white hover:text-yellow transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Como ajudar
            </a>
            <a 
              href="#contato" 
              className="block font-body text-white hover:text-yellow transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contatos
            </a>
            <a href="#doacao-pix" className="w-full" onClick={() => setIsMenuOpen(false)}>
              <button 
                className="w-full font-body font-bold text-green-olive bg-yellow px-6 py-2 rounded-full hover:bg-yellow/90 transition-all duration-300"
                aria-label="Doe agora para a Monte Ressignificar"
              >
                Doe Já
              </button>
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar

