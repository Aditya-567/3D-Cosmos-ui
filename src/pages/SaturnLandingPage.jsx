import { Saturn } from '3d-solar-system-globe';
import { ArrowLeft, ArrowRight, Check, Copy, Github, Linkedin, Twitter } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export const SATURN_CODE_SNIPPET = `import { Saturn } from '3d-solar-system-globe';
import { ArrowRight, Check, Copy, Github, Linkedin, Twitter } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const TiltCard = ({ item }) => {
    const cardRef = useRef(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const rY = ((mouseX / width) - 0.5) * 30;
        const rX = ((mouseY / height) - 0.5) * -30;
        setRotation({ x: rX, y: rY });
        setMousePos({ x: mouseX, y: mouseY });
    };

    return (
        <div
            ref={cardRef}
            className="relative w-full aspect-[3/4]"
            style={{ perspective: '1000px' }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setRotation({ x: 0, y: 0 });
            }}
        >
            <div
                className="w-full h-full bg-black/40 border border-white/[0.08] border-t-white/[0.2] border-l-white/[0.2] backdrop-blur-2xl rounded-[1.5rem] cursor-pointer relative overflow-hidden group shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]"
                style={{
                    transform: isHovered
                        ? \`rotateX(\${rotation.x}deg) rotateY(\${rotation.y}deg) scale3d(1.02, 1.02, 1.02)\`
                        : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
                    transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
                    transformStyle: 'preserve-3d',
                }}
            >
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                        background: \`radial-gradient(circle at \${mousePos.x}px \${mousePos.y}px, rgba(255,255,255,0.06), transparent 60%)\`
                    }}
                />
                <div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-300"
                    style={{ transform: isHovered ? 'translateZ(40px)' : 'translateZ(0px)' }}
                >
                    <span className="text-white/5 font-bold text-6xl group-hover:text-white/20 transition-colors duration-500">
                        0{item}
                    </span>
                </div>
            </div>
        </div>
    );
};

const SaturnLandingPage = () => {
    const [copied, setCopied] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 1024);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(SATURN_CODE_SNIPPET).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="min-h-screen bg-[#000000] text-zinc-300 font-sans p-4 md:p-8 flex items-center justify-center relative overflow-hidden">

            {/* Floating Copy Code Button */}
            <button
                onClick={handleCopy}
                className={\`fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300
                    bg-black/60 border backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.6)]
                    \${copied
                        ? 'border-emerald-400/60 text-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.3)]'
                        : 'border-white/40 text-white hover:text-white hover:border-white/30'
                    }\`}
            >
                {copied ? (
                    <><Check size={14} strokeWidth={2} /> Copied!</>
                ) : (
                    <><Copy size={14} strokeWidth={1.5} /> Copy Code</>
                )}
            </button>

            {/* Ambient background glows */}
            <div className="z-40 absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#333]/40 blur-[150px] rounded-full pointer-events-none"></div>
          
            {/* Overlay */}
            <div
                className='absolute z-30 top-0 left-0 w-full h-[150vh]'
                style={isMobile
                    ? { background: 'rgba(0,0,0,0.4)' }
                    : { background: 'linear-gradient(to right, black 40%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.1) 80%, transparent 100%)' }
                }
            ></div>

            <div className="absolute min-h-screen w-[100%] right-0 top-0 z-10">
                <div className='z-10'>
                    <Saturn
                        left={isMobile ? '0%' : '38%'}
                        top={isMobile ? '-10%' : '-25%'}
                        autoRotate
                        autoRotateSpeed={0.5}
                        enableZoom={false}
                        containerHeight='150vh'
                        saturnSize={0.5}
                        ringWidth={0.6}
                        ringParticleCount={200000}
                        ringInnerRadius={0.75}
                    />
                </div>
            </div>

            <div className="w-full max-w-7xl p-4 md:p-12 mt-10 z-40">
                <div className="relative flex flex-col-reverse lg:flex-row items-center justify-between gap-12 mb-20">
                    <div className="flex-1 flex flex-col items-start gap-6 z-40">
                        <h1 className="text-5xl md:text-9xl font-[600] tracking-tighter text-white leading-none">
                            Jhone doe
                        </h1>
                        <p className="text-sm md:text-base font-light text-zinc-400 leading-relaxed max-w-xl">
                            Full-stack developer and creative technologist crafting immersive web experiences with React, Three.js, and elegant API ecosystems for ambitious teams.
                        </p>
                        <div className="flex flex-wrap items-center gap-4 mt-4">
                            <button className="h-12 w-32 bg-black/40 border border-white/[0.08] border-t-white/[0.2] border-l-white/[0.2] backdrop-blur-xl rounded-full hover:bg-white/[0.05] shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] transition-all duration-300"></button>
                            <button className="w-12 h-12 bg-black/40 border border-white/[0.08] border-t-white/[0.2] border-l-white/[0.2] backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white/[0.05] shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] transition-all duration-300 text-zinc-400 hover:text-white">
                                <Github size={20} strokeWidth={1.5} />
                            </button>
                            <button className="w-12 h-12 bg-black/40 border border-white/[0.08] border-t-white/[0.2] border-l-white/[0.2] backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white/[0.05] shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] transition-all duration-300 text-zinc-400 hover:text-white">
                                <Twitter size={20} strokeWidth={1.5} />
                            </button>
                            <button className="w-12 h-12 bg-black/40 border border-white/[0.08] border-t-white/[0.2] border-l-white/[0.2] backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white/[0.05] shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] transition-all duration-300 text-zinc-400 hover:text-white">
                                <Linkedin size={20} strokeWidth={1.5} />
                            </button>
                        </div>
                        <button className="group flex items-center gap-3 mt-6 text-zinc-400 font-medium tracking-widest uppercase text-xs hover:text-white transition-colors">
                            Text Button
                            <ArrowRight size={16} strokeWidth={1.5} className="group-hover:translate-x-2 transition-transform duration-300" />
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {[1, 2, 3, 4].map((item) => (
                        <TiltCard key={item} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SaturnLandingPage;`;

