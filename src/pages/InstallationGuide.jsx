import {
    AlertTriangle,
    ArrowLeft,
    BookOpen,
    CheckCircle2,
    ChevronRight,
    Code2,
    Copy,
    Globe,
    Layers,
    Network,
    Package,
    Puzzle,
    Radio,
    RotateCw,
    Satellite,
    Sparkles,
    Sun,
    Terminal,
    Wrench,
    Zap
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoWithRotatingText from '../components/LogoWithRotatingText';

// ─── animation styles ─────────────────────────────────────────────────────────
const animationStyles = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeInLeft {
    from { opacity: 0; transform: translateX(-24px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes fadeInRight {
    from { opacity: 0; transform: translateX(24px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.88); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes progressGrow {
    from { width: 0%; }
    to   { width: var(--progress-width, 0%); }
  }
  @keyframes pulseDot {
    0%, 100% { transform: scale(1);   opacity: 1; }
    50%       { transform: scale(1.5); opacity: 0.6; }
  }
  @keyframes floatY {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-8px); }
  }
  .anim-fadeinup   { animation: fadeInUp   0.65s ease-out both; }
  .anim-fadeinleft { animation: fadeInLeft  0.55s ease-out both; }
  .anim-fadeinright{ animation: fadeInRight 0.55s ease-out both; }
  .anim-scalein    { animation: scaleIn    0.5s  cubic-bezier(.22,1,.36,1) both; }
  .anim-floaty     { animation: floatY     4s ease-in-out infinite; }
  .toc-dot-pulse   { animation: pulseDot   1.4s ease-in-out infinite; }
`;

// ─── useInView hook ───────────────────────────────────────────────────────────
const useInView = (threshold = 0.12, once = true) => {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    if (once) obs.disconnect();
                } else if (!once) {
                    setInView(false);
                }
            },
            { threshold }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold, once]);
    return [ref, inView];
};

// ─── AnimateOnScroll ──────────────────────────────────────────────────────────
const AnimateOnScroll = ({ children, delay = 0, direction = 'up', className = '', style = {} }) => {
    const [ref, inView] = useInView();
    const base = 'transition-all ease-out';
    const duration = 'duration-700';
    const hidden = {
        up: 'opacity-0 translate-y-7',
        left: 'opacity-0 -translate-x-6',
        right: 'opacity-0 translate-x-6',
        scale: 'opacity-0 scale-90',
    }[direction] ?? 'opacity-0 translate-y-7';
    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${delay}ms`, ...style }}
            className={`${base} ${duration} ${inView ? 'opacity-100 translate-y-0 translate-x-0 scale-100' : hidden} ${className}`}
        >
            {children}
        </div>
    );
};

// ─── scroll progress bar ──────────────────────────────────────────────────────
const ScrollProgressBar = () => {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        const el = document.getElementById('guide-scroll-area');
        if (!el) return;
        const onScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = el;
            const pct = scrollHeight - clientHeight > 0
                ? (scrollTop / (scrollHeight - clientHeight)) * 100
                : 0;
            setProgress(pct);
        };
        el.addEventListener('scroll', onScroll, { passive: true });
        return () => el.removeEventListener('scroll', onScroll);
    }, []);
    return (
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#f0f0f0] overflow-hidden">
            <div
                className="h-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-300 transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
};

// ─── copy button ──────────────────────────────────────────────────────────────
const CopyButton = ({ text }) => {
    const [copied, setCopied] = useState(false);
    return (
        <button
            onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all duration-200 ${copied ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-slate-500 hover:bg-white/10 hover:text-white'}`}
        >
            {copied ? <><CheckCircle2 size={11} /> Copied!</> : <><Copy size={11} /> Copy</>}
        </button>
    );
};

// ─── code block ───────────────────────────────────────────────────────────────
const CodeBlock = ({ code, lang = 'bash', className = '' }) => (
    <div className={`rounded-2xl overflow-hidden border-2 border-[#1a1a1a] bg-[#0a0a0a] ${className}`}>
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#1f1f1f] bg-[#111]">
            <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 ml-2">{lang}</span>
            </div>
            <CopyButton text={code} />
        </div>
        <pre className="px-5 py-5 text-sm font-mono text-green-400 overflow-x-auto leading-relaxed whitespace-pre-wrap break-words">
            <code>{code}</code>
        </pre>
    </div>
);

// ─── badge ─────────────────────────────────────────────────────────────────────
const Badge = ({ children, color = 'orange' }) => {
    const colors = {
        orange: 'bg-orange-500/10 text-orange-500 border-orange-500/30',
        green: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30',
        amber: 'bg-amber-500/10 text-amber-500 border-amber-500/30',
        blue: 'bg-blue-500/10 text-blue-500 border-blue-500/30',
    };
    return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${colors[color]}`}>
            {children}
        </span>
    );
};

// ─── alert ────────────────────────────────────────────────────────────────────
const Alert = ({ type = 'info', title, children }) => {
    const cfg = {
        warning: { wrap: 'bg-amber-50 border-amber-300', icon: <AlertTriangle size={15} className="text-amber-500 flex-shrink-0 mt-0.5" />, ttl: 'text-amber-800', body: 'text-amber-700' },
        success: { wrap: 'bg-emerald-50 border-emerald-300', icon: <CheckCircle2 size={15} className="text-emerald-600 flex-shrink-0 mt-0.5" />, ttl: 'text-emerald-800', body: 'text-emerald-700' },
        info: { wrap: 'bg-blue-50 border-blue-200', icon: <Zap size={15} className="text-blue-500 flex-shrink-0 mt-0.5" />, ttl: 'text-blue-800', body: 'text-blue-700' },
    };
    const c = cfg[type];
    return (
        <div className={`${c.wrap} border rounded-xl p-4 flex gap-3`}>
            {c.icon}
            <div>
                {title && <p className={`font-black text-xs uppercase tracking-widest mb-1 ${c.ttl}`}>{title}</p>}
                <div className={`text-xs leading-relaxed font-medium ${c.body}`}>{children}</div>
            </div>
        </div>
    );
};

// ─── section ──────────────────────────────────────────────────────────────────
const Section = ({ id, number, title, icon: Icon, children }) => {
    const [ref, inView] = useInView(0.1);
    return (
        <section id={id} className="scroll-mt-20 py-2">
            <div
                ref={ref}
                className={`flex items-center gap-4 mb-8 transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'}`}
            >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center">
                    {Icon ? <Icon size={18} className="text-orange-500" /> : <span className="text-xs font-black text-orange-500">{number}</span>}
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">Section {number}</p>
                    <h2 className="text-xl sm:text-2xl font-extrabold uppercase italic tracking-tighter text-[#353935]/90 leading-none">{title}</h2>
                </div>
                <div className="ml-4 hidden sm:block h-px flex-1 bg-gradient-to-r from-[#e5e5e5] to-transparent" />
            </div>
            <div className="flex flex-col gap-5">{children}</div>
        </section>
    );
};

// ─── method card ──────────────────────────────────────────────────────────────
const MethodCard = ({ number, title, badge, badgeColor, children }) => (
    <div className="rounded-2xl overflow-hidden border border-[#e5e5e5] bg-[#fafafa] hover:bg-[#f3f3f3] transition-colors duration-200">
        <div className="px-5 py-4 border-b border-[#e5e5e5] flex items-center gap-3">
            <span className="w-6 h-6 rounded-lg bg-orange-500 flex items-center justify-center text-[10px] font-black text-white flex-shrink-0">{number}</span>
            <span className="font-black text-sm uppercase italic text-[#353935]/80">{title}</span>
            {badge && <Badge color={badgeColor}>{badge}</Badge>}
        </div>
        <div className="p-5 flex flex-col gap-4">{children}</div>
    </div>
);

