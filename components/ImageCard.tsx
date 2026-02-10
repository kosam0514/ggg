
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
      className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden flex flex-col transition-all hover:shadow-lg hover:border-slate-300 group cursor-pointer"
      onClick={() => onImageClick(id)}
    >
      <div className="relative aspect-[3/4] bg-slate-100 overflow-hidden">
        <img 
          src={`${BASE_IMAGE_URL}${id}.jpg`} 
          alt={`NPSI-DATA-${id}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-2 left-2 bg-slate-900/80 text-white text-[10px] font-mono px-2 py-0.5 rounded backdrop-blur-sm z-10">
          ID: {id.toString().padStart(3, '0')}
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
          <i className="fa-solid fa-expand text-white opacity-0 group-hover:opacity-100 transition-opacity text-xl scale-90 group-hover:scale-100"></i>
        </div>
      </div>
      
      <div className="p-4 flex-grow bg-white">
        <p className="text-sm text-slate-600 leading-relaxed min-h-[3rem]">
          {description || <span className="text-slate-300 italic">설명 데이터가 비어있습니다.</span>}
        </p>
      </div>
    </div>
  );
};

export default ImageCard;
