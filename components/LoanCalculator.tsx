import React, { useState } from 'react';
import { HistoryItem } from '../types';
import { Landmark, DollarSign } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';

interface LoanCalculatorProps {
  onRecordHistory: (item: HistoryItem) => void;
}

const LoanCalculator: React.FC<LoanCalculatorProps> = ({ onRecordHistory }) => {
  const { t } = useLanguage();
  const [amount, setAmount] = useState('200000');
  const [rate, setRate] = useState('5.5');
  const [term, setTerm] = useState('30');
  const [result, setResult] = useState<{monthly: number, totalInterest: number, totalPayment: number} | null>(null);

  const calculateLoan = () => {
    const p = parseFloat(amount);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(term) * 12;

    if (isNaN(p) || isNaN(r) || isNaN(n)) return;

    const x = Math.pow(1 + r, n);
    const monthly = (p * x * r) / (x - 1);
    const totalPayment = monthly * n;
    const totalInterest = totalPayment - p;

    setResult({
      monthly: monthly,
      totalInterest: totalInterest,
      totalPayment: totalPayment
    });

    onRecordHistory({
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      type: 'calculator',
      description: t('loan_title'),
      result: `Monthly: $${monthly.toFixed(2)}`
    });
  };

  const chartData = result ? [
    { name: 'Principal', value: parseFloat(amount), color: '#00f0ff' }, // Cyan
    { name: 'Interest', value: result.totalInterest, color: '#7000ff' }, // Purple
  ] : [];

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Input Module */}
      <div className="glass-panel p-8 border-t-2 border-t-cyber-accent">
        <div className="flex items-center gap-3 mb-8">
           <Landmark className="w-5 h-5 text-cyber-accent" />
           <h2 className="text-lg font-bold text-white font-sans uppercase tracking-wider">{t('loan_title')}</h2>
        </div>

        <div className="space-y-6">
          <div className="group">
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2 group-focus-within:text-cyber-accent">{t('loan_amount')}</label>
            <div className="relative group">
              <DollarSign className="absolute left-3 top-3 w-4 h-4 text-slate-600 group-focus-within:text-cyber-accent" />
              <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-9 p-3 bg-black border border-slate-700 text-white font-mono focus:border-cyber-accent focus:outline-none focus:shadow-[0_0_10px_rgba(112,0,255,0.3)] transition-all"
              />
            </div>
          </div>

          <div className="group">
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2 group-focus-within:text-cyber-accent">{t('loan_rate')}</label>
            <input 
              type="number" 
              step="0.01"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full p-3 bg-black border border-slate-700 text-white font-mono focus:border-cyber-accent focus:outline-none focus:shadow-[0_0_10px_rgba(112,0,255,0.3)] transition-all"
            />
          </div>

          <div className="group">
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2 group-focus-within:text-cyber-accent">{t('loan_term')}</label>
            <input 
              type="number" 
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="w-full p-3 bg-black border border-slate-700 text-white font-mono focus:border-cyber-accent focus:outline-none focus:shadow-[0_0_10px_rgba(112,0,255,0.3)] transition-all"
            />
          </div>

          <button 
            onClick={calculateLoan}
            className="w-full py-4 mt-6 bg-cyber-accent text-white font-bold font-mono tracking-widest hover:bg-white hover:text-cyber-accent transition-all uppercase"
          >
            [ {t('loan_calc_btn')} ]
          </button>
        </div>
      </div>

      {/* Output Module */}
      <div className="glass-panel p-8 flex flex-col justify-between relative">
        <div className="absolute right-0 top-0 w-20 h-20 border-r border-t border-cyber-primary opacity-20"></div>

        {result ? (
          <>
            <div className="text-center mb-8 border-b border-dashed border-slate-800 pb-6">
              <p className="text-cyber-primary text-xs font-mono uppercase tracking-widest mb-2">{t('loan_monthly')}</p>
              <h3 className="text-5xl font-bold text-white font-mono text-glow">${result.monthly.toLocaleString(undefined, { maximumFractionDigits: 2 })}</h3>
            </div>

            <div className="h-64 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
                    contentStyle={{ backgroundColor: '#000', border: '1px solid #333', color: '#fff', fontFamily: 'monospace' }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="square"/>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6 text-xs font-mono">
               <div className="bg-black/50 p-4 border border-slate-800 text-center">
                  <span className="block text-slate-500 uppercase tracking-wider mb-1">{t('loan_total_interest')}</span>
                  <span className="text-lg font-bold text-cyber-accent">${result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
               </div>
               <div className="bg-black/50 p-4 border border-slate-800 text-center">
                  <span className="block text-slate-500 uppercase tracking-wider mb-1">{t('loan_total_payment')}</span>
                  <span className="text-lg font-bold text-cyber-primary">${result.totalPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
               </div>
            </div>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-600">
             <Landmark className="w-12 h-12 opacity-20 mb-4" />
             <p className="font-mono text-xs uppercase tracking-widest">{t('loan_hint')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanCalculator;
