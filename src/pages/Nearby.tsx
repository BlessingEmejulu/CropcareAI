import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, Phone, MessageSquare, Star, 
  Search, Filter, ChevronRight, Loader2, Navigation as NavIcon, User
} from 'lucide-react';
import { Expert } from '../types';
import { cn, formatDistance } from '../lib/utils';

// Mock experts data
const MOCK_EXPERTS: Expert[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    type: 'Extension Officer',
    distance: 1200,
    contact: '+1 234 567 8901',
    specialty: 'Cereal Crops & Pest Control',
    address: 'Green Valley Agriculture Hub, North Sector',
    location: { lat: 0, lng: 0 }
  },
  {
    id: '2',
    name: 'AgroServe Center',
    type: 'Agro Center',
    distance: 2500,
    contact: '+1 234 567 8902',
    specialty: 'Fertilizers & Disease Treatment',
    address: '45 Farm Lane, South District',
    location: { lat: 0, lng: 0 }
  },
  {
    id: '3',
    name: 'Farmer Michael Ade',
    type: 'Farmer',
    distance: 800,
    contact: '+1 234 567 8903',
    specialty: 'Organic Farming Specialist',
    address: 'Ade Family Farms, East Point',
    location: { lat: 0, lng: 0 }
  },
  {
    id: '4',
    name: 'Jane Smith',
    type: 'Support Agent',
    distance: 4200,
    contact: '+1 234 567 8904',
    specialty: 'Crop Insurance & Tech Support',
    address: 'CropCare Support Office',
    location: { lat: 0, lng: 0 }
  }
];

export const Nearby: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Simulate location fetching
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredExperts = MOCK_EXPERTS.filter(expert => {
    const matchesFilter = filter === 'All' || expert.type === filter;
    const matchesSearch = expert.name.toLowerCase().includes(search.toLowerCase()) || 
                          expert.specialty.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filterOptions = ['All', 'Extension Officer', 'Agro Center', 'Farmer', 'Support Agent'];

  return (
    <div className="flex flex-col gap-6 pb-24 bg-background min-h-screen">
      <header className="bg-white px-6 pt-10 pb-6 sticky top-0 z-30 border-b border-border">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-primary">Nearby Support</h1>
        </div>
        
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
          <input 
            type="text" 
            placeholder="Search experts or centers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-100 border-none rounded-xl py-3 pl-11 pr-4 text-xs focus:ring-1 focus:ring-primary/20 bg-border/50 text-text-dark font-medium"
          />
        </div>
      </header>

      <div className="px-6">
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar -mx-6 px-6">
          {filterOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setFilter(opt)}
              className={cn(
                "whitespace-nowrap px-4 py-2 rounded-lg text-[10px] font-bold transition-all border uppercase tracking-wider",
                filter === opt 
                  ? "bg-primary text-white border-primary shadow-sm" 
                  : "bg-white text-text-muted border-border"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 flex flex-col gap-3">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-text-muted gap-3">
            <Loader2 className="animate-spin" size={32} />
            <p className="text-sm font-medium">Locating support...</p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {filteredExperts.length > 0 ? (
              filteredExperts.map((expert, index) => (
                <motion.div
                  key={expert.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white p-4 rounded-xl border border-border shadow-card flex flex-col gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-white shrink-0">
                      <User size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <h4 className="font-bold text-text-dark truncate">{expert.name}</h4>
                        <span className="text-[10px] font-bold text-primary shrink-0 ml-2">{formatDistance(expert.distance)}</span>
                      </div>
                      <p className="text-[11px] font-bold text-text-muted uppercase tracking-tight">{expert.type} • {expert.specialty}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <a 
                      href={`tel:${expert.contact}`}
                      className="flex-1 bg-primary hover:bg-primary/90 text-white h-10 rounded-lg flex items-center justify-center gap-2 font-bold text-xs"
                    >
                      <Phone size={14} />
                      Call Agent
                    </a>
                    <a 
                      href={`sms:${expert.contact}`}
                      className="flex-1 bg-primary-light text-primary h-10 rounded-lg flex items-center justify-center gap-2 font-bold text-xs"
                    >
                      <MessageSquare size={14} />
                      Message
                    </a>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-20 px-10">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                  <Filter size={32} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">No experts found</h3>
                <p className="text-gray-500 text-sm">Try using different filters or search terms to find support near you.</p>
                <button 
                  onClick={() => {setFilter('All'); setSearch('');}}
                  className="mt-6 text-primary font-bold border-b-2 border-primary pb-1"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};
