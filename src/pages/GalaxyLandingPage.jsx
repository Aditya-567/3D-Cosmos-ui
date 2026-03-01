import { Galaxy } from '3d-solar-system-globe';
import { ArrowLeft, ArrowRight, Check, Copy, Github, Linkedin, Twitter } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';


export const GALAXY_CODE_SNIPPET = "import { Galaxy } from '3d-solar-system-globe';\nimport { ArrowRight, Check, Copy, Github, Linkedin, Twitter } from 'lucide-react';\nimport { useEffect, useRef, useState } from 'react';\n\nconst TiltCard = ({ item }) => {\n    const cardRef = useRef(null);\n    const [rotation, setRotation] = useState({ x: 0, y: 0 });\n    const [isHovered, setIsHovered] = useState(false);\n    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });\n\n    const handleMouseMove = (e) => {\n        if (!cardRef.current) return;\n        const rect = cardRef.current.getBoundingClientRect();\n        const mouseX = e.clientX - rect.left;\n        const mouseY = e.clientY - rect.top;\n        const rY = ((mouseX / rect.width) - 0.5) * 30;\n        const rX = ((mouseY / rect.height) - 0.5) * -30;\n        setRotation({ x: rX, y: rY });\n        setMousePos({ x: mouseX, y: mouseY });\n    };\n\n    return (\n        <div\n            ref={cardRef}\n            className=\"relative w-full aspect-[3/4]\"\n            style={{ perspective: '1000px' }}\n            onMouseMove={handleMouseMove}\n            onMouseEnter={() => setIsHovered(true)}\n            onMouseLeave={() => { setIsHovered(false); setRotation({ x: 0, y: 0 }); }}\n        >\n            <div\n                className=\"w-full h-full bg-black/40 border border-white/[0.08] border-t-white/[0.2] border-l-white/[0.2] backdrop-blur-2xl rounded-[1.5rem] cursor-pointer relative overflow-hidden group shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]\"\n                style={{\n                    transform: isHovered\n                        ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.02,1.02,1.02)`\n                        : 'rotateX(0deg) rotateY(0deg) scale3d(1,1,1)',\n                    transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',\n                    transformStyle: 'preserve-3d',\n                }}\n            >\n                <div\n                    className=\"absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none\"\n                    style={{ background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.06), transparent 60%)` }}\n                />\n                <div\n                    className=\"absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-300\"\n                    style={{ transform: isHovered ? 'translateZ(40px)' : 'translateZ(0px)' }}\n                >\n                    <span className=\"text-white/5 font-bold text-6xl group-hover:text-white/20 transition-colors duration-500\">\n                        0{item}\n                    </span>\n                </div>\n            </div>\n        </div>\n    );\n};\n\nconst GalaxyLandingPage = () => {\n    const [copied, setCopied] = useState(false);\n    const [isMobile, setIsMobile] = useState(false);\n\n    useEffect(() => {\n        const check = () => setIsMobile(window.innerWidth < 1024);\n        check();\n        window.addEventListener('resize', check);\n        return () => window.removeEventListener('resize', check);\n    }, []);\n\n    const handleCopy = () => {\n        navigator.clipboard.writeText(GALAXY_CODE_SNIPPET).then(() => {\n            setCopied(true);\n            setTimeout(() => setCopied(false), 2000);\n        });\n    };\n\n    return (\n        <div className=\"min-h-screen bg-[#000000] text-zinc-300 font-sans p-4 md:p-8 flex items-center justify-center relative overflow-hidden\">\n\n            {/* Floating Copy Code Button */}\n            <button\n                onClick={handleCopy}\n                className={`fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300\n                    bg-black/60 border backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.6)]\n                    ${copied\n                        ? 'border-emerald-400/60 text-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.3)]'\n                        : 'border-white/40 text-white hover:text-white hover:border-white/30'\n                    }`}\n            >\n                {copied ? (\n                    <><Check size={14} strokeWidth={2} /> Copied!</>\n                ) : (\n                    <><Copy size={14} strokeWidth={1.5} /> Copy Code</>\n                )}\n            </button>\n\n            {/* Ambient background glow */}\n            <div className=\"z-40 absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-zinc-800/30 blur-[150px] rounded-full pointer-events-none\"></div>\n\n            {/* Gradient overlay */}\n            <div\n                className='absolute z-30 top-0 left-0 w-full h-[150vh]'\n                style={isMobile\n                    ? { background: 'rgba(0,0,0,0.4)' }\n                    : { background: 'rgba(0,0,0,0.3)'}\n                }\n            ></div>\n\n            {/* Galaxy background */}\n            <div className=\"absolute min-h-screen w-[100%] right-0 top-0 z-10\">\n                <Galaxy\n                    cameraAngle={30}\n                    stars={190000}\n                    radius={10}\n                    arms={3}\n                    coreSize={2.2}\n                    spinCurvature={1.8}\n                    randomness={0.21}\n                    rotationSpeed={0.5}\n                    starSize={0.07}\n                    containerHeight=\"110vh\"\n                    enableOptions ={false}\n                />\n            </div>\n\n            <div className=\"w-full max-w-7xl p-4 md:p-12 mt-10 z-40\">\n                <div className=\"relative flex flex-col-reverse lg:flex-row items-center justify-between gap-12 mb-20\">\n                    <div className=\"flex-1 flex flex-col items-start gap-6 z-40\">\n                        <h1 className=\"text-5xl md:text-9xl font-[600] tracking-tighter text-white leading-none\">\n                            John Doe\n                        </h1>\n                        <p className=\"text-sm md:text-base font-light text-zinc-400 leading-relaxed max-w-xl\">\n                            Full-stack developer and creative technologist crafting immersive web experiences with React, Three.js, and elegant API ecosystems for ambitious teams.\n                        </p>\n                        <div className=\"flex flex-wrap items-center gap-4 mt-4\">\n                            <button className=\"h-12 w-32 bg-black/40 border border-white/[0.08] border-t-white/[0.2] border-l-white/[0.2] backdrop-blur-xl rounded-full hover:bg-white/[0.05] shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] transition-all duration-300\"></button>\n                            <button className=\"w-12 h-12 bg-black/40 border border-white/[0.08] border-t-white/[0.2] border-l-white/[0.2] backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white/[0.05] shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] transition-all duration-300 text-zinc-400 hover:text-white\">\n                                <Github size={20} strokeWidth={1.5} />\n                            </button>\n                            <button className=\"w-12 h-12 bg-black/40 border border-white/[0.08] border-t-white/[0.2] border-l-white/[0.2] backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white/[0.05] shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] transition-all duration-300 text-zinc-400 hover:text-white\">\n                                <Twitter size={20} strokeWidth={1.5} />\n                            </button>\n                            <button className=\"w-12 h-12 bg-black/40 border border-white/[0.08] border-t-white/[0.2] border-l-white/[0.2] backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white/[0.05] shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] transition-all duration-300 text-zinc-400 hover:text-white\">\n                                <Linkedin size={20} strokeWidth={1.5} />\n                            </button>\n                        </div>\n                        <button className=\"group flex items-center gap-3 mt-6 text-zinc-400 font-medium tracking-widest uppercase text-xs hover:text-white transition-colors\">\n                            Text Button\n                            <ArrowRight size={16} strokeWidth={1.5} className=\"group-hover:translate-x-2 transition-transform duration-300\" />\n                        </button>\n                    </div>\n                </div>\n                <div className=\"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8\">\n                    {[1, 2, 3, 4].map((item) => (\n                        <TiltCard key={item} item={item} />\n                    ))}\n                </div>\n            </div>\n        </div>\n    );\n};\n\nexport default GalaxyLandingPage;\n";

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
            className="relative w-full aspect-[3/4]"
            style={{ perspective: '1000px' }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { setIsHovered(false); setRotation({ x: 0, y: 0 }); }}
        >
            <div
                className="w-full h-full bg-black/40 border border-white/[0.08] border-t-white/[0.2] border-l-white/[0.2] backdrop-blur-2xl rounded-[1.5rem] cursor-pointer relative overflow-hidden group shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]"
                style={{
                    transform: isHovered
                        ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.02,1.02,1.02)`
                        : 'rotateX(0deg) rotateY(0deg) scale3d(1,1,1)',
                    transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
                    transformStyle: 'preserve-3d',
                }}
            >
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.06), transparent 60%)` }}
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

