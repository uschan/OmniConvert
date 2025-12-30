import React, { useState, useEffect } from 'react';
import { CategoryDefinition, HistoryItem } from '../types';
import { ArrowRightLeft, Copy, Check, Hash } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import CategoryVisual from './CategoryVisual';

interface UnitConverterProps {
  category: CategoryDefinition;
  onRecordHistory: (item: HistoryItem) => void;
}

const UnitConverter: React.FC<UnitConverterProps> = ({ category, onRecordHistory }) => {
  const { t } = useLanguage();
  const [fromUnit, setFromUnit] = useState(category.units[0].id);
  const [toUnit, setToUnit] = useState(category.units.length > 1 ? category.units[1].id : category.units[0].id);
  const [amount, setAmount] = useState<string>('1');
  const [result, setResult] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!category.units.find(u => u.id === fromUnit)) {
      setFromUnit(category.units[0].id);
    }
    if (!category.units.find(u => u.id === toUnit)) {
      setToUnit(category.units.length > 1 ? category.units[1].id : category.units[0].id);
    }
  }, [category, fromUnit, toUnit]);

  useEffect(() => {
    calculate();
  }, [amount, fromUnit, toUnit, category]);

  const calculate = () => {
    const val = parseFloat(amount);
    if (isNaN(val)) {
      setResult('---');
      return;
    }

    const fromDef = category.units.find(u => u.id === fromUnit);
    const toDef = category.units.find(u => u.id === toUnit);

    if (!fromDef || !toDef || !fromDef.toBase || !toDef.fromBase) {
      setResult('---');
      return;
    }

    const baseValue = fromDef.toBase(val);
    const finalValue = toDef.fromBase(baseValue);

    const formatted = Math.abs(finalValue) < 0.000001 || Math.abs(finalValue) > 1e9 
      ? finalValue.toExponential(4) 
      : parseFloat(finalValue.toFixed(6)).toString();

    setResult(formatted);
  };

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const getUnitName = (id: string, defaultName: string) => {
    const key = `u_${id}`;
    const translated = t(key);
    return translated === key ? defaultName : translated;
  };

  const handleSave = () => {
     if (result === '---') return;
     const fromDef = category.units.find(u => u.id === fromUnit);
     const toDef = category.units.find(u => u.id === toUnit);
     const catName = t(`cat_${category.id}`);

     onRecordHistory({
       id: crypto.randomUUID(),
       timestamp: Date.now(),
       type: 'conversion',
       description: `${catName} ${t('converters')}`,
       result: `${amount} ${fromDef?.symbol} = ${result} ${toDef?.symbol}`
     });
  };

  const handleCopy = () => {
    if (result !== '---') {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      handleSave();
    }
  };

  const fromDef = category.units.find(u => u.id === fromUnit);
  const toDef = category.units.find(u => u.id === toUnit);

  return (
    <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-start">
      
      {/* Visualization Panel (Left/Top) - New Addition */}
      <div className="hidden md:flex flex-col items-center justify-center p-6 glass-panel rounded-none border-l-4 border-cyber-primary w-full md:w-48 h-full min-h-[300px]">
        <h3 className="text-[10px] text-cyber-primary font-bold tracking-widest uppercase mb-6 text-center">
          LIVE_VISUAL // {category.id.toUpperCase()}
        </h3>
        <CategoryVisual category={category.id} />
        <div className="mt-8 space-y-2 w-full">
           <div className="h-[1px] w-full bg-slate-800"></div>
           <div className="flex justify-between text-[10px] text-slate-500 font-mono">
             <span>SENSOR</span>
             <span className="text-cyber-success">ACTIVE</span>
           </div>
           <div className="flex justify-between text-[10px] text-slate-500 font-mono">
             <span>CALIB</span>
             <span>100%</span>
           </div>
        </div>
      </div>

      {/* Main Glass Panel */}
      <div className="glass-panel p-1 rounded-none relative flex-1 w-full">
        {/* Decorative corner markers */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyber-primary"></div>
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyber-primary"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyber-primary"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyber-primary"></div>
        
        {/* Mobile-only visual header */}
        <div className="md:hidden absolute top-4 right-4 opacity-50">
           <CategoryVisual category={category.id} />
        </div>

        <div className="bg-black/40 p-6 md:p-10">
          <div className="flex flex-col gap-8 relative z-10">
            
            {/* INPUT SIDE */}
            <div className="w-full space-y-4">
              <label className="text-[10px] font-bold text-cyber-primary uppercase tracking-widest flex items-center gap-2">
                <Hash className="w-3 h-3" /> {t('from')}
              </label>
              <div className="relative group">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full text-4xl font-mono bg-transparent border-b-2 border-slate-700 text-white p-2 focus:border-cyber-primary focus:outline-none transition-colors placeholder-slate-800"
                  placeholder="0"
                />
                <select
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="w-full mt-2 bg-black border border-slate-800 text-sm text-slate-300 p-2 font-mono hover:border-cyber-primary focus:outline-none"
                >
                  {category.units.map(u => (
                    <option key={u.id} value={u.id}>{getUnitName(u.id, u.name)} ({u.symbol})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* SWAP ACTION */}
            <div className="flex justify-center -my-4 relative z-20">
               <button 
                onClick={handleSwap}
                className="relative p-3 bg-black border border-cyber-border hover:border-cyber-primary text-slate-400 hover:text-cyber-primary transition-all group rounded-full shadow-lg shadow-black"
                title={t('swap')}
              >
                <ArrowRightLeft className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              </button>
            </div>

            {/* OUTPUT SIDE */}
            <div className="w-full space-y-4">
              <label className="text-[10px] font-bold text-cyber-success uppercase tracking-widest flex items-center gap-2">
                 <Hash className="w-3 h-3" /> {t('to')}
              </label>
              <div className="relative">
                <div className="w-full text-4xl font-mono p-2 bg-transparent border-b-2 border-cyber-success/50 text-cyber-success text-glow min-h-[60px] flex items-center overflow-x-auto">
                  {result}
                  <span className="w-2 h-8 bg-cyber-success ml-1 animate-pulse"></span>
                </div>
                 <select
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="w-full mt-2 bg-black border border-slate-800 text-sm text-slate-300 p-2 font-mono hover:border-cyber-success focus:outline-none"
                >
                  {category.units.map(u => (
                    <option key={u.id} value={u.id}>{getUnitName(u.id, u.name)} ({u.symbol})</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* FOOTER ACTIONS */}
          <div className="mt-12 flex justify-between items-end border-t border-dashed border-slate-800 pt-6">
            <div className="text-[10px] text-slate-500 font-mono hidden md:block">
              LOGIC: {fromDef?.symbol} &gt;&gt; BASE &gt;&gt; {toDef?.symbol}
            </div>
            
            <button 
              onClick={handleCopy}
              className={`flex items-center gap-3 px-8 py-3 font-mono font-bold text-sm tracking-wider uppercase transition-all ${
                copied 
                  ? 'bg-cyber-success text-black border border-cyber-success' 
                  : 'bg-transparent text-cyber-primary border border-cyber-primary hover:bg-cyber-primary hover:text-black hover:shadow-neon'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? t('copied') : t('copy_result')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitConverter;
