import React from 'react'

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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-items-center w-full">
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
    </section>
  )
}

export default Projects

