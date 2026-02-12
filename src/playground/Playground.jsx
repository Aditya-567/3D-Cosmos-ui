import {
  Box,
  ChevronDown,
  ChevronRight,
  Copy,
  FileText,
  Home,
  RefreshCcw,
  Terminal,
  ZoomIn,
  ZoomOut
} from "lucide-react";
import React, { useEffect, useState } from "react";

import * as Babel from "@babel/standalone";
import Editor from "@monaco-editor/react";

/* -------------------------------------------------------------------------- */
/*  IMPORT COMPONENTS                                                         */
/* -------------------------------------------------------------------------- */

import DotGlobe from "../components/DotGlobe";
import DotGlobeWithDataLink from "../components/DotGlobeWithDataLink";
import EarthAndMoon from "../components/EarthAndMoon";
import EarthAndSatellite from "../components/EarthAndSatellite";
import EarthMoonSatellite from "../components/EarthMoonSatellite";
import EarthWithTower from "../components/EarthWithTower";
import Galaxy from "../components/Galaxy";
import SolarSystem from "../components/SolarSystem";
import SolarSystemWithFeatures from "../components/SolarSystemWithFeatures";

const COMPONENT_MAP = {
  Galaxy,
  DotGlobe,
  DotGlobeWithDataLink,
  EarthAndSatellite,
  EarthWithTower,
  EarthAndMoon,
  EarthMoonSatellite,
  SolarSystem,
  SolarSystemWithFeatures
};

/* -------------------------------------------------------------------------- */
/*  CODE TEMPLATES                                                            */
/* -------------------------------------------------------------------------- */

const TEMPLATES = {
  Galaxy: `import { Galaxy } from "./components/Galaxy";

export default function App() {
  return <Galaxy
    stars={100000}
    radius={5.4}
    arms={4}
    coreSize={1.6}
    spinCurvature={1.8}
    randomness={0.36}
    innerColor="#ffaa60"
    outerColor="#1b3984"
    starSize={0.05}
    rotationSpeed={0.05}
    tilting={{ x: 1.1, y: 0 }}
    enableOptions={true}
    enableStarsBg={true}
    movingStarsBg={true}
    top="0"
    bottom="0"
    left="0"
    right="0"
    className=""
    style={{}}
/>;
}`,
  DotGlobe: `import { DotGlobe } from "./components/DotGlobe";
export default function App() {
  return <DotGlobe />;
}`,
  DotGlobeWithDataLink: `import { DotGlobeWithDataLink } from "./components/DotGlobeWithDataLink";
export default function App() {
  return <DotGlobeWithDataLink />;
}`,
  EarthAndSatellite: `import { EarthAndSatellite } from "./components/EarthAndSatellite";
export default function App() {
  return <EarthAndSatellite />;
}`,
  EarthWithTower: `import { EarthWithTower } from "./components/EarthWithTower";
export default function App() {
  return <EarthWithTower />;
}`,
  EarthAndMoon: `import { EarthAndMoon } from "./components/EarthAndMoon";
export default function App() {
  return <EarthAndMoon />;
}`,
  EarthMoonSatellite: `import { EarthMoonSatellite } from "./components/EarthMoonSatellite";
export default function App() {
  return <EarthMoonSatellite />;
}`,
  SolarSystem: `import { SolarSystem } from "./components/SolarSystem";
export default function App() {
  return <SolarSystem speed={1} />;
}`,
  SolarSystemWithFeatures: `import { SolarSystemWithFeatures } from "./components/SolarSystemWithFeatures";
export default function App() {
  return <SolarSystemWithFeatures />;
}`
};

/* -------------------------------------------------------------------------- */
/*  COMPONENT ATTRIBUTES REFERENCE                                           */
/* -------------------------------------------------------------------------- */

