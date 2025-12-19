import React from 'react';
import { Lightbulb, ShieldCheck, Zap } from 'lucide-react';

const InfoSection: React.FC = () => {
  return (
    <div className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="p-6 bg-slate-50 rounded-2xl">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Rápido y Fácil</h3>
            <p className="text-slate-600">
              Genera cientos de combinaciones en milisegundos. No necesitas registrarte ni descargar nada.
            </p>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl">
            <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-xl flex items-center justify-center mb-4">
              <Lightbulb size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Ideas Aesthetic</h3>
            <p className="text-slate-600">
              Nuestros algoritmos están diseñados para seguir las últimas tendencias visuales de Instagram.
            </p>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">100% Seguro</h3>
            <p className="text-slate-600">
              Todo funciona en tu navegador. No guardamos tus datos ni tus ideas de nombres.
            </p>
          </div>
        </div>

        {/* Long Form SEO Content */}
        <div className="max-w-3xl mx-auto space-y-12 text-slate-700 leading-relaxed" id="tips">
          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Cómo elegir el nombre perfecto para Instagram</h2>
            <p className="mb-4">
              Tu nombre de usuario es tu identidad digital. Es lo primero que ven tus seguidores y lo que recordarán. Aquí tienes algunos consejos clave para elegir un nombre inolvidable:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Mantenlo corto:</strong> Los nombres cortos son más fáciles de leer, recordar y teclear.</li>
              <li><strong>Evita números confusos:</strong> Si puedes, evita usar muchos números al final (como juan123456), ya que parece una cuenta bot.</li>
              <li><strong>Usa palabras clave:</strong> Si tu cuenta es de fotografía, intenta incluir palabras como 'ph', 'lens', 'pic' o 'shot'.</li>
              <li><strong>Sé consistente:</strong> Intenta usar el mismo nombre en TikTok, Twitter y YouTube para crear una marca personal sólida.</li>
            </ul>
          </section>

          <section id="faq">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Preguntas Frecuentes (FAQ)</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">¿Qué hago si el nombre que quiero está ocupado?</h3>
                <p>
                  Es muy común. Nuestra herramienta de <span className="font-semibold text-pink-600">Generador de Nombres para Instagram</span> te ayuda a encontrar variaciones añadiendo prefijos (como 'soy', 'official') o sufijos (como 'gram', 'vibe') que mantienen la esencia de tu idea original.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">¿Qué son los nombres "Aesthetic"?</h3>
                <p>
                  Los nombres aesthetic suelen utilizar palabras en inglés, caracteres especiales mínimos, y evocan sentimientos de calma, belleza o estilo de vida. Ejemplos incluyen palabras como 'moon', 'honey', 'soft' combinadas con tu nombre.
                </p>
              </div>
              
               <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">¿Es gratis este generador?</h3>
                <p>
                  Sí, NombresInsta es 100% gratuito y puedes usarlo tantas veces como quieras para encontrar el nick perfecto para tu perfil, cuenta de fans o negocio.
                </p>
              </div>
            </div>
          </section>
        </div>

      </div>
    </div>
  );
};

export default InfoSection;