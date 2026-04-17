import React from 'react';
import { Home, Camera, MapPin, History, User } from 'lucide-react';
import { Page } from '../types';
import { cn } from '../lib/utils';

interface NavigationProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange }) => {
  const navItems: { id: Page; icon: any; label: string }[] = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'history', icon: History, label: 'History' },
    { id: 'scan', icon: Camera, label: 'Scan' },
    { id: 'nearby', icon: MapPin, label: 'Nearby' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-6 py-2 flex justify-between items-center z-50 h-[64px] pb-[10px]">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentPage === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={cn(
              "flex flex-col items-center gap-1 transition-all",
              isActive ? "text-primary" : "text-text-muted"
            )}
          >
            <div className={cn(
              "p-1.5 rounded-xl transition-colors",
              isActive && "bg-primary-light/30"
            )}>
              <Icon size={isActive ? 20 : 18} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className={cn(
              "text-[9px] font-semibold tracking-wide uppercase",
              isActive ? "text-primary" : "text-text-muted"
            )}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