const COMPONENT_ATTRIBUTES = {
  Galaxy: [
    { name: "stars", type: "number", default: "100000", description: "Number of stars in the galaxy" },
    { name: "radius", type: "number", default: "5.4", description: "Galaxy radius size" },
    { name: "arms", type: "number", default: "4", description: "Number of spiral arms" },
    { name: "coreSize", type: "number", default: "1.6", description: "Core size multiplier" },
    { name: "spinCurvature", type: "number", default: "1.8", description: "Spiral curvature intensity" },
    { name: "randomness", type: "number", default: "0.36", description: "Star distribution randomness" },
    { name: "innerColor", type: "color", default: "#ffaa60", description: "Core color" },
    { name: "outerColor", type: "color", default: "#1b3984", description: "Outer edge color" },
    { name: "starSize", type: "number", default: "0.05", description: "Star particle size" },
    { name: "rotationSpeed", type: "number", default: "0.05", description: "Galaxy rotation speed" },
    { name: "enableOptions", type: "boolean", default: "true", description: "Show control options" },
    { name: "enableStarsBg", type: "boolean", default: "true", description: "Show background stars" }
  ],
  DotGlobe: [
    { name: "Custom", type: "text", default: "N/A", description: "No additional parameters" }
  ],
  DotGlobeWithDataLink: [
    { name: "Custom", type: "text", default: "N/A", description: "No additional parameters" }
  ],
  EarthAndMoon: [
    { name: "earthSize", type: "number", default: "0.6", description: "Earth radius" },
    { name: "moonSize", type: "number", default: "0.09", description: "Moon radius" },
    { name: "moonDistance", type: "number", default: "1.0", description: "Moon orbit distance" },
    { name: "moonOrbitSpeed", type: "number", default: "0.02", description: "Moon rotation speed" },
    { name: "earthRotationSpeed", type: "number", default: "0.001", description: "Earth auto-rotation speed" },
    { name: "cloudOpacity", type: "number", default: "0.4", description: "Cloud layer opacity" },
    { name: "atmosphereOpacity", type: "number", default: "0.15", description: "Atmosphere glow opacity" },
    { name: "starCount", type: "number", default: "8000", description: "Number of stars" },
    { name: "autoRotate", type: "boolean", default: "true", description: "Enable auto-rotation" }
  ],
  EarthAndSatellite: [
    { name: "earthSize", type: "number", default: "0.6", description: "Earth radius" },
    { name: "satelliteCount", type: "number", default: "30", description: "Number of satellites" },
    { name: "satelliteSpeed", type: "number", default: "0.0015", description: "Satellite orbit speed" },
    { name: "satelliteOrbitRadius", type: "number", default: "0.72", description: "Satellite orbit radius" },
    { name: "beamFrequency", type: "number", default: "0.03", description: "Data beam spawn frequency" },
    { name: "beamColor", type: "color", default: "0x10b981", description: "Data beam color (hex)" },
    { name: "beamFadeSpeed", type: "number", default: "0.02", description: "Beam fade out speed" },
    { name: "starCount", type: "number", default: "3000", description: "Background stars" },
    { name: "earthRotationSpeed", type: "number", default: "0.001", description: "Earth rotation speed" },
    { name: "autoRotate", type: "boolean", default: "true", description: "Enable auto-rotation" }
  ],
  EarthWithTower: [
    { name: "earthSize", type: "number", default: "0.6", description: "Earth radius" },
    { name: "towerCount", type: "number", default: "41", description: "Number of communication towers" },
    { name: "starCount", type: "number", default: "3000", description: "Background stars" },
    { name: "signalSpeed", type: "number", default: "0.012", description: "Signal beam animation speed" },
    { name: "signalTrailLength", type: "number", default: "30", description: "Signal trail segments" },
    { name: "earthRotationSpeed", type: "number", default: "0.001", description: "Earth rotation speed" },
    { name: "showTowers", type: "boolean", default: "true", description: "Show/hide towers" },
    { name: "showSignals", type: "boolean", default: "true", description: "Show/hide signal beams" },
    { name: "autoRotate", type: "boolean", default: "true", description: "Enable auto-rotation" }
  ],
  EarthMoonSatellite: [
    { name: "earthSize", type: "number", default: "0.6", description: "Earth radius" },
    { name: "moonSize", type: "number", default: "0.09", description: "Moon radius" },
    { name: "moonDistance", type: "number", default: "0.9", description: "Moon orbit distance" },
    { name: "moonOrbitSpeed", type: "number", default: "0.02", description: "Moon rotation speed" },
    { name: "satelliteCount", type: "number", default: "60", description: "Number of satellites" },
    { name: "satelliteSpeed", type: "number", default: "0.0015", description: "Satellite orbit speed" },
    { name: "satelliteOrbitRadius", type: "number", default: "0.72", description: "Satellite orbit radius" },
    { name: "starCount", type: "number", default: "8000", description: "Background stars" },
    { name: "earthRotationSpeed", type: "number", default: "0.0005", description: "Earth rotation speed" },
    { name: "autoRotate", type: "boolean", default: "true", description: "Enable auto-rotation" }
  ],
  SolarSystem: [
    { name: "sunSize", type: "number", default: "5.0", description: "Sun radius" },
    { name: "planetSpeedMultiplier", type: "number", default: "1.0", description: "Speed multiplier for all planets" },
    { name: "starCount", type: "number", default: "9000", description: "Background stars count" },
    { name: "asteroidCount", type: "number", default: "1900", description: "Asteroid belt particle count" },
    { name: "kuiperCount", type: "number", default: "9000", description: "Kuiper belt particle count" },
    { name: "showOrbits", type: "boolean", default: "true", description: "Show orbital paths" },
    { name: "showTrails", type: "boolean", default: "true", description: "Show planet trails" },
    { name: "initialDistance", type: "number", default: "280", description: "Initial camera distance" },
    { name: "autoRotate", type: "boolean", default: "true", description: "Enable scene rotation" }
  ],
  SolarSystemWithFeatures: [
    { name: "Custom", type: "text", default: "N/A", description: "See component documentation" }
  ]
};

