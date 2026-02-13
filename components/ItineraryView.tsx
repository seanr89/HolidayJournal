
import React, { useState } from 'react';
import { Itinerary, DayPlan, Activity } from '../types';
import { MapPinIcon, ClockIcon, UtensilsIcon, CameraIcon, ChevronDownIcon, EditIcon, SparklesIcon, SearchIcon, RouteIcon } from './Icons';

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
        <div className="flex-grow space-y-3">
          <div className="flex flex-wrap justify-between items-start gap-2">
            <h4 className="font-bold text-slate-800 text-lg leading-tight">{activity.location}</h4>
            <div className="flex gap-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 whitespace-nowrap">
                {activity.time}
                </span>
            </div>
          </div>
          
          <p className="text-slate-600 leading-relaxed text-sm">{activity.description}</p>
          
          <div className="flex flex-wrap gap-2 pt-1">
             {activity.searchUrl && (
                <a 
                    href={activity.searchUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-600 hover:text-teal-700 bg-teal-50 px-3 py-1.5 rounded-lg border border-teal-100 transition-colors"
                >
                    <SearchIcon className="w-3.5 h-3.5" /> More Info
                </a>
             )}
             {activity.mapsUrl && (
                <a 
                    href={activity.mapsUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 transition-colors"
                >
                    <MapPinIcon className="w-3.5 h-3.5" /> View Maps
                </a>
             )}
          </div>

          {activity.notes && (
            <div className="flex items-start gap-2 mt-2 p-3 bg-yellow-50/50 rounded-lg border border-yellow-100/50">
              <span className="text-yellow-600 font-bold text-xs uppercase tracking-wide shrink-0 mt-0.5">Tip:</span>
              <p className="text-xs text-slate-600 italic leading-relaxed">{activity.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Define DaySectionProps and use React.FC to ensure 'key' prop is recognized correctly by TypeScript
interface DaySectionProps {
  dayPlan: DayPlan;
  isOpen: boolean;
  onToggle: () => void;
}

const DaySection: React.FC<DaySectionProps> = ({ dayPlan, isOpen, onToggle }) => {
    const [userNote, setUserNote] = useState(""); 
    const [isEditing, setIsEditing] = useState(false);

    return (
    <div className="mb-8 last:mb-0">
      <button 
        onClick={onToggle}
        className="w-full text-left group flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all border border-slate-100"
      >
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-teal-500 to-blue-500 text-white font-bold w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-teal-200 shadow-lg">
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

      <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <div className="relative pl-8 ml-6 border-l-2 border-slate-200 space-y-2 pb-4">
            {dayPlan.activities.map((activity, idx) => (
              <React.Fragment key={idx}>
                {/* Distance Indicator if available */}
                {activity.distanceFromPrevious && (
                   <div className="relative flex items-center gap-2 py-2 ml-4 mb-2">
                       <div className="absolute -left-[54px] w-8 h-0.5 bg-slate-200 border-t border-dashed border-slate-300" />
                       <div className="flex items-center gap-1.5 bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                           <RouteIcon className="w-3 h-3" /> {activity.distanceFromPrevious}
                       </div>
                   </div>
                )}
                <div className="relative mb-6">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[40px] top-6 w-4 h-4 rounded-full border-4 border-white bg-slate-400 group-hover:bg-teal-500 transition-colors" />
                  <ActivityCard activity={activity} />
                </div>
              </React.Fragment>
            ))}
            
            {/* User Notes Section */}
             <div className="relative bg-slate-50 border border-slate-200 border-dashed rounded-xl p-4 mt-8 ml-4">
                 <div className="flex justify-between items-center mb-2">
                     <h5 className="text-xs font-bold text-slate-500 uppercase tracking-widest">My Trip Notes</h5>
                     <button onClick={() => setIsEditing(!isEditing)} className="text-teal-600 hover:text-teal-800 p-1">
                         <EditIcon className="w-4 h-4" />
                     </button>
                 </div>
                 {isEditing ? (
                     <textarea 
                        className="w-full p-3 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none bg-white shadow-inner"
                        rows={3}
                        placeholder="Add lunch spots you want to check out, flight info, etc..."
                        value={userNote}
                        onChange={(e) => setUserNote(e.target.value)}
                     />
                 ) : (
                    <p className="text-sm text-slate-500 italic leading-relaxed">{userNote || "Click the pencil to add your own personal notes for this day."}</p>
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
    <div className="max-w-5xl mx-auto px-4 pb-20">
      {/* Header Card */}
      <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 mb-12 border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-x-1/3 translate-y-1/3"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
             <div>
                <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-[10px] font-black uppercase tracking-widest">
                        {itinerary.duration}
                    </span>
                    <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest">
                        {itinerary.budgetLevel} Level
                    </span>
                </div>
                <h1 className="font-serif text-4xl lg:text-6xl font-bold text-slate-900 mb-3 leading-tight">
                    {itinerary.tripTitle}
                </h1>
                <div className="flex flex-col gap-2">
                    <p className="text-slate-600 text-lg flex items-center gap-2 font-medium">
                        <MapPinIcon className="w-5 h-5 text-teal-500" /> {itinerary.destination}
                    </p>
                    <p className="text-slate-400 text-sm flex items-center gap-2">
                        <RouteIcon className="w-4 h-4" /> Starting from: <span className="text-slate-500 font-semibold">{itinerary.startingLocation}</span>
                    </p>
                </div>
             </div>
             <button 
                onClick={onReset}
                className="px-8 py-4 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 self-start md:self-center"
            >
                New Itinerary
             </button>
          </div>

          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-inner">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">The Overall Atmosphere</h3>
            <p className="text-slate-700 text-xl font-medium italic font-serif leading-relaxed">"{itinerary.overallVibe}"</p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-[2.55rem] top-8 bottom-8 w-0.5 bg-slate-200 hidden md:block" />
        
        {itinerary.days.map((day) => (
          <DaySection 
            key={day.day} 
            dayPlan={day} 
            isOpen={openDays.includes(day.day)} 
            onToggle={() => toggleDay(day.day)} 
          />
        ))}
      </div>

      {/* Sticky Bottom Reset for long lists */}
      <div className="fixed bottom-8 right-8 z-40 md:hidden">
          <button 
            onClick={onReset}
            className="w-14 h-14 bg-slate-900 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
          >
              <EditIcon className="w-6 h-6" />
          </button>
      </div>
    </div>
  );
};
