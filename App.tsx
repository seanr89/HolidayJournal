import React, { useState } from 'react';
import { HeroForm } from './components/HeroForm';
import { ItineraryView } from './components/ItineraryView';
import { Itinerary, TripFormData } from './types';
import { generateItinerary } from './services/geminiService';

function App() {
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (data: TripFormData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateItinerary(data);
      setItinerary(result);
    } catch (err) {
      console.error("Failed to generate itinerary", err);
      setError("Something went wrong while generating your trip. Please verify your API key and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setItinerary(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
        {/* Navbar */}
        <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold font-serif">
                        W
                    </div>
                    <span className="font-serif font-bold text-xl text-slate-800 tracking-tight">Wanderlust</span>
                </div>
                <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
                    <a href="#" className="hover:text-teal-600 transition-colors">Destinations</a>
                    <a href="#" className="hover:text-teal-600 transition-colors">Saved Trips</a>
                    <a href="#" className="hover:text-teal-600 transition-colors">About</a>
                </div>
            </div>
        </nav>

      <main className="pt-6">
        {error && (
          <div className="max-w-3xl mx-auto mb-6 px-4">
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008h-.008V15.75z" />
              </svg>
              <p>{error}</p>
            </div>
          </div>
        )}

        {!itinerary ? (
          <HeroForm onSubmit={handleFormSubmit} isLoading={loading} />
        ) : (
          <ItineraryView itinerary={itinerary} onReset={handleReset} />
        )}
      </main>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200 py-12 mt-12">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <p className="text-slate-400 text-sm">
                    Powered by Gemini 2.5 Flash • Made with ❤️ by Wanderlust AI
                </p>
            </div>
        </footer>
    </div>
  );
}

export default App;