/* -------------------------------------------------------------------------- */
/*  MONACO EDITOR                                                             */
/* -------------------------------------------------------------------------- */

const CodeEditor = ({ code, onChange, fontSize }) => {
  return (
    <Editor
      height="100%"
      language="javascript"
      value={code}
      theme="vs-dark"
      onChange={(v) => onChange(v ?? "")}
      options={{
        fontSize,
        minimap: { enabled: false },
        wordWrap: "off",
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 2,
        insertSpaces: true,
        smoothScrolling: true,
        fontFamily:
          '"Fira Code", Consolas, Monaco, "Courier New", monospace'
      }}
    />
  );
};

/* -------------------------------------------------------------------------- */
/*  PREVIEW ERROR BOUNDARY                                                     */
/* -------------------------------------------------------------------------- */

class PreviewErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch() { }

  componentDidUpdate(prevProps) {
    // reset error when new component is rendered
    if (prevProps.children !== this.props.children && this.state.error) {
      this.setState({ error: null });
    }
  }

  render() {
    if (this.state.error) {
      return this.props.fallback(this.state.error);
    }
    return this.props.children;
  }
}

/* -------------------------------------------------------------------------- */
/*  MAIN APP                                                                  */
/* -------------------------------------------------------------------------- */

export default function Playground() {
  const [selectedComp, setSelectedComp] = useState("Galaxy");
  const [code, setCode] = useState(TEMPLATES.Galaxy);
  const [fontSize, setFontSize] = useState(14);
  const [AppComponent, setAppComponent] = useState(null);
  const [error, setError] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAttributes, setShowAttributes] = useState(true);

  const navigate = (to) => console.log("Navigate to:", to);

  /* ----------------------------- live compile ------------------------------ */

  useEffect(() => {
    let cancelled = false;

    const compile = () => {
      try {
        setError(null);

        let tCode = code.replace(
          /import\s*{\s*([^}]+)\s*}\s*from\s*["'][^"']+["']\s*;?/g,
          (_, imports) =>
            imports
              .split(",")
              .map(
                (i) => `const ${i.trim()} = __MAP['${i.trim()}'];`
              )
              .join("\n")
        );

        tCode = tCode.replace(
          /import\s+{\s*(\w+)\s*}\s+from\s+['"]\.\/components\/\w+['"];?/g,
          (_, comp) => `const ${comp} = __MAP['${comp}'];`
        );

        tCode = tCode
          .replace(/export\s+default\s+function\s+App/, "function App")
          .replace(/export\s+default\s+/, "");

        tCode = tCode.replace(/#([0-9a-fA-F]{6})([0-9a-fA-F]{2})/g, "#$1");


        const compiled = Babel.transform(tCode, {
          presets: ["react"]
        }).code;

        const fn = new Function(
          "React",
          "__MAP",
          `${compiled}; return App;`
        );

        const Comp = fn(React, COMPONENT_MAP);

        if (!cancelled) setAppComponent(() => Comp);
      } catch (e) {
        if (!cancelled) {
          setAppComponent(null);
          setError(String(e.message || e));
        }
      }
    };

    const t = setTimeout(compile, 400);

    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [code]);

  const changeTemplate = (key) => {
    setSelectedComp(key);
    setCode(TEMPLATES[key]);
    setIsMenuOpen(false);
  };

  /* ------------------------------------------------------------------------ */

  return (
    <div className="w-full h-screen bg-[#0d1117] flex flex-col font-sans text-slate-300">
      {/* HEADER */}
      <div className="h-14 border-b border-slate-800 flex items-center justify-between px-4 bg-[#161b22]">
        <div className="flex items-center gap-3">
          <Box className="text-purple-400" size={24} />
          <h1 className="font-bold text-slate-100">
            Component Playground
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#21262d] border border-slate-700 rounded text-sm text-white min-w-[200px] justify-between"
              title="Select a different component"
            >
              <span>{selectedComp}</span>
              <ChevronDown size={14} />
            </button>

            {isMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsMenuOpen(false)}
                />
                <div className="absolute top-full right-0 mt-1 w-64 max-h-[60vh] overflow-y-auto bg-[#21262d] border border-slate-700 rounded-lg shadow-xl z-50 py-1">
                  {Object.keys(TEMPLATES).map((k) => (
                    <button
                      key={k}
                      onClick={() => changeTemplate(k)}
                      className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-blue-600 hover:text-white"
                    >
                      {k}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <button
            onClick={() => setCode(TEMPLATES[selectedComp])}
            className="p-2 hover:bg-slate-700 rounded"
            title="Reset Code"
          >
            <RefreshCcw size={16} />
          </button>

          <button
            onClick={() => navigator.clipboard.writeText(code)}
            className="p-2 hover:bg-slate-700 rounded"
            title="Copy Code"
          >
            <Copy size={16} />
          </button>

          <button
            onClick={() => setShowAttributes(!showAttributes)}
            className="p-2 hover:bg-slate-700 rounded"
            title="Toggle Attributes"
          >
            <FileText size={16} />
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-3 py-1.5 bg-green-600 rounded text-white"
            title="Navigate to home page"
          >
            <Home size={16} /> Home
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT - CODE EDITOR */}
        <div className="flex-1 flex flex-col border-r border-slate-800">
          <div className="h-10 border-b border-slate-800 flex items-center justify-between px-4">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Terminal size={12} />
              <span>playground.jsx</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center bg-slate-800 rounded px-2 py-0.5">
                <button
                  onClick={() => setFontSize((v) => Math.max(10, v - 1))}
                  title="Decrease font size"
                >
                  <ZoomOut size={12} />
                </button>
                <span className="text-[10px] min-w-[2rem] text-center">
                  {fontSize}px
                </span>
                <button
                  onClick={() => setFontSize((v) => Math.min(24, v + 1))}
                  title="Increase font size"
                >
                  <ZoomIn size={12} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <CodeEditor
              code={code}
              onChange={setCode}
              fontSize={fontSize}
            />
          </div>
        </div>

        {/* CENTER - PREVIEW */}
        <div className="flex-1 flex flex-col relative border-r border-slate-800">
          <div className="h-10 border-b border-slate-800 flex items-center justify-between px-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Live Preview
            </span>
          </div>

          <div className="flex-1 relative bg-black/50 overflow-hidden">
            {error ? (
              <div className="absolute inset-0 flex items-center justify-center p-8 bg-black/80 z-50">
                <div className="bg-red-900/20 border border-red-500/50 rounded p-6 max-w-lg">
                  <h3 className="text-red-400 font-bold mb-2">
                    Compile error
                  </h3>
                  <pre className="text-xs text-red-200 whitespace-pre-wrap">
                    {error}
                  </pre>
                </div>
              </div>
            ) : AppComponent ? (
              <PreviewErrorBoundary
                fallback={(err) => (
                  <div className="absolute inset-0 flex items-center justify-center p-8 bg-black/80 z-50">
                    <div className="bg-red-900/20 border border-red-500/50 rounded p-6 max-w-lg">
                      <h3 className="text-red-400 font-bold mb-2">
                        Runtime error
                      </h3>
                      <pre className="text-xs text-red-200 whitespace-pre-wrap">
                        {String(err?.message || err)}
                      </pre>
                    </div>
                  </div>
                )}
              >
                <div className="w-full h-full">
                  <AppComponent />
                </div>
              </PreviewErrorBoundary>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-600">
                Compiling...
              </div>
            )}
          </div>
        </div>

        {/* RIGHT - ATTRIBUTES PANEL */}
        {showAttributes && (
          <div className="w-80 flex flex-col border-l border-slate-800 bg-[#0d1117]">
            <div className="h-10 border-b border-slate-800 flex items-center justify-between px-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Component Attributes
              </span>
              <button
                onClick={() => setShowAttributes(false)}
                className="p-1 hover:bg-slate-700 rounded"
                title="Close"
              >
                <ChevronRight size={14} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="p-4 space-y-3">
                <div className="mb-4">
                  <h3 className="text-sm font-bold text-blue-400 mb-1">
                    {selectedComp}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Editable Properties
                  </p>
                </div>

                {COMPONENT_ATTRIBUTES[selectedComp]?.length > 0 ? (
                  <div className="space-y-3">
                    {COMPONENT_ATTRIBUTES[selectedComp].map((attr, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-800/50 border border-slate-700 rounded-lg p-3 hover:border-slate-600 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <span className="text-xs font-mono font-bold text-green-400">
                            {attr.name}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 bg-slate-700 text-slate-300 rounded">
                            {attr.type}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mb-2">
                          {attr.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-500">
                            Default:
                          </span>
                          <span className="text-xs font-mono text-slate-300 bg-slate-900/50 px-2 py-1 rounded">
                            {attr.default}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic">
                    No additional parameters for this component.
                  </p>
                )}

                <div className="mt-6 pt-4 border-t border-slate-700">
                  <h4 className="text-xs font-bold text-slate-400 mb-3 uppercase">
                    Common Positioning
                  </h4>
                  <div className="space-y-2 text-xs text-slate-500">
                    <div>
                      <span className="text-slate-400">top</span> - CSS top position
                    </div>
                    <div>
                      <span className="text-slate-400">bottom</span> - CSS bottom position
                    </div>
                    <div>
                      <span className="text-slate-400">left</span> - CSS left position
                    </div>
                    <div>
                      <span className="text-slate-400">right</span> - CSS right position
                    </div>
                    <div>
                      <span className="text-slate-400">className</span> - CSS classes
                    </div>
                    <div>
                      <span className="text-slate-400">style</span> - Inline styles object
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
