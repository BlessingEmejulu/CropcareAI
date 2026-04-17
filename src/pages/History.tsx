import React from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, ChevronRight, LayoutGrid, 
  Trash2, Search, Filter, Leaf, AlertTriangle
} from 'lucide-react';
import { DiagnosisResult, Page } from '../types';
import { format } from 'date-fns';
import { cn } from '../lib/utils';

interface HistoryProps {
  history: DiagnosisResult[];
  onViewResult: (result: DiagnosisResult) => void;
  onClearHistory: () => void;
}

export const History: React.FC<HistoryProps> = ({ history, onViewResult, onClearHistory }) => {
  return (
    <div className="flex flex-col gap-6 pb-24 bg-background min-h-screen">
      <header className="bg-white px-6 pt-10 pb-6 sticky top-0 z-30 border-b border-border">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-primary">Scan History</h1>
          {history.length > 0 && (
            <button 
              onClick={onClearHistory}
              className="p-2 rounded-full hover:bg-red-50 text-red-500 transition-colors"
            >
              <Trash2 size={20} />
            </button>
          )}
        </div>
        
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
          <input 
            type="text" 
            placeholder="Search report..."
            className="w-full bg-slate-100 border-none rounded-xl py-3 pl-11 pr-4 text-xs font-medium"
          />
        </div>
      </header>

      <div className="px-6 flex flex-col gap-3">
        {history.length > 0 ? (
          history.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onViewResult(item)}
              className="bg-white p-4 rounded-xl border border-border flex gap-4 items-center cursor-pointer shadow-card active:bg-slate-50 transition-colors"
            >
              <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                <img 
                  src={item.imageUrl} 
                  alt={item.cropName} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider truncate max-w-[100px]">{item.cropName}</span>
                  <span className="text-[9px] text-text-muted font-medium">
                    {format(new Date(item.timestamp), 'MMM d')}
                  </span>
                </div>
                <h4 className={cn(
                  "font-bold text-sm truncate",
                  item.severity === 'High' || item.severity === 'Critical' ? 'text-danger' : 'text-text-dark'
                )}>{item.diseaseName}</h4>
              </div>
              <ChevronRight size={18} className="text-border" />
            </motion.div>
          ))
        ) : (
          <div className="text-center py-20 px-10">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-primary/20">
              <Leaf size={48} />
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">Your history is empty</h3>
            <p className="text-gray-500 text-sm mb-8">Start scanning your crops to build your diagnostic history.</p>
            <button 
              className="bg-primary text-white font-bold px-8 py-4 rounded-2xl"
              onClick={() => {}} // This will be handled in App
            >
              Scan Now
            </button>
          </div>
        )}
      </div>

      <div className="px-6 pb-4">
        <div className="bg-primary/5 p-6 rounded-[32px] border border-primary/10 flex items-start gap-4">
          <AlertTriangle size={24} className="text-primary mt-1" />
          <div className="flex-1">
            <h4 className="font-bold text-primary text-sm mb-1">Backup your data</h4>
            <p className="text-primary/70 text-[11px] leading-relaxed">
              Your scan history is stored locally on this device. Sign in to sync your data across all your farming devices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
