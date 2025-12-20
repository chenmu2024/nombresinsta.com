import React from 'react';
import { Link } from 'react-router-dom';
import { Lightbulb, ShieldCheck, Zap, User, Briefcase, Heart, CheckCircle2, XCircle } from 'lucide-react';

const InfoSection: React.FC = () => {
  
  // FAQ Data extraction for both UI and Schema
  const faqs = [
    { q: "¿Cómo funciona el Generador de Nombres para Instagram?", a: "Es muy sencillo. Solo ingresa una palabra clave (tu nombre, apodo o hobby) en el campo de texto. Nuestro Generador de Nombres para Instagram mezclará esa palabra con cientos de prefijos, sufijos y tendencias actuales para darte opciones únicas." },
    { q: "¿Es gratis este Generador de Nombres para Instagram?", a: "Sí, NombresInsta.com es una herramienta 100% gratuita. Puedes usar el Generador de Nombres para Instagram tantas veces como necesites sin pagar nada." },
    { q: "¿Qué hago si el nombre está ocupado?", a: "Es común. Por eso nuestro Generador de Nombres para Instagram te da muchas variaciones. Si tu primera opción está tomada, prueba con las sugerencias que añaden puntos (.) o términos como 'official' que suelen estar libres." },
    { q: "¿Sirve para otras redes sociales?", a: "¡Absolutamente! Aunque lo llamamos Generador de Nombres para Instagram, los resultados son perfectos para TikTok, Twitter (X), Twitch, YouTube y más." }
  ];

  // FAQ Schema JSON-LD
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  return (
    // content-visibility: auto skips rendering work for off-screen content
    <div className="bg-white border-t border-slate-100" style={{ contentVisibility: 'auto' }}>
      
      {/* Inject Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20">
        
        {/* Features Grid - Quick Value Props */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-8 mb-12 md:mb-24">
          <div className="p-6 md:p-8 bg-slate-50/50 rounded-[2rem] border border-slate-100 hover:shadow-xl hover:shadow-blue-100/50 hover:-translate-y-1 transition duration-300 group">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
              <Zap size={24} className="md:w-7 md:h-7" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 md:mb-3">Instantáneo</h3>
            <p className="text-sm md:text-base text-slate-500 leading-relaxed">
              Nuestro <strong>Generador de Nombres para Instagram</strong> procesa miles de palabras clave en milisegundos para darte resultados al instante.
            </p>
          </div>
          <div className="p-6 md:p-8 bg-slate-50/50 rounded-[2rem] border border-slate-100 hover:shadow-xl hover:shadow-pink-100/50 hover:-translate-y-1 transition duration-300 group">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-pink-100 text-pink-600 rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
              <Lightbulb size={24} className="md:w-7 md:h-7" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 md:mb-3">Ideas Aesthetic</h3>
            <p className="text-sm md:text-base text-slate-500 leading-relaxed">
              Algoritmos entrenados para crear usuarios que destacan. El único <strong>Generador de Nombres para Instagram</strong> enfocado en tendencias virales.
            </p>
          </div>
          <div className="p-6 md:p-8 bg-slate-50/50 rounded-[2rem] border border-slate-100 hover:shadow-xl hover:shadow-green-100/50 hover:-translate-y-1 transition duration-300 group">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck size={24} className="md:w-7 md:h-7" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 md:mb-3">100% Gratis</h3>
            <p className="text-sm md:text-base text-slate-500 leading-relaxed">
              Usa este <strong>Generador de Nombres para Instagram</strong> tantas veces como quieras. Sin registros, sin pagos y con total privacidad.
            </p>
          </div>
        </div>

        {/* Long Form SEO Content */}
        <div className="grid lg:grid-cols-12 gap-12" id="tips">
          
          {/* Main Content - Added min-w-0 to prevent grid overflow on mobile */}
          <div className="lg:col-span-8 space-y-8 md:space-y-12 text-slate-600 leading-7 md:leading-8 text-base md:text-lg min-w-0">
            <section>
              <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">El Mejor Generador de Nombres para Instagram en 2025</h2>
              <p className="mb-6">
                Elegir el usuario perfecto es el primer paso para el éxito en redes sociales. Sin embargo, encontrar disponibilidad es cada vez más difícil. Por eso hemos creado el <strong>Generador de Nombres para Instagram</strong> definitivo. Esta herramienta no solo combina palabras al azar; utiliza inteligencia contextual para crear nombres de usuario (usernames) que sean legibles, memorables y "aesthetic".
              </p>
              <p className="mb-6">
                Ya sea que busques ser un influencer de moda, abrir una tienda online o simplemente tener un perfil personal cool, nuestro <strong>Generador de Nombres para Instagram</strong> te ahorrará horas de frustración probando combinaciones manualmente.
              </p>
              
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mt-10 mb-4">¿Por qué usar un Generador de Nombres para Instagram?</h3>
              <ul className="list-disc pl-6 space-y-3 mb-6">
                <li><strong>Disponibilidad:</strong> Encontrar un nombre corto es casi imposible sin ayuda. Un <strong>Generador de Nombres para Instagram</strong> añade prefijos y sufijos estratégicos para encontrar huecos libres.</li>
                <li><strong>Originalidad:</strong> Sal de lo común. Nuestra herramienta sugiere palabras en inglés, latín y jerga actual que quizás no se te habían ocurrido.</li>
                <li><strong>SEO para tu Perfil:</strong> Si tienes un negocio, el <strong>Generador de Nombres para Instagram</strong> puede incluir tu rubro (ej. "tienda", "studio") para que los clientes te encuentren más fácil en el buscador.</li>
              </ul>
            </section>

            {/* Do's and Don'ts Table - Optimized padding for mobile */}
            <section>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-6">Consejos para elegir tu usuario</h3>
              <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-sm mb-8 w-full">
                <table className="min-w-full text-sm md:text-base text-left">
                  <thead className="bg-slate-50 text-slate-900 font-bold border-b border-slate-200">
                    <tr>
                      <th className="px-4 md:px-6 py-4 md:py-5 whitespace-nowrap">✅ Lo que hace un buen nombre</th>
                      <th className="px-4 md:px-6 py-4 md:py-5 whitespace-nowrap">❌ Lo que debes evitar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="bg-white hover:bg-slate-50 transition">
                      <td className="px-4 md:px-6 py-3 md:py-4 flex items-start min-w-[180px] md:min-w-[200px]"><CheckCircle2 size={20} className="text-green-500 mr-2 md:mr-3 mt-0.5 shrink-0" /> Corto y fácil de recordar</td>
                      <td className="px-4 md:px-6 py-3 md:py-4 text-slate-500 min-w-[180px] md:min-w-[200px]"><XCircle size={20} className="text-red-400 inline mr-2" /> Demasiado largo o complejo</td>
                    </tr>
                    <tr className="bg-slate-50/50 hover:bg-slate-50 transition">
                      <td className="px-4 md:px-6 py-3 md:py-4 flex items-start"><CheckCircle2 size={20} className="text-green-500 mr-2 md:mr-3 mt-0.5 shrink-0" /> Uso limpio de puntos (.)</td>
                      <td className="px-4 md:px-6 py-3 md:py-4 text-slate-500"><XCircle size={20} className="text-red-400 inline mr-2" /> Exceso de números (juan12345)</td>
                    </tr>
                    <tr className="bg-white hover:bg-slate-50 transition">
                      <td className="px-4 md:px-6 py-3 md:py-4 flex items-start"><CheckCircle2 size={20} className="text-green-500 mr-2 md:mr-3 mt-0.5 shrink-0" /> Define tu nicho o estilo</td>
                      <td className="px-4 md:px-6 py-3 md:py-4 text-slate-500"><XCircle size={20} className="text-red-400 inline mr-2" /> Caracteres imposibles de escribir</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                Al utilizar nuestro <strong>Generador de Nombres para Instagram</strong>, aplicamos estas reglas automáticamente. Filtramos las malas ideas para que solo veas opciones de alta calidad.
              </p>
            </section>

            {/* Targeted Categories - Optimized for Mobile Layout */}
            <section className="space-y-6 md:space-y-8 mt-12">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Categorías del Generador</h2>
              
              <div id="cat-mujer" className="bg-gradient-to-br from-pink-50 to-white p-6 md:p-8 rounded-[2rem] border border-pink-100 scroll-mt-24 shadow-sm">
                <div className="flex flex-row items-start mb-4">
                  <div className="bg-pink-100 p-2 rounded-lg mr-3 shrink-0">
                    <Heart className="text-pink-500" size={24} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight pt-1">Generador de Nombres para Instagram Mujer</h3>
                </div>
                <p>
                  Para perfiles femeninos, nuestro <strong>Generador de Nombres para Instagram</strong> prioriza términos "aesthetic", suaves y elegantes. Incluye palabras como <em>honey, soft, moon, lady</em> y combinaciones con tu nombre real para un toque personal y sofisticado.
                </p>
              </div>

              <div id="cat-hombre" className="bg-gradient-to-br from-blue-50 to-white p-6 md:p-8 rounded-[2rem] border border-blue-100 scroll-mt-24 shadow-sm">
                <div className="flex flex-row items-start mb-4">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3 shrink-0">
                    <User className="text-blue-500" size={24} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight pt-1">Generador de Nombres para Instagram Hombre</h3>
                </div>
                <p>
                  ¿Buscas algo más minimalista o urbano? El modo masculino del <strong>Generador de Nombres para Instagram</strong> crea usuarios con fuerza, usando prefijos como <em>iam, real, official, mr</em> o simplemente jugando con guiones bajos para un look limpio y profesional.
                </p>
              </div>

              <div id="cat-negocios" className="bg-gradient-to-br from-purple-50 to-white p-6 md:p-8 rounded-[2rem] border border-purple-100 scroll-mt-24 shadow-sm">
                <div className="flex flex-row items-start mb-4">
                  <div className="bg-purple-100 p-2 rounded-lg mr-3 shrink-0">
                     <Briefcase className="text-purple-500" size={24} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight pt-1">Generador para Empresas</h3>
                </div>
                <p>
                  Si tienes una marca, es vital que te encuentren. Usa la opción de Negocios en nuestro <strong>Generador de Nombres para Instagram</strong> para añadir automáticamente tu sector (tienda, agencia, studio) o tu país (mx, es, arg). Esto mejora tu visibilidad local inmediatamente.
                </p>
              </div>
            </section>

            <section id="faq" className="scroll-mt-24 mt-12">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">Preguntas Frecuentes</h2>
              <div className="space-y-6">
                {faqs.map((faq, i) => (
                  <div key={i} className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900 mb-3">{faq.q}</h3>
                    <p className="text-slate-500">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
             <div className="sticky top-28">
                <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50">
                  <h4 className="font-bold text-slate-900 mb-6 text-lg">Accesos Rápidos</h4>
                  <p className="text-sm text-slate-400 mb-4">Navega por las categorías de nuestro <strong>Generador de Nombres para Instagram</strong>:</p>
                  <ul className="space-y-4">
                    {[
                      { href: "/nombres-para-mujer", color: "bg-pink-400", label: "Nombres para Mujer" },
                      { href: "/nombres-para-hombre", color: "bg-blue-400", label: "Nombres para Hombre" },
                      { href: "/nombres-para-empresas", color: "bg-purple-400", label: "Nombres de Empresas" },
                      { href: "/nombres-aesthetic", color: "bg-yellow-400", label: "Nombres Aesthetic" }
                    ].map((link, i) => (
                      <li key={i}>
                        <Link to={link.href} className="flex items-center p-3 rounded-xl hover:bg-slate-50 transition group">
                          <span className={`w-3 h-3 ${link.color} rounded-full mr-4 group-hover:scale-125 transition-transform`}></span>
                          <span className="text-slate-600 font-medium group-hover:text-slate-900">{link.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default InfoSection;