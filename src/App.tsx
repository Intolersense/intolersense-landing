import React from 'react';
import HeroSection from './components/HeroSection';
import VoiceSection from './components/VoiceSection';
import SymptomSection from './components/SymptomSection';
import InsightSection from './components/InsightSection';
import CTASection from './components/CTASection';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      <Navbar />
      <HeroSection />
      <VoiceSection />
      <SymptomSection />
      <InsightSection />
      <CTASection />
    </div>
  );
}

export default App;