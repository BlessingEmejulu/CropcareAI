import React from 'react';
import { motion } from 'motion/react';
import { 
  User, Settings, Bell, Shield, 
  HelpCircle, LogOut, ChevronRight, 
  Leaf, Info, AlertTriangle, PhoneCall
} from 'lucide-react';
import { cn } from '../lib/utils';

export const Profile: React.FC = () => {
  const menuItems = [
    { icon: Settings, label: 'Farm Settings', color: 'bg-blue-50 text-blue-600' },
    { icon: Bell, label: 'Alerts & Notifications', color: 'bg-orange-50 text-orange-600' },
    { icon: Shield, label: 'Data Privacy', color: 'bg-purple-50 text-purple-600' },
    { icon: PhoneCall, label: 'Contact Support', color: 'bg-green-50 text-green-600' },
    { icon: HelpCircle, label: 'Help & FAQ', color: 'bg-teal-50 text-teal-600' },
  ];

  return (
    <div className="flex flex-col gap-6 pb-24 bg-background min-h-screen">
      <header className="bg-white px-6 pt-12 pb-8 border-b border-border shadow-card relative overflow-hidden text-center">
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full border border-primary p-0.5 mb-3">
            <div className="w-full h-full rounded-full bg-primary-light flex items-center justify-center text-primary">
              <User size={36} />
            </div>
          </div>
          <h2 className="text-text-dark text-xl font-bold tracking-tight uppercase">Farm Admin</h2>
          <p className="text-text-muted text-[10px] font-bold uppercase tracking-widest mt-1">Expert Farmer Tier</p>
        </div>
      </header>

      <div className="px-6 flex flex-col gap-3 mt-4">
        <div className="bg-white rounded-xl border border-border shadow-card overflow-hidden">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <React.Fragment key={item.label}>
                <button className="w-full flex items-center justify-between p-4 active:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Icon size={18} className="text-text-muted" />
                    <span className="text-sm font-bold text-text-dark">{item.label}</span>
                  </div>
                  <ChevronRight size={16} className="text-border" />
                </button>
                {index < menuItems.length - 1 && <div className="h-px bg-border mx-4" />}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <div className="px-6 flex flex-col gap-4">
        <div className="bg-primary-light p-5 rounded-xl border border-secondary/20 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Info size={16} className="text-primary" />
            <h4 className="text-xs font-bold text-text-dark uppercase tracking-wide">About CropCare AI</h4>
          </div>
          <p className="text-text-muted text-[11px] leading-relaxed">
            Empowering small-scale farmers with advanced computer vision technology to detect crop diseases early and improve global food security.
          </p>
        </div>

        <div className="bg-red-50 border border-red-100 p-5 rounded-xl flex flex-col gap-3">
          <div className="flex items-center gap-2 text-danger">
            <AlertTriangle size={16} />
            <h4 className="text-xs font-bold uppercase tracking-wide">Disclaimer</h4>
          </div>
          <p className="text-text-muted text-[10px] leading-relaxed italic">
            CropCare AI is an assistive tool using AI. Diagnosis is for educational purposes. Consult an agricultural expert for critical decisions.
          </p>
        </div>

        <button className="flex items-center justify-center gap-2 text-danger font-bold py-4 active:scale-95 transition-all text-xs uppercase tracking-widest mt-4">
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
      
      <div className="text-center pb-8 opacity-30 mt-auto">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">CropCare AI © 2026</p>
      </div>
    </div>
  );
};
