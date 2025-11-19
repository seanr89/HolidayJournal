import React, { useState } from 'react';
import { Itinerary, DayPlan, Activity } from '../types';
import { MapPinIcon, ClockIcon, UtensilsIcon, CameraIcon, ChevronDownIcon, EditIcon, SparklesIcon } from './Icons';

interface ItineraryViewProps {
  itinerary: Itinerary;
  onReset: () => void;
}

const ActivityCard = ({ activity }: { activity: Activity }) => {
  const getIcon = () => {
    switch (activity.type) {
      case 'food': return <UtensilsIcon className="w-5 h-5 text-amber-500" />;
      case 'sightseeing': return <CameraIcon className="w-5 h-5 text-purple-500" />;
      case 'adventure': return <MapPinIcon className="w-5 h-5 text-red-500" />;
      case 'relaxation': return <SparklesIcon className="w-5 h-5 text-teal-500" />;
      default: return <ClockIcon className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="group relative bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:border-teal-100 group-hover:bg-teal-50 transition-colors">
            {getIcon()}
          </div>
        </div>
        <div className="flex-grow space-y-2">
          <div className="flex justify-between items-start">
            <h4 className="font-bold text-slate-800 text-lg">{activity.location}</h4>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
              {activity.time}
            </span>
          </div>
          <p className="text-slate-600 leading-relaxed text-sm">{activity.description}</p>
          {activity.notes && (
            <div className="flex items-start gap-2 mt-3 p-3 bg-yellow-50/50 rounded-lg border border-yellow-100/50">
              <span className="text-yellow-600 font-semibold text-xs uppercase tracking-wide shrink-0 mt-0.5">Note:</span>
              <p className="text-xs text-slate-600 italic">{activity.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface DaySectionProps {
  dayPlan: DayPlan;
  isOpen: boolean;
  onToggle: () => void;
}

const DaySection = ({ dayPlan, isOpen, onToggle }: DaySectionProps) => {
    // Local state for notes editing (simulated)
    const [userNote, setUserNote] = useState(""); 
    const [isEditing, setIsEditing] = useState(false);

    return (
    <div className="mb-8 last:mb-0">
      <button 
        onClick={onToggle}
        className="w-full text-left group flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all border border-slate-100"
      >
        <div className="flex items-center gap-4">
          <div className="bg-teal-500 text-white font-bold w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-teal-200 shadow-lg">
            {dayPlan.day}
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-slate-800 group-hover:text-teal-600 transition-colors">
              {dayPlan.title}
            </h3>
            <p className="text-slate-500 text-sm mt-1 line-clamp-1">{dayPlan.summary}</p>
          </div>
        </div>
        <ChevronDownIcon className={`w-6 h-6 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <div className="relative pl-8 ml-6 border-l-2 border-slate-200 space-y-6 pb-4">
            {dayPlan.activities.map((activity, idx) => (
              <div key={idx} className="relative">
                {/* Timeline Dot */}
                <div className="absolute -left-[39px] top-6 w-5 h-5 rounded-full border-4 border-white bg-slate-300" />
                <ActivityCard activity={activity} />
              </div>
            ))}
            
            {/* User Notes Section */}
             <div className="relative bg-slate-50 border border-slate-200 border-dashed rounded-xl p-4 mt-4">
                 <div className="flex justify-between items-center mb-2">
                     <h5 className="text-sm font-semibold text-slate-700">Your Personal Notes</h5>
                     <button onClick={() => setIsEditing(!isEditing)} className="text-teal-600 hover:text-teal-800">
                         <EditIcon className="w-4 h-4" />
                     </button>
                 </div>
                 {isEditing ? (
                     <textarea 
                        className="w-full p-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none"
                        rows={3}
                        placeholder="Add your own reminders here..."
                        value={userNote}
                        onChange={(e) => setUserNote(e.target.value)}
                     />
                 ) : (
                    <p className="text-sm text-slate-500 italic">{userNote || "No personal notes added yet."}</p>
                 )}
             </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export const ItineraryView = ({ itinerary, onReset }: ItineraryViewProps) => {
  const [openDays, setOpenDays] = useState<number[]>([1]); // First day open by default

  const toggleDay = (day: number) => {
    if (openDays.includes(day)) {
      setOpenDays(openDays.filter(d => d !== day));
    } else {
      setOpenDays([...openDays, day]);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 pb-20 animate-fade-in-up">
      {/* Header Card */}
      <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 mb-12 border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
             <div>
                <span className="inline-block px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-bold uppercase tracking-wider mb-3">
                    {itinerary.duration} • {itinerary.budgetLevel} Budget
                </span>
                <h1 className="font-serif text-4xl lg:text-5xl font-bold text-slate-900 mb-2">
                    {itinerary.tripTitle}
                </h1>
                <p className="text-slate-500 text-lg flex items-center gap-2">
                    <MapPinIcon className="w-5 h-5" /> {itinerary.destination}
                </p>
             </div>
             <button 
                onClick={onReset}
                className="px-6 py-3 rounded-xl bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-colors self-start md:self-center"
            >
                Plan New Trip
             </button>
          </div>

          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Vibe Check</h3>
            <p className="text-slate-700 text-lg font-medium italic">"{itinerary.overallVibe}"</p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-[2.6rem] top-8 bottom-8 w-0.5 bg-slate-200 hidden md:block" />
        
        {itinerary.days.map((day) => (
          <DaySection 
            key={day.day} 
            dayPlan={day} 
            isOpen={openDays.includes(day.day)} 
            onToggle={() => toggleDay(day.day)} 
          />
        ))}
      </div>
    </div>
  );
};