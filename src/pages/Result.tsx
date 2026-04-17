import React from 'react';
import { motion } from 'motion/react';
import { 
  ChevronLeft, Share2, AlertTriangle, CheckCircle2, 
  Leaf, FlaskConical, Thermometer, ShieldCheck, 
  ExternalLink, Calendar, MapPin, User
} from 'lucide-react';
import { DiagnosisResult, Page } from '../types';
import { cn } from '../lib/utils';
import { format } from 'date-fns';

interface ResultProps {
  result: DiagnosisResult;
  onBack: () => void;
  onPageChange: (page: Page) => void;
}

export const Result: React.FC<ResultProps> = ({ result, onBack, onPageChange }) => {
  const isHealthy = result.diseaseName.toLowerCase().includes('healthy');

  const shareHandler = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `CropCare AI: ${result.cropName} Diagnosis`,
          text: `My ${result.cropName} diagnosis: ${result.diseaseName}`,
          url: window.location.href,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-24 bg-background min-h-screen">
      {/* Header */}
      <div className="bg-white px-6 py-4 flex justify-between items-center sticky top-0 z-30 border-b border-border">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-slate-100">
          <ChevronLeft size={22} className="text-text-dark" />
        </button>
        <h2 className="font-bold text-sm uppercase tracking-widest text-primary">Report Details</h2>
        <button onClick={shareHandler} className="p-2 -mr-2 rounded-full hover:bg-slate-100">
          <Share2 size={20} className="text-text-muted" />
        </button>
      </div>

      {/* Image and Primary Info */}
      <div className="px-6">
        <div className="bg-white rounded-2xl overflow-hidden shadow-card border border-border flex flex-col">
          <div className="relative aspect-[16/9]">
            <img src={result.imageUrl} alt="Scan preview" className="w-full h-full object-cover" />
            <div className="absolute bottom-3 right-3 bg-primary text-white p-1 px-3 rounded-full text-[10px] font-bold">
              {result.confidence}% Confidence
            </div>
          </div>
          
          <div className="p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">{result.cropName}</span>
                <h1 className="text-xl font-extrabold text-danger leading-tight mt-0.5">{result.diseaseName}</h1>
              </div>
              <span className={cn(
                "text-[9px] px-2 py-0.5 rounded font-bold uppercase",
                isHealthy ? "bg-green-100 text-green-700" : "bg-red-50 text-danger border border-danger/10"
              )}>
                {result.severity} Severity
              </span>
            </div>

            <div className="space-y-4">
              <div className="border-t border-border pt-4">
                <span className="text-[11px] font-bold text-text-dark uppercase tracking-wide block mb-1">SYMPTOMS</span>
                <p className="text-text-muted text-xs leading-relaxed">{result.symptoms.join(', ')}.</p>
              </div>

              <div className="border-t border-border pt-4">
                <span className="text-[11px] font-bold text-text-dark uppercase tracking-wide block mb-1">RECOMMENDED ACTION</span>
                <p className="text-text-muted text-xs leading-relaxed">{result.recommendedTreatment}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prevention */}
      <div className="px-6">
        <div className="bg-white p-5 rounded-2xl border border-border shadow-card flex flex-col gap-3">
          <span className="text-[11px] font-bold text-text-dark uppercase tracking-wide">PREVENTION TIPS</span>
          <div className="space-y-3">
            {result.preventionMethods.map((p, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                <p className="text-text-muted text-xs leading-relaxed">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Expert Support CTA */}
      <div className="px-6">
        <div className="bg-primary-light p-4 rounded-2xl border border-secondary/20 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[11px] font-bold text-text-dark uppercase tracking-wide">NEARBY EXPERTS</span>
            <button 
              onClick={() => onPageChange('nearby')}
              className="text-[10px] text-primary font-bold uppercase"
            >
              VIEW ALL
            </button>
          </div>
          
          <div className="bg-white p-3 rounded-xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white">
              <User size={20} />
            </div>
            <div className="flex-1 overflow-hidden">
              <h4 className="text-xs font-bold text-text-dark truncate">Dr. Aris Thorne</h4>
              <p className="text-[10px] text-text-muted">Plant Pathologist • 1.2 km away</p>
            </div>
            <a 
              href="tel:123" 
              className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-primary text-xs"
            >
              📞
            </a>
          </div>
        </div>
      </div>

      {/* Footer Actions & Disclaimer */}
      <div className="px-6 flex flex-col gap-4">
        <button 
          onClick={shareHandler}
          className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 rounded-xl flex items-center justify-center gap-2 text-sm shadow-md active:scale-[0.98] transition-all"
        >
          Share Report
        </button>
        
        <p className="text-[9px] text-text-muted text-center leading-relaxed">
          * AI diagnosis is for informational purposes. Consult a certified agricultural extension officer for critical field decisions.
        </p>
      </div>
    </div>
  );
};
