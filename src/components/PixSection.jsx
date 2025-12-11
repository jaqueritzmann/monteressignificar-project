import React from 'react'

const PixSection = () => {
  const pixKey = "62.413.164/0001-06"
  const associationName = "Associação Monte Ressignificar"
  const cnpj = "62.413.164/0001-06"

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey)
    alert('Chave PIX copiada para a área de transferência!')
  }

  return (
    <section 
      id="doacao-pix"
      className="relative bg-cover bg-center bg-no-repeat min-h-screen flex flex-col items-center justify-start pt-8 pb-16 px-4 overflow-visible"
      style={{
        backgroundImage: 'url(/img/background-area-pix.jpg)'
      }}
    >
      {/* Logo sticker centralizada no topo da seção */}
      <div className="flex justify-center mb-8 relative z-10 pt-8 w-full">
        <img
          src="/img/identidade-variacao-505x.png"
          alt="Logo Monte Ressignificar"
          className="w-[180px] h-[180px] md:w-[200px] md:h-[200px] object-contain"
        />
      </div>

      {/* Container principal fixo: 961x709px no desktop - centralizado */}
      <div className="w-full max-w-[961px] h-auto lg:min-h-[709px] lg:w-[961px] rounded-[32px] bg-[#FFEFD4]/25 border border-[#FFEFD4] backdrop-blur-[6px] shadow-[0_24px_80px_rgba(0,0,0,0.35)] flex flex-col mx-auto relative z-10 px-12 py-12 overflow-visible">
        {/* Título e subtítulo centralizados no topo */}
        <div className="text-center mb-10">
          <h2 className="font-title text-[44px] font-bold text-offwhite mb-2">
            Doe via PIX - TESTE
          </h2>
          <p className="font-body text-[18px] text-offwhite/90">
            Forma rápida e segura de contribuir
          </p>
        </div>

        {/* Grid de 2 colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10 flex-1">
          {/* Coluna Esquerda (inputs) - altura igual ao QR Code (360px) */}
          <div className="flex flex-col justify-between w-full max-w-[420px] h-[360px]">
            {/* Card Nome */}
            <div className="rounded-[24px] bg-offwhite px-6 py-5 shadow-sm">
              <p className="text-xs font-semibold text-green-olive/70 mb-2">Nome</p>
              <p className="text-base md:text-lg font-semibold text-green-olive">
                {associationName}
              </p>
            </div>

            {/* Card CNPJ */}
            <div className="rounded-[24px] bg-offwhite px-6 py-5 shadow-sm">
              <p className="text-xs font-semibold text-green-olive/70 mb-2">CNPJ</p>
              <p className="text-base md:text-lg font-semibold text-green-olive">
                {cnpj}
              </p>
            </div>

            {/* Card Chave PIX */}
            <div className="rounded-[24px] bg-offwhite px-6 py-5 shadow-sm">
              <p className="text-xs font-semibold text-green-olive/70 mb-2">Chave PIX (CNPJ)</p>
              <div className="flex items-center gap-3 flex-wrap">
                <p className="text-base md:text-lg font-semibold text-green-olive flex-1 min-w-0">
                  {pixKey}
                </p>
                {/* Botão Copiar minimalista - na mesma linha */}
                <button
                  type="button"
                  onClick={handleCopyPix}
                  className="h-[48px] px-6 rounded-full bg-green-olive text-offwhite font-body font-semibold text-sm hover:bg-green-olive/90 transition-all duration-300 flex items-center gap-2 whitespace-nowrap flex-shrink-0"
                  aria-label="Copiar chave PIX"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 4.5V3.5C5.5 2.67157 6.17157 2 7 2H12.5C13.3284 2 14 2.67157 14 3.5V9C14 9.82843 13.3284 10.5 12.5 10.5H11.5V12.5C11.5 13.3284 10.8284 14 10 14H3.5C2.67157 14 2 13.3284 2 12.5V6C2 5.17157 2.67157 4.5 3.5 4.5H5.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Copiar
                </button>
              </div>
            </div>
          </div>

          {/* Coluna Direita (QR Code) - alinhado ao topo */}
          <div className="flex items-start justify-center lg:justify-end">
            <div className="w-full max-w-[360px] h-auto aspect-square lg:w-[360px] lg:h-[360px] rounded-[32px] bg-offwhite border border-green-olive/10 shadow-sm flex flex-col items-center justify-center p-8">
              <div className="w-[280px] h-[280px] rounded-[24px] bg-white border border-green-olive/10 flex items-center justify-center overflow-hidden">
                <img
                  src="/img/qrcode280.jpeg"
                  alt="QR Code para doação via PIX"
                  className="w-[280px] h-[280px] object-contain"
                />
              </div>
              <p className="mt-4 text-[14px] text-green-olive/80 text-center font-body">
                Escaneie o QR Code
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PixSection