const GalaxyLandingPage = () => {
    const [copied, setCopied] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 1024);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(GALAXY_CODE_SNIPPET).then(() => {
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

            {/* Ambient background glow */}
            <div className="z-40 absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-zinc-800/30 blur-[150px] rounded-full pointer-events-none"></div>

            {/* Gradient overlay */}
            <div
                className='absolute z-30 top-0 left-0 w-full h-[150vh]'
                style={isMobile
                    ? { background: 'rgba(0,0,0,0.4)' }
                    : { background: 'rgba(0,0,0,0.3)' }
                }
            ></div>

            {/* Galaxy background */}
            <div className="absolute min-h-screen w-[100%] right-0 top-0 z-10">
                <Galaxy
                    cameraAngle={30}
                    stars={190000}
                    radius={10}
                    arms={3}
                    coreSize={2.2}
                    spinCurvature={1.8}
                    randomness={0.21}
                    rotationSpeed={0.5}
                    starSize={0.07}
                    containerHeight="110vh"
                    enableOptions={false}
                />
            </div>

            <div className="w-full max-w-7xl p-4 md:p-12 mt-10 z-40">
                <div className="relative flex flex-col-reverse lg:flex-row items-center justify-between gap-12 mb-20">
                    <div className="flex-1 flex flex-col items-start gap-6 z-40">
                        <h1 className="text-5xl md:text-9xl font-[600] tracking-tighter text-white leading-none">
                            John Doe
                        </h1>
                        <p className="text-sm md:text-base font-light text-zinc-400 leading-relaxed max-w-xl">
                            Full-stack developer and creative technologist crafting immersive web experiences with React, Three.js, and elegant API ecosystems for ambitious teams.
                        </p>
                        <div className="flex flex-wrap items-center gap-4 mt-4">
                            <button className="h-12 w-32 bg-black/40 border border-white/[0.08] border-t-white/[0.2] border-l-white/[0.2] backdrop-blur-xl rounded-full hover:bg-white/[0.05] shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] transition-all duration-300">BUTTON</button>
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

export default GalaxyLandingPage;
