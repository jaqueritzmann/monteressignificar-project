import React from 'react'

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Jéssica Monteiro",
      role: "Presidenta",
      image: "/img/jessica-monteiro.jpg",
      alt: "Foto de Jéssica Monteiro, presidenta da Monte Ressignificar"
    },
    {
      id: 2,
      name: "Tânia Cabral",
      role: "Vice-presidenta",
      image: "/img/tania-cabral.jpg",
      alt: "Foto de Tânia Cabral, vice-presidenta da Monte Ressignificar"
    },
    {
      id: 3,
      name: "Priscila Fernandes Baptista",
      role: "Fiscal",
      image: "/img/Priscila-fiscal.jpeg",
      alt: "Foto de Priscila Fernandes Baptista, fiscal da Monte Ressignificar"
    },
    {
      id: 4,
      name: "Juliana Savy Moura",
      role: "Tesoureira",
      image: "/img/Juliana-tesoureira.jpeg",
      alt: "Foto de Juliana Savy Moura, tesoureira da Monte Ressignificar"
    }
  ]

  return (
    <section id="equipe" className="bg-offwhite relative">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8 pt-12 pb-16 flex flex-col items-center text-center">
        {/* Sticker */}
        <div className="flex justify-center mt-10 mb-4">
          <img
            src="/img/maior-resolucao/identidade-variacao-565x.png"
            alt=""
            className="w-[120px] h-[120px]"
            aria-hidden="true"
          />
        </div>
        
        {/* Título */}
        <h2 className="font-title text-3xl md:text-4xl lg:text-5xl font-bold text-terracotta mb-2 leading-tight">
          Nossa equipe
        </h2>
        
        {/* Subtítulo */}
        <p className="font-body text-lg text-green-olive mb-8">
          Pessoas dedicadas a transformar vidas
        </p>
        
        {/* Faixa laranja com cards */}
        <div className="w-full bg-[#CE8A39] rounded-[32px] mt-8 py-10 lg:py-8 lg:h-[315px] lg:rounded-[24px]">
          <div className="max-w-[1226px] mx-auto px-8 flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between">
            {teamMembers.map((member) => (
              <div 
                key={member.id}
                className="flex flex-col items-center gap-2 w-[160px] flex-shrink-0"
              >
                <div className="w-[160px] h-[160px] rounded-full overflow-hidden shadow-xl border-[4px] border-[#FFEFD4]">
                  <img 
                    src={member.image} 
                    alt={member.alt || `${member.name}, ${member.role} da Monte Ressignificar`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-title text-xl font-bold text-offwhite text-center whitespace-nowrap">
                  {member.name}
                </h3>
                <p className="font-body text-offwhite/90 font-medium text-center">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Team

