import React, { useState } from 'react';
import { HistoryItem } from '../types';
import { Activity, Info } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';

interface BMICalculatorProps {
  onRecordHistory: (item: HistoryItem) => void;
}

const BMICalculator: React.FC<BMICalculatorProps> = ({ onRecordHistory }) => {
  const { t } = useLanguage();
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState('');

  const calculateBMI = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) return;

    let calculatedBMI = 0;
    if (unitSystem === 'metric') {
      const heightM = h / 100;
      calculatedBMI = w / (heightM * heightM);
    } else {
      calculatedBMI = 703 * (w / (h * h));
    }

    const finalBMI = Math.round(calculatedBMI * 10) / 10;
    setBmi(finalBMI);

    let catKey = '';
    if (finalBMI < 18.5) catKey = 'bmi_underweight';
    else if (finalBMI < 25) catKey = 'bmi_normal';
    else if (finalBMI < 30) catKey = 'bmi_overweight';
    else catKey = 'bmi_obese';
    
    setCategory(catKey);

    onRecordHistory({
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      type: 'calculator',
      description: t('bmi_title'),
      result: `BMI: ${finalBMI} (${t(catKey)})`
    });
  };

  const getGaugeData = () => {
    return [
      { name: t('bmi_underweight'), value: 18.5, color: '#0ea5e9' }, // Blue
      { name: t('bmi_normal'), value: 6.5, color: '#00ff9d' }, // Neon Green
      { name: t('bmi_overweight'), value: 5, color: '#fcee0a' }, // Warning Yellow
      { name: t('bmi_obese'), value: 20, color: '#ef4444' }, // Red
    ];
  };

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Input Panel */}
      <div className="glass-panel p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyber-primary to-transparent"></div>
        
        <div className="flex items-center gap-3 mb-8">
           <Activity className="w-5 h-5 text-cyber-primary" />
           <h2 className="text-lg font-bold text-white font-sans uppercase tracking-wider">{t('bmi_title')}</h2>
        </div>

        <div className="flex gap-4 mb-8">
          <button 
            onClick={() => { setUnitSystem('metric'); setBmi(null); }}
            className={`flex-1 py-3 text-xs font-mono uppercase tracking-widest border transition-all ${
                unitSystem === 'metric' 
                ? 'bg-cyber-primary/20 border-cyber-primary text-cyber-primary' 
                : 'bg-transparent border-slate-800 text-slate-500 hover:border-slate-600'
            }`}
          >
            {t('bmi_metric')}
          </button>
          <button 
            onClick={() => { setUnitSystem('imperial'); setBmi(null); }}
            className={`flex-1 py-3 text-xs font-mono uppercase tracking-widest border transition-all ${
                unitSystem === 'imperial' 
                ? 'bg-cyber-primary/20 border-cyber-primary text-cyber-primary' 
                : 'bg-transparent border-slate-800 text-slate-500 hover:border-slate-600'
            }`}
          >
            {t('bmi_imperial')}
          </button>
        </div>

        <div className="space-y-6">
          <div className="group">
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2 group-focus-within:text-cyber-primary">
              {t('bmi_height')} ({unitSystem === 'metric' ? 'cm' : 'inches'})
            </label>
            <input 
              type="number" 
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full bg-black border border-slate-700 p-3 text-white font-mono focus:border-cyber-primary focus:outline-none focus:shadow-[0_0_10px_rgba(0,240,255,0.2)] transition-all"
              placeholder="0"
            />
          </div>
          
          <div className="group">
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2 group-focus-within:text-cyber-primary">
              {t('bmi_weight')} ({unitSystem === 'metric' ? 'kg' : 'lbs'})
            </label>
            <input 
              type="number" 
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full bg-black border border-slate-700 p-3 text-white font-mono focus:border-cyber-primary focus:outline-none focus:shadow-[0_0_10px_rgba(0,240,255,0.2)] transition-all"
              placeholder="0"
            />
          </div>

          <button 
            onClick={calculateBMI}
            className="w-full py-4 mt-4 bg-cyber-primary text-black font-bold font-mono tracking-widest hover:bg-white hover:shadow-[0_0_15px_white] transition-all"
          >
            [ {t('bmi_calc_btn')} ]
          </button>
        </div>
      </div>

      {/* Result Panel */}
      <div className="glass-panel p-8 flex flex-col justify-center items-center relative min-h-[400px]">
        {/* Background Grid for Panel */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

        {bmi ? (
          <div className="relative z-10 w-full flex flex-col items-center">
             <div className="relative w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={getGaugeData()}
                      cx="50%"
                      cy="100%"
                      startAngle={180}
                      endAngle={0}
                      innerRadius={80}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {getGaugeData().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#000', border: '1px solid #333', color: '#fff', fontFamily: 'monospace' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-center -mb-8">
                   <span className="text-6xl font-bold text-white font-mono text-glow">{bmi}</span>
                   <span className={`text-xs font-mono px-3 py-1 border mt-2 uppercase tracking-widest ${
                     category === 'bmi_normal' ? 'text-cyber-success border-cyber-success' :
                     category === 'bmi_underweight' ? 'text-blue-400 border-blue-400' :
                     'text-red-500 border-red-500'
                   }`}>
                     {t(category)}
                   </span>
                </div>
             </div>
             
             <div className="w-full mt-12 grid grid-cols-1 gap-2 text-xs font-mono">
                <div className="flex justify-between items-center p-2 border-b border-slate-800 text-slate-400">
                    <span className="text-blue-400">■ {t('bmi_underweight')}</span>
                    <span>&lt; 18.5</span>
                </div>
                <div className="flex justify-between items-center p-2 border-b border-slate-800 text-slate-400">
                    <span className="text-cyber-success">■ {t('bmi_normal')}</span>
                    <span>18.5 – 25</span>
                </div>
                <div className="flex justify-between items-center p-2 border-b border-slate-800 text-slate-400">
                    <span className="text-yellow-400">■ {t('bmi_overweight')}</span>
                    <span>25 – 30</span>
                </div>
                <div className="flex justify-between items-center p-2 border-b border-slate-800 text-slate-400">
                    <span className="text-red-500">■ {t('bmi_obese')}</span>
                    <span>&gt; 30</span>
                </div>
             </div>
          </div>
        ) : (
          <div className="text-center text-slate-600 z-10">
            <Info className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="font-mono text-xs uppercase tracking-widest">{t('bmi_hint')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BMICalculator;
