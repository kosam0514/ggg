
import React, { useState, useEffect } from 'react';
import { CHARACTERS, COMMON_RANGE, BASE_IMAGE_URL, IMAGE_DESCRIPTIONS } from './constants';
import { Character } from './types';
import ImageCard from './components/ImageCard';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const [previewImageId, setPreviewImageId] = useState<number | null>(null);

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {cards}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-200">
      {/* Navigation */}
      <header className="bureau-gradient text-white sticky top-0 z-50 shadow-2xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div 
              className="flex items-center space-x-4 cursor-pointer group"
              onClick={() => { setActiveTab('overview'); setSelectedChar(null); window.scrollTo(0,0); }}
            >
              <div className="bg-white text-slate-900 w-10 h-10 rounded-lg flex items-center justify-center font-black text-xl shadow-lg transition-transform group-hover:scale-105">N</div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-black tracking-tighter leading-none">N.P.S.I</h1>
                <p className="text-[9px] text-slate-400 uppercase tracking-[0.2em] font-bold mt-1">National Special Incentive</p>
              </div>
            </div>
            
            <nav className="flex space-x-1 sm:space-x-4 md:space-x-8 text-xs sm:text-sm font-bold uppercase tracking-widest">
              <button 
                onClick={() => { setActiveTab('overview'); setSelectedChar(null); }}
                className={`px-3 py-2 transition-all rounded-md ${activeTab === 'overview' ? 'bg-white/10 text-blue-300' : 'text-slate-400 hover:text-white'}`}
              >
                World
              </button>
              {CHARACTERS.map(char => (
                <button 
                  key={char.id}
                  onClick={() => { setActiveTab('character'); setSelectedChar(char); }}
                  className={`px-3 py-2 transition-all rounded-md ${selectedChar?.id === char.id ? 'bg-white/10 text-blue-300' : 'text-slate-400 hover:text-white'}`}
                >
                  {char.name}
                </button>
              ))}
              <button 
                onClick={() => { setActiveTab('common'); setSelectedChar(null); }}
                className={`px-3 py-2 transition-all rounded-md ${activeTab === 'common' ? 'bg-white/10 text-blue-300' : 'text-slate-400 hover:text-white'}`}
              >
                Common
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Worldview Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-16 animate-in fade-in duration-1000">
            <div className="relative p-12 bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
              <div className="absolute top-[-10%] right-[-5%] text-slate-50 text-[300px] opacity-30 select-none pointer-events-none">
                <i className="fa-solid fa-landmark"></i>
              </div>
              
              <div className="relative z-10 max-w-3xl space-y-8">
                <div className="inline-flex items-center space-x-3 px-4 py-2 bg-blue-50 rounded-full border border-blue-100">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Project Identification: NPSI-2030</span>
                </div>
                
                <h2 className="text-5xl font-black tracking-tighter text-slate-900 leading-none">
                  당신의 오늘이 <br/>
                  <span className="text-blue-600">헛되지 않도록.</span>
                </h2>
                
                <div className="grid sm:grid-cols-2 gap-10 text-slate-600">
                  <div className="space-y-4">
                    <p className="font-bold text-slate-900 text-lg">국가 공인 특별 복지</p>
                    <p className="leading-relaxed text-sm">2030년, 불확실한 미래 연금 대신 현재의 확실한 안정을 제공하는 국가적 차원의 특별 인센티브 제도입니다. 청년들의 성실한 납세와 기여에 대한 최고의 보답입니다.</p>
                  </div>
                  <div className="space-y-4">
                    <p className="font-bold text-slate-900 text-lg">전문적인 관리 체계</p>
                    <p className="leading-relaxed text-sm">모든 서비스는 국가 자격증을 소지한 전문 요원에 의해 행정 절차에 따라 안전하고 투명하게 진행됩니다. 안정적인 케어가 본 프로젝트의 핵심 가치입니다.</p>
                  </div>
                </div>
              </div>
            </div>

            <section>
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-2xl font-black tracking-tight flex items-center">
                  <span className="w-8 h-1 bg-blue-600 mr-4"></span>
                  파견 전담 요원 프로필
                </h3>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {CHARACTERS.map(char => (
                  <div 
                    key={char.id} 
                    onClick={() => { setActiveTab('character'); setSelectedChar(char); window.scrollTo(0,0); }}
                    className="bg-white p-10 rounded-[2rem] border border-slate-200 hover:border-blue-500/50 hover:shadow-2xl transition-all cursor-pointer group flex flex-col items-center text-center"
                  >
                    <div className={`w-20 h-20 ${char.themeColor} rounded-2xl flex items-center justify-center mb-8 shadow-xl transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                      <i className="fa-solid fa-user-shield text-white text-3xl"></i>
                    </div>
                    <h4 className="text-2xl font-black mb-1">{char.name}</h4>
                    <p className={`text-[11px] font-bold uppercase tracking-widest mb-6 ${char.accentColor}`}>{char.position}</p>
                    <p className="text-sm text-slate-500 leading-relaxed mb-8 line-clamp-3 italic">"{char.description}"</p>
                    <div className="mt-auto px-6 py-2 bg-slate-50 rounded-full text-[10px] font-black text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-colors uppercase tracking-[0.2em]">
                      View Dossier
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Character Dossier View */}
        {activeTab === 'character' && selectedChar && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className={`relative p-12 rounded-[2.5rem] text-white ${selectedChar.themeColor} shadow-3xl overflow-hidden`}>
              <div className="absolute right-[-5%] top-[-10%] opacity-5 text-[500px] select-none pointer-events-none transform rotate-12">
                <i className="fa-solid fa-fingerprint"></i>
              </div>
              
              <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-4 xl:col-span-3">
                  <div className="relative group cursor-zoom-in" onClick={() => setPreviewImageId(selectedChar.imageRange[0])}>
                    <div className="absolute inset-0 bg-blue-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                    <img 
                      src={`${BASE_IMAGE_URL}${selectedChar.imageRange[0]}.jpg`} 
                      className="relative w-full aspect-[3/4] object-cover rounded-3xl shadow-2xl border border-white/10 transition-transform duration-500 group-hover:scale-[1.02]" 
                      alt={selectedChar.name}
                    />
                  </div>
                </div>
                
                <div className="lg:col-span-8 xl:col-span-9 space-y-8">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                      <h2 className="text-6xl font-black tracking-tighter">{selectedChar.name}</h2>
                      <p className={`${selectedChar.accentColor} font-black uppercase tracking-[0.3em] text-sm mt-2`}>{selectedChar.position}</p>
                    </div>
                    <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                      <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Employee Age:</span>
                      <span className="text-lg font-black">{selectedChar.age}</span>
                    </div>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="bg-black/30 backdrop-blur-xl p-6 rounded-3xl border border-white/5 space-y-3">
                      <p className="text-white/30 text-[10px] font-black uppercase tracking-widest">Physical Profile</p>
                      <p className="text-sm font-medium leading-relaxed opacity-90">{selectedChar.appearance}</p>
                    </div>
                    <div className="bg-black/30 backdrop-blur-xl p-6 rounded-3xl border border-white/5 space-y-3">
                      <p className="text-white/30 text-[10px] font-black uppercase tracking-widest">Behavioral Matrix</p>
                      <p className="text-sm font-medium leading-relaxed opacity-90">{selectedChar.personality}</p>
                    </div>
                  </div>
                  
                  <div className="pt-6">
                    <p className="text-xl text-white/90 leading-relaxed font-light italic">"{selectedChar.description}"</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-6 border-b border-slate-200 pb-8">
              <h3 className="text-3xl font-black tracking-tighter text-slate-900">IMAGE REPOSITORY</h3>
              <div className="flex-grow h-px bg-slate-200"></div>
              <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Total {selectedChar.imageRange[1] - selectedChar.imageRange[0] + 1} Files</div>
            </div>

            {renderGallery(selectedChar.imageRange[0], selectedChar.imageRange[1])}
          </div>
        )}

        {/* Common Repository View */}
        {activeTab === 'common' && (
          <div className="space-y-12 animate-in fade-in duration-700">
             <div className="bg-slate-900 p-16 rounded-[3rem] text-white shadow-3xl text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 to-transparent"></div>
              <div className="relative z-10 space-y-4">
                <h2 className="text-5xl font-black tracking-tighter">GENERAL DATA</h2>
                <p className="text-slate-400 max-w-xl mx-auto font-medium">N.P.S.I 본청 시설 관리 데이터 및 공식 운영 매뉴얼 라이브러리입니다.</p>
              </div>
            </div>
            {renderGallery(COMMON_RANGE[0], COMMON_RANGE[1])}
          </div>
        )}

      </main>

      {/* Image Detail Modal */}
      {previewImageId !== null && (
        <div 
          className="fixed inset-0 z-[100] bg-slate-950/98 backdrop-blur-xl flex items-center justify-center p-4 lg:p-12 animate-in fade-in duration-500"
          onClick={() => setPreviewImageId(null)}
        >
          <button className="absolute top-10 right-10 text-white/20 hover:text-white transition-all hover:scale-125 z-[110]">
            <i className="fa-solid fa-xmark text-5xl"></i>
          </button>
          
          <div 
            className="relative w-full max-w-7xl flex flex-col lg:flex-row bg-slate-900 rounded-[3rem] overflow-hidden shadow-[0_0_150px_rgba(0,0,0,0.8)] border border-white/5 h-full max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="lg:w-[65%] bg-black flex items-center justify-center p-4 border-r border-white/5">
              <img 
                src={`${BASE_IMAGE_URL}${previewImageId}.jpg`} 
                className="max-w-full max-h-full object-contain shadow-2xl"
                alt="Detailed View"
              />
            </div>
            
            <div className="lg:w-[35%] p-12 flex flex-col justify-between bg-slate-900 overflow-y-auto">
              <div className="space-y-12">
                <div className="space-y-4">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">Record ID</span>
                  </div>
                  <h3 className="text-6xl font-black text-white tracking-tighter">#{previewImageId.toString().padStart(3, '0')}</h3>
                </div>
                
                <div className="space-y-6">
                  <h4 className="text-[12px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center">
                    <i className="fa-solid fa-file-invoice mr-3 text-blue-500"></i>
                    Official Data Entry
                  </h4>
                  <div className="bg-white/5 rounded-3xl p-8 border border-white/5">
                    <p className="text-slate-100 text-xl leading-relaxed font-light whitespace-pre-wrap">
                      {IMAGE_DESCRIPTIONS[previewImageId] || (
                        <span className="text-slate-600 italic">No official data recorded for this entry.</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 pt-8 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 opacity-30">
                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-[10px] text-white font-bold">HQ</div>
                    <div className="text-[9px] font-mono text-slate-400 uppercase tracking-tighter">NPSI Internal Storage <br/>Secure Session Active</div>
                  </div>
                  <i className="fa-solid fa-lock text-slate-700 text-xl"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-20 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center space-x-8 mb-10">
            <div className="w-20 h-px bg-slate-200"></div>
            <div className="flex items-center space-x-3 text-slate-300">
               <i className="fa-solid fa-building-shield text-2xl"></i>
               <span className="text-xs font-black uppercase tracking-[0.5em]">N.P.S.I Office of Administration</span>
            </div>
            <div className="w-20 h-px bg-slate-200"></div>
          </div>
          
          <div className="max-w-2xl mx-auto space-y-4">
            <p className="text-sm text-slate-500 font-medium">
              본 포털은 국가 복지 인센티브 프로젝트의 공식 기록 보관소입니다. <br/>
              모든 이미지는 해당 요원의 승인 하에 등록되었습니다.
            </p>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
              &copy; 2030 National Pension Special Incentive. Service for Tomorrow.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
