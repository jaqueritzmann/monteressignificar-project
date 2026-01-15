import React from 'react'

const MissionVisionValues = () => {
  return (
    <section id="missao-visao-valores" className="pt-section md:pt-section-lg pb-[120px] md:pb-[160px] bg-offwhite">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        {/* Título centralizado */}
        <div className="text-center mb-12">
          <h2 className="font-title text-[40px] md:text-[44px] font-bold text-terracotta mb-3">
            Missão, Visão e Valores
          </h2>
          {/* Sub-linha decorativa */}
          <div className="w-[64px] h-[2px] bg-terracotta/60 mx-auto rounded-full"></div>
        </div>

        {/* Grid de 3 colunas com cards */}
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Card 1 - Missão */}
          <div className="h-full rounded-[24px] bg-white/90 shadow-sm border border-offwhite/60 px-8 py-10 flex flex-col">
            <div>
              <h3 className="font-title text-[28px] md:text-[32px] font-bold text-terracotta mb-4">
                Missão
              </h3>
              <p className="font-body text-[16px] md:text-[18px] text-green-olive/80 leading-relaxed">
                Nossa missão é ressignificar a infância de crianças vítimas de vulnerabilidade, oferecendo acolhimento especializado, afeto e suporte multidisciplinar que minimizem os impactos dos traumas e devolvam às crianças o direito a uma infância segura, saudável e feliz.
              </p>
            </div>
          </div>

          {/* Card 2 - Visão */}
          <div className="h-full rounded-[24px] bg-white/90 shadow-sm border border-offwhite/60 px-8 py-10 flex flex-col">
            <div>
              <h3 className="font-title text-[28px] md:text-[32px] font-bold text-terracotta mb-4">
                Visão
              </h3>
              <p className="font-body text-[16px] md:text-[18px] text-green-olive/80 leading-relaxed">
                Ser referência em Curitiba e, futuramente, em todo o Brasil no atendimento especializado a crianças em vulnerabilidade, transformando vidas por meio do cuidado humanizado, da escuta qualificada e da reconstrução de histórias marcadas pela dor.
              </p>
            </div>
          </div>

          {/* Card 3 - Valores */}
          <div className="h-full rounded-[24px] bg-white/90 shadow-sm border border-offwhite/60 px-8 py-10 flex flex-col">
            <div>
              <h3 className="font-title text-[28px] md:text-[32px] font-bold text-terracotta mb-4">
                Valores
              </h3>
              <p className="font-body text-[16px] md:text-[18px] text-green-olive/80 leading-relaxed">
                Valorizamos a empatia, o acolhimento, a ética e a responsabilidade. Entendemos a importância do afeto, do acesso à cultura e ao lazer, e do respeito aos vínculos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MissionVisionValues
