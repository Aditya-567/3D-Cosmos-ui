import {
  ChevronDown,
  Copy,
  Home,
  RefreshCcw,
  ZoomIn,
  ZoomOut
} from "lucide-react";
import React, { useEffect, useState } from "react";
import Split from "react-split";
import LogoWithRotatingText from '../components/LogoWithRotatingText';

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
/*  COMPONENT ATTRIBUTES REFERENCE                                            */
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

const CodeEditor = ({ code, onChange, fontSize }) => (
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
  const [showProps, setShowProps] = useState(false);

  const navigate = (to) => {
    window.location.href = to;
  };

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

        tCode = tCode.replace(
          /<style\s+jsx(?:\s*=\s*(?:{?\s*true\s*}?|"true"|'true'))?\s*>/gi,
          "<style>"
        );

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
    setShowProps(false);
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col font-sans text-white">

      {/* split gutter styling */}
      <style>{`
        .split-container > .gutter {
          background-color: transparent;
          position: relative;
        }
        .split-container > .gutter::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(249,115,22,0.5),
            transparent
          );
          width: 2px;
          margin: auto;
        }
      `}</style>

      {/* HEADER */}
      <div className="
        h-14 border-b border-orange-500/30
        flex items-center justify-between px-4
        bg-[#000]
        
        relative z-[100]
      ">
        <div className="flex items-center gap-3">
          <LogoWithRotatingText
            top="0.2%"
            left="1%"
            size={52} // Very large
            style={{ transform: 'translate(-50%, -50%)' }}
            theme="dark"
          />

          <LogoWithRotatingText
            top="84%"
            left="92%"
            size={100} // Very large
            style={{ transform: 'translate(-50%, -50%)' }}
            theme="dark"
          />
          <h1 className="pl-14 font-bold text-white text-sm tracking-widest uppercase">
            Cosmos Playground
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative z-[110]">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white border border-orange-500/30 rounded-lg text-xs font-semibold min-w-[200px] justify-between hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-200"
            >
              <span>{selectedComp}</span>
              <ChevronDown size={14} strokeWidth={2.5} />
            </button>

            {isMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-[150]"
                  onClick={() => setIsMenuOpen(false)}
                />
                <div className="absolute top-full right-0 mt-2 w-64 max-h-[60vh] overflow-y-auto bg-black border border-orange-500/50 rounded-lg shadow-2xl z-[200] py-2">
                  {Object.keys(TEMPLATES).map((k) => (
                    <button
                      key={k}
                      onClick={() => changeTemplate(k)}
                      className="w-full text-left px-4 py-2.5 text-xs text-white font-medium hover:bg-orange-500 hover:text-black transition-colors duration-150"
                    >
                      {k}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <button
            onClick={() => setShowProps(v => !v)}
            className="
              px-3 py-2 rounded-lg
              border border-orange-500/30
              text-orange-400 text-xs font-semibold
              hover:bg-orange-500/20
              transition
            "
          >
            {showProps ? "Hide properties" : "Show properties"}
          </button>

          <button
            onClick={() => setCode(TEMPLATES[selectedComp])}
            className="p-2 hover:bg-orange-500 hover:text-black rounded-lg transition-colors duration-200"
          >
            <RefreshCcw size={18} strokeWidth={2} />
          </button>

          <button
            onClick={() => navigator.clipboard.writeText(code)}
            className="p-2 hover:bg-orange-500 hover:text-black rounded-lg transition-colors duration-200"
          >
            <Copy size={18} strokeWidth={2} />
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 rounded-lg text-black text-xs font-semibold hover:bg-white transition-all duration-200"
          >
            <Home size={16} strokeWidth={2} /> Home
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex overflow-hidden">
        <Split
          className="split-container flex"
          sizes={[50, 50]}
          minSize={[280, 300]}
          gutterSize={8}
          direction="horizontal"
          cursor="col-resize"
        >
          {/* LEFT - CODE EDITOR (no sub header, floating font control) */}
          <div className="relative flex flex-col h-full border-r border-orange-500/20 bg-gradient-to-br from-gray-900 to-black">

            {/* floating font size control */}
            <div className="absolute top-3 right-3 z-20">
              <div className="flex items-center bg-black/70 backdrop-blur rounded-lg px-2 py-1 border border-orange-500/30 shadow">
                <button
                  onClick={() => setFontSize((v) => Math.max(10, v - 1))}
                  className="hover:text-orange-500 transition-colors"
                >
                  <ZoomOut size={14} strokeWidth={2} />
                </button>
                <span className="text-[11px] min-w-[2.5rem] text-center font-semibold">
                  {fontSize}px
                </span>
                <button
                  onClick={() => setFontSize((v) => Math.min(24, v + 1))}
                  className="hover:text-orange-500 transition-colors"
                >
                  <ZoomIn size={14} strokeWidth={2} />
                </button>
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

          {/* CENTER - PREVIEW (no header) */}
          <div className="flex flex-col relative h-full bg-black">
            <div
              className="flex-1 relative bg-black overflow-hidden
              ring-1 ring-orange-500/20
              shadow-[inset_0_0_80px_rgba(255,140,0,0.05)]"
            >
              {error ? (
                <div className="absolute inset-0 flex items-center justify-center p-8 bg-black/95 z-50">
                  <div className="bg-black border border-red-500 rounded-lg p-6 max-w-lg shadow-2xl">
                    <h3 className="text-red-500 font-bold mb-3 text-sm">
                      ⚠ Compile Error
                    </h3>
                    <pre className="text-xs text-white whitespace-pre-wrap font-mono">
                      {error}
                    </pre>
                  </div>
                </div>
              ) : AppComponent ? (
                <PreviewErrorBoundary
                  fallback={(err) => (
                    <div className="absolute inset-0 flex items-center justify-center p-8 bg-black/95 z-50">
                      <div className="bg-black border border-red-500 rounded-lg p-6 max-w-lg shadow-2xl">
                        <h3 className="text-red-500 font-bold mb-3 text-sm">
                          ⚠ Runtime Error
                        </h3>
                        <pre className="text-xs text-white whitespace-pre-wrap font-mono">
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
                <div className="w-full h-full flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm font-semibold">
                      Compiling…
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Split>
      </div>

      {/* RIGHT PROPS DRAWER */}
      <div
        className={`
          fixed top-14 bottom-0 right-0
          w-[380px]
          z-[300]
          transition-transform duration-300 ease-out
          ${showProps ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div
          className="
            h-full
            bg-gradient-to-b from-black to-gray-950
            border-l border-orange-500/30
            shadow-2xl
            flex flex-col
          "
        >
          <div className="h-10 flex items-center justify-between px-4 border-b border-orange-500/20 bg-black/70">
            <span className="text-[11px] font-bold text-orange-500 uppercase tracking-widest">
              {selectedComp} – Properties
            </span>

            <button
              onClick={() => setShowProps(false)}
              className="text-xs text-gray-400 hover:text-orange-400 transition"
            >
              Close
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {(COMPONENT_ATTRIBUTES[selectedComp] || []).map((p) => (
              <div
                key={p.name}
                className="rounded-lg border border-orange-500/20 bg-white/5 p-3 hover:bg-white/10 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">
                    {p.name}
                  </span>

                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 font-bold">
                    {p.type}
                  </span>
                </div>

                <div className="text-[11px] text-gray-400 mt-1">
                  {p.description}
                </div>

                <div className="text-[11px] mt-2 text-orange-400 font-mono">
                  default: {p.default}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