const TiltCard = ({ item }) => {
    const cardRef = useRef(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        // Mouse position relative to the card
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Calculate rotation: max 15 degrees in either direction
        const rY = ((mouseX / width) - 0.5) * 30;
        const rX = ((mouseY / height) - 0.5) * -30;

        setRotation({ x: rX, y: rY });
        setMousePos({ x: mouseX, y: mouseY });
    };

    return (
        <div
            ref={cardRef}
            className="relative w-full aspect-[3/4]"
            style={{ perspective: '1000px' }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setRotation({ x: 0, y: 0 });
            }}
        >
            <div
                className="w-full h-full bg-black/40 border border-white/[0.08] border-t-white/[0.2] border-l-white/[0.2] backdrop-blur-2xl rounded-[1.5rem] cursor-pointer relative overflow-hidden group shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]"
                style={{
                    transform: isHovered
                        ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.02, 1.02, 1.02)`
                        : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
                    transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
                    transformStyle: 'preserve-3d',
                }}
            >
                {/* Dynamic interactive glare effect */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                        background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.06), transparent 60%)`
                    }}
                />

                {/* Inner Content - translated on Z axis for 3D parallax depth */}
                <div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-300"
                    style={{ transform: isHovered ? 'translateZ(40px)' : 'translateZ(0px)' }}
                >
                    <span className="text-white/5 font-bold text-6xl group-hover:text-white/20 transition-colors duration-500">
                        0{item}
                    </span>
                </div>
            </div>
        </div>
    );
};

