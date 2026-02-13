
import React, { useState } from 'react';
import { TripFormData } from '../types';
import { PlaneIcon, SparklesIcon, MapPinIcon } from './Icons';

interface HeroFormProps {
  onSubmit: (data: TripFormData) => void;
  isLoading: boolean;
}

export const HeroForm: React.FC<HeroFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<TripFormData>({
    destination: '',
    startingPoint: '',
    days: 3,
    budget: 'Moderate',
    travelers: 'Couple',
    interests: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="relative overflow-hidden bg-slate-900 text-white rounded-3xl shadow-2xl mx-4 my-6 lg:mx-auto lg:max-w-6xl min-h-[600px] flex flex-col justify-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
             <img 
                src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop" 
                alt="Travel Background" 
                className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/30"></div>
        </div>

      <div className="relative z-10 px-6 py-12 lg:px-16 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-200 mb-6">
          <SparklesIcon className="w-4 h-4" />
          <span className="text-sm font-medium tracking-wide uppercase text-teal-300">Intelligent Itineraries</span>
        </div>

        <h1 className="text-4xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight max-w-4xl">
          Your journey, <br className="hidden md:block"/> crafted with <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-blue-400">precision</span>.
        </h1>

        <p className="text-slate-300 text-lg max-w-2xl mb-12">
          Tell us where you are and where you want to be. Our AI calculates distances, finds links, and maps your path.
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-5xl bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 lg:p-8 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            
            {/* Starting Point */}
            <div className="col-span-1 md:col-span-1 lg:col-span-1 space-y-1 text-left">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider ml-1">Starting From</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Home or Hotel"
                  value={formData.startingPoint}
                  onChange={(e) => setFormData({ ...formData, startingPoint: e.target.value })}
                  className="w-full bg-slate-800/50 border border-slate-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent placeholder-slate-500 transition-all"
                />
                <MapPinIcon className="absolute right-4 top-3.5 w-5 h-5 text-slate-500" />
              </div>
            </div>

            {/* Destination */}
            <div className="col-span-1 md:col-span-1 lg:col-span-1 space-y-1 text-left">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider ml-1">Heading To</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. Kyoto"
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  className="w-full bg-slate-800/50 border border-slate-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent placeholder-slate-500 transition-all"
                />
                <PlaneIcon className="absolute right-4 top-3.5 w-5 h-5 text-slate-500" />
              </div>
            </div>

            {/* Days */}
            <div className="space-y-1 text-left">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider ml-1">Duration</label>
              <select
                value={formData.days}
                onChange={(e) => setFormData({ ...formData, days: Number(e.target.value) })}
                className="w-full bg-slate-800/50 border border-slate-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent appearance-none transition-all"
              >
                {[...Array(14)].map((_, i) => (
                  <option key={i + 1} value={i + 1} className="bg-slate-800">{i + 1} Days</option>
                ))}
              </select>
            </div>

            {/* Travelers */}
            <div className="space-y-1 text-left">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider ml-1">Travelers</label>
              <select
                value={formData.travelers}
                onChange={(e) => setFormData({ ...formData, travelers: e.target.value as any })}
                className="w-full bg-slate-800/50 border border-slate-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent appearance-none transition-all"
              >
                <option value="Solo" className="bg-slate-800">Solo</option>
                <option value="Couple" className="bg-slate-800">Couple</option>
                <option value="Family" className="bg-slate-800">Family</option>
                <option value="Friends" className="bg-slate-800">Friends</option>
              </select>
            </div>

             {/* Budget */}
             <div className="space-y-1 text-left">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider ml-1">Budget</label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value as any })}
                className="w-full bg-slate-800/50 border border-slate-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent appearance-none transition-all"
              >
                <option value="Budget" className="bg-slate-800">Budget</option>
                <option value="Moderate" className="bg-slate-800">Moderate</option>
                <option value="Luxury" className="bg-slate-800">Luxury</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            {/* Interests */}
             <div className="space-y-1 text-left">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider ml-1">Interests & Preferences</label>
              <input
                type="text"
                placeholder="History, Local Food, Hiking, Hidden Gems..."
                value={formData.interests}
                onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                className="w-full bg-slate-800/50 border border-slate-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent placeholder-slate-500 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg flex items-center justify-center gap-2
              ${isLoading 
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-400 hover:to-blue-400 text-white transform hover:-translate-y-0.5'
              }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Drafting your journey...
              </>
            ) : (
              <>
                <SparklesIcon className="w-5 h-5" />
                Plan Adventure
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
