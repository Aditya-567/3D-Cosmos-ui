import {
  ArrowLeft,
  Boxes,
  ChevronRight,
  Globe,
  Moon,
  Network,
  Radio,
  RotateCw,
  Satellite,
  Sparkles,
  Sun,
  Terminal
} from 'lucide-react';
import { useRef, useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';

// Import all 3D components
import {
  DotGlobe, DotGlobeWithDataLink,
  Jupiter,
  Mars,
  Mercury,
  Neptune,
  Pluto,
  Saturn,
  SolarSystemWithFeatures, Uranus,
  Venus
} from '3d-solar-system-globe';
import Contact from './components/Contact';
import EarthAndMoon from './components/EarthAndMoon';
import EarthAndSatellite from './components/EarthAndSatellite';
import EarthMoonSatellite from './components/EarthMoonSatellite';
import EarthWithTower from './components/EarthWithTower';
import Galaxy from './components/Galaxy';
import LogoWithRotatingText from './components/LogoWithRotatingText';
import SolarSystem from './components/SolarSystem';
import EarthLandingPage from './pages/EarthLandingPage';
import GalaxyLandingPage from './pages/GalaxyLandingPage';
import InstallationGuide from './pages/InstallationGuide';
import SaturnLandingPage from './pages/SaturnLandingPage';
import Playground from './playground/Playground';

// --- STYLES ---
const cardBorderStyle = {
  border: '2px solid #1a1a1a',
  borderRadius: '30px',
};


// --- SUB-SECTION: GUIDE VIEW ---
const GuideSection = () => {
  const navigate = useNavigate();
  const [showModels, setShowModels] = useState(false);

  const allModels = [
    { id: 'galaxy', label: 'Galaxy Generator', path: '/galaxy', icon: Sparkles },
    { id: 'dot-globe', label: 'Neural Dot Globe', path: '/dot-globe', icon: Globe },
    { id: 'data-link', label: 'Data Mesh Globe', path: '/data-link', icon: Network },
    { id: 'satellite', label: 'Orbital Satellite', path: '/satellite', icon: Satellite },
    { id: 'tower', label: 'Earth Tower Link', path: '/tower', icon: Radio },
    { id: 'moon', label: 'Lunar Mechanics', path: '/moon', icon: Moon },
    { id: 'earth-moon-satellite', label: 'Earth Moon Satellite', path: '/earth-moon-satellite', icon: RotateCw },
    { id: 'mercury', label: 'Mercury', path: '/mercury', icon: Globe },
    { id: 'venus', label: 'Venus', path: '/venus', icon: Globe },
    { id: 'mars', label: 'Mars', path: '/mars', icon: Globe },
    { id: 'jupiter', label: 'Jupiter', path: '/jupiter', icon: Globe },
    { id: 'saturn', label: 'Saturn', path: '/saturn', icon: Globe },
    { id: 'uranus', label: 'Uranus', path: '/uranus', icon: Globe },
    { id: 'neptune', label: 'Neptune', path: '/neptune', icon: Globe },
    { id: 'pluto', label: 'Pluto', path: '/pluto', icon: Globe },
    { id: 'solar', label: 'Solar System', path: '/solar-system', icon: Sun },
    { id: 'solar-features', label: 'Grand Solar System', path: '/solar-features', icon: Sun },
  ];

  return (
    <div id="guide-section" className="pb-10 w-[92%] sm:w-[88%] md:w-[74%] mx-auto pt-20 sm:pt-32 md:pt-44 font-sans text-[#1a1a1a] relative">
      <div className="mx-auto w-full px-0 sm:px-2 md:px-6 flex flex-col gap-10 md:gap-16">
        <div className="hidden md:block p-0 m-0 absolute z-20 left-[5%] top-0">
          <h2 className="text-[clamp(80px,14vw,200px)] font-[1000] tracking-tighter italic uppercase text-[#353935]/30">
            The Guide
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-16 z-50">
          <div className="p-6 sm:p-10 flex flex-col items-center justify-center text-center bg-white shadow-[8px_8px_0px_0px_rgba(251,146,60,1)] sm:shadow-[12px_12px_0px_0px_rgba(251,146,60,1)]" style={cardBorderStyle}>
            <span className="text-3xl sm:text-4xl font-black mb-4 text-orange-500">01</span>
            <h3 className="text-xl sm:text-2xl font-black mb-6 text-[#353935] uppercase italic">Install</h3>
            <div className="bg-gray-900 text-green-400 p-3 sm:p-4 rounded-xl font-mono text-xs w-full border-2 border-black break-all">
              npm i 3d-solar-system-globe
            </div>
          </div>

          <div className="p-6 sm:p-10 flex flex-col items-center justify-center text-center bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sm:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]" style={cardBorderStyle}>
            <Terminal size={40} className="text-orange-500 mb-4 sm:hidden" strokeWidth={3} />
            <Terminal size={48} className="text-orange-500 mb-4 hidden sm:block" strokeWidth={3} />
            <p className="font-bold opacity-50 uppercase text-xs">Configure your dependencies</p>
          </div>

          <div className="p-6 sm:p-10 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sm:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden sm:col-span-2 md:col-span-1" style={cardBorderStyle}>
            <span className="text-3xl sm:text-4xl font-black mb-4 text-orange-500">03</span>
            <h3 className="text-xl sm:text-2xl font-black text-[#353935] mb-4 uppercase italic">Execute</h3>
            <pre className="text-[10px] md:text-xs font-mono text-left leading-relaxed text-gray-700">
              {`import { SolarSystem } from 
"3d-solar-system-globe";

function App() {
  return (
    <SolarSystem 
       quality="ultra"
       theme="dark"
    />
  );
}

export default App;`}
            </pre>
          </div>
        </div>

        <div>
          <div className='w-full flex flex-col sm:flex-row gap-4 sm:gap-6'>
            <button
              onClick={() => setShowModels(!showModels)}
              className="w-full sm:w-1/2 flex flex-row items-center justify-between px-5 py-4 sm:p-6 text-left text-base sm:text-2xl text-[#353935] font-black uppercase italic transition-all group relative border-2 border-black rounded-2xl bg-white hover:bg-orange-500 hover:text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
            >
              {showModels ? 'Hide' : 'All 3d Models'} collection <ChevronRight size={24} className={`ml-2 flex-shrink-0 transition-transform duration-300 ${showModels ? 'rotate-90' : ''}`} />
            </button>
            <button
              onClick={() => navigate('/installation-guide')}
              className="w-full sm:w-1/2 flex flex-row items-center justify-between px-5 py-4 sm:p-6 text-left text-base sm:text-2xl text-[#353935] font-black uppercase italic transition-all group relative border-2 border-black rounded-2xl bg-white hover:bg-orange-500 hover:text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
            >
              Full Documentation <ChevronRight size={24} className="ml-2 flex-shrink-0" />
            </button>
          </div>

          {/* Expandable Models Panel */}
          <div
            className={`w-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden ${showModels ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
            style={{ maxHeight: showModels ? '1200px' : '0px' }}
          >
            <div className="pt-10 p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {allModels.map((model, index) => (
                <button
                  key={model.id}
                  onClick={() => navigate(model.path)}
                  style={{ animation: showModels ? `fadeInUp 0.4s ease-out ${index * 0.04}s both` : 'none' }}
                  className="w-full px-5 py-4 text-left text-base text-[#353935] font-black uppercase italic transition-all duration-200 group flex items-center gap-4 border-2 border-black rounded-2xl bg-white hover:bg-orange-500 hover:text-white shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(251,146,60,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5"
                >
                  <model.icon size={22} className="flex-shrink-0 transition-transform duration-200 group-hover:rotate-12 group-hover:scale-110" />
                  <span className="transition-all duration-200 group-hover:translate-x-1">{model.label}</span>
                  <ChevronRight size={18} strokeWidth={3} className="ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                </button>
              ))}
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};


const Gallery = () => {
  const imageAssets = [
    { id: 1, src: '1.png', label: 'Galaxy Generator', tag: '01' },
    { id: 2, src: '2.png', label: 'Data Mesh Globe', tag: '02' },
    { id: 3, src: '3.png', label: 'Orbital Satellite', tag: '03' },
    { id: 4, src: '4.png', label: 'Solar System', tag: '04' },
    { id: 5, src: '5.png', label: 'Earth & Moon', tag: '05' },
  ];

  const loopItems = [...imageAssets, ...imageAssets, ...imageAssets];
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="relative py-24 mb-8 font-sans text-black overflow-hidden bg-white">
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.333%); }
        }
        .gallery-track {
          animation: scroll-left 40s linear infinite;
          display: flex;
          width: max-content;
        }
        .gallery-track.paused {
          animation-play-state: paused;
        }
        .gallery-card {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.35s cubic-bezier(0.23,1,0.32,1), box-shadow 0.35s cubic-bezier(0.23,1,0.32,1);
        }
        .gallery-card:hover {
          transform: translateY(-8px) scale(1.03);
          box-shadow: 10px 10px 0px 0px rgba(251,146,60,1) !important;
        }
        .gallery-card .overlay {
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .gallery-card:hover .overlay {
          opacity: 1;
        }
        .gallery-card img {
          transition: transform 0.5s cubic-bezier(0.23,1,0.32,1);
        }
        .gallery-card:hover img {
          transform: scale(1.08);
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>



      {/* Ticker tape label above */}
      <div className="w-full  bg-orange-100 py-2 mb-0 mt-4 overflow-hidden">
        <div className="gallery-track" style={{ animationDuration: '20s' }}>
          {[...Array(20)].map((_, i) => (
            <span key={i} className="text-[#353935] text-xs font-black uppercase tracking-[0.3em] px-8 flex-shrink-0">
              Cosmos Collection &nbsp;★&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* Main scroller */}
      <div
        className="relative "
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => { setIsPaused(false); setHoveredIndex(null); }}
      >

        <div className={`gallery-track py-8 px-4 gap-6 ${isPaused ? 'paused' : ''}`}>
          {loopItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="gallery-card flex-shrink-0 w-[260px] sm:w-[320px] md:w-[380px] h-[180px] sm:h-[220px] md:h-[260px] border border-black rounded-3xl bg-white "
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={item.src}
                alt={item.label}
                className="w-full h-full object-cover rounded-3xl"
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/380x260/111/fff?text=${encodeURIComponent(item.label)}`;
                }}
              />
              {/* Hover overlay */}
              <div className="overlay absolute inset-0 rounded-3xl bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5">
                <span className="text-orange-400 text-[16px] font-black uppercase tracking-[0.1em] mb-1">{item.tag}</span>
                <span className="text-white text-lg font-black uppercase italic leading-tight">{item.label}</span>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Bottom ticker */}
      <div className="w-full  bg-[#353935]/30 py-2 overflow-hidden">
        <div className="gallery-track" style={{ animationDuration: '25s', animationDirection: 'reverse' }}>
          {[...Array(20)].map((_, i) => (
            <span key={i} className="text-white text-xs font-black uppercase tracking-[0.3em] px-8 flex-shrink-0">
              3d-solar-system-globe &nbsp;◆&nbsp;
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
// --- MAIN DASHBOARD SECTION ---
const MainDashboard = () => {
  const navigate = useNavigate();
  const guideRef = useRef(null);

  const scrollToGuide = () => {
    const element = document.getElementById('guide-section');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const models = [
    { id: 'data-link', label: 'Data Mesh Globe', path: '/data-link', icon: Network },
    { id: 'tower', label: 'Earth Tower Link', path: '/tower', icon: Radio },

    { id: 'mars', label: 'Mars', path: '/mars', icon: Globe },
    { id: 'jupiter', label: 'Jupiter', path: '/jupiter', icon: Globe },

    { id: 'solar', label: 'Solar System', path: '/solar-system', icon: Sun },
  ];

  const uiModels = [
    { id: 'galaxyL1', label: 'Galaxy Landing Page', path: '/landing1', icon: Sparkles },
    { id: 'saturnL2', label: 'Saturn Landing Page', path: '/landing2', icon: Globe },
    { id: 'earthMoonL2', label: 'Earth Landing Page', path: '/landing3', icon: RotateCw },
  ];




  return (
    <div className='relative'>
      <section className="min-h-screen w-[100%] sm:w-[88%] md:w-[86%] mx-auto flex items-center justify-center px-4 sm:px-6 pb-6 pt-4 md:p-6 md:px-12 md:pb-12 bg-white">

        <LogoWithRotatingText
          top="2%"
          left="1%"
          size={120} // Very large
          style={{ transform: 'translate(-50%, -50%)' }}
          theme="light"
        />
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 py-8 lg:py-0 lg:h-[950px]">

          {/* Left: Branding */}
          <div className="lg:col-span-7 flex flex-col mt-16 lg:mt-[6rem]">
            <div className="relative mb-12 lg:mb-20">
              <div className="hidden sm:block absolute -top-12 -left-6 text-7xl md:text-9xl opacity-5 text-[#353935] font-black italic select-none">COSMOS</div>
              <h1 className="text-5xl sm:text-7xl md:text-9xl text-[#353935] font-[1000] tracking-tighter leading-[0.85] italic uppercase animate-[fadeInUp_0.8s_ease-out]">
                Cosmos<br />
                <span className="font-[1000] absolute ml-4 sm:ml-10 mb-[-20px] text-4xl sm:text-6xl md:text-8xl text-orange-500 animate-pulse">Collection</span>
              </h1>
            </div>

            <div className="gap-y-4 border-l-4 sm:border-l-8 border-[#353935] pl-5 sm:pl-8 mt-12 animate-[fadeInLeft_0.8s_ease-out_0.3s_both]">
              <p className="text-xl sm:text-2xl font-black text-[#353935] uppercase italic tracking-tighter">
                Next-Gen 3D WebGL Library
              </p>
              <p className="text-sm sm:text-md text-[#666] font-mono font-medium opacity-60 leading-snug">
                High-fidelity planetary models and astronomical simulations built for the modern web. Choose a manifest to begin or scroll for the guide.

              </p>
            </div>



            <div className="flex flex-wrap gap-3 pt-6 animate-[fadeInUp_0.8s_ease-out_0.5s_both]">
              <div>
                <p className="text-xs sm:text-sm text-[#666] font-mono font-medium opacity-60 max-w-xl leading-snug">
                  Click the "Documentation" button to jump to the guide section below, which provides installation instructions and usage examples.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 w-full">
                <button
                  onClick={scrollToGuide}
                  className="px-5 sm:px-8 py-3 sm:py-5 text-base sm:text-xl font-black uppercase italic border-2 border-black text-[#353935] hover:bg-orange-500 hover:text-white hover:scale-105 transition-all duration-300 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(251,146,60,1)] active:shadow-none rounded-2xl active:translate-x-1 active:translate-y-1"
                >
                  Documentation
                </button>
                <button
                  onClick={() => navigate('/playground')}
                  className="px-5 sm:px-8 py-3 sm:py-5 text-base sm:text-xl font-black uppercase italic border-2 border-black text-[#353935] hover:bg-orange-500 hover:text-white hover:scale-105 transition-all duration-300 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(251,146,60,1)] active:shadow-none rounded-2xl active:translate-x-1 active:translate-y-1"
                >
                  PlayGround
                </button>
                <a
                  href="https://www.npmjs.com/package/3d-solar-system-globe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 sm:px-8 py-3 sm:py-5 text-base sm:text-xl flex gap-2 items-center font-black uppercase italic border-2 border-black text-[#353935] hover:bg-orange-500 hover:text-white hover:scale-105 transition-all duration-300 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(251,146,60,1)] active:shadow-none rounded-2xl active:translate-x-1 active:translate-y-1"
                >
                  <Boxes size={24} strokeWidth={1.5} className="sm:hidden" />
                  <Boxes size={32} strokeWidth={1.5} className="hidden sm:block" />
                  npm
                </a>

                <button
                  onClick={() => navigate('/installation-guide')}
                  className="w-full sm:w-auto py-3 sm:py-2 mt-2 sm:mt-4 px-5 sm:pl-1 sm:pr-10 text-sm sm:text-[16px] text-[#353935] animate-[fadeInUp_0.8s_ease-out_0.7s_both] font-[800] uppercase border-2 sm:border-0 border-black rounded-2xl sm:rounded-none text-center sm:text-left hover:font-[1000] sm:hover:pl-4 hover:tracking-widest hover:text-[#ff6600] hover:scale-105 transition-all duration-300" >
                  Installation Guide & Documentation &nbsp;&rarr;
                </button>
              </div>
            </div>



          </div>

          {/* Right: Model Selection List */}
          <div className="lg:col-span-5 flex flex-col gap-3 sm:gap-4">
            <h3 className="text-xs font-black text-black uppercase tracking-[0.4em] mt-4 opacity-40 px-4 animate-[fadeInDown_0.6s_ease-out]">UI Examples</h3>
            {uiModels.map((model, index) => (
              <button
                key={model.id}
                onClick={() => navigate(model.path)}
                style={{
                  animation: `fadeInLeft 0.6s ease-out ${index * 0.1}s both`
                }}
                className="w-full px-3 sm:px-4 py-4 sm:py-6 text-left text-lg sm:text-2xl text-[#353935] font-black uppercase italic transition-all duration-300 group relative border-2 border-black rounded-2xl bg-white hover:bg-orange-500 hover:text-white hover:scale-[1.02] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(251,146,60,1)] sm:hover:shadow-[8px_8px_0px_0px_rgba(251,146,60,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
              >
                <div className="flex gap-4 sm:gap-6 items-center px-1 sm:px-2">
                  <model.icon size={24} className="flex-shrink-0 sm:hidden transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                  <model.icon size={32} className="flex-shrink-0 hidden sm:block transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                  <span className="transition-all duration-300 group-hover:translate-x-2">{model.label}</span>
                  <ChevronRight size={24} strokeWidth={3} className="ml-auto opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </div>
              </button>
            ))}
            <h3 className="text-xs font-black text-black uppercase tracking-[0.4em] my-2 opacity-40 px-4 animate-[fadeInDown_0.6s_ease-out]">Available Manifests</h3>
            {models.map((model, index) => (
              <button
                key={model.id}
                onClick={() => navigate(model.path)}
                style={{
                  animation: `fadeInLeft 0.6s ease-out ${index * 0.1}s both`
                }}
                className="w-full px-3 sm:px-4 py-4 sm:py-6 text-left text-lg sm:text-2xl text-[#353935] font-black uppercase italic transition-all duration-300 group relative border-2 border-black rounded-2xl bg-white hover:bg-orange-500 hover:text-white hover:scale-[1.02] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(251,146,60,1)] sm:hover:shadow-[8px_8px_0px_0px_rgba(251,146,60,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
              >
                <div className="flex gap-4 sm:gap-6 items-center px-1 sm:px-2">
                  <model.icon size={24} className="flex-shrink-0 sm:hidden transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                  <model.icon size={32} className="flex-shrink-0 hidden sm:block transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                  <span className="transition-all duration-300 group-hover:translate-x-2">{model.label}</span>
                  <ChevronRight size={24} strokeWidth={3} className="ml-auto opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Guide is now part of the same page flow */}
      <GuideSection />
      <Gallery />
      <Contact />

    </div>
  );
};

// --- MODEL WRAPPER WITH BACK BUTTON ---
const ModelWrapper = ({ component: Component, label }) => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full bg-[#050505] relative overflow-hidden">
      {/* Floating Back Button */}
      <LogoWithRotatingText
        top="78%"
        left="90%"
        size={130} // Very large
        style={{ transform: 'translate(-50%, -50%)' }}
        theme="dark"

      />

      <button
        onClick={() => navigate('/')}
        className="fixed top-8 left-8 z-[100] flex items-center gap-3 px-6 py-3 bg-white/10 border-2 border-orange-500/50 rounded-2xl font-[1000] uppercase italic shadow-[6px_6px_0px_0px_rgba(251,146,60,0.3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none hover:bg-white/20 transition-all duration-300 animate-[fadeInLeft_0.6s_ease-out]"
      >
        <ArrowLeft strokeWidth={4} size={20} className="transition-transform duration-300 group-hover:-translate-x-1" /> Home
      </button>

      {/* Model Info Overlay */}
      <div className="fixed bottom-8 left-8 z-[100] pointer-events-none">
        <span className="border border-orange-400 text-white px-4 py-1 font-black text-xs uppercase tracking-[0.2em] mb-2 inline-block rounded-md"> Preview  </span>
        <h2 className="text-2xl font-[1000] tracking-tighter italic text-white/80 uppercase leading-none">{label}</h2>
      </div>

      {/* 3D Content Container */}
      <div className="w-full h-full">
        <Component />
      </div>
    </div>
  );
};

// --- APP WRAPPER ---
export default function App() {
  return (
    <BrowserRouter>
      <div className=" min-h-screen bg-white selection:bg-orange-500 selection:text-white overflow-x-hidden">
        <Routes>
          {/* Home route */}
          <Route path="/" element={<MainDashboard />} />
          {/* <Route path="/" element={<Payment />} /> */}

          {/* Model routes */}
          <Route path="/galaxy" element={<ModelWrapper component={Galaxy} label="Galaxy Generator" />} />
          <Route path="/dot-globe" element={<ModelWrapper component={DotGlobe} label="Neural Dot Globe" />} />
          <Route path="/data-link" element={<ModelWrapper component={DotGlobeWithDataLink} label="Data Mesh Globe" />} />
          <Route path="/satellite" element={<ModelWrapper component={EarthAndSatellite} label="Orbital Satellite" />} />
          <Route path="/tower" element={<ModelWrapper component={EarthWithTower} label="Earth Tower Link" />} />
          <Route path="/moon" element={<ModelWrapper component={EarthAndMoon} label="Lunar Mechanics" />} />
          <Route path="/earth-moon-satellite" element={<ModelWrapper component={EarthMoonSatellite} label="Earth Moon Satellite" />} />
          <Route path="/mercury" element={<ModelWrapper component={Mercury} label="Mercury" />} />
          <Route path="/venus" element={<ModelWrapper component={Venus} label="Venus" />} />
          <Route path="/mars" element={<ModelWrapper component={Mars} label="Mars" />} />
          <Route path="/jupiter" element={<ModelWrapper component={Jupiter} label="Jupiter" />} />
          <Route path="/saturn" element={<ModelWrapper component={Saturn} label="Saturn" />} />
          <Route path="/uranus" element={<ModelWrapper component={Uranus} label="Uranus" />} />
          <Route path="/neptune" element={<ModelWrapper component={Neptune} label="Neptune" />} />
          <Route path="/pluto" element={<ModelWrapper component={Pluto} label="Pluto" />} />
          <Route path="/solar-system" element={<ModelWrapper component={SolarSystem} label="Solar System" />} />
          <Route path="/solar-features" element={<ModelWrapper component={SolarSystemWithFeatures} label="Grand Solar System" />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/installation-guide" element={<InstallationGuide />} />
          <Route path="/landing1" element={<GalaxyLandingPage />} />
          <Route path="/landing2" element={<SaturnLandingPage />} />
          <Route path="/landing3" element={<EarthLandingPage />} />
        </Routes>

        {/* Global CSS */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
          
          body {
            font-family: 'Inter', sans-serif;
            margin: 0;
            padding: 0;
            background: #fff;
            overflow-x: hidden;
          }

          h1, h2, h3, button {
            font-family: 'Inter', sans-serif;
          }

          html {
            scroll-behavior: smooth;
          }

          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 8px;
          }
          ::-webkit-scrollbar-track {
            background: #fff;
          }
          ::-webkit-scrollbar-thumb {
            background: #000;
            border-radius: 0px;
          }
        `}</style>
      </div>
    </BrowserRouter>
  );
}