// ─── component props data ─────────────────────────────────────────────────────
const componentPropsData = {
    Galaxy: [
        { prop: 'stars', default: '{100000}', desc: 'Total star particles in the galaxy' },
        { prop: 'radius', default: '{5.4}', desc: 'Galaxy disc radius' },
        { prop: 'arms', default: '{4}', desc: 'Number of spiral arms' },
        { prop: 'coreSize', default: '{1.6}', desc: 'Central core radius' },
        { prop: 'spinCurvature', default: '{1.8}', desc: 'Arm spiral tightness' },
        { prop: 'randomness', default: '{0.36}', desc: 'Star scatter randomness' },
        { prop: 'innerColor', default: '"#ffaa60"', desc: 'Core star color' },
        { prop: 'outerColor', default: '"#1b3984"', desc: 'Outer arm star color' },
        { prop: 'starSize', default: '{0.05}', desc: 'Individual star point size' },
        { prop: 'rotationSpeed', default: '{0.05}', desc: 'Galaxy rotation speed' },
        { prop: 'tilting', default: '{{ x: 0.9, y: 0 }}', desc: 'Tilt angles (x/y radians)' },
        { prop: 'enableOptions', default: '{true}', desc: 'Show control panel UI' },
        { prop: 'enableStarsBg', default: '{true}', desc: 'Enable star background layer' },
        { prop: 'movingStarsBg', default: '{true}', desc: 'Animate background stars' },
        { prop: 'enableImageBg', default: '{true}', desc: 'Enable image background' },
        { prop: 'top', default: 'undefined', desc: 'CSS top positioning' },
        { prop: 'bottom', default: 'undefined', desc: 'CSS bottom positioning' },
        { prop: 'left', default: 'undefined', desc: 'CSS left positioning' },
        { prop: 'right', default: 'undefined', desc: 'CSS right positioning' },
        { prop: 'className', default: '""', desc: 'Additional CSS classes' },
        { prop: 'style', default: '{{}}', desc: 'Inline container styles' },
    ],
    DotGlobe: [
        { prop: 'cameraZ', default: '{7.5}', desc: 'Camera z-position distance' },
        { prop: 'maxParticles', default: '{20000}', desc: 'Max dot particles on globe surface' },
        { prop: 'dotColor', default: '{0x4ade80}', desc: 'Globe dot color (hex)' },
        { prop: 'atmosphereColor', default: '{0x4ade80}', desc: 'Atmosphere glow color (hex)' },
        { prop: 'atmosphereOpacity', default: '{0.07}', desc: 'Atmosphere layer opacity' },
        { prop: 'floatCount', default: '{150}', desc: 'Floating particle count' },
        { prop: 'floatColor', default: '{0x4ade80}', desc: 'Floating particle color (hex)' },
        { prop: 'orbitCount', default: '{3}', desc: 'Number of satellite orbits' },
        { prop: 'orbitRadius', default: '{2.5}', desc: 'Satellite orbit radius' },
        { prop: 'orbitSpeed', default: '{0.015}', desc: 'Satellite orbital speed' },
        { prop: 'satelliteColor', default: '{0x4ade80}', desc: 'Satellite color (hex)' },
        { prop: 'lightColor', default: '{0x4ade80}', desc: 'Light source color (hex)' },
        { prop: 'autoRotateSpeed', default: '{0.002}', desc: 'Globe auto-rotation speed' },
        { prop: 'floatRotateSpeed', default: '{0.0005}', desc: 'Floating particle rotation speed' },
        { prop: 'mouseInfluence', default: '{0.3}', desc: 'Mouse drag influence strength' },
        { prop: 'top', default: 'undefined', desc: 'CSS top positioning' },
        { prop: 'bottom', default: 'undefined', desc: 'CSS bottom positioning' },
        { prop: 'left', default: 'undefined', desc: 'CSS left positioning' },
        { prop: 'right', default: 'undefined', desc: 'CSS right positioning' },
        { prop: 'className', default: '""', desc: 'Additional CSS classes' },
        { prop: 'style', default: '{{}}', desc: 'Inline container styles' },
    ],
    DotGlobeWithDataLink: [
        { prop: 'maxParticles', default: '{40000}', desc: 'Max dot particles on globe surface' },
        { prop: 'maxLines', default: '{100}', desc: 'Max simultaneous data link lines' },
        { prop: 'pointsPerLine', default: '{60}', desc: 'Curve points per data line' },
        { prop: 'particleColor', default: '{0x4ade80}', desc: 'Globe particle color (hex)' },
        { prop: 'beamSpeed', default: '{0.8}', desc: 'Data beam animation speed' },
        { prop: 'autoRotateSpeed', default: '{0.0015}', desc: 'Globe auto-rotation speed' },
        { prop: 'backgroundStarCount', default: '{3000}', desc: 'Background star count' },
        { prop: 'cameraZ', default: '{7.5}', desc: 'Camera z-position distance' },
        { prop: 'top', default: 'undefined', desc: 'CSS top positioning' },
        { prop: 'bottom', default: 'undefined', desc: 'CSS bottom positioning' },
        { prop: 'left', default: 'undefined', desc: 'CSS left positioning' },
        { prop: 'right', default: 'undefined', desc: 'CSS right positioning' },
        { prop: 'className', default: '""', desc: 'Additional CSS classes' },
        { prop: 'style', default: '{{}}', desc: 'Inline container styles' },
    ],
    EarthAndSatellite: [
        { prop: 'earthSize', default: '{0.6}', desc: 'Earth sphere radius' },
        { prop: 'satelliteCount', default: '{30}', desc: 'Number of orbiting satellites' },
        { prop: 'satelliteSpeed', default: '{0.0015}', desc: 'Base satellite orbit speed' },
        { prop: 'satelliteSpeedVariation', default: '{0.004}', desc: 'Random speed variation per satellite' },
        { prop: 'satelliteOrbitRadius', default: '{0.72}', desc: 'Base satellite orbit radius' },
        { prop: 'satelliteOrbitVariation', default: '{0.12}', desc: 'Random orbit radius variation' },
        { prop: 'beamFrequency', default: '{0.03}', desc: 'Data beam spawn frequency (0–1)' },
        { prop: 'beamColor', default: '{0x10b981}', desc: 'Data beam color (hex)' },
        { prop: 'beamFadeSpeed', default: '{0.02}', desc: 'Beam fade-out speed' },
        { prop: 'starCount', default: '{3000}', desc: 'Background star count' },
        { prop: 'earthRotationSpeed', default: '{0.001}', desc: 'Earth auto-rotation speed' },
        { prop: 'autoRotate', default: '{true}', desc: 'Enable scene auto-rotation' },
        { prop: 'top', default: 'undefined', desc: 'CSS top positioning' },
        { prop: 'bottom', default: 'undefined', desc: 'CSS bottom positioning' },
        { prop: 'left', default: 'undefined', desc: 'CSS left positioning' },
        { prop: 'right', default: 'undefined', desc: 'CSS right positioning' },
        { prop: 'className', default: '""', desc: 'Additional CSS classes' },
        { prop: 'style', default: '{{}}', desc: 'Inline container styles' },
    ],
    EarthWithTower: [
        { prop: 'earthSize', default: '{0.6}', desc: 'Earth sphere radius' },
        { prop: 'starCount', default: '{3000}', desc: 'Background star count' },
        { prop: 'signalSpeed', default: '{0.012}', desc: 'Signal beam animation speed' },
        { prop: 'signalTrailLength', default: '{30}', desc: 'Signal trail segment count' },
        { prop: 'beamColors', default: '{[0x00ffcc, 0xff9900]}', desc: 'Signal beam colors array (hex)' },
        { prop: 'earthRotationSpeed', default: '{0.001}', desc: 'Earth auto-rotation speed' },
        { prop: 'showTowers', default: '{true}', desc: 'Show/hide tower meshes' },
        { prop: 'showSignals', default: '{true}', desc: 'Show/hide signal beams' },
        { prop: 'autoRotate', default: '{true}', desc: 'Enable scene auto-rotation' },
        { prop: 'top', default: 'undefined', desc: 'CSS top positioning' },
        { prop: 'bottom', default: 'undefined', desc: 'CSS bottom positioning' },
        { prop: 'left', default: 'undefined', desc: 'CSS left positioning' },
        { prop: 'right', default: 'undefined', desc: 'CSS right positioning' },
        { prop: 'className', default: '""', desc: 'Additional CSS classes' },
        { prop: 'style', default: '{{}}', desc: 'Inline container styles' },
    ],
    EarthAndMoon: [
        { prop: 'earthSize', default: '{0.6}', desc: 'Earth sphere radius' },
        { prop: 'moonSize', default: '{0.09}', desc: 'Moon sphere radius' },
        { prop: 'moonDistance', default: '{1.0}', desc: 'Moon orbit distance from Earth' },
        { prop: 'moonOrbitSpeed', default: '{0.02}', desc: 'Moon orbital speed' },
        { prop: 'earthRotationSpeed', default: '{0.001}', desc: 'Earth auto-rotation speed' },
        { prop: 'cloudOpacity', default: '{0.4}', desc: 'Cloud layer opacity' },
        { prop: 'atmosphereOpacity', default: '{0.15}', desc: 'Atmosphere glow opacity' },
        { prop: 'starCount', default: '{8000}', desc: 'Background star count' },
        { prop: 'autoRotate', default: '{true}', desc: 'Enable scene auto-rotation' },
        { prop: 'top', default: 'undefined', desc: 'CSS top positioning' },
        { prop: 'bottom', default: 'undefined', desc: 'CSS bottom positioning' },
        { prop: 'left', default: 'undefined', desc: 'CSS left positioning' },
        { prop: 'right', default: 'undefined', desc: 'CSS right positioning' },
        { prop: 'className', default: '""', desc: 'Additional CSS classes' },
        { prop: 'style', default: '{{}}', desc: 'Inline container styles' },
    ],
    EarthMoonSatellite: [
        { prop: 'earthSize', default: '{0.6}', desc: 'Earth sphere radius' },
        { prop: 'moonSize', default: '{0.09}', desc: 'Moon sphere radius' },
        { prop: 'moonDistance', default: '{0.9}', desc: 'Moon orbit distance from Earth' },
        { prop: 'moonOrbitSpeed', default: '{0.02}', desc: 'Moon orbital speed' },
        { prop: 'satelliteCount', default: '{60}', desc: 'Number of orbiting satellites' },
        { prop: 'satelliteSpeed', default: '{0.0015}', desc: 'Base satellite orbit speed' },
        { prop: 'satelliteSpeedVariation', default: '{0.004}', desc: 'Random speed variation per satellite' },
        { prop: 'satelliteOrbitRadius', default: '{0.72}', desc: 'Base satellite orbit radius' },
        { prop: 'satelliteOrbitVariation', default: '{0.12}', desc: 'Random orbit radius variation' },
        { prop: 'starCount', default: '{8000}', desc: 'Background star count' },
        { prop: 'earthRotationSpeed', default: '{0.01}', desc: 'Earth auto-rotation speed' },
        { prop: 'autoRotate', default: '{true}', desc: 'Enable scene auto-rotation' },
        { prop: 'top', default: 'undefined', desc: 'CSS top positioning' },
        { prop: 'bottom', default: 'undefined', desc: 'CSS bottom positioning' },
        { prop: 'left', default: 'undefined', desc: 'CSS left positioning' },
        { prop: 'right', default: 'undefined', desc: 'CSS right positioning' },
        { prop: 'className', default: '""', desc: 'Additional CSS classes' },
        { prop: 'style', default: '{{}}', desc: 'Inline container styles' },
    ],
    Mercury: [
        { prop: 'mercurySize', default: '{0.6}', desc: 'Mercury sphere radius' },
        { prop: 'mercuryRotationSpeed', default: '{0.001}', desc: 'Mercury auto-rotation speed' },
        { prop: 'starCount', default: '{8000}', desc: 'Background star count' },
        { prop: 'autoRotate', default: '{true}', desc: 'Enable scene auto-rotation' },
        { prop: 'top', default: 'undefined', desc: 'CSS top positioning' },
        { prop: 'bottom', default: 'undefined', desc: 'CSS bottom positioning' },
        { prop: 'left', default: 'undefined', desc: 'CSS left positioning' },
        { prop: 'right', default: 'undefined', desc: 'CSS right positioning' },
        { prop: 'className', default: '""', desc: 'Additional CSS classes' },
        { prop: 'style', default: '{{}}', desc: 'Inline container styles' },
    ],
    Venus: [
        { prop: 'venusSize', default: '{0.6}', desc: 'Venus sphere radius' },
        { prop: 'venusRotationSpeed', default: '{0.001}', desc: 'Venus auto-rotation speed' },
        { prop: 'atmosphereOpacity', default: '{0.15}', desc: 'Atmosphere glow opacity' },
        { prop: 'starCount', default: '{8000}', desc: 'Background star count' },
        { prop: 'autoRotate', default: '{true}', desc: 'Enable scene auto-rotation' },
        { prop: 'top', default: 'undefined', desc: 'CSS top positioning' },
        { prop: 'bottom', default: 'undefined', desc: 'CSS bottom positioning' },
        { prop: 'left', default: 'undefined', desc: 'CSS left positioning' },
        { prop: 'right', default: 'undefined', desc: 'CSS right positioning' },
        { prop: 'className', default: '""', desc: 'Additional CSS classes' },
        { prop: 'style', default: '{{}}', desc: 'Inline container styles' },
    ],
    Mars: [
        { prop: 'marsSize', default: '{0.6}', desc: 'Mars sphere radius' },
        { prop: 'phobosSize', default: '{0.05}', desc: 'Phobos moon radius' },
        { prop: 'deimosSize', default: '{0.04}', desc: 'Deimos moon radius' },
        { prop: 'phobosDistance', default: '{0.8}', desc: 'Phobos orbit distance' },
        { prop: 'deimosDistance', default: '{1.2}', desc: 'Deimos orbit distance' },
        { prop: 'phobosOrbitSpeed', default: '{0.03}', desc: 'Phobos orbital speed' },
        { prop: 'deimosOrbitSpeed', default: '{0.015}', desc: 'Deimos orbital speed' },
        { prop: 'marsRotationSpeed', default: '{0.001}', desc: 'Mars auto-rotation speed' },
        { prop: 'orbitOpacity', default: '{0.06}', desc: 'Orbit path line opacity' },
        { prop: 'tailOpacity', default: '{0.8}', desc: 'Moon trail opacity' },
        { prop: 'starCount', default: '{8000}', desc: 'Background star count' },
        { prop: 'autoRotate', default: '{true}', desc: 'Enable scene auto-rotation' },
        { prop: 'top', default: 'undefined', desc: 'CSS top positioning' },
        { prop: 'bottom', default: 'undefined', desc: 'CSS bottom positioning' },
        { prop: 'left', default: 'undefined', desc: 'CSS left positioning' },
        { prop: 'right', default: 'undefined', desc: 'CSS right positioning' },
        { prop: 'className', default: '""', desc: 'Additional CSS classes' },
        { prop: 'style', default: '{{}}', desc: 'Inline container styles' },
    ],
    Jupiter: [
        { prop: 'jupiterSize', default: '{0.8}', desc: 'Jupiter sphere radius' },
        { prop: 'jupiterRotationSpeed', default: '{0.002}', desc: 'Jupiter auto-rotation speed' },
        { prop: 'ringInnerRadius', default: '{1.6}', desc: 'Inner ring radius' },
        { prop: 'ringOuterRadius', default: '{1.8}', desc: 'Outer ring radius' },
        { prop: 'ringParticleCount', default: '{40000}', desc: 'Ring particle count' },
        { prop: 'ringRotationSpeed', default: '{0.005}', desc: 'Ring rotation speed' },
        { prop: 'starCount', default: '{8000}', desc: 'Background star count' },
        { prop: 'autoRotate', default: '{true}', desc: 'Enable scene auto-rotation' },
        { prop: 'top', default: 'undefined', desc: 'CSS top positioning' },
        { prop: 'bottom', default: 'undefined', desc: 'CSS bottom positioning' },
        { prop: 'left', default: 'undefined', desc: 'CSS left positioning' },
        { prop: 'right', default: 'undefined', desc: 'CSS right positioning' },
        { prop: 'className', default: '""', desc: 'Additional CSS classes' },
        { prop: 'style', default: '{{}}', desc: 'Inline container styles' },
    ],
    Saturn: [
        { prop: 'saturnSize', default: '{0.7}', desc: 'Saturn sphere radius' },
        { prop: 'ringInnerRadius', default: '{1.05}', desc: 'Ring inner radius' },
        { prop: 'ringWidth', default: '{0.75}', desc: 'Ring band width' },
        { prop: 'ringParticleCount', default: '{300000}', desc: 'Ring particle count' },
        { prop: 'saturnRotationSpeed', default: '{0.0015}', desc: 'Saturn auto-rotation speed' },
        { prop: 'ringRotationSpeed', default: '{0.011}', desc: 'Ring rotation speed' },
        { prop: 'particleRotationSpeed', default: '{0.006}', desc: 'Individual particle rotation speed' },
        { prop: 'tilt', default: '{26.7}', desc: 'Axial tilt in degrees' },
        { prop: 'ringRotation', default: '{0}', desc: 'Initial ring rotation in degrees' },
        { prop: 'starCount', default: '{8000}', desc: 'Background star count' },
        { prop: 'autoRotate', default: '{true}', desc: 'Enable scene auto-rotation' },
        { prop: 'top', default: 'undefined', desc: 'CSS top positioning' },
        { prop: 'bottom', default: 'undefined', desc: 'CSS bottom positioning' },
        { prop: 'left', default: 'undefined', desc: 'CSS left positioning' },
        { prop: 'right', default: 'undefined', desc: 'CSS right positioning' },
        { prop: 'className', default: '""', desc: 'Additional CSS classes' },
        { prop: 'style', default: '{{}}', desc: 'Inline container styles' },
    ],
    Uranus: [
        { prop: 'uranusSize', default: '{0.65}', desc: 'Uranus sphere radius' },
        { prop: 'ringInnerRadius', default: '{0.85}', desc: 'Ring inner radius (relative to planet)' },
        { prop: 'ringWidth', default: '{0.25}', desc: 'Ring band width' },
        { prop: 'ringParticleCount', default: '{30000}', desc: 'Ring particle count' },
        { prop: 'uranusRotationSpeed', default: '{0.0012}', desc: 'Uranus auto-rotation speed' },
        { prop: 'ringRotationSpeed', default: '{0.0008}', desc: 'Ring rotation speed' },
        { prop: 'particleRotationSpeed', default: '{0.008}', desc: 'Individual particle rotation speed' },
        { prop: 'starCount', default: '{8000}', desc: 'Background star count' },
        { prop: 'autoRotate', default: '{true}', desc: 'Enable scene auto-rotation' },
        { prop: 'top', default: 'undefined', desc: 'CSS top positioning' },
        { prop: 'bottom', default: 'undefined', desc: 'CSS bottom positioning' },
        { prop: 'left', default: 'undefined', desc: 'CSS left positioning' },
        { prop: 'right', default: 'undefined', desc: 'CSS right positioning' },
        { prop: 'className', default: '""', desc: 'Additional CSS classes' },
        { prop: 'style', default: '{{}}', desc: 'Inline container styles' },
    ],
    Neptune: [
        { prop: 'neptuneSize', default: '{0.65}', desc: 'Neptune sphere radius' },
        { prop: 'neptuneRotationSpeed', default: '{0.0013}', desc: 'Neptune auto-rotation speed' },
        { prop: 'ringInnerRadius', default: '{1.2}', desc: 'Ring inner radius' },
        { prop: 'ringOuterRadius', default: '{1.35}', desc: 'Ring outer radius' },
        { prop: 'ringParticleCount', default: '{25000}', desc: 'Ring particle count' },
        { prop: 'ringRotationSpeed', default: '{0.005}', desc: 'Ring rotation speed' },
        { prop: 'atmosphereOpacity', default: '{0.15}', desc: 'Atmosphere glow opacity' },
        { prop: 'starCount', default: '{8000}', desc: 'Background star count' },
        { prop: 'autoRotate', default: '{true}', desc: 'Enable scene auto-rotation' },
        { prop: 'top', default: 'undefined', desc: 'CSS top positioning' },
        { prop: 'bottom', default: 'undefined', desc: 'CSS bottom positioning' },
        { prop: 'left', default: 'undefined', desc: 'CSS left positioning' },
        { prop: 'right', default: 'undefined', desc: 'CSS right positioning' },
        { prop: 'className', default: '""', desc: 'Additional CSS classes' },
        { prop: 'style', default: '{{}}', desc: 'Inline container styles' },
    ],
    Pluto: [
        { prop: 'plutoSize', default: '{0.7}', desc: 'Pluto sphere radius' },
        { prop: 'plutoRotationSpeed', default: '{0.0008}', desc: 'Pluto auto-rotation speed' },
        { prop: 'starCount', default: '{8000}', desc: 'Background star count' },
        { prop: 'autoRotate', default: '{true}', desc: 'Enable scene auto-rotation' },
        { prop: 'top', default: 'undefined', desc: 'CSS top positioning' },
        { prop: 'bottom', default: 'undefined', desc: 'CSS bottom positioning' },
        { prop: 'left', default: 'undefined', desc: 'CSS left positioning' },
        { prop: 'right', default: 'undefined', desc: 'CSS right positioning' },
        { prop: 'className', default: '""', desc: 'Additional CSS classes' },
        { prop: 'style', default: '{{}}', desc: 'Inline container styles' },
    ],
    SolarSystem: [
        { prop: 'sunSize', default: '{5.0}', desc: 'Sun sphere radius' },
        { prop: 'planetSpeedMultiplier', default: '{1.0}', desc: 'Speed multiplier for all planet orbits' },
        { prop: 'starCount', default: '{9000}', desc: 'Background star count' },
        { prop: 'asteroidCount', default: '{1900}', desc: 'Asteroid belt particle count' },
        { prop: 'kuiperCount', default: '{9000}', desc: 'Kuiper belt particle count' },
        { prop: 'showOrbits', default: '{true}', desc: 'Show orbital path rings' },
        { prop: 'showTrails', default: '{true}', desc: 'Show planet motion trails' },
        { prop: 'initialDistance', default: '{280}', desc: 'Initial camera distance' },
        { prop: 'autoRotate', default: '{true}', desc: 'Enable scene auto-rotation' },
        { prop: 'top', default: 'undefined', desc: 'CSS top positioning' },
        { prop: 'bottom', default: 'undefined', desc: 'CSS bottom positioning' },
        { prop: 'left', default: 'undefined', desc: 'CSS left positioning' },
        { prop: 'right', default: 'undefined', desc: 'CSS right positioning' },
        { prop: 'className', default: '""', desc: 'Additional CSS classes' },
        { prop: 'style', default: '{{}}', desc: 'Inline container styles' },
    ],
    SolarSystemWithFeatures: [
        { prop: 'sunSize', default: '{5.0}', desc: 'Sun sphere radius' },
        { prop: 'planetSpeedMultiplier', default: '{1.0}', desc: 'Speed multiplier for all planet orbits' },
        { prop: 'starCount', default: '{9000}', desc: 'Background star count' },
        { prop: 'asteroidCount', default: '{1900}', desc: 'Asteroid belt particle count' },
        { prop: 'kuiperCount', default: '{9000}', desc: 'Kuiper belt particle count' },
        { prop: 'showOrbits', default: '{true}', desc: 'Show orbital path rings' },
        { prop: 'showTrails', default: '{true}', desc: 'Show planet motion trails' },
        { prop: 'initialDistance', default: '{280}', desc: 'Initial camera distance' },
        { prop: 'autoRotate', default: '{true}', desc: 'Enable scene auto-rotation' },
        { prop: 'top', default: 'undefined', desc: 'CSS top positioning' },
        { prop: 'bottom', default: 'undefined', desc: 'CSS bottom positioning' },
        { prop: 'left', default: 'undefined', desc: 'CSS left positioning' },
        { prop: 'right', default: 'undefined', desc: 'CSS right positioning' },
        { prop: 'className', default: '""', desc: 'Additional CSS classes' },
        { prop: 'style', default: '{{}}', desc: 'Inline container styles' },
    ],
};

