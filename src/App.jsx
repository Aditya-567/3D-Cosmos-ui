import {
  ArrowLeft,
  ChevronRight,
  Code2,
  Globe,
  Layers,
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
import Contact from './components/contact';
import DotGlobe from './components/DotGlobe';
import DotGlobeWithDataLink from './components/DotGlobeWithDataLink';
import EarthAndMoon from './components/EarthAndMoon';
import EarthAndSatellite from './components/EarthAndSatellite';
import EarthMoonSatellite from './components/EarthMoonSatellite';
import EarthWithTower from './components/EarthWithTower';
import Galaxy from './components/Galaxy';
import LogoWithRotatingText from './components/LogoWithRotatingText';
import SolarSystem from './components/SolarSystem';
import SolarSystemWithFeatures from './components/SolarSystemWithFeatures';
import Playground from './playground/Playground';

// --- STYLES ---
const cardBorderStyle = {
  border: '3px solid #1a1a1a',
  borderRadius: '30px',
};

// --- PROPS DOCUMENTATION DATA ---
const componentPropsData = {
  galaxy: [
    { prop: 'stars', type: 'number', default: '100000', range: '1000-200000', description: 'Number of stars in galaxy' },
    { prop: 'radius', type: 'number', default: '5.4', range: '1-20', description: 'Size of galaxy radius' },
    { prop: 'arms', type: 'number', default: '4', range: '2-10', description: 'Number of spiral arms' },
    { prop: 'coreSize', type: 'number', default: '1.6', range: '0-5', description: 'Size of galaxy core' },
    { prop: 'spinCurvature', type: 'number', default: '1.8', range: '-5 to 5', description: 'Spiral rotation amount' },
    { prop: 'randomness', type: 'number', default: '0.36', range: '0-2', description: 'Random star distribution' },
    { prop: 'innerColor', type: 'string', default: '#ffaa60', range: 'any hex', description: 'Color at galaxy center' },
    { prop: 'outerColor', type: 'string', default: '#1b3984', range: 'any hex', description: 'Color at galaxy edge' },
    { prop: 'starSize', type: 'number', default: '0.05', range: '0.01-0.5', description: 'Size of individual stars' },
    { prop: 'rotationSpeed', type: 'number', default: '0.05', range: '0-0.5', description: 'Galaxy rotation speed' },
    { prop: 'tilting', type: 'object', default: '{ x: 0.9, y: 0 }', range: 'radians', description: 'Initial camera angle' },
    { prop: 'enableOptions', type: 'boolean', default: 'true', range: 'true/false', description: 'Show control panel button' },
    { prop: 'enableStarsBg', type: 'boolean', default: 'true', range: 'true/false', description: 'Show background stars' },
    { prop: 'movingStarsBg', type: 'boolean', default: 'true', range: 'true/false', description: 'Rotate background' },
    { prop: 'className', type: 'string', default: '""', range: 'CSS classes', description: 'Additional CSS classes' },
    { prop: 'style', type: 'object', default: '{}', range: 'CSS object', description: 'Inline styles' },
  ],
  'dotglobe': [
    { prop: 'cameraZ', type: 'number', default: '7.5', range: '1-20', description: 'Camera z position' },
    { prop: 'maxParticles', type: 'number', default: '20000', range: '1000-100000', description: 'Maximum particles on globe surface' },
    { prop: 'dotColor', type: 'hex', default: '0x4ade80', range: 'hex color', description: 'Color of globe dots' },
    { prop: 'atmosphereColor', type: 'hex', default: '0x4ade80', range: 'hex color', description: 'Atmosphere glow color' },
    { prop: 'atmosphereOpacity', type: 'number', default: '0.07', range: '0-1', description: 'Atmosphere opacity level' },
    { prop: 'floatCount', type: 'number', default: '150', range: '0-500', description: 'Floating particles count' },
    { prop: 'floatColor', type: 'hex', default: '0x4ade80', range: 'hex color', description: 'Floating particles color' },
    { prop: 'orbitCount', type: 'number', default: '3', range: '1-10', description: 'Number of satellite orbits' },
    { prop: 'orbitRadius', type: 'number', default: '2.5', range: '1-5', description: 'Satellite orbit radius' },
    { prop: 'orbitSpeed', type: 'number', default: '0.015', range: '0-0.1', description: 'Satellite orbital speed' },
    { prop: 'satelliteColor', type: 'hex', default: '0x4ade80', range: 'hex color', description: 'Satellite point color' },
    { prop: 'lightColor', type: 'hex', default: '0x4ade80', range: 'hex color', description: 'Light source color' },
    { prop: 'autoRotateSpeed', type: 'number', default: '0.002', range: '0-0.01', description: 'Auto rotation speed' },
    { prop: 'floatRotateSpeed', type: 'number', default: '0.0005', range: '0-0.01', description: 'Floating particles rotation speed' },
    { prop: 'mouseInfluence', type: 'number', default: '0.3', range: '0-1', description: 'Mouse interaction influence' },
    { prop: 'className', type: 'string', default: '""', range: 'CSS classes', description: 'Additional CSS classes' },
    { prop: 'style', type: 'object', default: '{}', range: 'CSS object', description: 'Inline styles' },
  ],
  'datamesh': [
    { prop: 'maxParticles', type: 'number', default: '40000', range: '10000-100000', description: 'Maximum particles on globe surface' },
    { prop: 'maxLines', type: 'number', default: '100', range: '10-500', description: 'Maximum data link lines' },
    { prop: 'pointsPerLine', type: 'number', default: '60', range: '10-200', description: 'Points per line segment' },
    { prop: 'particleColor', type: 'hex', default: '0x4ade80', range: 'hex color', description: 'Color of globe particles' },
    { prop: 'beamSpeed', type: 'number', default: '0.8', range: '0.1-2', description: 'Speed of data beams' },
    { prop: 'autoRotateSpeed', type: 'number', default: '0.0015', range: '0-0.01', description: 'Auto rotation speed' },
    { prop: 'backgroundStarCount', type: 'number', default: '3000', range: '1000-10000', description: 'Background star count' },
    { prop: 'cameraZ', type: 'number', default: '7.5', range: '1-20', description: 'Camera z position' },
    { prop: 'className', type: 'string', default: '""', range: 'CSS classes', description: 'Additional CSS classes' },
    { prop: 'style', type: 'object', default: '{}', range: 'CSS object', description: 'Inline styles' },
  ],
  'satellite': [
    // Positioning
    { prop: 'top', type: 'string', default: 'undefined', range: 'CSS value', description: 'CSS top positioning' },
    { prop: 'bottom', type: 'string', default: 'undefined', range: 'CSS value', description: 'CSS bottom positioning' },
    { prop: 'left', type: 'string', default: 'undefined', range: 'CSS value', description: 'CSS left positioning' },
    { prop: 'right', type: 'string', default: 'undefined', range: 'CSS value', description: 'CSS right positioning' },
    { prop: 'className', type: 'string', default: '""', range: 'CSS classes', description: 'Additional CSS classes' },
    { prop: 'style', type: 'object', default: '{}', range: 'CSS object', description: 'Inline styles' },
    // Customization
    { prop: 'earthSize', type: 'number', default: '0.6', range: '0.3-1.5', description: 'Earth sphere radius' },
    { prop: 'satelliteCount', type: 'number', default: '30', range: '10-200', description: 'Number of orbiting satellites' },
    { prop: 'satelliteSpeed', type: 'number', default: '0.0015', range: '0-0.01', description: 'Base satellite orbital speed' },
    { prop: 'satelliteSpeedVariation', type: 'number', default: '0.004', range: '0-0.01', description: 'Random speed variation range' },
    { prop: 'satelliteOrbitRadius', type: 'number', default: '0.72', range: '0.5-2', description: 'Base satellite orbit radius' },
    { prop: 'satelliteOrbitVariation', type: 'number', default: '0.12', range: '0-0.5', description: 'Random orbit radius variation' },
    { prop: 'beamFrequency', type: 'number', default: '0.03', range: '0-0.1', description: 'Data beam spawn frequency (0-1 chance)' },
    { prop: 'beamColor', type: 'hex', default: '0x10b981', range: 'hex color', description: 'Color of data beams' },
    { prop: 'beamFadeSpeed', type: 'number', default: '0.02', range: '0.01-0.1', description: 'Beam fade out speed' },
    { prop: 'starCount', type: 'number', default: '3000', range: '1000-10000', description: 'Number of background stars' },
    { prop: 'earthRotationSpeed', type: 'number', default: '0.001', range: '0-0.01', description: 'Earth rotation speed' },
    { prop: 'autoRotate', type: 'boolean', default: 'true', range: 'true/false', description: 'Enable auto-rotation' },
  ],
  'tower': [
    // Positioning
    { prop: 'top', type: 'string', default: 'undefined', range: 'CSS value', description: 'CSS top positioning' },
    { prop: 'bottom', type: 'string', default: 'undefined', range: 'CSS value', description: 'CSS bottom positioning' },
    { prop: 'left', type: 'string', default: 'undefined', range: 'CSS value', description: 'CSS left positioning' },
    { prop: 'right', type: 'string', default: 'undefined', range: 'CSS value', description: 'CSS right positioning' },
    { prop: 'className', type: 'string', default: '""', range: 'CSS classes', description: 'Additional CSS classes' },
    { prop: 'style', type: 'object', default: '{}', range: 'CSS object', description: 'Inline styles' },
    // Customization
    { prop: 'earthSize', type: 'number', default: '0.6', range: '0.3-1.5', description: 'Earth sphere radius' },
    { prop: 'starCount', type: 'number', default: '3000', range: '1000-10000', description: 'Number of background stars' },
    { prop: 'signalSpeed', type: 'number', default: '0.012', range: '0-0.05', description: 'Speed of signal animation' },
    { prop: 'signalTrailLength', type: 'number', default: '30', range: '10-100', description: 'Number of trail segments per signal' },
    { prop: 'beamColors', type: 'array', default: '[0x00ffcc, 0xff9900]', range: 'hex array', description: 'Array of beam colors (hex values)' },
    { prop: 'earthRotationSpeed', type: 'number', default: '0.001', range: '0-0.01', description: 'Earth rotation speed' },
    { prop: 'showTowers', type: 'boolean', default: 'true', range: 'true/false', description: 'Show communication towers' },
    { prop: 'showSignals', type: 'boolean', default: 'true', range: 'true/false', description: 'Show signal beams' },
    { prop: 'autoRotate', type: 'boolean', default: 'true', range: 'true/false', description: 'Enable auto-rotation' },
  ],
  'moon': [
    // Positioning
    { prop: 'top', type: 'string', default: 'undefined', range: 'CSS value', description: 'CSS top positioning' },
    { prop: 'bottom', type: 'string', default: 'undefined', range: 'CSS value', description: 'CSS bottom positioning' },
    { prop: 'left', type: 'string', default: 'undefined', range: 'CSS value', description: 'CSS left positioning' },
    { prop: 'right', type: 'string', default: 'undefined', range: 'CSS value', description: 'CSS right positioning' },
    { prop: 'className', type: 'string', default: '""', range: 'CSS classes', description: 'Additional CSS classes' },
    { prop: 'style', type: 'object', default: '{}', range: 'CSS object', description: 'Inline styles' },
    // Customization
    { prop: 'earthSize', type: 'number', default: '0.6', range: '0.3-1.5', description: 'Earth sphere radius' },
    { prop: 'moonSize', type: 'number', default: '0.09', range: '0.05-0.3', description: 'Moon sphere radius' },
    { prop: 'moonDistance', type: 'number', default: '1.0', range: '0.5-2.0', description: 'Distance between Earth and Moon' },
    { prop: 'moonOrbitSpeed', type: 'number', default: '0.02', range: '0-0.1', description: 'Moon orbital speed around Earth' },
    { prop: 'earthRotationSpeed', type: 'number', default: '0.001', range: '0-0.01', description: 'Earth rotation speed' },
    { prop: 'cloudOpacity', type: 'number', default: '0.4', range: '0-1', description: 'Cloud layer opacity' },
    { prop: 'atmosphereOpacity', type: 'number', default: '0.15', range: '0-1', description: 'Atmosphere glow opacity' },
    { prop: 'starCount', type: 'number', default: '8000', range: '1000-20000', description: 'Number of background stars' },
    { prop: 'autoRotate', type: 'boolean', default: 'true', range: 'true/false', description: 'Enable auto-rotation' },
  ],
  'earth-moon-satellite': [
    // Positioning
    { prop: 'top', type: 'string', default: 'undefined', range: 'CSS value', description: 'CSS top positioning' },
    { prop: 'bottom', type: 'string', default: 'undefined', range: 'CSS value', description: 'CSS bottom positioning' },
    { prop: 'left', type: 'string', default: 'undefined', range: 'CSS value', description: 'CSS left positioning' },
    { prop: 'right', type: 'string', default: 'undefined', range: 'CSS value', description: 'CSS right positioning' },
    { prop: 'className', type: 'string', default: '""', range: 'CSS classes', description: 'Additional CSS classes' },
    { prop: 'style', type: 'object', default: '{}', range: 'CSS object', description: 'Inline styles' },
    // Customization
    { prop: 'earthSize', type: 'number', default: '0.6', range: '0.3-1.5', description: 'Earth sphere radius' },
    { prop: 'moonSize', type: 'number', default: '0.09', range: '0.05-0.3', description: 'Moon sphere radius' },
    { prop: 'moonDistance', type: 'number', default: '0.9', range: '0.5-2.0', description: 'Distance between Earth and Moon' },
    { prop: 'moonOrbitSpeed', type: 'number', default: '0.02', range: '0-0.1', description: 'Moon orbital speed around Earth' },
    { prop: 'satelliteCount', type: 'number', default: '60', range: '10-200', description: 'Number of orbiting satellites' },
    { prop: 'satelliteSpeed', type: 'number', default: '0.0015', range: '0-0.01', description: 'Base satellite orbital speed' },
    { prop: 'satelliteSpeedVariation', type: 'number', default: '0.004', range: '0-0.01', description: 'Random speed variation range' },
    { prop: 'satelliteOrbitRadius', type: 'number', default: '0.72', range: '0.5-2', description: 'Base satellite orbit radius' },
    { prop: 'satelliteOrbitVariation', type: 'number', default: '0.12', range: '0-0.5', description: 'Random orbit radius variation' },
    { prop: 'starCount', type: 'number', default: '8000', range: '1000-20000', description: 'Number of background stars' },
    { prop: 'earthRotationSpeed', type: 'number', default: '0.01', range: '0-0.05', description: 'Earth rotation speed' },
    { prop: 'autoRotate', type: 'boolean', default: 'true', range: 'true/false', description: 'Enable auto-rotation' },
  ],
  'solar': [
    // Positioning
    { prop: 'top', type: 'string', default: 'undefined', range: 'CSS value', description: 'CSS top positioning' },
    { prop: 'bottom', type: 'string', default: 'undefined', range: 'CSS value', description: 'CSS bottom positioning' },
    { prop: 'left', type: 'string', default: 'undefined', range: 'CSS value', description: 'CSS left positioning' },
    { prop: 'right', type: 'string', default: 'undefined', range: 'CSS value', description: 'CSS right positioning' },
    { prop: 'className', type: 'string', default: '""', range: 'CSS classes', description: 'Additional CSS classes' },
    { prop: 'style', type: 'object', default: '{}', range: 'CSS object', description: 'Inline styles' },
    // Customization
    { prop: 'sunSize', type: 'number', default: '5.0', range: '1-15', description: 'Sun sphere radius' },
    { prop: 'planetSpeedMultiplier', type: 'number', default: '1.0', range: '0.1-5', description: 'Speed multiplier for all planets' },
    { prop: 'starCount', type: 'number', default: '9000', range: '1000-50000', description: 'Number of stars in starfield' },
    { prop: 'asteroidCount', type: 'number', default: '1900', range: '500-10000', description: 'Number of asteroids in belt' },
    { prop: 'kuiperCount', type: 'number', default: '9000', range: '1000-50000', description: 'Number of Kuiper belt objects' },
    { prop: 'showOrbits', type: 'boolean', default: 'true', range: 'true/false', description: 'Show planet orbital paths' },
    { prop: 'showTrails', type: 'boolean', default: 'true', range: 'true/false', description: 'Show planet motion trails' },
    { prop: 'initialDistance', type: 'number', default: '280', range: '50-1000', description: 'Initial camera distance' },
    { prop: 'autoRotate', type: 'boolean', default: 'true', range: 'true/false', description: 'Enable scene rotation' },
  ],
  'solar-features': [
    { prop: 'info', type: 'string', default: '""', range: 'N/A', description: 'Full-featured solar system with labels, data panel, and celestial body information' },
  ],
  'logo': [
    { prop: 'theme', type: 'string', default: '"dark"', range: 'dark | light', description: 'Logo theme color' },
    { prop: 'size', type: 'number', default: '96', range: '48-200', description: 'Logo size in pixels' },
    { prop: 'top', type: 'string', default: '-', range: 'CSS pixel value', description: 'CSS top positioning' },
    { prop: 'bottom', type: 'string', default: '-', range: 'CSS pixel value', description: 'CSS bottom positioning' },
    { prop: 'left', type: 'string', default: '-', range: 'CSS pixel value', description: 'CSS left positioning' },
    { prop: 'right', type: 'string', default: '-', range: 'CSS pixel value', description: 'CSS right positioning' },
  ],
};

const ExpandablePropsPanel = ({ isOpen, selectedComponent, onSelectComponent }) => {
  const components = Object.keys(componentPropsData);
  const props = componentPropsData[selectedComponent] || [];

  return (
    <div
      className={`w-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      style={{
        maxHeight: isOpen ? '1000px' : '0px',
      }}
    >
      <div className="w-full mx-auto pt-16 ">
        <div style={cardBorderStyle} className=" bg-white rounded-3xl flex flex-col md:flex-row  h-[640px]">

          {/* SIDE NAVIGATION */}
          <div className="w-full md:w-72 rounded-l-[30px] bg-slate-50/50 border-b md:border-b-0 md:border-r border-slate-100 flex flex-col">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white shadow-lg shadow-orange-200">
                  <Layers size={16} />
                </div>
                <span className="font-bold text-slate-800 tracking-tight">Components</span>
              </div>

            </div>

            <nav className="flex-1 overflow-y-auto px-3 pb-6 flex flex-col gap-2 custom-scrollbar">
              {components.map((comp) => (
                <button
                  key={comp}
                  onClick={() => onSelectComponent(comp)}
                  className={`w-full group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${selectedComponent === comp
                    ? 'bg-white  border border-black shadow-[6px_6px_0px_0px_rgba(251,146,60,1)] text-orange-600 ring-1 ring-slate-100'
                    : 'text-[#353935]/50 hover:bg-slate-100/80 hover:text-[#353935]'
                    }`}
                >
                  <span className="text-sm font-semibold">{comp}</span>
                  <ChevronRight size={14} className={`transition-transform duration-300 ${selectedComponent === comp ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`} />
                </button>
              ))}
            </nav>
          </div>

          {/* MAIN CONTENT AREA */}
          <div className="flex-1 flex flex-col bg-white rounded-r-[40px] overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-white/80 backdrop-blur-sm sticky top-0 z-20">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-50 rounded-2xl text-orange-600">
                  <Code2 size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 leading-none">{selectedComponent}</h2>
                  <p className="text-sm text-slate-400 font-medium mt-1.5 flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-slate-300" /> {props.length} Properties
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-auto custom-scrollbar">
              <table className="w-full text-left border-separate border-spacing-0">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-8 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">Property</th>
                    <th className="px-8 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">Type</th>
                    <th className="px-8 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">Default</th>
                    <th className="px-8 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {props.length > 0 ? (
                    props.map((p, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/30 transition-colors">
                        <td className="px-8 py-6 align-top">
                          <code className="text-sm font-bold text-orange-600 bg-orange-50/50 px-2 py-1 rounded-md border border-orange-100/50">
                            {p.prop}
                          </code>
                        </td>
                        <td className="px-8 py-6 align-top">
                          <div className="max-w-[180px]">
                            <code className="text-[12px] font-medium text-slate-500 break-words">
                              {p.type}
                            </code>
                          </div>
                        </td>
                        <td className="px-8 py-6 align-top">
                          <span className="text-[12px] font-mono font-medium text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                            {p.default || '-'}
                          </span>
                        </td>
                        <td className="px-8 py-6 align-top">
                          <p className="text-sm text-slate-600 leading-relaxed font-medium">
                            {p.description}
                          </p>
                          {p.range && p.range !== '-' && (
                            <div className="mt-3 flex items-center gap-2">
                              <span className="text-[10px] font-bold text-slate-400 uppercase">Range:</span>
                              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full border border-emerald-100">
                                {p.range}
                              </span>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-24 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                            <Box size={24} />
                          </div>
                          <p className="text-slate-400 text-sm font-medium">No properties found.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="px-8 py-4 border-t border-slate-50 bg-slate-50/30 flex justify-between items-center text-[11px] font-medium text-slate-400 uppercase tracking-widest">
              <span>Stable API v2.4</span>
              <span>Last Updated 2 days ago</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
};

// --- SUB-SECTION: GUIDE VIEW ---
const GuideSection = () => {
  const [showPropsPanel, setShowPropsPanel] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState('galaxy');

  return (
    <div id="guide-section" className="pb-28 w-[86%] mx-auto pt-44 font-sans text-[#1a1a1a] relative">
      <div className="mx-auto w-fit px-6 flex flex-col gap-16 ">
        <div className="  p-0 m-0 absolute z-20 left-[10%] top-0">
          <h2 className="text-[200px] font-[1000] tracking-tighter italic uppercase text-[#353935]/30">
            The Guide
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 z-50">
          <div className="p-10 flex flex-col items-center justify-center text-center bg-white shadow-[12px_12px_0px_0px_rgba(251,146,60,1)]" style={cardBorderStyle}>
            <span className="text-4xl font-black mb-4 text-orange-500">01</span>
            <h3 className="text-2xl font-black mb-6 text-[#353935] uppercase italic">Install</h3>
            <div className="bg-gray-900 text-green-400 p-4 rounded-xl font-mono text-xs w-full border-2 border-black">
              npm i 3d-solar-system-globe
            </div>
          </div>

          <div className="p-10 flex flex-col items-center justify-center text-center bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]" style={cardBorderStyle}>
            <Terminal size={48} className="text-orange-500 mb-4" strokeWidth={3} />
            <p className="font-bold opacity-50 uppercase text-xs">Configure your dependencies</p>
          </div>

          <div className="p-10 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden" style={cardBorderStyle}>
            <span className="text-4xl font-black mb-4 text-orange-500">03</span>
            <h3 className="text-2xl font-black text-[#353935] mb-4 uppercase italic">Execute</h3>
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
          <button
            onClick={() => setShowPropsPanel(!showPropsPanel)}
            className="flex flex-row items-center justify-between px-20 p-6 text-left text-2xl text-[#353935] font-black uppercase italic transition-all group relative border-[3px] border-black rounded-2xl bg-white hover:bg-orange-500 hover:text-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
          >
            {showPropsPanel ? 'Hide' : 'Click'} to see the attributes and methods <ChevronRight size={32} className={`transition-transform ${showPropsPanel ? 'rotate-90' : ''}`} />
          </button>
          <ExpandablePropsPanel
            isOpen={showPropsPanel}
            onToggle={() => setShowPropsPanel(!showPropsPanel)}
            selectedComponent={selectedComponent}
            onSelectComponent={setSelectedComponent}
          />
        </div>
      </div>
    </div>
  );
};


//-- gallery, dot globe, data link, satellite, tower, moon, earth-moon-satellite, solar system, solar system with features
const Gallery = () => {
  const imageAssets = [
    { id: 1, src: '1.png', width: 'w-[450px]', label: '01' },
    { id: 2, src: '2.png', width: 'w-[480px]', label: '02' },
    { id: 3, src: '3.png', width: 'w-[340px]', label: '03' },
    { id: 4, src: '4.png', width: 'w-[520px]', label: '04' },
    { id: 5, src: '5.png', width: 'w-[500px]', label: '05' },
  ];

  // We double the array to create the seamless circular loop effect
  const loopItems = [...imageAssets, ...imageAssets];

  const [isPaused, setIsPaused] = useState(false);

  // CSS for the custom animations and neo-brutalist shadows
  const customStyles = `
    @keyframes scroll-right {
      0% { transform: translateX(-50%); }
      100% { transform: translateX(0%); }
    }
    .animate-scroll-right {
      animation: scroll-right 25s linear infinite;
    }
    .brutal-shadow {
      box-shadow: 8px 8px 0px 0px black;
    }
    .brutal-shadow-orange {
      box-shadow: 8px 8px 0px 0px #FF8C42;
    }
    .neo-button {
      box-shadow: 4px 4px 0px 0px black;
    }
    .neo-button:active {
      box-shadow: 0px 0px 0px 0px black;
      transform: translate(4px, 4px);
    }
  `;

  return (
    <div className="h-[500px] mt-10 font-sans text-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <style>{customStyles}</style>


      {/* Large Background Decorative Text */}
      <div className="absolute -top-[1.5%] left-[10%]  text-[9vw] font-black italic text-[#353935]/30 pointer-events-none whitespace-nowrap uppercase">
        THE COLLECTION
      </div>

      <main className=" absolute w-full z-10">


        {/* Infinite Scroller Container */}
        <div
          className="relative  "
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >

          <div
            className={`flex space-x-6 px-3 w-max animate-scroll-right ${isPaused ? 'pause-animation' : ''}`}
            style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
          >
            {loopItems.map((item, index) => (
              <div key={`${item.id}-${index}`} className="flex-shrink-0">
                <img
                  src={item.src}
                  alt={`Asset ${item.label}`}
                  className={`${item.width}  h-[280px] object-cover border-4 rounded-5xl border-black bg-white shadow-[12px_12px_0px_0px_rgba(251,146,60,1)]`}
                  style={cardBorderStyle}
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/400x280/EEE/000?text=${item.src}+Missing`;
                  }}
                />
              </div>
            ))}
          </div>
        </div>


      </main>


      {/* CSS Utility for Pausing */}
      <style>{`
        .pause-animation { animation-play-state: paused; }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
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
    { id: 'galaxy', label: 'Galaxy Generator', path: '/galaxy', icon: Sparkles },
    { id: 'dot-globe', label: 'Neural Dot Globe', path: '/dot-globe', icon: Globe },
    { id: 'data-link', label: 'Data Mesh Globe', path: '/data-link', icon: Network },
    { id: 'satellite', label: 'Orbital Satellite', path: '/satellite', icon: Satellite },
    { id: 'tower', label: 'Earth Tower Link', path: '/tower', icon: Radio },
    { id: 'moon', label: 'Lunar Mechanics', path: '/moon', icon: Moon },
    { id: 'earth-moon-satellite', label: 'Earth Moon Satellite', path: '/earth-moon-satellite', icon: RotateCw },
    { id: 'solar', label: 'Solar System', path: '/solar-system', icon: Sun },
    { id: 'solar-features', label: 'Grand Solar System', path: '/solar-features', icon: Sun },
  ];

  return (
    <div className=''>
      <section className="min-h-screen w-[86%] mx-auto flex items-center justify-center px-6 pb-6 pt-4 md:p-6 md:px-12 md:pb-12 bg-white ">

        <LogoWithRotatingText
          top="2%"
          left="1%"
          size={120} // Very large
          style={{ transform: 'translate(-50%, -50%)' }}
          theme="light"
        />
        <div className="w-full h-[1000px] max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-16 ">

          {/* Left: Branding */}
          <div className="lg:col-span-7 flex flex-col mt-28">
            <div className="relative mb-20">
              <div className="absolute -top-12 -left-6 text-9xl opacity-5 text-[#353935] font-black italic select-none ">COSMOS</div>
              <h1 className="text-7xl md:text-9xl text-[#353935] font-[1000] tracking-tighter leading-[0.85] italic uppercase animate-[fadeInUp_0.8s_ease-out]">
                Cosmos<br />
                <span className="font-[1000] absolute ml-10 mb-[-20px] text-8xl text-orange-500 animate-pulse">Collection</span>
              </h1>
            </div>

            <div className="gap-y-4 border-l-8 border-[#353935] pl-8 mt-12 animate-[fadeInLeft_0.8s_ease-out_0.3s_both]">
              <p className="text-2xl font-black text-[#353935] uppercase italic tracking-tighter">
                Next-Gen 3D WebGL Library
              </p>
              <p className="text-md text-[#666] font-mono font-medium opacity-60 leading-snug">
                High-fidelity planetary models and astronomical simulations built for the modern web. Choose a manifest to begin or scroll for the guide.

              </p>
            </div>



            <div className="flex flex-wrap gap-4 pt-8 animate-[fadeInUp_0.8s_ease-out_0.5s_both]">
              <div>
                <p className="text-sm text-[#666] font-mono font-medium opacity-60 max-w-xl leading-snug">
                  Click the "Documentation" button to jump to the guide section below, which provides installation instructions and usage examples.
                </p>
              </div>
              <button
                onClick={scrollToGuide}
                className="px-10 py-5 text-xl font-black uppercase italic border-4 border-black text-[#353935] hover:bg-orange-500 hover:text-white hover:scale-105 transition-all duration-300 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(251,146,60,1)] active:shadow-none rounded-2xl active:translate-x-1 active:translate-y-1"
              >
                Documentation
              </button>

              <button
                onClick={() => navigate('/playground')}
                className="px-10 py-5 ml-3 text-xl font-black uppercase italic border-4 border-black text-[#353935] hover:bg-orange-500 hover:text-white hover:scale-105 transition-all duration-300 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(251,146,60,1)] active:shadow-none rounded-2xl active:translate-x-1 active:translate-y-1"
              >
                PlayGround
              </button>
            </div>
          </div>

          {/* Right: Model Selection List */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] mb-2 opacity-30 px-4 animate-[fadeInDown_0.6s_ease-out]">Available Manifests</h3>
            {models.map((model, index) => (
              <button
                key={model.id}
                onClick={() => navigate(model.path)}
                style={{
                  animation: `fadeInLeft 0.6s ease-out ${index * 0.1}s both`
                }}
                className="w-full px-4 py-6 text-left text-2xl text-[#353935] font-black uppercase italic transition-all duration-300 group relative border-4 border-black rounded-2xl bg-white hover:bg-orange-500 hover:text-white hover:scale-[1.02] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(251,146,60,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
              >
                <div className="flex gap-6 items-center px-2">
                  <model.icon size={32} className="transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                  <span className="transition-all duration-300 group-hover:translate-x-2">{model.label}</span>
                  <ChevronRight size={32} strokeWidth={3} className="ml-auto opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
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
        className="fixed top-8 left-8 z-[100] flex items-center gap-3 px-6 py-3 bg-white/10 border-4 border-orange-500/50 rounded-2xl font-[1000] uppercase italic shadow-[6px_6px_0px_0px_rgba(251,146,60,0.3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none hover:bg-white/20 transition-all duration-300 animate-[fadeInLeft_0.6s_ease-out]"
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

          {/* Model routes */}
          <Route path="/galaxy" element={<ModelWrapper component={Galaxy} label="Galaxy Generator" />} />
          <Route path="/dot-globe" element={<ModelWrapper component={DotGlobe} label="Neural Dot Globe" />} />
          <Route path="/data-link" element={<ModelWrapper component={DotGlobeWithDataLink} label="Data Mesh Globe" />} />
          <Route path="/satellite" element={<ModelWrapper component={EarthAndSatellite} label="Orbital Satellite" />} />
          <Route path="/tower" element={<ModelWrapper component={EarthWithTower} label="Earth Tower Link" />} />
          <Route path="/moon" element={<ModelWrapper component={EarthAndMoon} label="Lunar Mechanics" />} />
          <Route path="/earth-moon-satellite" element={<ModelWrapper component={EarthMoonSatellite} label="Earth Moon Satellite" />} />
          <Route path="/solar-system" element={<ModelWrapper component={SolarSystem} label="Solar System" />} />
          <Route path="/solar-features" element={<ModelWrapper component={SolarSystemWithFeatures} label="Grand Solar System" />} />
          <Route path="/playground" element={<Playground />} />
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