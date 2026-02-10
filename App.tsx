
import React, { useState, useEffect } from 'react';
import { CHARACTERS, COMMON_RANGE, BASE_IMAGE_URL, IMAGE_DESCRIPTIONS } from './constants';
import { Character } from './types';
import ImageCard from './components/ImageCard';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const [previewImageId, setPreviewImageId] = useState<number | null>(null);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPreviewImageId(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const renderGallery = (start: number, end: number) => {
    const cards = [];
    for (let i = start; i <= end; i++) {
      cards.push(
        <ImageCard 
          key={i} 
          id={i} 
          description={IMAGE_DESCRIPTIONS[i] || ''} 
          onImageClick={(id) => setPreviewImageId(id)}
        />
      );
    }
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {cards}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-100">
      {/* Header */}
      <header className="bureau-gradient text-white sticky top-0 z-50 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div 
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => { setActiveTab('overview'); setSelectedChar(null); }}
            >
              <div className="bg-white text-slate-900 w-8 h-8 rounded flex items-center justify-center font-black group-hover:bg-blue-400 group-hover:text-white transition-colors">N</div>
              <div>
                <h1 className="text-lg font-bold tracking-tight">N.P.S.I</h1>
                <p className="text-[9px] text-slate-400 uppercase tracking-widest leading-none">Administrative Portal</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8 text-sm font-medium">
              <button 
                onClick={() => { setActiveTab('overview'); setSelectedChar(null); }}
                className={`hover:text-blue-300 transition-colors py-5 border-b-2 ${activeTab === 'overview' ? 'text-blue-300 border-blue-400' : 'border-transparent'}`}
              >
                Worldview
              </button>
              {CHARACTERS.map(char => (
                <button 
                  key={char.id}
                  onClick={() => { setActiveTab('character'); setSelectedChar(char); }}
                  className={`hover:text-blue-300 transition-colors py-5 border-b-2 ${selectedChar?.id === char.id ? 'text-blue-300 border-blue-400' : 'border-transparent'}`}
                >
                  {char.name}
                </button>
              ))}
              <button 
                onClick={() => { setActiveTab('common'); setSelectedChar(null); }}
                className={`hover:text-blue-300 transition-colors py-5 border-b-2 ${activeTab === 'common' ? 'text-blue-300 border-blue-400' : 'border-transparent'}`}
              >
                Common
              </button>
            </nav>
            <div className="flex items-center text-[10px] space-x-2 text-slate-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="tracking-tighter">SECURE ACCESS GRANTED</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Worldview Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-12 animate-in fade-in duration-700">
            <section className="bg-white p-10 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <i className="fa-solid fa-stamp text-[120px]"></i>
              </div>
              <div className="flex items-center space-x-5 mb-8">
                <div className="p-4 bg-slate-900 rounded-xl">
                  <i className="fa-solid fa-building-columns text-2xl text-white"></i>
                </div>
                <div>
                  <h2 className="text-3xl font-black tracking-tight">N.P.S.I 프로젝트 개요</h2>
                  <p className="text-blue-600 font-bold text-sm">“당신의 오늘이 헛되지 않도록.”</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-12 text-sm leading-relaxed text-slate-600">
                <div className="space-y-5">
                  <h3 className="font-bold text-slate-900 border-l-4 border-blue-600 pl-4 text-base uppercase tracking-tight">시행 배경 및 사회 인식</h3>
                  <p>2030년 국민 연금 고갈 위기에 대응하여 도입된 본 프로젝트는 청년층의 이탈 방지를 위한 합법적인 국가 복지 서비스입니다.</p>
                  <p>단순한 유흥이 아닌 '정부 보장 특별 인센티브'로 규정되어 사회 전반에서 긍정적인 평가를 받고 있습니다.</p>
                </div>
                <div className="space-y-5">
                  <h3 className="font-bold text-slate-900 border-l-4 border-blue-600 pl-4 text-base uppercase tracking-tight">운영 가이드라인</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start"><i className="fa-solid fa-check text-blue-500 mt-1 mr-3"></i> 과도한 자극보다 안정적인 케어와 행정적 절차 중심</li>
                    <li className="flex items-start"><i className="fa-solid fa-check text-blue-500 mt-1 mr-3"></i> 특별직 공무원 및 국가 공인 자격증 소지 요원 파견</li>
                    <li className="flex items-start"><i className="fa-solid fa-check text-blue-500 mt-1 mr-3"></i> 프리미엄 요금제(월 소득 15%) 가입자 대상 고품격 서비스</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-8 flex items-center tracking-tight">
                <i className="fa-solid fa-address-card mr-3 text-slate-400"></i>
                현장 파견 요원 명부
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {CHARACTERS.map(char => (
                  <div 
                    key={char.id} 
                    onClick={() => { setActiveTab('character'); setSelectedChar(char); window.scrollTo(0,0); }}
                    className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-blue-400 cursor-pointer transition-all hover:shadow-xl group relative overflow-hidden"
                  >
                    <div className={`w-14 h-14 ${char.themeColor} rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 shadow-lg`}>
                      <i className="fa-solid fa-user-shield text-white text-xl"></i>
                    </div>
                    <h3 className="text-xl font-bold mb-1">{char.name} <span className="text-xs font-normal text-slate-400 ml-2">AGE {char.age}</span></h3>
                    <p className={`text-xs font-bold mb-4 ${char.accentColor} uppercase tracking-tighter`}>{char.position}</p>
                    <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">{char.description}</p>
                    <div className="mt-6 flex justify-end">
                      <span className="text-[10px] font-bold text-slate-300 group-hover:text-blue-500 transition-colors uppercase tracking-widest">View Archive →</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Character View */}
        {activeTab === 'character' && selectedChar && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className={`p-10 rounded-3xl text-white ${selectedChar.themeColor} shadow-2xl relative overflow-hidden`}>
              <div className="absolute right-[-10%] top-[-20%] opacity-10 transform rotate-12">
                <i className="fa-solid fa-id-card text-[400px]"></i>
              </div>
              <div className="relative z-10 grid md:grid-cols-12 gap-10 items-center">
                <div className="md:col-span-4 lg:col-span-3">
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-2 border border-white/10 shadow-inner group cursor-zoom-in" onClick={() => setPreviewImageId(selectedChar.imageRange[0])}>
                    <img 
                      src={`${BASE_IMAGE_URL}${selectedChar.imageRange[0]}.jpg`} 
                      className="w-full aspect-[3/4] object-cover rounded-xl transition-transform duration-500 group-hover:scale-[1.02]" 
                      alt={selectedChar.name}
                    />
                  </div>
                </div>
                <div className="md:col-span-8 lg:col-span-9 space-y-6">
                  <div>
                    <h2 className="text-5xl font-black mb-2 tracking-tighter">{selectedChar.name}</h2>
                    <p className="text-blue-400 font-bold uppercase tracking-[0.2em] text-sm">{selectedChar.position}</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="bg-black/20 backdrop-blur-sm p-5 rounded-2xl border border-white/5">
                      <p className="text-white/40 text-[9px] uppercase font-black mb-2 tracking-widest">Visual Specs</p>
                      <p className="text-sm font-medium leading-relaxed">{selectedChar.appearance}</p>
                    </div>
                    <div className="bg-black/20 backdrop-blur-sm p-5 rounded-2xl border border-white/5">
                      <p className="text-white/40 text-[9px] uppercase font-black mb-2 tracking-widest">Behavioral Pattern</p>
                      <p className="text-sm font-medium leading-relaxed">{selectedChar.personality}</p>
                    </div>
                  </div>
                  <p className="text-lg text-white/90 leading-relaxed font-light">
                    {selectedChar.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-b border-slate-200 pb-6">
              <h3 className="text-2xl font-black tracking-tight">ARCHIVE DATA <span className="text-slate-300 font-light ml-3">#{selectedChar.imageRange[0]} - #{selectedChar.imageRange[1]}</span></h3>
              <div className="px-4 py-1.5 bg-slate-200 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Data Version 3.1.0
              </div>
            </div>

            {renderGallery(selectedChar.imageRange[0], selectedChar.imageRange[1])}
          </div>
        )}

        {/* Common View */}
        {activeTab === 'common' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
             <div className="bg-slate-900 p-12 rounded-3xl text-white shadow-2xl flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500 to-transparent"></div>
              <h2 className="text-4xl font-black mb-3 z-10">COMMON ARCHIVE</h2>
              <p className="text-slate-400 max-w-2xl z-10 font-medium">N.P.S.I 본청 시설 정보 및 공식 매뉴얼, 공통 상황 데이터를 포함하는 자료실입니다.</p>
            </div>
            {renderGallery(COMMON_RANGE[0], COMMON_RANGE[1])}
          </div>
        )}

      </main>

      {/* Image Preview Modal */}
      {previewImageId !== null && (
        <div 
          className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300"
          onClick={() => setPreviewImageId(null)}
        >
          <button 
            className="absolute top-10 right-10 text-white/30 hover:text-white text-4xl transition-all hover:rotate-90"
            onClick={() => setPreviewImageId(null)}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
          
          <div 
            className="relative max-w-6xl w-full flex flex-col lg:flex-row items-stretch bg-slate-900 rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="lg:w-2/3 bg-black flex items-center justify-center min-h-[50vh] lg:min-h-0 border-r border-white/5">
              <img 
                src={`${BASE_IMAGE_URL}${previewImageId}.jpg`} 
                className="max-h-[85vh] w-full object-contain"
                alt="Preview"
              />
            </div>
            <div className="lg:w-1/3 p-12 flex flex-col justify-between bg-slate-900 overflow-y-auto">
              <div className="space-y-10">
                <div className="pb-8 border-b border-white/10">
                  <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] block mb-2">NPSI Data Record</span>
                  <h3 className="text-4xl font-black text-white">#{previewImageId.toString().padStart(3, '0')}</h3>
                </div>
                
                <div>
                  <h4 className="text-[11px] font-black text-slate-500 uppercase mb-4 tracking-[0.2em] flex items-center">
                    <i className="fa-solid fa-file-lines mr-3"></i>
                    Official Description
                  </h4>
                  <div className="text-slate-200 text-lg leading-relaxed whitespace-pre-wrap font-light">
                    {IMAGE_DESCRIPTIONS[previewImageId] || (
                      <span className="text-slate-600 italic">현재 등록된 공식 설명 자료가 없습니다. (ID: {previewImageId})</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="pt-10 mt-10 border-t border-white/5 flex flex-col space-y-4">
                <div className="flex items-center space-x-3 grayscale opacity-30">
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-[10px] text-white font-bold">HQ</div>
                  <div className="text-[9px] font-mono text-slate-400">ADMINISTRATIVE PORTAL ACCESS GRANTED</div>
                </div>
                <p className="text-[9px] text-slate-600 font-mono tracking-tighter">본 이미지는 N.P.S.I 관리 시스템에 의해 암호화되어 보호받고 있습니다.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-white border-t border-slate-200 mt-20 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center space-x-6 mb-8">
            <div className="w-16 h-px bg-slate-300"></div>
            <div className="flex items-center space-x-2 text-slate-400">
               <i className="fa-solid fa-shield-halved text-lg"></i>
               <span className="text-[11px] font-black uppercase tracking-[0.4em]">Official Network</span>
            </div>
            <div className="w-16 h-px bg-slate-300"></div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed max-w-xl mx-auto">
            &copy; 2030 National Pension Special Incentive Administration. All Rights Reserved.<br/>
            본 포털의 모든 이미지와 데이터는 국가 보안 사항입니다. <br/>
            이미지 설명 수정은 시스템 개발 파일(<code className="bg-slate-100 px-1 rounded text-slate-600">constants.ts</code>)을 통해 직접 수행하십시오.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
