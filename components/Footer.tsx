import React from 'react';
import { ViewState } from '../App';

interface FooterProps {
  onNavigate: (view: ViewState, hash?: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="col-span-1 md:col-span-1">
            <span className="text-xl font-bold text-white block mb-4">NombresInsta</span>
            <p className="text-sm leading-relaxed mb-4">
              La herramienta líder para generar nombres de usuario aesthetic y originales para Instagram en 2025.
            </p>
            <p className="text-sm">© {new Date().getFullYear()} NombresInsta.com</p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Generadores</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => onNavigate('home', '#cat-mujer')} className="hover:text-pink-400 transition text-left">Nombres para Mujer</button></li>
              <li><button onClick={() => onNavigate('home', '#cat-hombre')} className="hover:text-blue-400 transition text-left">Nombres para Hombre</button></li>
              <li><button onClick={() => onNavigate('home', '#cat-negocios')} className="hover:text-purple-400 transition text-left">Nombres para Marcas</button></li>
              <li><button onClick={() => onNavigate('home', '#generator')} className="hover:text-yellow-400 transition text-left">Nicks Gamer</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Recursos</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => onNavigate('about')} className="hover:text-white transition text-left">Sobre Nosotros</button></li>
              <li><button onClick={() => onNavigate('home', '#tips')} className="hover:text-white transition text-left">Guía de Nombres</button></li>
              <li><button onClick={() => onNavigate('home', '#faq')} className="hover:text-white transition text-left">Preguntas Frecuentes</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => onNavigate('privacy')} className="hover:text-white transition text-left">Política de Privacidad</button></li>
              <li><button onClick={() => onNavigate('terms')} className="hover:text-white transition text-left">Términos de Uso</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-white transition text-left">Contacto</button></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>Esta herramienta no está afiliada, asociada, autorizada, respaldada ni conectada oficialmente de ninguna manera con Instagram™ o Meta Platforms, Inc.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;