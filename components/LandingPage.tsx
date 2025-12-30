import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowRight, ShieldCheck, Zap, Layers, Terminal, Cpu, Github, Instagram, Globe } from 'lucide-react';

interface LandingPageProps {
  onEnter: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  const { t, language, setLanguage } = useLanguage();
  const [bootSequence, setBootSequence] = useState(0);

  // Simulate a boot-up sequence text effect
  useEffect(() => {
    const timer = setInterval(() => {
      setBootSequence(prev => (prev < 100 ? prev + 1 : 100));
    }, 15);
    return () => clearInterval(timer);
  }, []);

  const socialLinks = [
    { 
      name: 'X', 
      url: 'https://x.com/uschan', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    },
    { 
      name: 'Github', 
      url: 'https://github.com/uschan', 
      icon: <Github className="w-4 h-4" /> 
    },
    { 
      name: 'Instagram', 
      url: 'https://www.instagram.com/bujjun', 
      icon: <Instagram className="w-4 h-4" /> 
    },
    { 
      name: 'Bluesky', 
      url: 'https://bsky.app/profile/wildsalt.bsky.social', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
           <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566 0.944 1.561 1.266 0.902 1.565c-.613.279-1.08 1.114-1.094 2.12-.014 1.03.22 4.435.485 5.27.265.835 1.561 2.457 2.257 3.014.696.557 2.053 1.218 2.053 1.218s-1.46-.238-3.32-1.39c-1.86-1.152-3.35-3.32-3.35-3.32s-1.146 7.172 4.234 9.474C6.568 19.866 9.804 20.35 12 17.033c2.196 3.317 5.432 2.833 9.883.914 5.38-2.302 4.234-9.474 4.234-9.474s-1.49 2.168-3.35 3.32c-1.86 1.152-3.32 1.39-3.32 1.39s1.357-.661 2.053-1.218c.696-.557 1.992-2.18 2.257-3.014.265-.835.5-4.24.485-5.27-.015-1.006-.48-1.84-1.094-2.12-.66-.3-1.665-.621-4.301 1.24C16.046 4.748 13.087 8.687 12 10.8Z"/>
        </svg>
      )
    },
    { 
      name: 'Discord', 
      url: 'https://discord.gg/26nJEhq6Yj', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
           <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
      )
    },
    { 
      name: 'PayPal', 
      url: 'https://paypal.me/wildsaltme?utm_source=wildsalt.me', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
           <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.946 5.05-4.336 6.7-8.326 6.7H9.15c-.493 0-.901.35-.981.843l-.732 4.63c-.047.301.181.563.487.563h3.41c.493 0 .901.35.981.843l.534 3.37c.047.301-.181.563-.487.563H8.056c-.365 0-.685-.239-.81-.577l-.17-.468z" />
        </svg>
      )
    },
  ];

  return (
    <div className="relative min-h-screen bg-cyber-bg text-slate-300 font-mono overflow-hidden scanlines flex flex-col">
      {/* Background Matrix Grid */}
      <div className="absolute inset-0 bg-cyber-grid pointer-events-none z-0"></div>
      
      {/* Abstract Glowing Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyber-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyber-accent/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Navigation (HUD Style) */}
      <nav className="relative z-10 w-full max-w-7xl mx-auto p-6 flex justify-between items-center border-b border-cyber-border/50 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border border-cyber-primary bg-cyber-primary/10 flex items-center justify-center">
            <Terminal className="w-5 h-5 text-cyber-primary animate-pulse-fast" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white font-sans uppercase">Omni<span className="text-cyber-primary">Convert</span></span>
            <span className="text-[10px] text-cyber-primary tracking-[0.2em] uppercase">Sys.v.2.0.4</span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
           <div className="hidden md:flex gap-1 text-xs font-mono border border-cyber-border px-1 py-1">
             {(['en', 'zh', 'ja'] as const).map((lang) => (
                <button 
                  key={lang}
                  onClick={() => setLanguage(lang)} 
                  className={`px-3 py-1 transition-all ${
                    language === lang 
                    ? 'bg-cyber-primary text-black font-bold' 
                    : 'text-slate-500 hover:text-cyber-primary hover:bg-cyber-primaryDim'
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
             ))}
           </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center px-4 py-20 text-center">
        
        {/* Decorative HUD Lines */}
        <div className="absolute left-8 top-1/3 h-24 w-[1px] bg-gradient-to-b from-transparent via-cyber-primary to-transparent opacity-50 hidden md:block"></div>
        <div className="absolute right-8 bottom-1/3 h-24 w-[1px] bg-gradient-to-b from-transparent via-cyber-accent to-transparent opacity-50 hidden md:block"></div>

        <div className="max-w-4xl mx-auto space-y-8">
           <div className="flex justify-center mb-6">
             <div className="bg-cyber-primaryDim border border-cyber-primary/30 px-4 py-1 text-cyber-primary text-xs font-mono uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-cyber-primary rounded-none animate-pulse"></span>
                System Initialized: {bootSequence}%
             </div>
           </div>
           
           <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white font-sans mb-2">
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-500">MASTER</span> <br/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary to-cyber-success text-glow">METRICS</span>
           </h1>
           
           <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed border-l-2 border-cyber-accent/50 pl-6 text-left md:text-center md:border-l-0 md:pl-0">
             {t('landing_subtitle')}
             <br />
             <span className="text-xs text-cyber-primary/60 mt-2 block font-mono">
               >> PROTOCOL: PRECISION_CALC // ENCRYPTION: LOCAL_ONLY
             </span>
           </p>

           <div className="pt-8">
             <button 
               onClick={onEnter}
               className="group relative inline-flex items-center justify-center px-10 py-5 bg-transparent overflow-hidden text-cyber-primary font-mono font-bold tracking-widest border border-cyber-primary hover:text-black transition-colors duration-300"
             >
               <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-cyber-primary rounded-full group-hover:w-full group-hover:h-56 opacity-100"></span>
               <span className="relative flex items-center gap-4">
                 {t('landing_start').toUpperCase()} <ArrowRight className="w-5 h-5" />
               </span>
             </button>
           </div>
        </div>
      </div>

      {/* Grid Features */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 shrink-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-cyber-border">
          {/* Feature 1 */}
          <div className="group p-8 border-r border-b border-cyber-border bg-cyber-panel/30 hover:bg-cyber-primaryDim/20 transition-all cursor-crosshair">
            <div className="mb-6 text-cyber-primary opacity-60 group-hover:opacity-100 transition-opacity">
              <Cpu className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 font-sans">{t('feat_precise')}</h3>
            <p className="text-sm text-slate-400 font-mono">{t('feat_precise_desc')}</p>
            <div className="mt-4 h-[1px] w-8 bg-cyber-primary group-hover:w-full transition-all duration-500"></div>
          </div>
          
          {/* Feature 2 */}
          <div className="group p-8 border-r border-b border-cyber-border bg-cyber-panel/30 hover:bg-cyber-primaryDim/20 transition-all cursor-crosshair">
            <div className="mb-6 text-cyber-success opacity-60 group-hover:opacity-100 transition-opacity">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 font-sans">{t('feat_secure')}</h3>
            <p className="text-sm text-slate-400 font-mono">{t('feat_secure_desc')}</p>
            <div className="mt-4 h-[1px] w-8 bg-cyber-success group-hover:w-full transition-all duration-500"></div>
          </div>

          {/* Feature 3 */}
          <div className="group p-8 border-r border-b border-cyber-border bg-cyber-panel/30 hover:bg-cyber-primaryDim/20 transition-all cursor-crosshair">
            <div className="mb-6 text-cyber-accent opacity-60 group-hover:opacity-100 transition-opacity">
              <Layers className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 font-sans">{t('feat_comprehensive')}</h3>
            <p className="text-sm text-slate-400 font-mono">{t('feat_comprehensive_desc')}</p>
            <div className="mt-4 h-[1px] w-8 bg-cyber-accent group-hover:w-full transition-all duration-500"></div>
          </div>
        </div>
      </div>

      {/* Footer / Status Bar with Social Links */}
      <footer className="relative z-10 py-10 border-t border-cyber-border bg-cyber-bg text-xs font-mono text-slate-500 flex flex-col items-center justify-center shrink-0">
        
        {/* Social Capsule */}
        <div className="flex items-center justify-center gap-4 bg-cyber-panel/80 border border-cyber-border rounded-full px-8 py-3 mb-6 shadow-[0_0_15px_rgba(0,0,0,0.5)] backdrop-blur-md">
           {socialLinks.map((link) => (
             <a 
               key={link.name}
               href={link.url}
               target="_blank"
               rel="noopener noreferrer"
               className="text-slate-400 hover:text-cyber-primary transition-all hover:scale-110 flex items-center justify-center"
               title={link.name}
             >
               {link.icon}
             </a>
           ))}
           <div className="w-[1px] h-4 bg-slate-700 mx-2"></div>
           <a 
              href="https://wildsalt.me/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-all hover:scale-110"
              title="WildSalt"
            >
              <Globe className="w-4 h-4" />
           </a>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center opacity-60">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyber-success animate-pulse"></span>
            SERVER STATUS: ONLINE
          </span>
          <span>LATENCY: 12ms</span>
          <span>© 2024 OMNICONVERT PRO</span>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
