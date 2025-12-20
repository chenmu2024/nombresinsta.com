import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, SearchX } from 'lucide-react';

const NotFound: React.FC = () => {
  // Set 404 status via meta tag for clients that support it (though server-side status is ideal, this helps client-side crawlers)
  useEffect(() => {
    document.title = "404 - Página no encontrada | NombresInsta";
    const metaRobots = document.querySelector('meta[name="robots"]');
    if (metaRobots) {
      metaRobots.setAttribute('content', 'noindex, nofollow');
    }
  }, []);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-full mb-6">
        <SearchX size={48} className="text-slate-400" />
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
        Página no encontrada
      </h1>
      <p className="text-lg text-slate-500 dark:text-slate-400 max-w-md mb-8">
        Lo sentimos, la página que buscas no existe o ha sido movida.
      </p>
      <Link 
        to="/"
        className="flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 px-8 py-3 rounded-full font-bold transition-transform hover:scale-105 active:scale-95"
      >
        <Home size={20} />
        <span>Volver al Inicio</span>
      </Link>
    </div>
  );
};

export default NotFound;