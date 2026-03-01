import { ArrowLeft, ArrowRight, Sparkles, Star, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Galaxy from '../components/Galaxy';

const GalaxyLandingPage = () => {
    const navigate = useNavigate();
    const [scrollY, setScrollY] = useState(0);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 100);
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const features = [
        {
            icon: Sparkles,
            title: 'Particle System',
            desc: 'Millions of individually animated star particles forming spiral arms, a dense core, and outer dust lanes.',
        },
        {
            icon: Zap,
            title: 'GPU Accelerated',
            desc: 'Runs entirely on the GPU via Three.js BufferGeometry, delivering smooth 60 fps even on mobile devices.',
        },
        {
            icon: Star,
            title: 'Fully Customisable',
            desc: 'Tune particle count, arm count, spin factor, colors, size, and rotation speed through simple props.',
        },
    ];

    const codeSnippet = `import { Galaxy } from "3d-solar-system-globe";

function App() {
    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <Galaxy
                particleCount={50000}
                armCount={4}
                spinFactor={1.5}
                coreColor="#ffddaa"
                armColor="#ffaa55"
                dustColor="#ff7744"
                particleSize={2}
                rotationSpeed={0.02}
            />
        </div>
    );
}`;

    return (
        <div className="min-h-screen bg-[#050508] text-white font-sans overflow-x-hidden">

            {/* ── HERO ── */}
            <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">

                {/* Full-screen galaxy canvas */}
                <div className="absolute inset-0 z-0">
                    <Galaxy
                    cameraAngle={90}
                        stars={150000}
                        radius={12.10}
                        arms={4}
                        coreSize={1.90}
                        spinCurvature={1.80}
                        randomness={0.21}
                        rotationSpeed={0.50}
                        starSize={0.07}
                    />
                </div>

                {/* Vignette overlay */}
                <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />

                {/* Back button */}
                <button
                    onClick={() => navigate('/')}
                    className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                >
                    <ArrowLeft size={14} strokeWidth={3} /> Home
                </button>

                {/* Hero copy */}
                <div
                    className="relative z-20 text-center px-6 max-w-4xl mx-auto"
                    style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'translateY(0)' : 'translateY(30px)',
                        transition: 'opacity 1s ease-out, transform 1s ease-out',
                    }}
                >
                    <span className="inline-block mb-4 px-4 py-1 border border-orange-500/60 text-orange-400 text-xs font-black uppercase tracking-[0.3em] rounded-full bg-orange-500/10">
                        3d-solar-system-globe
                    </span>

                    <h1 className="text-6xl sm:text-8xl md:text-[7rem] font-[1000] tracking-tighter italic uppercase leading-[0.85] mb-6">
                        Galaxy<br />
                        <span className="text-orange-500">Generator</span>
                    </h1>

                    <p className="text-lg sm:text-xl text-white/60 font-medium max-w-xl mx-auto leading-relaxed mb-10">
                        A real-time, interactive spiral galaxy rendered entirely in WebGL — drop it into any React app in seconds.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <button
                            onClick={() => navigate('/galaxy')}
                            className="flex items-center gap-2 px-8 py-4 bg-orange-500 text-white font-black uppercase italic text-sm rounded-2xl border-2 border-orange-500 hover:bg-transparent hover:text-orange-400 transition-all duration-300 shadow-[0_0_30px_rgba(249,115,22,0.4)]"
                        >
                            Live Preview <ArrowRight size={16} strokeWidth={3} />
                        </button>
                        <a
                            href="https://www.npmjs.com/package/3d-solar-system-globe"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-black uppercase italic text-sm rounded-2xl border-2 border-white/20 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                        >
                            npm Install
                        </a>
                    </div>
                </div>

                {/* Scroll hint */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-40">
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Scroll</span>
                    <div className="w-px h-12 bg-gradient-to-b from-white to-transparent animate-pulse" />
                </div>
            </section>

            {/* ── FEATURES ── */}
            <section className="relative py-32 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl sm:text-6xl font-[1000] tracking-tighter italic uppercase text-white mb-4">
                            What&apos;s inside
                        </h2>
                        <p className="text-white/50 text-base max-w-lg mx-auto">
                            Everything you need to add a stunning galaxy to your next project.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {features.map((f, i) => (
                            <div
                                key={i}
                                className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-orange-500/50 hover:bg-orange-500/5 transition-all duration-500 group"
                                style={{ animationDelay: `${i * 0.1}s` }}
                            >
                                <f.icon
                                    size={32}
                                    className="text-orange-500 mb-6 group-hover:scale-110 transition-transform duration-300"
                                    strokeWidth={1.5}
                                />
                                <h3 className="text-lg font-black uppercase italic tracking-tight mb-3 text-white">
                                    {f.title}
                                </h3>
                                <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CODE SNIPPET ── */}
            <section className="py-24 px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl sm:text-5xl font-[1000] tracking-tighter italic uppercase text-white mb-4 text-center">
                        Get started in <span className="text-orange-500">30 seconds</span>
                    </h2>
                    <p className="text-white/50 text-center mb-12 text-sm">
                        Install the package and paste the snippet below — that&apos;s it.
                    </p>

                    {/* Install */}
                    <div className="bg-black/60 border border-white/10 rounded-2xl px-6 py-4 font-mono text-sm text-green-400 mb-4 flex items-center gap-3">
                        <span className="text-white/30 select-none">$</span>
                        <span>npm install 3d-solar-system-globe</span>
                    </div>

                    {/* Code block */}
                    <div className="bg-[#0d0d14] border border-white/10 rounded-2xl overflow-hidden">
                        <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10">
                            <div className="w-3 h-3 rounded-full bg-red-500/70" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                            <div className="w-3 h-3 rounded-full bg-green-500/70" />
                            <span className="ml-3 text-white/30 text-xs font-mono">App.jsx</span>
                        </div>
                        <pre className="p-6 text-xs sm:text-sm font-mono text-left leading-relaxed overflow-x-auto">
                            <code>
                                {codeSnippet.split('\n').map((line, i) => (
                                    <div key={i} className="flex">
                                        <span className="w-8 text-white/20 select-none flex-shrink-0">{i + 1}</span>
                                        <span
                                            className={
                                                line.includes('import') ? 'text-purple-400' :
                                                    line.includes('<Galaxy') || line.includes('/>') || line.includes('>') ? 'text-orange-400' :
                                                        line.includes('=') && !line.includes('=>') ? 'text-blue-300' :
                                                            line.includes('"') ? 'text-green-400' :
                                                                line.includes('//') ? 'text-white/30' :
                                                                    'text-white/80'
                                            }
                                        >
                                            {line}
                                        </span>
                                    </div>
                                ))}
                            </code>
                        </pre>
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-32 px-6 relative overflow-hidden">
                {/* Glow blob */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[600px] h-[600px] rounded-full bg-orange-500/10 blur-[120px]" />
                </div>

                <div className="relative max-w-2xl mx-auto text-center">
                    <h2 className="text-5xl sm:text-7xl font-[1000] tracking-tighter italic uppercase text-white mb-6 leading-[0.9]">
                        Start building<br /><span className="text-orange-500">your cosmos</span>
                    </h2>
                    <p className="text-white/50 mb-12 text-base leading-relaxed">
                        The <code className="text-orange-400 bg-white/10 px-1.5 py-0.5 rounded text-sm">Galaxy</code> component is one of 20+ models in the 3d-solar-system-globe library. Explore them all.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center gap-2 px-8 py-4 bg-orange-500 text-white font-black uppercase italic text-sm rounded-2xl hover:bg-orange-600 transition-all duration-300 shadow-[0_0_40px_rgba(249,115,22,0.3)]"
                        >
                            Explore All Models <ArrowRight size={16} strokeWidth={3} />
                        </button>
                        <button
                            onClick={() => navigate('/installation-guide')}
                            className="flex items-center gap-2 px-8 py-4 bg-transparent text-white font-black uppercase italic text-sm rounded-2xl border-2 border-white/20 hover:border-white/50 transition-all duration-300"
                        >
                            Documentation
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/10 py-8 px-6 text-center text-white/30 text-xs font-mono">
                3d-solar-system-globe &nbsp;·&nbsp; MIT License &nbsp;·&nbsp; Built with Three.js &amp; React
            </footer>
        </div>
    );
};

export default GalaxyLandingPage;
