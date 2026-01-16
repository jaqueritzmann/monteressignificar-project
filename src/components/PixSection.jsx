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
      className="relative bg-cover bg-center bg-no-repeat min-h-screen flex flex-col items-center justify-start pt-6 sm:pt-8 pb-24 lg:pb-16 px-4 overflow-x-hidden"
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
      <div className="w-full max-w-[961px] h-auto lg:min-h-[709px] lg:w-[961px] rounded-[32px] bg-[#FFEFD4]/25 border border-[#FFEFD4] backdrop-blur-[6px] shadow-[0_24px_80px_rgba(0,0,0,0.35)] flex flex-col mx-auto relative z-10 px-5 py-7 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
        {/* Título e subtítulo centralizados no topo */}
        <div className="text-center mb-7 sm:mb-10">
          <h2 className="font-title text-[32px] sm:text-[44px] font-bold text-offwhite mb-2">
            Doe via PIX
          </h2>
          <p className="font-body text-[16px] sm:text-[18px] text-offwhite/90">
            Forma rápida e segura de contribuir
          </p>
        </div>

        {/* Grid de 2 colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 sm:gap-8 lg:gap-12 mt-6 sm:mt-8 lg:mt-10 flex-1">
          {/* Coluna Esquerda (inputs) - altura igual ao QR Code (360px) */}
          <div className="flex flex-col gap-4 lg:gap-0 lg:justify-between w-full lg:max-w-[420px] lg:h-[360px] mx-auto lg:mx-0">
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
                <p className="text-base md:text-lg font-semibold text-green-olive flex-1 min-w-0 break-all">
                  {pixKey}
                </p>
                {/* Botão Copiar minimalista - na mesma linha */}
                <button
                  type="button"
                  onClick={handleCopyPix}
                  className="h-[44px] w-[44px] rounded-full bg-green-olive text-offwhite hover:bg-green-olive/90 transition-all duration-300 flex items-center justify-center flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-offwhite/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  aria-label="Copiar chave PIX"
                  title="Copiar"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      d="M9 9h10v10H9V9Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Coluna Direita (QR Code) - alinhado ao topo */}
          <div className="flex items-start justify-center lg:justify-end">
            <div className="w-full max-w-[360px] aspect-square rounded-[32px] bg-offwhite border border-green-olive/10 shadow-sm flex flex-col items-center justify-center p-5 sm:p-6 lg:p-8 mx-auto mb-6 lg:mb-0">
              <div className="w-full max-w-[280px] aspect-square rounded-[24px] overflow-hidden bg-[#FFEFD4]/20 border border-green-olive/20 backdrop-blur-[6px] p-3">
                <img
                  src="/img/qrcode280.jpeg"
                  alt="QR Code para doação via PIX"
                  className="w-full h-full object-cover rounded-[20px]"
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

