import React from 'react';
import { Instagram } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 text-white p-1.5 rounded-lg">
              <Instagram size={24} />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              NombresInsta
            </span>
          </div>
          <nav className="hidden md:flex space-x-8 text-gray-600 text-sm font-medium">
            <a href="#generator" className="hover:text-pink-600 transition">Generador</a>
            <a href="#tips" className="hover:text-pink-600 transition">Consejos</a>
            <a href="#faq" className="hover:text-pink-600 transition">FAQ</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;