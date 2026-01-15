import React from 'react'

const About = () => {
  return (
    <section
      id="sobre"
      className="bg-offwhite pt-[120px] pb-[180px] md:pt-[112px] md:pb-[160px]"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-start justify-between gap-[64px]">
        {/* Coluna de texto */}
        <div className="max-w-[520px]">
          {/* Tag "Nossa história" */}
          <span className="inline-flex items-center justify-center w-[131px] h-[26px] rounded-full bg-[#F8B82D]/[0.15] border border-[#CE8A39]/50 text-[13px] font-body text-terracotta mb-[20px]">
            Nossa história
          </span>
          
          <h2 className="font-title text-[40px] text-terracotta mb-[24px]">
            Sobre nós
          </h2>
          
          <p className="font-body text-[18px] leading-relaxed text-green-olive mb-[16px]">
            A Associação Monte Ressignificar foi fundada em 17 de março de 2025, com a missão de atuar como casa lar para crianças de 5 a 10 anos em situação de vulnerabilidade social que, por determinação judicial, necessitam ser acolhidas em uma instituição de acolhimento.
          </p>
          
          <p className="font-body text-[18px] leading-relaxed text-green-olive">
            Nosso propósito é oferecer cuidado, segurança, afeto e oportunidades para que essas crianças possam ressignificar suas histórias e reconstruir seus caminhos com dignidade e esperança.
          </p>
        </div>
        
        {/* Coluna da imagem com frame inclinado */}
        <div className="relative md:ml-auto">
          {/* Frame de fundo inclinado */}
          <div
            className="absolute inset-0 rounded-[24px] bg-[#A44819]/[0.16] blur-[4px] md:w-[566px] md:h-[433.8px]"
            style={{ transform: 'rotate(-9.61deg)' }}
          />
          
          {/* Imagem principal */}
          <div className="relative w-full md:w-[548px] h-auto md:h-[420px] rounded-[24px] overflow-hidden shadow-xl">
            <img
              src="/img/sessao-sobre-nos.jpg"
              alt="Crianças atendidas pela Monte Ressignificar"
              className="w-full h-auto md:h-full object-contain md:object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

