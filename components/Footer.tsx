import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
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
              <li><Link to="/#cat-mujer" className="hover:text-pink-400 transition text-left block">Nombres para Mujer</Link></li>
              <li><Link to="/#cat-hombre" className="hover:text-blue-400 transition text-left block">Nombres para Hombre</Link></li>
              <li><Link to="/#cat-negocios" className="hover:text-purple-400 transition text-left block">Nombres para Marcas</Link></li>
              <li><Link to="/#generator" className="hover:text-yellow-400 transition text-left block">Nicks Gamer</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Recursos</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/blog" className="hover:text-white transition text-left block">Blog & Artículos</Link></li>
              <li><Link to="/about" className="hover:text-white transition text-left block">Sobre Nosotros</Link></li>
              <li><Link to="/#tips" className="hover:text-white transition text-left block">Guía de Nombres</Link></li>
              <li><Link to="/#faq" className="hover:text-white transition text-left block">Preguntas Frecuentes</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="hover:text-white transition text-left block">Política de Privacidad</Link></li>
              <li><Link to="/terms" className="hover:text-white transition text-left block">Términos de Uso</Link></li>
              <li><Link to="/contact" className="hover:text-white transition text-left block">Contacto</Link></li>
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