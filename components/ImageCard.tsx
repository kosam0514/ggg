
import React from 'react';
import { BASE_IMAGE_URL } from '../constants';

interface ImageCardProps {
  id: number;
  description: string;
  onImageClick: (id: number) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ id, description, onImageClick }) => {
  return (
    <div 
      className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-blue-500/20 group cursor-pointer"
      onClick={() => onImageClick(id)}
    >
      <div className="relative aspect-[3/4] bg-slate-100 overflow-hidden">
        <img 
          src={`${BASE_IMAGE_URL}${id}.jpg`} 
          alt={`NPSI-DATA-${id}`}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Overlays */}
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-black px-3 py-1 rounded-full border border-white/10 shadow-lg tracking-widest">
            #{id.toString().padStart(3, '0')}
          </div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
          <div className="w-full flex justify-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <div className="bg-white/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.2em]">
              Expand View
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6 bg-white border-t border-slate-50">
        <p className="text-sm font-medium text-slate-700 leading-relaxed line-clamp-2 italic">
          {description ? `"${description}"` : <span className="text-slate-300 font-normal">No data entered.</span>}
        </p>
      </div>
    </div>
  );
};

export default ImageCard;
