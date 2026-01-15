import React, { useState, useRef, useEffect } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

function ProjetoCard({ imageSrc, title, alt }) {
  return (
    <div
      role="group"
      className="w-[241px] h-[366px] bg-[#FFEFD4] rounded-[12px] flex flex-col items-center pt-[30px] pb-[30px] shadow-sm transition-all duration-300 ease-out motion-safe:transform hover:-translate-y-2 hover:shadow-xl hover:shadow-[#A44819]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#F8B82D] focus-visible:ring-offset-[#CE8A39] cursor-pointer"
    >
      <div className="w-[195px] h-[271px] rounded-[12px] overflow-hidden mb-[20px]">
        <img
          src={imageSrc}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-300 ease-out motion-safe:group-hover:scale-105"
        />
      </div>
      <div className="w-[195px] h-[36px] rounded-[10px] bg-[#F8B82D]/[0.42] flex items-center justify-center transition-all duration-300 ease-out group-hover:bg-[#F8B82D]/[0.6]">
        <span className="font-body font-semibold text-[14px] text-[#A44819] leading-none transition-colors duration-300 ease-out group-hover:text-[#7A2F12]">
          {title}
        </span>
      </div>
    </div>
  )
}

const Projects = () => {
  const scrollContainerRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const projects = [
    {
      id: 1,
      title: "Atividades pedagógicas",
      image: "/img/nosso-projeto-01.jpg",
      alt: "Atividades pedagógicas da Monte Ressignificar"
    },
    {
      id: 2,
      title: "Terapias integradas",
      image: "/img/nosso-projeto-02.jpg",
      alt: "Terapias integradas da Monte Ressignificar"
    },
    {
      id: 3,
      title: "Arteterapia",
      image: "/img/nosso-projeto-03.jpg",
      alt: "Arteterapia da Monte Ressignificar"
    },
    {
      id: 4,
      title: "Esporte e cultura",
      image: "/img/nosso-projeto-04.jpg",
      alt: "Esporte e cultura da Monte Ressignificar"
    },
    {
      id: 5,
      title: "Atenção multidisciplinar",
      image: "/img/nosso-projeto-05.jpg",
      alt: "Atenção multidisciplinar da Monte Ressignificar"
    },
    {
      id: 6,
      title: "Acolhimento 24h",
      image: "/img/nosso-projeto-06.jpg",
      alt: "Acolhimento 24h da Monte Ressignificar"
    },
    {
      id: 7,
      title: "Proteção emocional",
      image: "/img/nosso-projeto-07.jpg",
      alt: "Proteção emocional da Monte Ressignificar"
    },
    {
      id: 8,
      title: "Espaço seguro e afetuoso",
      image: "/img/nosso-projeto-08.jpg",
      alt: "Espaço seguro e afetuoso da Monte Ressignificar"
    }
  ]

  // Função para verificar se pode rolar
  const checkScrollability = () => {
    if (!scrollContainerRef.current) return
    
    const container = scrollContainerRef.current
    const { scrollLeft, scrollWidth, clientWidth } = container
    
    setCanScrollLeft(scrollLeft > 10)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    
    // Calcular índice atual baseado na posição do scroll
    const cardWidth = 241 + 24 // largura do card + gap
    const newIndex = Math.min(
      Math.round(scrollLeft / cardWidth),
      projects.length - 1
    )
    setCurrentIndex(Math.max(0, newIndex))
  }

  // Scroll para esquerda
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 241 + 24 // largura do card + gap
      scrollContainerRef.current.scrollBy({
        left: -cardWidth,
        behavior: 'smooth'
      })
    }
  }

  // Scroll para direita
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 241 + 24 // largura do card + gap
      scrollContainerRef.current.scrollBy({
        left: cardWidth,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    checkScrollability()
    container.addEventListener('scroll', checkScrollability)
    
    return () => {
      container.removeEventListener('scroll', checkScrollability)
    }
  }, [])

  return (
    <section id="projetos" className="bg-[#CE8A39] py-section">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8 flex flex-col items-center">
        <div className="text-center mb-[32px] w-full">
          <h2 className="font-title text-[40px] md:text-[44px] text-offwhite mb-3">
            Nossos projetos
          </h2>
          <p className="font-body text-[18px] text-offwhite/90 max-w-[640px] mx-auto">
            Oferecemos um conjunto completo de ações para garantir o bem-estar e o desenvolvimento das crianças
          </p>
        </div>
        
        {/* Grid no desktop, carrossel horizontal no mobile */}
        <div className="w-full relative">
          {/* Container mobile: carrossel horizontal */}
          <div className="md:hidden relative">
            {/* Setas de navegação */}
            {canScrollLeft && (
              <button
                onClick={scrollLeft}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-terracotta rounded-full shadow-xl border-2 border-offwhite/30 text-offwhite hover:bg-[#8B3A14] active:scale-95 transition-all duration-200"
                aria-label="Projeto anterior"
              >
                <FaChevronLeft className="w-5 h-5" />
              </button>
            )}
            
            {canScrollRight && (
              <button
                onClick={scrollRight}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-terracotta rounded-full shadow-xl border-2 border-offwhite/30 text-offwhite hover:bg-[#8B3A14] active:scale-95 transition-all duration-200"
                aria-label="Próximo projeto"
              >
                <FaChevronRight className="w-5 h-5" />
              </button>
            )}

            {/* Carrossel */}
            <div 
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-6 px-6"
            >
              {projects.map((project) => (
                <div key={project.id} className="flex-shrink-0 snap-center">
                  <ProjetoCard
                    imageSrc={project.image}
                    title={project.title}
                    alt={project.alt}
                  />
                </div>
              ))}
            </div>

            {/* Indicadores de posição (bolinhas) */}
            <div className="flex justify-center gap-2 mt-4">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (scrollContainerRef.current) {
                      const cardWidth = 241 + 24
                      const targetScroll = index * cardWidth
                      scrollContainerRef.current.scrollTo({
                        left: targetScroll,
                        behavior: 'smooth'
                      })
                      // Atualizar índice após um pequeno delay para sincronizar com o scroll
                      setTimeout(() => {
                        setCurrentIndex(index)
                      }, 100)
                    }
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-offwhite w-6'
                      : 'bg-offwhite/40 w-2 hover:bg-offwhite/60'
                  }`}
                  aria-label={`Ir para projeto ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          {/* Grid desktop */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 justify-items-center w-full">
            {projects.map((project) => (
              <ProjetoCard
                key={project.id}
                imageSrc={project.image}
                title={project.title}
                alt={project.alt}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects

