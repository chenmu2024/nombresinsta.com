import React from 'react';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { blogPosts } from '../data/blogData';
import { useSEO } from '../hooks/useSEO';

const BlogList: React.FC = () => {
  const navigate = useNavigate();

  useSEO({
    title: "Blog y Consejos | NombresInsta",
    description: "Guías expertas sobre cómo elegir el nombre perfecto para Instagram, tendencias aesthetic 2025 y estrategias de marca personal.",
    url: "/blog"
  });

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-pink-100 text-pink-600 rounded-2xl mb-4">
            <BookOpen size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Blog & Consejos
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Guías, estrategias y tendencias para dominar tu identidad en Instagram y redes sociales en 2025.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article 
              key={post.id} 
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 border border-slate-100 flex flex-col group cursor-pointer"
              onClick={() => navigate(`/blog/${post.id}`)}
            >
              {/* Image Placeholder / Gradient */}
              <div className={`h-48 w-full ${post.image} relative overflow-hidden`}>
                 <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition"></div>
                 <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-slate-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    {post.category}
                 </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center text-xs text-slate-400 mb-3 space-x-3">
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    {post.date}
                  </div>
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    {post.readTime}
                  </div>
                </div>

                <h2 className="text-xl font-bold text-slate-800 mb-3 leading-tight group-hover:text-pink-600 transition">
                  {post.title}
                </h2>
                <p className="text-slate-500 text-sm mb-4 flex-grow leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="mt-auto pt-4 border-t border-slate-100">
                  <button 
                    onClick={(e) => { e.stopPropagation(); navigate(`/blog/${post.id}`); }}
                    className="text-pink-600 font-semibold text-sm flex items-center hover:translate-x-1 transition"
                  >
                    Leer Artículo <ArrowRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;