import { EarthAndMoon } from '3d-solar-system-globe';
import { ArrowLeft, Check, Copy, Github, Linkedin, Twitter } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export const EARTH_CODE_SNIPPET = `import { EarthAndMoon } from '3d-solar-system-globe';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { useRef, useState } from 'react';

const TiltCard = ({ item }) => {
    const cardRef = useRef(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const rY = ((mouseX / rect.width) - 0.5) * 30;
        const rX = ((mouseY / rect.height) - 0.5) * -30;
        setRotation({ x: rX, y: rY });
        setMousePos({ x: mouseX, y: mouseY });
    };

    return (
        <div
            ref={cardRef}
            className="relative w-full aspect-[3/4] z-40"
            style={{ perspective: '1000px' }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { setIsHovered(false); setRotation({ x: 0, y: 0 }); }}
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
                    style={{ background: \`radial-gradient(circle at \${mousePos.x}px \${mousePos.y}px, rgba(255,255,255,0.06), transparent 60%)\` }}
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

const EarthLandingPage = () => {
    return (
        <div className="relative min-h-screen bg-[#000000] text-zinc-300 font-sans overflow-x-hidden">

            <div className="absolute top-[10vh] left-0 w-[100%] h-[120vh] z-0 pointer-events-auto">
                <EarthAndMoon
                    earthSize={1}
                    containerHeight='100%'
                    top='24%'
                />
            </div>

            <div className="relative z-10 w-full min-h-[92vh] flex flex-col items-center px-6 pt-24 md:pt-32 pointer-events-none">
                <div className='absolute h-[62vh] w-full top-0 left-0 z-10 pointer-events-none' style={{ background: 'linear-gradient(to bottom, #050505 60%, transparent 100%)' }} />
                <div className="relative z-20 flex flex-col items-center text-center max-w-4xl pointer-events-auto">
                    <h1 className="text-6xl md:text-[7.5rem] font-[600] tracking-tighter mb-6 text-white leading-none">
                        John Doe
                    </h1>
                    <p className="text-sm md:text-md font-light leading-relaxed mb-12 max-w-4xl text-zinc-400">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                        <button className="h-14 md:h-16 w-48 md:w-72 bg-black/40 border border-white/[0.08] border-t-white/[0.2] border-l-white/[0.2] backdrop-blur-xl rounded-full hover:bg-white/[0.05] shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] transition-all duration-300"></button>
                        <button className="w-14 h-14 md:w-16 md:h-16 bg-black/40 border border-white/[0.08] border-t-white/[0.2] border-l-white/[0.2] backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white/[0.05] shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] transition-all duration-300 text-zinc-400 hover:text-white group">
                            <Github size={24} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
                        </button>
                        <button className="w-14 h-14 md:w-16 md:h-16 bg-black/40 border border-white/[0.08] border-t-white/[0.2] border-l-white/[0.2] backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white/[0.05] shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] transition-all duration-300 text-zinc-400 hover:text-white group">
                            <Twitter size={24} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
                        </button>
                        <button className="w-14 h-14 md:w-16 md:h-16 bg-black/40 border border-white/[0.08] border-t-white/[0.2] border-l-white/[0.2] backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white/[0.05] shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] transition-all duration-300 text-zinc-400 hover:text-white group">
                            <Linkedin size={24} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="relative z-30 w-full bg-[#050505] flex flex-col items-center px-6 pb-40">
                <div className="absolute bottom-full left-0 w-full h-20 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none"></div>
                <div className="relative -top-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 w-full max-w-7xl">
                    {[1, 2, 3, 4].map((item) => (
                        <TiltCard key={item} item={item} />
                    ))}
                </div>
            </div>

        </div>
    );
};

export default EarthLandingPage;`;

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
            className="relative w-full aspect-[3/4] z-40"
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

