import React from 'react';
import { Instagram } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const { pathname } = useLocation();

  const isHome = pathname === '/';

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/50 supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 md:h-20">
          <Link 
            to="/"
            className="group flex items-center space-x-2.5 transition transform active:scale-95"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 blur opacity-70 group-hover:opacity-100 transition duration-500 rounded-xl"></div>
              <div className="relative bg-white text-transparent bg-clip-text bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-600 p-1.5 rounded-xl border border-white/50">
                <Instagram size={26} className="text-pink-600" />
              </div>
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
              NombresInsta
            </span>
          </Link>
          
          <nav className="hidden md:flex space-x-1 items-center">
            <Link 
              to="/#generator"
              className="px-4 py-2 text-slate-600 text-sm font-semibold rounded-full hover:bg-pink-50 hover:text-pink-600 transition duration-300"
            >
              Generador
            </Link>
            <Link 
              to="/blog"
              className={`px-4 py-2 text-sm font-semibold rounded-full transition duration-300 ${pathname.startsWith('/blog') ? 'bg-pink-50 text-pink-600' : 'text-slate-600 hover:bg-pink-50 hover:text-pink-600'}`}
            >
              Blog
            </Link>
            <Link 
              to="/#tips"
              className="px-4 py-2 text-slate-600 text-sm font-semibold rounded-full hover:bg-pink-50 hover:text-pink-600 transition duration-300"
            >
              Consejos
            </Link>
            <Link 
              to="/#faq"
              className="px-4 py-2 text-slate-600 text-sm font-semibold rounded-full hover:bg-pink-50 hover:text-pink-600 transition duration-300"
            >
              FAQ
            </Link>
          </nav>
          
          <Link 
             to="/#generator"
             className="md:hidden bg-slate-900 text-white px-4 py-2 rounded-full text-xs font-bold"
          >
            Generar
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;