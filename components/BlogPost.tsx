import React, { useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, Share2, Sparkles } from 'lucide-react';
import { blogPosts } from '../data/blogData';

interface BlogPostProps {
  postId: string;
  onBack: () => void;
  onGoToGenerator: () => void;
}

const BlogPost: React.FC<BlogPostProps> = ({ postId, onBack, onGoToGenerator }) => {
  const post = blogPosts.find(p => p.id === postId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [postId]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800">Artículo no encontrado</h2>
          <button onClick={onBack} className="text-pink-600 mt-4 hover:underline">Volver al Blog</button>
        </div>
      </div>
    );
  }

  return (
    <article className="bg-white min-h-screen pb-20">
      {/* Hero Header */}
      <div className={`w-full h-64 md:h-80 ${post.image} relative`}>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-4xl mx-auto px-4 h-full flex flex-col justify-end pb-8 md:pb-12 relative z-10">
          <button 
            onClick={onBack}
            className="absolute top-8 left-4 md:left-0 text-white/90 hover:text-white bg-black/20 hover:bg-black/30 backdrop-blur px-4 py-2 rounded-lg flex items-center transition text-sm font-medium"
          >
            <ArrowLeft size={16} className="mr-2" /> Volver
          </button>
          
          <span className="inline-block bg-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide w-fit mb-3">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight shadow-sm">
            {post.title}
          </h1>
          <div className="flex items-center text-white/90 text-sm space-x-4">
            <span className="flex items-center"><Calendar size={14} className="mr-1" /> {post.date}</span>
            <span className="flex items-center"><Clock size={14} className="mr-1" /> {post.readTime}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Main Content */}
        <div className="lg:col-span-8">
          <div 
            className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-a:text-pink-600 hover:prose-a:text-pink-700 prose-li:text-slate-600"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Engagement / Share */}
          <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
            <p className="text-slate-500 font-medium italic">¿Te ha sido útil este artículo?</p>
            <button className="flex items-center text-slate-500 hover:text-pink-600 transition">
              <Share2 size={20} className="mr-2" /> Compartir
            </button>
          </div>
        </div>

        {/* Sidebar / CTA */}
        <div className="lg:col-span-4 space-y-8">
          <div className="sticky top-24">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-center text-white shadow-xl">
              <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                <Sparkles size={32} className="text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3">¿Inspirado?</h3>
              <p className="text-slate-300 mb-6 leading-relaxed">
                Pon en práctica estos consejos y genera miles de ideas únicas ahora mismo.
              </p>
              <button 
                onClick={onGoToGenerator}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-4 rounded-xl shadow-lg transform transition hover:scale-105 active:scale-95"
              >
                Generar Nombres Gratis
              </button>
            </div>
          </div>
        </div>

      </div>
    </article>
  );
};

export default BlogPost;