const EarthLandingPage = () => {
    const [copied, setCopied] = useState(false);

    useEffect(() => { }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(EARTH_CODE_SNIPPET).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="relative min-h-screen bg-[#000000] text-zinc-300 font-sans overflow-x-hidden">

            {/* Floating Top-Right Buttons */}
            <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
                <a
                    href="/"
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300
                        bg-black/60 border border-white/40 text-white hover:text-white hover:border-white/30 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.6)]"
                >
                    <ArrowLeft size={14} strokeWidth={1.5} /> Home
                </a>
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

            {/* Earth background - positioned absolutely so the lower half gets covered */}
            <div className="absolute top-[10vh] left-0 w-[100%] h-[120vh] z-0 pointer-events-auto">
                <EarthAndMoon
                    earthSize={1}
                    containerHeight='100%'
                    top='24%'
                    moonDistance={1.6}
                    moonOrbitSpeed={0.009}
                    moonSize={0.1}
                />
            </div>

            {/* Top Hero Section (Transparent so the upper globe is visible) */}
            <div className="relative z-10 w-full min-h-[92vh] flex flex-col items-center px-6 pt-24  md:pt-32 pointer-events-none">

                <div className='absolute h-[62vh] w-full top-0 left-0 z-10 pointer-events-none' style={{ background: 'linear-gradient(to bottom, #050505 60%, transparent 100%)' }} />
                {/* Content Container - pointer-events-auto restored so buttons are clickable */}
                <div className="relative z-20 flex flex-col items-center text-center max-w-4xl pointer-events-auto">

                    {/* Heading */}
                    <h1 className="text-6xl md:text-[7.5rem] font-[600] tracking-tighter mb-6 text-white leading-none">
                        John Doe
                    </h1>

                    {/* Subtext Paragraph */}
                    <p className="text-sm md:text-md font-light leading-relaxed mb-12 max-w-4xl text-zinc-400">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>

                    {/* Action Buttons Row */}
                    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                        {/* Main Pill Button */}
                        <button className="h-14 md:h-16 w-48 md:w-72 bg-black/40 border border-white/[0.08] border-t-white/[0.2] border-l-white/[0.2] backdrop-blur-xl rounded-full hover:bg-white/[0.05] shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] transition-all duration-300">BUTTON</button>

                        {/* Circular Social Buttons */}
                        <button className="w-14 h-14 md:w-16 md:h-16 bg-black/40 border border-white/[0.08] border-t-white/[0.2] border-l-white/[0.2] backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white/[0.05] shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] transition-all duration-300 text-zinc-400 hover:text-white group">
                            <Github size={24} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
                        </button>
                        <button className="w-14 h-14 md:w-16 md:h-16 bg-black/40 border border-white/[0.08] border-t-white/[0.2] border-l-white/[0.2] backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white/[0.05] shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] transition-all duration-300 text-zinc-400 hover:text-white group">
                            <Twitter size={24} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
                        </button>
                        <button className="w-14 h-14 md:w-16 md:h-16 bg-black/40 border border-white/[0.08] border-t-white/[0.2] border-l-white/[0.2] backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white/[0.05] shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] transition-all duration-300 text-zinc-400 hover:text-white group">
                            <Linkedin size={24} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
                        </button>
                    </div>

                </div>
            </div>

            {/* Black Film Section (Covers the lower half of the globe) */}
            <div className="relative z-30 w-full bg-[#050505] flex flex-col items-center px-6 pb-40 ">

                {/* Gradient transition to blend the top edge of the black film over the globe seamlessly */}
                <div className="absolute bottom-full left-0 w-full h-20 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none"></div>

                {/* Bottom Section: 4 Vertical Cards shown ON TOP of the black film */}
                <div className="relative -top-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 w-full max-w-7xl ">
                    {[1, 2, 3, 4].map((item) => (
                        <TiltCard key={item} item={item} />
                    ))}
                </div>
            </div>

        </div>
    );
};

export default EarthLandingPage;