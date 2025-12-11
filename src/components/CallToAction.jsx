import React from 'react'

const CallToAction = () => {
  return (
    <section id="casa-lar" className="py-section md:py-section-lg bg-offwhite">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16">
          {/* Imagem à esquerda */}
          <div className="w-full md:w-[548px] h-[300px] md:h-[420px] flex-shrink-0">
            <div className="relative w-full h-full rounded-[24px] overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.16)]">
              <img 
                src="/img/sessao-vaquinha-online.jpg" 
                alt="Casa Lar da Monte Ressignificar - espaço seguro para crianças vítimas de violência" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Texto à direita */}
          <div className="w-full md:w-[548px] flex-shrink-0 flex flex-col justify-center">
            {/* Tag */}
            <div className="mb-[20px]">
              <span className="inline-flex h-[26px] items-center rounded-full border border-[#CE8A39]/50 bg-[#F8B82D]/[0.15] px-3 text-[13px] font-body text-terracotta whitespace-nowrap">
                Meta: Construir nossa primeira Casa Lar
              </span>
            </div>
            
            {/* Título */}
            <h2 className="font-title text-[36px] text-terracotta mb-[24px] leading-tight">
              Ajude a Monte Ressignificar a construir um lar para crianças vítimas de violência
            </h2>
            
            {/* Parágrafo */}
            <p className="font-body text-[18px] leading-relaxed text-green-olive mb-8">
              Estamos em uma campanha para construir nossa primeira Casa Lar, um espaço seguro e acolhedor onde crianças vítimas de violência possam encontrar proteção, cuidado e a oportunidade de reconstruir suas vidas. Sua contribuição é essencial para tornar esse sonho realidade.
            </p>
            
            {/* Botão */}
            <div className="flex justify-center md:justify-start">
              <a
                href="https://www.vakinha.com.br/vaquinha/ajude-a-monte-ressignificar-a-construir-um-lar-para-criancas-vitimas-de-violencia?utm_campaign=share-sharemodal&utm_content=5704029&utm_medium=share-bottom-link&utm_source=socialshares-app-share"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button 
                  className="px-10 py-4 bg-yellow text-terracotta rounded-full font-body font-bold text-[18px] hover:bg-yellow/90 transition-all duration-300"
                  aria-label="Contribuir para a construção da Casa Lar"
                >
                  Quero ajudar
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CallToAction

