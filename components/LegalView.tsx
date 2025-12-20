import React, { useEffect } from 'react';
import { ArrowLeft, Mail, FileText, Users, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

interface LegalViewProps {
  page: 'about' | 'contact' | 'privacy' | 'terms';
}

const LegalView: React.FC<LegalViewProps> = ({ page }) => {
  const seoData = {
      about: { title: 'Sobre Nosotros | NombresInsta', desc: 'Conoce al equipo detrás del mejor generador de nombres en español.' },
      contact: { title: 'Contacto | NombresInsta', desc: 'Contáctanos para soporte o colaboraciones.' },
      privacy: { title: 'Política de Privacidad | NombresInsta', desc: 'Cómo protegemos tus datos en NombresInsta.' },
      terms: { title: 'Términos de Uso | NombresInsta', desc: 'Términos y condiciones legales de uso.' }
  };
  
  useSEO({
    title: seoData[page].title,
    description: seoData[page].desc,
    url: `/${page}`
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const renderContent = () => {
    const commonClasses = "prose prose-slate max-w-none text-slate-600 leading-relaxed";
    const date = "19 de diciembre de 2025";
    const domain = "https://nombresinsta.com/";
    const email = "info@nombresinsta.com";

    switch (page) {
      case 'about':
        return (
          <div className={commonClasses}>
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                <Users size={32} />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 m-0">Sobre Nosotros</h1>
            </div>
            
            <p className="text-xl text-slate-500 mb-8">
              Somos <strong>NombresInsta</strong>, la plataforma líder en generación de identidad digital en español.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">Nuestra Misión</h2>
            <p>
              En un mundo digital saturado, destacar es más difícil que nunca. Nuestra misión es simple: 
              <strong> ayudar a creadores, influencers y marcas a encontrar su identidad única en Instagram</strong> y otras redes sociales. 
              Creemos que un buen nombre es el primer paso hacia el éxito digital.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">¿Por qué NombresInsta?</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Innovación Constante:</strong> Nuestros algoritmos se actualizan mensualmente para reflejar las tendencias "aesthetic" y virales del 2025.</li>
              <li><strong>Privacidad Primero:</strong> A diferencia de otras apps, todo el procesamiento ocurre en tu navegador. No guardamos tus ideas.</li>
              <li><strong>Accesibilidad:</strong> Creemos que las herramientas profesionales de branding deben ser gratuitas y accesibles para todos.</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">El Equipo</h2>
            <p>
              NombresInsta.com fue fundado por un equipo de desarrolladores web y expertos en marketing digital apasionados por el SEO y la identidad de marca.
              Trabajamos incansablemente para mantener nuestra base de datos de palabras clave fresca y relevante.
            </p>
          </div>
        );

      case 'contact':
        return (
          <div className={commonClasses}>
             <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
                <Mail size={32} />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 m-0">Contacto</h1>
            </div>

            <p className="text-lg mb-8">
              ¿Tienes alguna sugerencia, encontraste un error o simplemente quieres saludar? Nos encantaría escucharte.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center my-10">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Correo Electrónico Oficial</h3>
              <p className="text-slate-500 mb-6">Para consultas generales, colaboraciones o soporte técnico:</p>
              <a href={`mailto:${email}`} className="text-2xl font-bold text-pink-600 hover:text-pink-700 transition underline decoration-2 decoration-pink-200 hover:decoration-pink-600">
                {email}
              </a>
              <p className="text-sm text-slate-400 mt-4">
                Intentamos responder a todos los correos en un plazo de 24 a 48 horas hábiles.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">Redes Sociales</h2>
            <p>
              Actualmente, nuestro canal principal de comunicación es el correo electrónico. Próximamente anunciaremos nuestras redes oficiales.
            </p>
          </div>
        );

      case 'privacy':
        return (
          <div className={commonClasses}>
             <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                <Lock size={32} />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 m-0">Política de Privacidad</h1>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
              <p className="text-sm text-yellow-800 font-medium">
                Última actualización: {date}
              </p>
            </div>

            <p>
              En <strong>{domain}</strong>, la privacidad de nuestros visitantes es de extrema importancia para nosotros. Este documento de política de privacidad describe los tipos de información personal que recibe y recopila NombresInsta y cómo se utiliza.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">1. Información que recopilamos</h2>
            <p>
              <strong>Archivos de registro (Logs):</strong> Al igual que muchos otros sitios web, NombresInsta hace uso de archivos de registro. La información dentro de los archivos de registro incluye direcciones de protocolo de Internet (IP), tipo de navegador, proveedor de servicios de Internet (ISP), sello de fecha / hora, páginas de referencia / salida y número de clics para analizar tendencias, administrar el sitio, rastrear el movimiento del usuario alrededor del sitio y recopilar información demográfica. Las direcciones IP y otra información similar no están vinculadas a ninguna información que sea personalmente identificable.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">2. Cookies y Web Beacons</h2>
            <p>
              NombresInsta utiliza cookies para almacenar información sobre las preferencias de los visitantes, registrar información específica del usuario sobre qué páginas accede o visita el usuario, personalizar el contenido de la página web según el tipo de navegador de los visitantes u otra información que el visitante envía a través de su navegador.
            </p>
            <p className="mt-2">
              <strong>DoubleClick DART Cookie:</strong> Google, como proveedor externo, utiliza cookies para publicar anuncios en NombresInsta. El uso de Google de la cookie DART le permite publicar anuncios a los usuarios basados en su visita a NombresInsta y otros sitios en Internet. Los usuarios pueden optar por no usar la cookie DART visitando la política de privacidad de la red de contenido y anuncios de Google.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">3. Almacenamiento Local (Local Storage)</h2>
            <p>
              Utilizamos el almacenamiento local de su navegador ("Local Storage") para guardar sus nombres "Favoritos" generados en nuestra herramienta. Estos datos permanecen exclusivamente en su dispositivo y nunca se transmiten a nuestros servidores.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">4. Consentimiento</h2>
            <p>
              Al utilizar nuestro sitio web, usted acepta nuestra política de privacidad y acepta sus términos.
            </p>
          </div>
        );

      case 'terms':
        return (
          <div className={commonClasses}>
             <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-red-100 text-red-600 rounded-xl">
                <FileText size={32} />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 m-0">Términos y Condiciones</h1>
            </div>

            <div className="bg-slate-100 p-4 rounded-lg mb-8">
               <p className="text-sm text-slate-600 font-medium">
                Fecha de vigencia: {date}
              </p>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">1. Aceptación de los Términos</h2>
            <p>
              Al acceder y utilizar <strong>{domain}</strong>, usted acepta estar sujeto a estos Términos y Condiciones de Uso, todas las leyes y regulaciones aplicables, y acepta que es responsable del cumplimiento de las leyes locales aplicables. Si no está de acuerdo con alguno de estos términos, tiene prohibido usar o acceder a este sitio.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">2. Licencia de Uso</h2>
            <p>
              Se concede permiso para utilizar el generador de nombres de NombresInsta para fines personales y comerciales (creación de marcas). Sin embargo, usted no puede:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Intentar realizar ingeniería inversa de cualquier software contenido en el sitio web de NombresInsta.</li>
              <li>Utilizar el sitio para enviar spam o generar nombres con fines maliciosos, ofensivos o ilegales.</li>
              <li>Eliminar cualquier derecho de autor u otras notaciones de propiedad de los materiales.</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">3. Descargo de Responsabilidad</h2>
            <p>
              Los materiales en el sitio web de NombresInsta se proporcionan "tal cual". NombresInsta no ofrece garantías, expresas o implícitas, y por la presente renuncia y niega todas las demás garantías, incluidas, entre otras, las garantías implícitas o las condiciones de comerciabilidad.
            </p>
            <p className="mt-2">
              Además, no garantizamos que los nombres generados estén disponibles en Instagram o cualquier otra plataforma. Es responsabilidad del usuario verificar la disponibilidad antes de usar el nombre.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">4. Limitaciones</h2>
            <p>
              En ningún caso NombresInsta o sus proveedores serán responsables de ningún daño (incluidos, entre otros, daños por pérdida de datos o beneficios, o debido a la interrupción del negocio) que surjan del uso o la incapacidad de usar los materiales en el sitio web de NombresInsta.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">5. Modificaciones</h2>
            <p>
              NombresInsta puede revisar estos términos de servicio para su sitio web en cualquier momento sin previo aviso. Al utilizar este sitio web, usted acepta estar sujeto a la versión actual de estos términos de servicio.
            </p>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          to="/"
          className="group flex items-center text-slate-500 hover:text-pink-600 transition mb-8 font-medium w-fit"
        >
          <div className="bg-slate-100 group-hover:bg-pink-50 p-2 rounded-full mr-3 transition">
            <ArrowLeft size={20} />
          </div>
          Volver al Generador
        </Link>
        
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default LegalView;