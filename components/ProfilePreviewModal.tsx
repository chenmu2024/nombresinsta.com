import React from 'react';
import { X, MoreHorizontal, ArrowLeft, Grid, Users, Bookmark, BadgeCheck, Bell } from 'lucide-react';
import { GeneratedName, Platform } from '../types';

interface ProfilePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: GeneratedName | null;
  platform: Platform;
}

const ProfilePreviewModal: React.FC<ProfilePreviewModalProps> = ({ isOpen, onClose, name, platform }) => {
  if (!isOpen || !name) return null;

  const username = name.name;

  // Platform specific styles
  const isTikTok = platform === 'tiktok';
  const isInstagram = platform === 'instagram' || platform === 'twitter' || platform === 'youtube'; // Fallback to Insta layout for most

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      ></div>

      {/* Modal Container - Phone Shape (Responsive) */}
      <div className="relative bg-white dark:bg-black w-full max-w-[350px] h-[85vh] max-h-[700px] rounded-[2.5rem] shadow-2xl border-[6px] md:border-8 border-slate-900 overflow-hidden animate-scale-in flex flex-col">
        
        {/* Notch / Status Bar Area */}
        <div className="h-8 bg-white dark:bg-black flex justify-between px-6 items-center pt-2 shrink-0">
           <span className="text-[10px] font-bold text-slate-900 dark:text-white">9:41</span>
           <div className="flex space-x-1">
              <div className="w-4 h-2.5 bg-slate-900 dark:bg-white rounded-[2px]"></div>
              <div className="w-0.5 h-2.5 bg-slate-900 dark:bg-white"></div>
           </div>
        </div>

        {/* --- INSTAGRAM LAYOUT --- */}
        {isInstagram && (
            <div className="flex-1 overflow-y-auto scrollbar-hide">
                {/* Header */}
                <div className="flex justify-between items-center px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center space-x-1 font-bold text-lg text-slate-900 dark:text-white truncate max-w-[180px]">
                        <span className="truncate">{username}</span>
                        {/* Fake Verified Badge for Business/Aesthetic */}
                        <BadgeCheck size={14} className="text-blue-500 fill-blue-500 text-white shrink-0" />
                        <span className="bg-red-500 rounded-full w-2 h-2 ml-1 shrink-0"></span>
                    </div>
                    <div className="flex space-x-4 text-slate-900 dark:text-white shrink-0">
                        <Bell size={24} />
                        <MoreHorizontal size={24} />
                    </div>
                </div>

                {/* Profile Info */}
                <div className="px-4 py-4">
                    <div className="flex justify-between items-center mb-4">
                        {/* Avatar */}
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 shrink-0">
                           <div className="w-full h-full rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-white dark:border-black flex items-center justify-center overflow-hidden">
                              <span className="text-xl md:text-2xl font-bold text-slate-400 uppercase">{username.substring(0,2)}</span>
                           </div>
                        </div>
                        {/* Stats */}
                        <div className="flex flex-1 justify-around text-center text-slate-900 dark:text-white ml-2">
                            <div>
                                <div className="font-bold text-base md:text-lg">12</div>
                                <div className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400">Public...</div>
                            </div>
                            <div>
                                <div className="font-bold text-base md:text-lg">1.4k</div>
                                <div className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400">Seguidores</div>
                            </div>
                            <div>
                                <div className="font-bold text-base md:text-lg">482</div>
                                <div className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400">Seguidos</div>
                            </div>
                        </div>
                    </div>

                    {/* Bio */}
                    <div className="text-sm text-slate-900 dark:text-white mb-4">
                        <div className="font-bold truncate">{username} 🌟</div>
                        <div className="text-slate-600 dark:text-slate-300">Creator | Lifestyle</div>
                        <div>✨ Living the aesthetic life</div>
                        <div className="text-blue-900 dark:text-blue-400 truncate">link.bio/{username}</div>
                    </div>

                    {/* Buttons */}
                    <div className="flex space-x-2 mb-6">
                        <button className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold py-1.5 rounded-lg text-sm">
                            Editar perfil
                        </button>
                        <button className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold py-1.5 rounded-lg text-sm">
                            Compartir
                        </button>
                    </div>

                    {/* Highlights */}
                    <div className="flex space-x-4 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                         {[1,2,3,4].map(i => (
                             <div key={i} className="flex flex-col items-center space-y-1 shrink-0">
                                 <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"></div>
                             </div>
                         ))}
                    </div>

                    {/* Tab Bar */}
                    <div className="flex justify-around border-b border-slate-100 dark:border-slate-800 pb-2 mb-1">
                        <Grid size={24} className="text-slate-900 dark:text-white" />
                        <Users size={24} className="text-slate-400" />
                    </div>

                    {/* Grid Content */}
                    <div className="grid grid-cols-3 gap-0.5">
                         {[...Array(9)].map((_, i) => (
                             <div key={i} className="aspect-square bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition"></div>
                         ))}
                    </div>
                </div>
            </div>
        )}

        {/* --- TIKTOK LAYOUT --- */}
        {isTikTok && (
             <div className="flex-1 overflow-y-auto scrollbar-hide">
                <div className="flex justify-between items-center px-4 py-3 text-slate-900 dark:text-white">
                    <ArrowLeft size={24} />
                    <div className="font-bold flex items-center truncate max-w-[200px]">
                        {username} <ChevronDownIcon />
                    </div>
                    <MoreHorizontal size={24} />
                </div>

                <div className="flex flex-col items-center mt-4">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-slate-200 dark:bg-slate-700 mb-3 overflow-hidden border-2 border-slate-100">
                         <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-slate-400">
                             {username[0].toUpperCase()}
                         </div>
                    </div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center truncate max-w-[90%]">
                        @{username}
                    </h2>

                    <div className="flex space-x-6 mt-4 mb-4 text-center text-slate-900 dark:text-white">
                        <div>
                            <div className="font-bold text-lg">124</div>
                            <div className="text-xs text-slate-500">Siguiendo</div>
                        </div>
                        <div>
                            <div className="font-bold text-lg">53.2K</div>
                            <div className="text-xs text-slate-500">Seguidores</div>
                        </div>
                        <div>
                            <div className="font-bold text-lg">1.2M</div>
                            <div className="text-xs text-slate-500">Me gusta</div>
                        </div>
                    </div>

                    <div className="flex space-x-2 mb-6">
                        <button className="px-8 py-2.5 bg-pink-500 text-white font-semibold rounded-md text-sm">
                            Seguir
                        </button>
                        <button className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-md">
                            <ArrowLeft className="rotate-180" size={16} />
                        </button>
                    </div>
                     
                    <div className="w-full border-t border-slate-200 dark:border-slate-800 flex">
                         <div className="flex-1 py-3 flex justify-center border-b-2 border-slate-900 dark:border-white">
                            <Grid size={20} />
                         </div>
                         <div className="flex-1 py-3 flex justify-center text-slate-400">
                            <Bookmark size={20} />
                         </div>
                    </div>
                    <div className="grid grid-cols-3 gap-0.5 w-full">
                         {[...Array(6)].map((_, i) => (
                             <div key={i} className="aspect-[3/4] bg-slate-100 dark:bg-slate-800"></div>
                         ))}
                    </div>
                </div>
             </div>
        )}

        {/* Close Button Overlay */}
        <button 
            onClick={onClose}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 w-10 h-10 md:w-12 md:h-12 bg-slate-900 dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition z-50"
            aria-label="Cerrar vista previa"
        >
            <X size={20} className="md:w-6 md:h-6" />
        </button>
      </div>
    </div>
  );
};

// Helper icon
const ChevronDownIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="m6 9 6 6 6-6"/></svg>
)

export default ProfilePreviewModal;