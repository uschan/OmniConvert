import React, { useState, useEffect } from 'react';
import { 
  Menu, Search, Calculator, History as HistoryIcon, 
  ChevronRight, Github, Heart, Globe, Terminal, Box
} from 'lucide-react';
import { CATEGORIES } from './constants';
import { AppView, HistoryItem } from './types';
import UnitConverter from './components/UnitConverter';
import BMICalculator from './components/BMICalculator';
import LoanCalculator from './components/LoanCalculator';
import LandingPage from './components/LandingPage';
import { useLanguage } from './contexts/LanguageContext';

const App: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState<AppView>({ type: 'landing' });
  const [searchQuery, setSearchQuery] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('omni_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load history');
      }
    }
  }, []);

  const addToHistory = (item: HistoryItem) => {
    const newHistory = [item, ...history].slice(0, 50); 
    setHistory(newHistory);
    localStorage.setItem('omni_history', JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('omni_history');
  };

  const filteredCategories = CATEGORIES.filter(c => {
    const translatedName = t(`cat_${c.id}`);
    return translatedName.toLowerCase().includes(searchQuery.toLowerCase()) || 
           c.id.includes(searchQuery.toLowerCase());
  });

  const enterApp = () => {
    setCurrentView({ type: 'category', id: 'length' });
  };

  if (currentView.type === 'landing') {
    return <LandingPage onEnter={enterApp} />;
  }

  const renderContent = () => {
    if (showHistory) {
      return (
        <div className="max-w-4xl mx-auto animate-fade-in-up">
          <div className="flex justify-between items-center mb-6 border-b border-cyber-border pb-4">
            <h2 className="text-2xl font-bold text-white font-sans tracking-wide">
              LOGS <span className="text-cyber-primary">//</span> HISTORY
            </h2>
            {history.length > 0 && (
              <button 
                onClick={clearHistory}
                className="text-xs text-cyber-accent hover:text-white font-mono uppercase tracking-widest border border-cyber-accent/50 px-3 py-1 hover:bg-cyber-accent hover:border-cyber-accent transition-all"
              >
                [{t('clear_all')}]
              </button>
            )}
          </div>
          {history.length === 0 ? (
            <div className="text-center py-20 bg-cyber-panel/50 border border-cyber-border border-dashed">
              <HistoryIcon className="w-12 h-12 mx-auto text-slate-700 mb-3" />
              <p className="text-slate-500 font-mono text-sm">{t('no_history')}</p>
            </div>
          ) : (
            <div className="space-y-1">
               {history.map(item => (
                 <div key={item.id} className="group bg-cyber-panel/40 p-4 border-l-2 border-transparent hover:border-cyber-primary hover:bg-cyber-panel/80 transition-all flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <div className="font-mono">
                      <span className="text-[10px] text-slate-500 block mb-1">
                        {new Date(item.timestamp).toLocaleTimeString()}
                      </span>
                      <span className="text-sm text-cyber-primary group-hover:text-white transition-colors">
                        {item.result}
                      </span>
                      <span className="text-xs text-slate-400 block mt-1">
                         {item.description}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-600 uppercase tracking-widest border border-slate-800 px-2 py-0.5">
                      {item.type === 'conversion' ? 'UNIT_CONV' : 'CALC_OP'}
                    </div>
                 </div>
               ))}
            </div>
          )}
        </div>
      );
    }

    if (currentView.type === 'category') {
      const category = CATEGORIES.find(c => c.id === currentView.id);
      if (!category) return <div>Category not found</div>;
      
      const translatedCatName = t(`cat_${category.id}`);

      return (
        <div className="animate-fade-in-up">
          <div className="mb-8 flex items-end gap-4 border-b border-cyber-border/50 pb-6">
            <div className="w-16 h-16 bg-cyber-primary/10 border border-cyber-primary flex items-center justify-center text-cyber-primary">
              {React.cloneElement(category.icon as React.ReactElement<any>, { className: 'w-8 h-8' })}
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white font-sans uppercase tracking-tight">
                {translatedCatName}
              </h1>
              <p className="text-cyber-primary/60 font-mono text-xs mt-1">
                MODULE: {category.id.toUpperCase()} // STATUS: ACTIVE
              </p>
            </div>
          </div>
          <UnitConverter category={category} onRecordHistory={addToHistory} />
        </div>
      );
    }

    if (currentView.type === 'calculator') {
       return (
        <div className="animate-fade-in-up">
           <div className="mb-8 border-b border-cyber-border/50 pb-6">
             <h1 className="text-4xl font-bold text-white font-sans uppercase tracking-tight">
                {currentView.id === 'bmi' ? t('bmi_title') : t('loan_title')}
             </h1>
             <p className="text-cyber-accent/60 font-mono text-xs mt-1">
                EXEC: {currentView.id.toUpperCase()}_CALC // MODE: INTERACTIVE
             </p>
           </div>
           {currentView.id === 'bmi' ? <BMICalculator onRecordHistory={addToHistory} /> : <LoanCalculator onRecordHistory={addToHistory} />}
        </div>
       );
    }

    return <div>Dashboard</div>;
  };

  return (
    <div className="min-h-screen bg-cyber-bg text-slate-200 font-mono flex overflow-hidden">
      {/* Sidebar Grid Background */}
      <div className="fixed inset-0 bg-cyber-grid opacity-20 pointer-events-none z-0"></div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Terminal Style */}
      <aside 
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-cyber-panel border-r border-cyber-border z-50 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } flex flex-col shadow-[10px_0_30px_-10px_rgba(0,0,0,0.5)]`}
      >
        <div className="p-6 border-b border-cyber-border flex items-center gap-3 cursor-pointer bg-cyber-bg" onClick={() => setCurrentView({ type: 'landing'})}>
          <Terminal className="w-6 h-6 text-cyber-primary" />
          <span className="text-lg font-bold text-white font-sans tracking-widest uppercase">
            Omni<span className="text-cyber-primary">Cvt</span>
          </span>
        </div>

        <div className="p-4">
          <div className="relative group">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-600 group-focus-within:text-cyber-primary transition-colors" />
            <input 
              type="text" 
              placeholder={`> ${t('search_placeholder')}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-black border border-cyber-border text-sm text-cyber-primary focus:border-cyber-primary focus:outline-none focus:shadow-neon placeholder-slate-700 font-mono"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-2 py-2 space-y-8 custom-scrollbar">
          
          {/* Section: Calculators */}
          <div>
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-4 flex items-center gap-2">
              <Box className="w-3 h-3" /> APPS
            </h3>
            <div className="space-y-1 px-2">
              <button
                onClick={() => { setCurrentView({ type: 'calculator', id: 'bmi' }); setIsSidebarOpen(false); setShowHistory(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-medium transition-all border-l-2 ${
                  currentView.type === 'calculator' && currentView.id === 'bmi' && !showHistory
                    ? 'bg-cyber-accent/10 text-cyber-accent border-cyber-accent' 
                    : 'border-transparent text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Heart className="w-4 h-4" />
                {t('bmi_title').toUpperCase()}
              </button>
              <button
                onClick={() => { setCurrentView({ type: 'calculator', id: 'loan' }); setIsSidebarOpen(false); setShowHistory(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-medium transition-all border-l-2 ${
                  currentView.type === 'calculator' && currentView.id === 'loan' && !showHistory
                    ? 'bg-cyber-accent/10 text-cyber-accent border-cyber-accent' 
                    : 'border-transparent text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Calculator className="w-4 h-4" />
                {t('loan_title').toUpperCase()}
              </button>
            </div>
          </div>

          {/* Section: Converters */}
          <div>
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-4 flex items-center gap-2">
              <Terminal className="w-3 h-3" /> UNITS
            </h3>
            <div className="space-y-0.5 px-2">
              {filteredCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => { setCurrentView({ type: 'category', id: category.id }); setIsSidebarOpen(false); setShowHistory(false); }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium transition-all group border border-transparent ${
                    currentView.type === 'category' && currentView.id === category.id && !showHistory
                      ? 'bg-cyber-primary/10 text-cyber-primary border-cyber-primary/30' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={currentView.type === 'category' && currentView.id === category.id ? 'text-cyber-primary' : 'text-slate-600 group-hover:text-slate-400'}>
                      {category.icon}
                    </span>
                    {t(`cat_${category.id}`).toUpperCase()}
                  </div>
                  {currentView.type === 'category' && currentView.id === category.id && (
                    <div className="w-1.5 h-1.5 bg-cyber-primary shadow-neon"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Sidebar Footer */}
        <div className="p-4 border-t border-cyber-border bg-cyber-bg text-[10px] text-slate-600 font-mono">
           <div className="flex justify-between">
              <span>CPU: 12%</span>
              <span>MEM: 40MB</span>
           </div>
           <div className="w-full bg-slate-900 h-1 mt-1">
              <div className="bg-cyber-primary h-1 w-1/3 animate-pulse"></div>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-0">
        
        {/* Top Status Bar */}
        <header className="h-14 border-b border-cyber-border flex items-center justify-between px-4 lg:px-8 bg-cyber-bg/90 backdrop-blur-sm sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-cyber-primary"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden md:flex items-center text-xs text-slate-500 font-mono gap-2">
               <span>ROOT</span>
               <ChevronRight className="w-3 h-3" />
               <span>{currentView.type.toUpperCase()}</span>
               { 'id' in currentView && (
                 <>
                   <ChevronRight className="w-3 h-3" />
                   <span className="text-cyber-primary">{currentView.id.toUpperCase()}</span>
                 </>
               )}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             {/* Language Selector */}
             <div className="relative">
               <button 
                 onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                 className="flex items-center gap-2 px-3 py-1 bg-black border border-cyber-border text-xs text-slate-300 hover:border-cyber-primary hover:text-cyber-primary transition-all font-mono"
               >
                 <Globe className="w-3 h-3" />
                 <span>{language.toUpperCase()}</span>
               </button>
               
               {isLangMenuOpen && (
                 <>
                   <div className="fixed inset-0 z-10" onClick={() => setIsLangMenuOpen(false)}></div>
                   <div className="absolute right-0 top-full mt-2 w-32 bg-black border border-cyber-primary shadow-neon z-20 flex flex-col">
                     {['en', 'zh', 'ja'].map((l) => (
                       <button 
                        key={l}
                        onClick={() => { setLanguage(l as any); setIsLangMenuOpen(false); }}
                        className={`text-left px-4 py-2 text-xs font-mono hover:bg-cyber-primary hover:text-black ${language === l ? 'bg-cyber-primaryDim text-cyber-primary' : 'text-slate-400'}`}
                       >
                        {l.toUpperCase()}
                       </button>
                     ))}
                   </div>
                 </>
               )}
             </div>

            <button 
              onClick={() => setShowHistory(!showHistory)}
              className={`flex items-center gap-2 px-3 py-1 border transition-all font-mono text-xs ${
                showHistory 
                  ? 'bg-cyber-accent text-white border-cyber-accent shadow-[0_0_10px_theme("colors.cyber.accent")]' 
                  : 'bg-black border-cyber-border text-slate-400 hover:text-cyber-accent hover:border-cyber-accent'
              }`}
            >
              <HistoryIcon className="w-3 h-3" />
              <span className="hidden sm:inline">{t('history').toUpperCase()}</span>
            </button>
          </div>
        </header>

        {/* Content Render */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;