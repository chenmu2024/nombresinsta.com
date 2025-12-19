import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-xl font-bold text-white">NombresInsta</span>
            <p className="text-sm mt-1">© {new Date().getFullYear()} Generador de Nombres. Todos los derechos reservados.</p>
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="hover:text-white transition">Privacidad</a>
            <a href="#" className="hover:text-white transition">Términos</a>
            <a href="#" className="hover:text-white transition">Contacto</a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-800 text-center text-xs">
          <p>Esta herramienta no está afiliada con Instagram™ o Meta Platforms, Inc.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;