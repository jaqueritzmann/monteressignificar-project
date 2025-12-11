import React from 'react'

const Tagline = () => {
  return (
    <section className="bg-offwhite pt-[72px] pb-[56px]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8 flex items-center justify-between">
        {/* Espaçador à esquerda para balancear o sticker à direita */}
        <div className="w-[120px] lg:w-[120px]"></div>
        
        {/* Texto centralizado */}
        <h2 className="font-title text-[32px] md:text-[36px] text-terracotta text-center flex-1">
          escutar • acolher • ressignificar
        </h2>
        
        {/* Sticker à direita, centralizado verticalmente com o texto */}
        <div className="ml-8">
          <img
            src="/img/maior-resolucao/identidade-variacao-575px.png"
            alt="Sticker Monte Ressignificar"
            className="w-[120px] h-[120px]"
          />
        </div>
      </div>
      
      {/* Linha tracejada delimitando a sessão */}
      <div className="mt-[40px]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8 border-t border-dashed border-[#F1CFA1]" />
      </div>
    </section>
  )
}

export default Tagline

