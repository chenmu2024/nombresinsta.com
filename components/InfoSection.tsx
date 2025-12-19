import React from 'react';
import { Lightbulb, ShieldCheck, Zap, User, Briefcase, Heart, CheckCircle2, XCircle } from 'lucide-react';

const InfoSection: React.FC = () => {
  return (
    <div className="bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          <div className="p-8 bg-slate-50/50 rounded-[2rem] border border-slate-100 hover:shadow-xl hover:shadow-blue-100/50 hover:-translate-y-1 transition duration-300 group">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap size={28} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Rápido y Fácil</h3>
            <p className="text-slate-500 leading-relaxed">
              Genera cientos de combinaciones en milisegundos. Sin registros, sin descargas, directo al grano.
            </p>
          </div>
          <div className="p-8 bg-slate-50/50 rounded-[2rem] border border-slate-100 hover:shadow-xl hover:shadow-pink-100/50 hover:-translate-y-1 transition duration-300 group">
            <div className="w-14 h-14 bg-pink-100 text-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Lightbulb size={28} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Ideas Aesthetic</h3>
            <p className="text-slate-500 leading-relaxed">
              Algoritmos entrenados con las últimas tendencias visuales de Instagram para 2025.
            </p>
          </div>
          <div className="p-8 bg-slate-50/50 rounded-[2rem] border border-slate-100 hover:shadow-xl hover:shadow-green-100/50 hover:-translate-y-1 transition duration-300 group">
            <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck size={28} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">100% Seguro</h3>
            <p className="text-slate-500 leading-relaxed">
              Todo funciona localmente en tu navegador. Tus ideas son tuyas; no guardamos ningún dato.
            </p>
          </div>
        </div>

        {/* Long Form SEO Content */}
        <div className="grid lg:grid-cols-12 gap-12" id="tips">
          
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12 text-slate-600 leading-8 text-lg">
            <section>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Guía 2025: Cómo elegir el nombre perfecto</h2>
              <p className="mb-6">
                Tu nombre de usuario (@usuario) es tu identidad digital. Es lo primero que ven tus seguidores y lo que recordarán. Para crecer en Instagram en 2025, tu nombre debe ser fácil de encontrar y representar tu marca personal.
              </p>
              
              {/* SEO Table */}
              <div className="my-10 overflow-hidden border border-slate-200 rounded-2xl shadow-sm">
                <table className="min-w-full text-sm md:text-base text-left">
                  <thead className="bg-slate-50 text-slate-900 font-bold border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-5">✅ Lo que SÍ funciona</th>
                      <th className="px-6 py-5">❌ Lo que debes evitar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="bg-white hover:bg-slate-50 transition">
                      <td className="px-6 py-4 flex items-start"><CheckCircle2 size={20} className="text-green-500 mr-3 mt-0.5 shrink-0" /> Nombres cortos y memorables</td>
                      <td className="px-6 py-4 text-slate-500"><XCircle size={20} className="text-red-400 inline mr-2" /> Frases demasiado largas</td>
                    </tr>
                    <tr className="bg-slate-50/50 hover:bg-slate-50 transition">
                      <td className="px-6 py-4 flex items-start"><CheckCircle2 size={20} className="text-green-500 mr-3 mt-0.5 shrink-0" /> Uso limpio de puntos (.)</td>
                      <td className="px-6 py-4 text-slate-500"><XCircle size={20} className="text-red-400 inline mr-2" /> Exceso de números</td>
                    </tr>
                    <tr className="bg-white hover:bg-slate-50 transition">
                      <td className="px-6 py-4 flex items-start"><CheckCircle2 size={20} className="text-green-500 mr-3 mt-0.5 shrink-0" /> Palabras clave (ej. 'foto')</td>
                      <td className="px-6 py-4 text-slate-500"><XCircle size={20} className="text-red-400 inline mr-2" /> Caracteres difíciles</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Targeted SEO Categories */}
            <section className="space-y-8">
              <div id="cat-mujer" className="bg-gradient-to-br from-pink-50 to-white p-8 rounded-[2rem] border border-pink-100 scroll-mt-24 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="bg-pink-100 p-2 rounded-lg mr-3">
                    <Heart className="text-pink-500" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Nombres para Instagram de Mujer</h3>
                </div>
                <p>
                  ¿Buscas un nombre femenino y delicado? Para chicas, las tendencias actuales incluyen palabras en inglés como <em>"honey", "soft", "angel", "baby"</em> o prefijos como <em>"soy", "miss", "its"</em>. Nuestro generador combina tu nombre con estos elementos para crear opciones elegantes y "aesthetic" que destacan en el feed.
                </p>
              </div>

              <div id="cat-hombre" className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-[2rem] border border-blue-100 scroll-mt-24 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <User className="text-blue-500" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Nombres para Instagram de Hombre</h3>
                </div>
                <p>
                  Para perfiles masculinos, la clave es la simplicidad, el estoicismo y el impacto. Usa el modo <strong>"Minimal"</strong> o <strong>"Funny"</strong>. Palabras como <em>"real", "official", "mr", "the"</em> o simplemente tu nombre con guiones bajos estratégicos suelen funcionar mejor para transmitir confianza.
                </p>
              </div>

              <div id="cat-negocios" className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-[2rem] border border-purple-100 scroll-mt-24 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 p-2 rounded-lg mr-3">
                     <Briefcase className="text-purple-500" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Nombres para Empresas y Marcas</h3>
                </div>
                <p>
                  Si estás creando una cuenta profesional, selecciona la categoría <strong>"Business"</strong>. El generador añadirá términos profesionales como <em>"studio", "shop", "tienda", "oficial", "bazar"</em> o tu ubicación (<em>"mx", "es", "arg", "col"</em>). Esto es vital para el SEO local de Instagram.
                </p>
              </div>
            </section>

            <section id="faq" className="scroll-mt-24">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Preguntas Frecuentes</h2>
              <div className="space-y-6">
                {[
                  { q: "¿Qué hago si el nombre que quiero está ocupado?", a: "Es el problema #1 en Instagram. Nuestra herramienta soluciona esto sugiriendo variaciones inteligentes: añadiendo puntos (.), guiones bajos (_) o sufijos de moda." },
                  { q: "¿Qué son los nombres 'Aesthetic'?", a: "Los nombres aesthetic priorizan la apariencia visual. Suelen utilizar minúsculas, palabras en inglés suaves (como 'moon', 'honey') y caracteres limpios." },
                  { q: "¿Es gratis este generador?", a: "Sí, NombresInsta.com es 100% gratuito. Puedes generar ilimitadas combinaciones sin registro." }
                ].map((faq, i) => (
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
                <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50">
                  <h4 className="font-bold text-slate-900 mb-6 text-lg">Categorías Populares</h4>
                  <ul className="space-y-4">
                    {[
                      { href: "#cat-mujer", color: "bg-pink-400", label: "Aesthetic Mujer" },
                      { href: "#cat-hombre", color: "bg-blue-400", label: "Hombres y Chicos" },
                      { href: "#cat-negocios", color: "bg-purple-400", label: "Tiendas y Negocios" },
                      { href: "#generator", color: "bg-yellow-400", label: "Gamers y Otakus" }
                    ].map((link, i) => (
                      <li key={i}>
                        <a href={link.href} className="flex items-center p-3 rounded-xl hover:bg-slate-50 transition group">
                          <span className={`w-3 h-3 ${link.color} rounded-full mr-4 group-hover:scale-125 transition-transform`}></span>
                          <span className="text-slate-600 font-medium group-hover:text-slate-900">{link.label}</span>
                        </a>
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