const SaturnLandingPage = () => {
    const [copied, setCopied] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 1024);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(SATURN_CODE_SNIPPET).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="min-h-screen bg-[#000000] text-zinc-300 font-sans p-4 md:p-8 flex items-center justify-center relative overflow-hidden">

            {/* Floating Top-Right Buttons */}
            <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
                {/* Back to Home Button */}
                <a
                    href="/"
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300
                        bg-black/60 border border-white/40 text-white hover:text-white hover:border-white/30 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.6)]"
                >
                    <ArrowLeft size={14} strokeWidth={1.5} /> Home
                </a>

                {/* Copy Code Button */}
                <button
                    onClick={handleCopy}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300
                        bg-black/60 border backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.6)]
                        ${copied
                            ? 'border-emerald-400/60 text-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.3)]'
                            : 'border-white/40 text-white hover:text-white hover:border-white/30'
                        }`}
                >
                    {copied ? (
                        <><Check size={14} strokeWidth={2} /> Copied!</>
                    ) : (
                        <><Copy size={14} strokeWidth={1.5} /> Copy Code</>
                    )}
                </button>
            </div>

            {/* Ambient background glows to refract through the dark glass */}
            <div className="z-40 absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#333]/40 blur-[150px] rounded-full pointer-events-none"></div>

            {/* Right Side: Local Saturn Placeholder */}
            <div
                className='absolute z-30 top-0 left-0 w-full h-[150vh]'
                style={isMobile
                    ? { background: 'rgba(0,0,0,0.4)' }
                    : { background: 'linear-gradient(to right, black 40%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.1) 80%, transparent 100%)' }
                }
            ></div>

            <div className="absolute min-h-screen w-[100%] right-0 top-0 z-10">
                <div className='z-10'>
                    <Saturn
                        left={isMobile ? '0%' : '38%'}
                        top={isMobile ? '-10%' : '-25%'}
                        autoRotate
                        autoRotateSpeed={0.5}
                        enableZoom={false}
                        containerHeight='150vh'
                        saturnSize={0.5}
                        ringWidth={0.6}
                        ringParticleCount={200000}
                        ringInnerRadius={0.75}
                    />
                </div>
            </div>

            {/* Main Outer Container - Transparent */}
            <div className=" w-full max-w-7xl p-4 md:p-12 mt-10 z-40">

                {/* Top Section: Hero & Planet Placeholder */}
                <div className="relative flex flex-col-reverse lg:flex-row items-center justify-between gap-12 mb-20">

                    {/* Left Side: Content */}
                    <div className="flex-1 flex flex-col items-start gap-6 z-40">
                        <h1 className="text-5xl md:text-9xl font-[600] tracking-tighter text-white leading-none">
                            Jhone doe
                        </h1>

                        <p className="text-sm md:text-base font-light text-zinc-400 leading-relaxed max-w-xl">
                            Full-stack developer and creative technologist crafting immersive web experiences with React, Three.js, and elegant API ecosystems for ambitious teams. Full-stack developer and creative technologist crafting immersive web experiences with React, Three.js, and elegant API ecosystems for ambitious teams.
                        </p>

                        {/* Action Buttons Row */}
                        <div className="flex flex-wrap items-center gap-4 mt-4">
                            {/* Main Pill Button */}
                            <button className="h-12 w-32 bg-black/40 border border-white/[0.08] border-t-white/[0.2] border-l-white/[0.2] backdrop-blur-xl rounded-full hover:bg-white/[0.05] shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] transition-all duration-300">
                                {/* Empty space as requested */}
                            </button>

                            {/* Circular Social Buttons */}
                            <button className="w-12 h-12 bg-black/40 border border-white/[0.08] border-t-white/[0.2] border-l-white/[0.2] backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white/[0.05] shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] transition-all duration-300 text-zinc-400 hover:text-white">
                                <Github size={20} strokeWidth={1.5} />
                            </button>
                            <button className="w-12 h-12 bg-black/40 border border-white/[0.08] border-t-white/[0.2] border-l-white/[0.2] backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white/[0.05] shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] transition-all duration-300 text-zinc-400 hover:text-white">
                                <Twitter size={20} strokeWidth={1.5} />
                            </button>
                            <button className="w-12 h-12 bg-black/40 border border-white/[0.08] border-t-white/[0.2] border-l-white/[0.2] backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white/[0.05] shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] transition-all duration-300 text-zinc-400 hover:text-white">
                                <Linkedin size={20} strokeWidth={1.5} />
                            </button>
                        </div>

                        {/* Text Link */}
                        <button className="group flex items-center gap-3 mt-6 text-zinc-400 font-medium tracking-widest uppercase text-xs hover:text-white transition-colors">
                            Text Button
                            <ArrowRight size={16} strokeWidth={1.5} className="group-hover:translate-x-2 transition-transform duration-300" />
                        </button>
                    </div>



                </div>

                {/* Bottom Section: 4 Vertical Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {[1, 2, 3, 4].map((item) => (
                        <TiltCard key={item} item={item} />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default SaturnLandingPage;