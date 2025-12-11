import React from 'react'
import { 
  FaPhone, 
  FaEnvelope, 
  FaWhatsapp,
  FaInstagram,
  FaFacebook
} from 'react-icons/fa'

const Footer = () => {
  return (
    <footer id="contato" className="bg-green-olive text-offwhite py-12 md:py-16">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
          {/* Coluna 1: Nome da instituição + CNPJ + cidade */}
          <div>
            <h3 className="font-title text-2xl font-bold text-yellow mb-4">
              Monte Ressignificar
            </h3>
            <p className="font-body text-offwhite mb-2">
              Associação Monte Ressignificar
            </p>
            <div className="space-y-2 font-body text-offwhite/90">
              <p>CNPJ: 62.413.164/0001-06</p>
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-offwhite">
                  <path d="M8 0C4.7 0 2 2.7 2 6c0 4.5 6 10 6 10s6-5.5 6-10c0-3.3-2.7-6-6-6zm0 8.5c-1.4 0-2.5-1.1-2.5-2.5S6.6 3.5 8 3.5s2.5 1.1 2.5 2.5S9.4 8.5 8 8.5z" fill="currentColor"/>
                </svg>
                <span>Curitiba, Paraná, Brasil</span>
              </div>
            </div>
          </div>

          {/* Coluna 2: Links rápidos */}
          <div>
            <h4 className="font-title text-lg font-semibold mb-4 text-yellow">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#sobre" className="font-body text-offwhite hover:text-yellow transition-colors">
                  Sobre nós
                </a>
              </li>
              <li>
                <a href="#ajudar" className="font-body text-offwhite hover:text-yellow transition-colors">
                  Como ajudar
                </a>
              </li>
              <li>
                <a href="#projetos" className="font-body text-offwhite hover:text-yellow transition-colors">
                  Projetos
                </a>
              </li>
              <li>
                <a href="#casa-lar" className="font-body text-offwhite hover:text-yellow transition-colors">
                  Casa Lar
                </a>
              </li>
              <li>
                <a href="#contato" className="font-body text-offwhite hover:text-yellow transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Entre em Contato */}
          <div>
            <h4 className="font-title text-lg font-semibold mb-4 text-yellow">Entre em Contato</h4>
            <ul className="space-y-3 font-body text-offwhite">
              <li className="flex items-center gap-2">
                <FaPhone className="text-offwhite" />
                <a href="tel:+5541998477251" className="hover:text-yellow transition-colors">
                  (41) 99847-7251
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-offwhite" />
                <a href="mailto:monteressignificarcwb@gmail.com" className="hover:text-yellow transition-colors">
                  monteressignificarcwb@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 mt-4">
                <a
                  href="https://api.whatsapp.com/send/?phone=5541998477251&text&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-yellow text-green-olive font-body font-semibold hover:bg-yellow/90 transition-colors"
                >
                  <FaWhatsapp />
                  WhatsApp
                </a>
                <a
                  href="https://www.instagram.com/projetoressignificar.cwb?utm_source=qr&igsh=ZnI3NmQ3Y3pwNHls"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border-2 border-offwhite flex items-center justify-center hover:border-yellow transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram className="text-offwhite" />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61576007967188&rdid=Te0NIwGOPCGxnHed#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border-2 border-offwhite flex items-center justify-center hover:border-yellow transition-colors"
                  aria-label="Facebook"
                >
                  <FaFacebook className="text-offwhite" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-yellow/30 mt-8 pt-8 text-center font-body text-offwhite/90">
          <p>&copy; 2025 Associação Monte Ressignificar. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