// ─── component card ───────────────────────────────────────────────────────────
const ComponentCard = ({ icon: Icon, name, description, importName, path }) => {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);
    const [copied, setCopied] = useState(false);

    const props = componentPropsData[importName] || [];

    const usageCode = props.length > 0
        ? `import { ${importName} } from "3d-solar-system-globe";

<${importName}\n${props.map(p => `  ${p.prop}=${p.default}`).join('\n')}\n/>`
        : `import { ${importName} } from "3d-solar-system-globe";

<${importName} />`;

    const handleCopy = (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(usageCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={`rounded-xl border transition-all duration-300 overflow-hidden ${expanded ? 'border-orange-300 shadow-md shadow-orange-100' : 'border-[#e5e5e5]'
            }`}>
            {/* ── card header ── */}
            <button
                onClick={() => setExpanded(v => !v)}
                className={`w-full text-left p-4 flex items-center gap-3 group transition-colors duration-200 ${expanded ? 'bg-orange-50' : 'bg-[#fafafa] hover:bg-orange-50'
                    }`}
            >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors duration-200 ${expanded ? 'bg-orange-100' : 'bg-[#eee] group-hover:bg-orange-100'
                    }`}>
                    <Icon size={14} className={`transition-colors duration-200 ${expanded ? 'text-orange-500' : 'text-[#888] group-hover:text-orange-500'
                        }`} />
                </div>
                <div className="flex-1 min-w-0">
                    <span className="font-extrabold uppercase italic text-sm text-[#353935]/90 block">{name}</span>
                    <span className="text-[11px] text-[#999] font-mono">{`{ ${importName} }`}</span>
                </div>
                <ChevronRight
                    size={14} strokeWidth={3}
                    className={`flex-shrink-0 transition-all duration-300 ${expanded ? 'rotate-90 text-orange-500' : 'text-[#ccc] group-hover:text-orange-400'
                        }`}
                />
            </button>

            {/* ── expanded panel ── */}
            <div
                className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
                style={{ maxHeight: expanded ? '600px' : '0px' }}
            >
                <div className="bg-[#0d0d0d] border-t border-[#1f1f1f]">

                    {/* description bar */}
                    <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]">
                        <span className="text-[11px] text-[#888] font-medium">{description}</span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleCopy}
                                className={`flex items-center gap-1 px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest transition-all duration-200 ${copied ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-[#666] hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                {copied ? <><CheckCircle2 size={10} /> Copied</> : <><Copy size={10} /> Copy</>}
                            </button>
                            <button
                                onClick={() => navigate(path)}
                                className="flex items-center gap-1 px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 transition-all duration-200"
                            >
                                <Zap size={10} /> Live
                            </button>
                        </div>
                    </div>

                    {/* import line */}
                    <div className="px-4 pt-3 pb-1">
                        <span className="text-[10px] font-mono text-[#555] uppercase tracking-widest block mb-1.5">import</span>
                        <code className="text-[11px] font-mono">
                            <span className="text-[#c792ea]">import</span>
                            <span className="text-[#89ddff]"> &#123; </span>
                            <span className="text-[#82aaff]">{importName}</span>
                            <span className="text-[#89ddff]"> &#125; </span>
                            <span className="text-[#c792ea]">from</span>
                            <span className="text-[#c3e88d]"> "3d-solar-system-globe"</span>
                            <span className="text-[#89ddff]">;</span>
                        </code>
                    </div>

                    {/* props list */}
                    {props.length > 0 && (
                        <div className="px-4 py-3">
                            <span className="text-[10px] font-mono text-[#555] uppercase tracking-widest block mb-2">props</span>
                            <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin', scrollbarColor: '#333 transparent' }}>
                                {props.map((p, i) => (
                                    <div key={i} className="flex items-baseline gap-2 font-mono text-[11px] leading-relaxed">
                                        <span className="text-[#80cbc4] min-w-[9rem] shrink-0">{p.prop}</span>
                                        <span className="text-[#89ddff] shrink-0">=</span>
                                        <span className="text-[#c3e88d] shrink-0">{p.default}</span>
                                        <span className="text-[#546e7a] truncate">// {p.desc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* closing tag */}
                    <div className="px-4 pb-3">
                        <code className="text-[11px] font-mono text-[#89ddff]">&#47;&gt;</code>
                    </div>

                </div>
            </div>
        </div>
    );
};

// ─── divider ──────────────────────────────────────────────────────────────────
const Divider = () => <div className="h-px bg-gradient-to-r from-[#e5e5e5] via-orange-200 to-[#e5e5e5]" />;

// ─── main page ────────────────────────────────────────────────────────────────
export default function InstallationGuide() {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('overview');

    const toc = [
        { id: 'overview', label: 'Overview', icon: BookOpen },
        { id: 'installation', label: 'Installation', icon: Terminal },
        { id: 'peer-deps', label: 'Peer Dependencies', icon: Package },
        { id: 'peer-errors', label: 'Fixing Peer Errors', icon: Wrench },
        { id: 'css', label: 'CSS Import', icon: Code2 },
        { id: 'usage', label: 'Basic Usage', icon: Zap },
        { id: 'components', label: 'Components', icon: Puzzle },
        { id: 'frameworks', label: 'Frameworks', icon: Layers },
        { id: 'troubleshoot', label: 'Troubleshooting', icon: AlertTriangle },
    ];

    const components = [
        { icon: Sparkles, name: 'Galaxy', importName: 'Galaxy', description: 'Procedural spiral galaxy', path: '/galaxy' },
        { icon: Globe, name: 'Dot Globe', importName: 'DotGlobe', description: 'Dot-matrix Earth with satellites', path: '/dot-globe' },
        { icon: Network, name: 'Data Mesh Globe', importName: 'DotGlobeWithDataLink', description: 'Globe with data link beams', path: '/data-link' },
        { icon: Satellite, name: 'Orbital Satellite', importName: 'EarthAndSatellite', description: 'Earth with satellite swarm', path: '/satellite' },
        { icon: Radio, name: 'Earth Tower Link', importName: 'EarthWithTower', description: 'Earth with signal towers', path: '/tower' },
        { icon: Globe, name: 'Earth & Moon', importName: 'EarthAndMoon', description: 'Earth-Moon orbital system', path: '/moon' },
        { icon: RotateCw, name: 'Earth Moon Satellite', importName: 'EarthMoonSatellite', description: 'Earth, Moon & satellites', path: '/earth-moon-satellite' },
        { icon: Globe, name: 'Mercury', importName: 'Mercury', description: 'High-fidelity Mercury model', path: '/mercury' },
        { icon: Globe, name: 'Venus', importName: 'Venus', description: 'High-fidelity Venus model', path: '/venus' },
        { icon: Globe, name: 'Mars', importName: 'Mars', description: 'High-fidelity Mars model', path: '/mars' },
        { icon: Globe, name: 'Jupiter', importName: 'Jupiter', description: 'High-fidelity Jupiter model', path: '/jupiter' },
        { icon: Layers, name: 'Saturn', importName: 'Saturn', description: 'Saturn with ring system', path: '/saturn' },
        { icon: Globe, name: 'Uranus', importName: 'Uranus', description: 'High-fidelity Uranus model', path: '/uranus' },
        { icon: Globe, name: 'Neptune', importName: 'Neptune', description: 'High-fidelity Neptune model', path: '/neptune' },
        { icon: Globe, name: 'Pluto', importName: 'Pluto', description: 'High-fidelity Pluto model', path: '/pluto' },
        { icon: Sun, name: 'Solar System', importName: 'SolarSystem', description: 'Full solar system simulation', path: '/solar-system' },
        { icon: Sun, name: 'Grand Solar System', importName: 'SolarSystemWithFeatures', description: 'Solar system with data panel', path: '/solar-features' },
    ];

    // Active section tracker
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }); },
            { rootMargin: '-30% 0px -60% 0px' }
        );
        toc.forEach(({ id }) => { const el = document.getElementById(id); if (el) observer.observe(el); });
        return () => observer.disconnect();
    }, []);

    return (
        <div className="h-screen flex flex-col overflow-hidden bg-white selection:bg-orange-500 selection:text-black font-sans">
            <style>{animationStyles}</style>

            {/* ── HEADER ── */}
            <header className="relative flex-shrink-0 z-50 border-b border-[#e5e5e5] bg-white/95 backdrop-blur-xl">
                <ScrollProgressBar />
                <div className="px-6 h-[80px] flex items-center justify-end gap-4 anim-fadeinup" style={{ animationDelay: '0ms' }}>

                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 ml-[6%] px-5 py-2.5 rounded-lg border border-[#e5e5e5] text-[#666] hover:text-[#1a1a1a] hover:border-orange-400 hover:bg-orange-50 font-black uppercase italic text-xs transition-all duration-200"
                    >
                        Home
                    </button>

                    <LogoWithRotatingText
                        top="5%"
                        left="1.5%"
                        size={70} // Very large
                        style={{ transform: 'translate(-50%, -50%)' }}
                        theme="light"

                    />


                    <a
                        href="https://www.npmjs.com/package/3d-solar-system-globe"
                        target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg border border-[#e5e5e5] text-[#666] hover:text-[#1a1a1a] hover:border-orange-400 hover:bg-orange-50 font-black uppercase italic text-xs transition-all duration-200"
                    >
                        <Package size={13} /> npm
                    </a>
                    <button
                        onClick={() => navigate('/playground')}
                        className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-orange-500 border border-orange-500 text-white font-black uppercase italic text-xs hover:bg-orange-600 transition-all duration-200"
                    >
                        <Zap size={13} /> Playground
                    </button>

                </div>
            </header>

            {/* ── BELOW HEADER: SIDEBAR + CONTENT ── */}
            <div className="flex flex-1 overflow-hidden">

                {/* ── FIXED LEFT SIDEBAR ── */}
                <aside className="hidden lg:flex flex-col w-68 flex-shrink-0 border-r border-[#e5e5e5] bg-white overflow-y-auto">
                    <div className="p-6 md:pl-8 flex flex-col gap-2">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#999] mb-3 px-2 anim-fadeinleft" style={{ animationDelay: '150ms' }}>On this page</p>
                        <nav className="flex flex-col gap-1">
                            {toc.map(({ id, label, icon: Icon }, i) => (
                                <a
                                    key={id}
                                    href={`#${id}`}
                                    style={{ animationDelay: `${200 + i * 50}ms` }}
                                    className={`anim-fadeinleft flex items-center gap-2.5 px-3 py-3 rounded-lg text-xs font-bold transition-all duration-200 ${activeSection === id
                                        ? 'bg-orange-50 text-orange-500 border border-orange-200'
                                        : 'text-[#888] hover:text-[#1a1a1a] hover:bg-[#f5f5f5]'
                                        }`}
                                >
                                    <Icon size={13} className="flex-shrink-0" />
                                    {label}
                                    {activeSection === id && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-orange-500 toc-dot-pulse" />}
                                </a>
                            ))}
                        </nav>
                        <div className="mt-6 p-4 rounded-xl border border-[#e5e5e5] bg-[#f9f9f9]">
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#999] mb-2">Quick install</p>
                            <code className="text-[10px] font-mono text-green-600 break-all leading-relaxed">npm i 3d-solar-system-globe --legacy-peer-deps</code>
                        </div>
                    </div>
                </aside>

                {/* ── SCROLLABLE RIGHT CONTENT ── */}
                <div id="guide-scroll-area" className="flex-1 overflow-y-auto items-center justify-center">

                    {/* ── HERO ── */}
                    <div className="relative border-b border-[#e5e5e5] overflow-hidden bg-white">
                        <div className="px-8 sm:px-12 py-12 sm:py-12">

                            <h1 className="anim-fadeinup text-4xl sm:text-[80px] font-extrabold bg-clip-text uppercase italic tracking-tighter text-[#353935]/90 leading-[0.9] mb-5" style={{ animationDelay: '200ms' }}>
                                Installation<br />
                                <span className="text-transparent bg-clip-text pr-5 bg-gradient-to-r from-orange-400 to-orange-600">Guide</span>
                            </h1>
                            <p className="anim-fadeinup text-sm sm:text-xs text-[#353935]/40 font-medium leading-relaxed max-w-3xl mb-5" style={{ animationDelay: '320ms' }}>
                                Everything you need to add high-fidelity 3D planets, galaxies & solar systems to your React app — in under 60 seconds.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {[
                                    { label: 'Components', value: '17' },
                                    { label: 'Versions', value: '9' },
                                    { label: 'Unpacked', value: '57.5 MB' },
                                    { label: 'React', value: '≥ 18' },
                                ].map(({ label, value }, i) => (
                                    <div key={label} className="anim-scalein flex flex-col px-6 py-2 rounded-xl border border-[#e5e5e5] bg-[#f9f9f9] hover:border-orange-300 hover:bg-orange-50 transition-colors duration-200" style={{ animationDelay: `${420 + i * 70}ms` }}>
                                        <span className="text-lg sm:text-xl font-extrabold italic text-orange-500">{value}</span>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-[#999]">{label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="anim-floaty absolute right-0 -bottom-20 text-[clamp(80px,16vw,220px)] font-[1000] italic text-[#1a1a1a]/[0.04] select-none leading-none pointer-events-none">DOCS</div>
                    </div>

                    {/* ── MAIN CONTENT ── */}
                    <main className="px-8 sm:px-12 py-10 flex flex-col gap-10 max-w-6xl">

                        {/* ── 01 OVERVIEW ── */}
                        <Section id="overview" number="01" title="Overview" icon={BookOpen}>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {[
                                    { icon: Globe, label: 'WebGL Powered', desc: 'Three.js GPU-accelerated rendering' },
                                    { icon: Zap, label: 'Zero Config', desc: 'Drop-in components, no scene setup' },
                                    { icon: Layers, label: '17 Components', desc: 'Planets, galaxies, solar systems' },
                                ].map(({ icon: Icon, label, desc }, i) => (
                                    <AnimateOnScroll key={label} delay={i * 100} direction="scale">
                                        <div className="p-5 h-full rounded-xl border border-[#e5e5e5] bg-[#f9f9f9] group hover:border-orange-300 hover:bg-orange-50 hover:-translate-y-1 transition-all duration-200">
                                            <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center mb-3 group-hover:bg-orange-500/20 transition-colors duration-200">
                                                <Icon size={16} className="text-orange-500" />
                                            </div>
                                            <p className="font-black uppercase italic text-sm text-[#353935] mb-1">{label}</p>
                                            <p className="text-xs text-[#353935]/60 font-medium">{desc}</p>
                                        </div>
                                    </AnimateOnScroll>
                                ))}
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-5 rounded-xl border border-[#e5e5e5] bg-[#f5f5f5]">
                                {[
                                    { k: 'Package', v: '3d-solar-system-globe' },
                                    { k: 'Version', v: '0.0.9' },
                                    { k: 'License', v: 'none' },
                                    { k: 'React', v: '^18.0.0' },
                                ].map(({ k, v }) => (
                                    <div key={k}>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-orange-500 mb-0.5">{k}</p>
                                        <p className="text-xs font-mono text-[#555]">{v}</p>
                                    </div>
                                ))}
                            </div>
                        </Section>

                        <Divider />

                        {/* ── 02 INSTALLATION ── */}
                        <Section id="installation" number="02" title="Installation" icon={Terminal}>
                            <p className="text-sm text-[#666] font-medium">Use your preferred package manager:</p>
                            <div className="flex flex-col gap-3">
                                {[
                                    { label: 'npm', code: 'npm install 3d-solar-system-globe' },
                                    { label: 'yarn', code: 'yarn add 3d-solar-system-globe' },
                                    { label: 'pnpm', code: 'pnpm add 3d-solar-system-globe' },
                                ].map(({ label, code }, i) => (
                                    <AnimateOnScroll key={label} delay={i * 80} direction="left">
                                        <CodeBlock lang={label} code={code} />
                                    </AnimateOnScroll>
                                ))}
                            </div>
                        </Section>

                        <Divider />

                        {/* ── 03 PEER DEPENDENCIES ── */}
                        <Section id="peer-deps" number="03" title="Peer Dependencies" icon={Package}>
                            <Alert type="info" title="Required — not auto-installed">
                                Peer dependencies must be installed separately. They will not be pulled in automatically.
                            </Alert>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {[
                                    { pkg: 'react', version: '^18.0.0', desc: 'React runtime' },
                                    { pkg: 'react-dom', version: '^18.0.0', desc: 'DOM renderer' },
                                    { pkg: 'three', version: '^0.128.0', desc: '3D engine — required' },
                                ].map(({ pkg, version, desc }, i) => (
                                    <AnimateOnScroll key={pkg} delay={i * 90} direction="up">
                                        <div className="p-4 h-full rounded-xl border border-[#e5e5e5] bg-[#f9f9f9] hover:border-orange-200 hover:bg-orange-50/50 transition-all duration-200">
                                            <div className="flex items-center gap-2 mb-1">
                                                <code className="text-sm font-black text-orange-600">{pkg}</code>
                                                <Badge color="blue">{version}</Badge>
                                            </div>
                                            <p className="text-xs text-[#888] font-medium">{desc}</p>
                                        </div>
                                    </AnimateOnScroll>
                                ))}
                            </div>
                            <CodeBlock lang="bash — install all at once" code="npm install react@^18 react-dom@^18 three@^0.128.0" />
                        </Section>

                        <Divider />

                        {/* ── 04 FIXING PEER ERRORS ── */}
                        <Section id="peer-errors" number="04" title="Fixing Peer Dependency Errors" icon={Wrench}>
                            <Alert type="warning" title="ERESOLVE / dependency tree error">
                                If npm throws <code className="bg-amber-900/40 px-1 rounded font-mono text-[11px]">ERESOLVE unable to resolve dependency tree</code>, use one of these methods.
                            </Alert>

                            <MethodCard number="1" title="Legacy peer deps" badge="Recommended" badgeColor="green">
                                <p className="text-xs text-[#555] font-medium leading-relaxed">
                                    Passes <code className="bg-[#f0f0f0] px-1 rounded font-mono text-[11px] text-[#333]">--legacy-peer-deps</code> to use npm v6 resolution — safest workaround.
                                </p>
                                <CodeBlock lang="bash" code="npm install 3d-solar-system-globe --legacy-peer-deps" />
                                <Alert type="success" title="Safe to use">This only changes how npm resolves versions — no packages are overwritten.</Alert>
                            </MethodCard>

                            <MethodCard number="2" title="Force install" badge="Use with caution" badgeColor="amber">
                                <p className="text-xs text-[#555] font-medium leading-relaxed">
                                    <code className="bg-[#f0f0f0] px-1 rounded font-mono text-[11px] text-[#333]">--force</code> overrides all peer conflicts. May cause runtime issues in complex dependency trees.
                                </p>
                                <CodeBlock lang="bash" code="npm install 3d-solar-system-globe --force" />
                            </MethodCard>

                            <MethodCard number="3" title=".npmrc config" badge="Persistent" badgeColor="blue">
                                <p className="text-xs text-[#555] font-medium leading-relaxed">
                                    Add a <code className="bg-[#f0f0f0] px-1 rounded font-mono text-[11px] text-[#333]">.npmrc</code> to your project root — applies legacy mode to every future install.
                                </p>
                                <CodeBlock lang=".npmrc" code="legacy-peer-deps=true" />
                                <CodeBlock lang="bash — then just run" code="npm install 3d-solar-system-globe" />
                            </MethodCard>

                            <MethodCard number="★" title="Yarn & pnpm" badge="No flag needed" badgeColor="green">
                                <CodeBlock lang="yarn" code={`# Yarn resolves peer deps automatically\nyarn add 3d-solar-system-globe`} />
                                <CodeBlock lang="pnpm" code={`# pnpm — use overrides in package.json if needed\npnpm add 3d-solar-system-globe`} />
                            </MethodCard>
                        </Section>

                        <Divider />

                        {/* ── 05 CSS ── */}
                        <Section id="css" number="05" title="CSS Import" icon={Code2}>
                            <Alert type="info" title="Import once at your app entry">
                                Add this to <code className="bg-blue-900/30 px-1 rounded font-mono text-[11px]">main.jsx</code>, <code className="bg-blue-900/30 px-1 rounded font-mono text-[11px]">index.js</code>, or <code className="bg-blue-900/30 px-1 rounded font-mono text-[11px]">_app.js</code>. Without it, some layout and animation styles may break.
                            </Alert>
                            <CodeBlock lang="jsx" code={`import "3d-solar-system-globe/style.css";`} />
                        </Section>

                        <Divider />

                        {/* ── 06 USAGE ── */}
                        <Section id="usage" number="06" title="Basic Usage" icon={Zap}>
                            <p className="text-sm text-[#666] font-medium">All components are self-contained — no Three.js scene setup required.</p>
                            <CodeBlock lang="jsx — minimal" code={`import { SolarSystem } from "3d-solar-system-globe";
import "3d-solar-system-globe/style.css";

function App() {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <SolarSystem />
    </div>
  );
}

export default App;`} />
                            <CodeBlock lang="jsx — with props (Galaxy)" code={`import { Galaxy } from "3d-solar-system-globe";

function App() {
  return (
    <Galaxy
      stars={120000}
      arms={5}
      rotationSpeed={0.08}
      innerColor="#ff6600"
      outerColor="#1b3984"
      enableOptions={false}
      style={{ width: "100%", height: "600px" }}
    />
  );
}`} />
                            <CodeBlock lang="jsx — planet grid" code={`import { Mars, Saturn, Jupiter } from "3d-solar-system-globe";

function PlanetGrid() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
      <div style={{ height: 400 }}><Mars /></div>
      <div style={{ height: 400 }}><Saturn /></div>
      <div style={{ height: 400 }}><Jupiter /></div>
    </div>
  );
}`} />
                        </Section>

                        <Divider />

                        {/* ── 07 COMPONENTS ── */}
                        <Section id="components" number="07" title="All Components" icon={Puzzle}>
                            <p className="text-sm text-[#666] font-medium">Click any card to expand and see its props &amp; usage example.</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {components.map((c, i) => (
                                    <AnimateOnScroll key={c.name} delay={Math.min(i * 45, 400)} direction="up">
                                        <ComponentCard {...c} />
                                    </AnimateOnScroll>
                                ))}
                            </div>
                        </Section>

                        <Divider />

                        {/* ── 08 FRAMEWORKS ── */}
                        <Section id="frameworks" number="08" title="Framework Notes" icon={Layers}>
                            <div className="flex flex-col gap-4">
                                {[
                                    { name: 'Vite (React)', badge: '✓ Fully supported', badgeColor: 'green', body: 'Works out of the box. No extra config required.', code: 'npm create vite@latest my-app -- --template react\ncd my-app\nnpm install 3d-solar-system-globe --legacy-peer-deps', lang: 'bash' },
                                    { name: 'Create React App', badge: '✓ Supported', badgeColor: 'green', body: null, code: 'npx create-react-app my-app\ncd my-app\nnpm install 3d-solar-system-globe --legacy-peer-deps', lang: 'bash' },
                                ].map(({ name, badge, badgeColor, body, code, lang }) => (
                                    <div key={name} className="rounded-2xl border border-[#e5e5e5] overflow-hidden">
                                        <div className="px-5 py-3.5 border-b border-[#e5e5e5] bg-[#f9f9f9] flex items-center gap-3">
                                            <span className="font-black uppercase italic text-sm text-[#1a1a1a]">{name}</span>
                                            <Badge color={badgeColor}>{badge}</Badge>
                                        </div>
                                        <div className="p-5 flex flex-col gap-3">
                                            {body && <p className="text-xs text-[#666] font-medium">{body}</p>}
                                            <CodeBlock lang={lang} code={code} />
                                        </div>
                                    </div>
                                ))}

                                <div className="rounded-2xl border border-[#e5e5e5] overflow-hidden">
                                    <div className="px-5 py-3.5 border-b border-[#e5e5e5] bg-[#f9f9f9] flex items-center gap-3">
                                        <span className="font-black uppercase italic text-sm text-[#1a1a1a]">Next.js</span>
                                        <Badge color="amber">⚠ Needs dynamic import</Badge>
                                    </div>
                                    <div className="p-5 flex flex-col gap-4">
                                        <Alert type="warning" title="SSR Caveat">
                                            Three.js uses browser APIs (<code className="bg-amber-900/30 px-1 rounded font-mono text-[11px]">window</code>, <code className="bg-amber-900/30 px-1 rounded font-mono text-[11px]">document</code>, WebGL). Disable server-side rendering for every component from this package.
                                        </Alert>
                                        <CodeBlock lang="jsx — Next.js" code={`import dynamic from "next/dynamic";

const SolarSystem = dynamic(
  () => import("3d-solar-system-globe").then(m => m.SolarSystem),
  { ssr: false }
);

export default function Page() {
  return <SolarSystem style={{ width: "100%", height: "100vh" }} />;
}`} />
                                        <p className="text-xs text-[#999] font-medium">Apply the same pattern to every component from this package.</p>
                                    </div>
                                </div>
                            </div>
                        </Section>

                        <Divider />

                        {/* ── 09 TROUBLESHOOTING ── */}
                        <Section id="troubleshoot" number="09" title="Troubleshooting" icon={AlertTriangle}>
                            <div className="flex flex-col gap-3">
                                {[
                                    { problem: 'Black canvas / WebGL context lost', solution: 'The parent container must have an explicit height. Components fill 100% of their container.', code: `/* ✓ Good */\n<div style={{ width: "100%", height: "500px" }}>\n  <Galaxy />\n</div>\n\n/* ✗ Bad — zero height, nothing renders */\n<div>\n  <Galaxy />\n</div>` },
                                    { problem: "Cannot find module 'three'", solution: 'Three.js is a peer dependency — install it manually.', code: 'npm install three@^0.128.0' },
                                    { problem: 'Components not rendering in Next.js', solution: 'Use dynamic import with ssr: false — see Framework Notes above.', code: null },
                                    { problem: 'Styles broken / layout incorrect', solution: 'Import the stylesheet at your app root.', code: `// main.jsx or _app.js\nimport "3d-solar-system-globe/style.css";` },
                                    { problem: 'Slow / laggy on mobile', solution: 'Reduce particle and star counts via props.', code: `<Galaxy stars={30000} enableStarsBg={false} />\n<SolarSystem starCount={2000} asteroidCount={500} />` },
                                ].map(({ problem, solution, code }) => (
                                    <div key={problem} className="rounded-xl border border-[#e5e5e5] overflow-hidden">
                                        <div className="px-5 py-3 border-b border-[#e5e5e5] bg-[#fafafa] flex items-center gap-2">
                                            <AlertTriangle size={13} className="text-orange-500 flex-shrink-0" />
                                            <span className="font-black text-sm uppercase italic text-[#333]">{problem}</span>
                                        </div>
                                        <div className="p-5 flex flex-col gap-3">
                                            <p className="text-xs text-[#666] font-medium leading-relaxed">{solution}</p>
                                            {code && <CodeBlock lang="fix" code={code} />}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Section>

                        {/* ── FOOTER CTA ── */}
                        <AnimateOnScroll direction="up">
                            <div className="relative rounded-3xl overflow-hidden border-2 border-orange-200 bg-gradient-to-br from-orange-50 via-orange-50/50 to-white p-8 sm:p-10">
                                <div className="anim-floaty absolute top-0 right-0 text-[120px] font-extrabold italic text-orange-500/10 leading-none select-none pointer-events-none">GO</div>
                                <Badge color="orange">Ready to launch?</Badge>
                                <h3 className="text-3xl sm:text-6xl font-extrabold uppercase italic tracking-tighter text-[#353935]/90 mt-3 mb-6 leading-none">
                                    Start<br />Building →
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    <button
                                        onClick={() => navigate('/')}
                                        className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 border border-orange-400 text-white font-black uppercase italic text-sm rounded-xl hover:bg-orange-600 active:scale-95 transition-all duration-200"
                                    >
                                        <ArrowLeft size={14} strokeWidth={3} /> Back to Home
                                    </button>
                                    <button
                                        onClick={() => navigate('/playground')}
                                        className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#e5e5e5] text-[#353935]/90 font-extrabold uppercase italic text-sm rounded-xl hover:bg-[#f5f5f5] hover:text-[#1a1a1a] active:scale-95 transition-all duration-200"
                                    >
                                        <Zap size={14} /> Playground
                                    </button>
                                    <a
                                        href="https://www.npmjs.com/package/3d-solar-system-globe"
                                        target="_blank" rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#e5e5e5] text-[#353935]/90 font-extrabold uppercase italic text-sm rounded-xl hover:bg-[#f5f5f5] hover:text-[#1a1a1a] active:scale-95 transition-all duration-200"
                                    >
                                        <Package size={14} /> View on npm
                                    </a>
                                </div>
                            </div>
                        </AnimateOnScroll>

                    </main>
                </div>
            </div>
        </div>
    );
}

