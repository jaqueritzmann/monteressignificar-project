import React from 'react'

const HowToHelp = () => {
  return (
    <section id="ajudar" className="py-section md:py-section-lg bg-offwhite">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        {/* Título centralizado */}
        <div className="text-center mt-20 mb-12">
          <h2 className="font-title text-[40px] md:text-[44px] font-bold text-terracotta mb-3">
            Como ajudar?
          </h2>
          {/* Sub-linha decorativa */}
          <div className="w-[64px] h-[2px] bg-terracotta/60 mx-auto rounded-full"></div>
        </div>

        {/* Grid de 2 colunas com cards */}
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {/* Card 1 - Contribuir */}
          <div className="h-full rounded-[24px] bg-white/90 shadow-sm border border-offwhite/60 px-8 py-10 flex flex-col justify-between">
            <div>
              <h3 className="font-title text-[28px] md:text-[32px] font-bold text-terracotta mb-4">
                Contribuir diretamente
              </h3>
              <p className="font-body text-[16px] md:text-[18px] text-green-olive/80 leading-relaxed mb-8">
                Entre em contato com nossa equipe para apoiar nossos projetos ou realizar contribuições diretas para a Monte Ressignificar.
              </p>
            </div>
            <a
              href="https://api.whatsapp.com/send/?phone=554196072338&text&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-[48px] px-8 rounded-full bg-terracotta text-offwhite font-body font-semibold text-[16px] md:text-[18px] shadow-sm hover:bg-[#8B3A14] transition-colors"
              aria-label="Quero contribuir via WhatsApp"
            >
              Quero contribuir
            </a>
          </div>

          {/* Card 2 - Seja voluntário */}
          <div className="h-full rounded-[24px] bg-white/90 shadow-sm border border-offwhite/60 px-8 py-10 flex flex-col justify-between">
            <div>
              <h3 className="font-title text-[28px] md:text-[32px] font-bold text-terracotta mb-4">
                Seja voluntário
              </h3>
              <p className="font-body text-[16px] md:text-[18px] text-green-olive/80 leading-relaxed mb-8">
                Dedique seu tempo e suas habilidades para transformar a vida de crianças e adolescentes. Preencha o formulário para que possamos conhecer seu perfil e indicar a melhor forma de atuar.
              </p>
            </div>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSd-75Ouh5dQwGyoR2ncCttmY61lLeRd5uBbL2s31iPWE_FynA/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-[48px] px-8 rounded-full bg-terracotta text-offwhite font-body font-semibold text-[16px] md:text-[18px] shadow-sm hover:bg-[#8B3A14] transition-colors"
              aria-label="Quero ser voluntário"
            >
              Quero ser voluntário
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowToHelp

