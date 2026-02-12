import emailjs from "@emailjs/browser";
import {
    Github,
    Send,
    Shield,
    Twitter,
    Youtube
} from 'lucide-react';
import { useState } from 'react';

/**
 * COSMOS CONNECT SYSTEM
 * Matching the Neo-Brutalist & Sketchy aesthetic of the provided screenshots.
 */

// --- SKETCHY SOCIAL ICON COMPONENT ---
// Recreates the hand-drawn circular look from image_798d5d.png
const SketchySocial = ({ icon: Icon, label, href = "#" }) => (
    <a
        href={href}
        className="group flex flex-col items-center justify-center gap-1 transition-transform hover:scale-110 active:scale-95"
    >
        <div className=" p-6 text-left text-2xl text-[#353935] font-black uppercase italic transition-all group relative border-[3px] border-black rounded-full bg-white hover:bg-orange-500 hover:text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
        >

            {label === "Github" && <Github size={30} />}
            {label === "twitter" && <Twitter size={30} />}
            {label === "youtube" && <Youtube size={30} />}
        </div>
    </a>
);



// --- CONTACT FORM COMPONENT ---
const ContactForm = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        emailjs
            .send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                {
                    from_name: formState.name,
                    to_name: import.meta.env.VITE_RECIPIENT_NAME,
                    from_email: formState.email,
                    to_email: import.meta.env.VITE_RECIPIENT_EMAIL,
                    message: formState.message,
                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            )
            .then(
                () => {
                    setIsSubmitting(false);
                    setSuccess(true);
                    setFormState({ name: '', email: '', message: '' });

                    setTimeout(() => setSuccess(false), 5000);
                },
                (error) => {
                    setIsSubmitting(false);
                    console.error("EmailJS Error:", error);
                    alert("Ahh, something went wrong. Please try again.");
                }
            );

        setTimeout(() => {
            setIsSubmitting(false);
            setSuccess(true);
            setFormState({ name: '', email: '', message: '' });
            setTimeout(() => setSuccess(false), 5000);
        }, 1500);
    };

    return (
        <div className=" p-8 bg-white border-4 border-black rounded-[30px] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
            {success ? (
                <div className="py-12 flex flex-col items-center gap-4 text-center animate-in zoom-in-95 duration-300">
                    <Shield size={64} className="text-orange-500" />
                    <h2 className="text-3xl font-black uppercase italic">Signal Received</h2>
                    <p className="font-medium opacity-50">Transmission successful. Redirecting...</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-row gap-8">

                    <div className="flex flex-col w-[50%] gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-black uppercase tracking-widest ml-2">Name</label>
                        <input
                            required
                            type="text"
                                        className="w-full p-4 border-[3px] border-black rounded-2xl bg-gray-50 focus:bg-white focus:outline-none transition-colors font-bold"
                            placeholder="Enter your name"
                            value={formState.name}
                            onChange={e => setFormState({ ...formState, name: e.target.value })}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-black uppercase tracking-widest ml-2">Email</label>
                        <input
                            required
                            type="email"
                            className="w-full p-4 border-[3px] border-black rounded-2xl bg-gray-50 focus:bg-white focus:outline-none transition-colors font-bold"
                            placeholder="Email address"
                            value={formState.email}
                            onChange={e => setFormState({ ...formState, email: e.target.value })}
                        />
                    </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full p-5 bg-orange-500 border-[3px] border-black rounded-2xl text-xl font-black uppercase italic shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                >
                                    {isSubmitting ? "Sending..." : <>Send Message <Send size={20} /></>}
                                </button>
                    </div>


                            <div className="w-[50%] ">
                        <label className="text-[10px] font-black uppercase tracking-widest ml-2">Message</label>
                        <textarea
                            required
                            rows={9}
                                    className="w-full p-4 border-[3px] border-black rounded-2xl bg-gray-50 focus:bg-white focus:outline-none transition-colors font-bold resize-none"
                            placeholder="Tell me about your project"
                            value={formState.message}
                            onChange={e => setFormState({ ...formState, message: e.target.value })}
                        />
                    </div>

                        </div>
  
                </form>
            )}
        </div>
    );
};

// --- MAIN PAGE ---
export default function App() {
    const [showContact, setShowContact] = useState(false);

    return (
        <div className="min-h-[460px] mt-8 w-[86%] mx-auto bg-white text-black selection:bg-orange-500 selection:text-white p-6 md:p-12 relative overflow-hidden">


            {/* MAIN CONNECT SECTION (Referencing image_798d5d.png) */}
            <main className="mx-auto px-6">
                <div className="flex flex-col items-start gap-4 mb-8">
                    <h2 className="text-7xl md:text-[10vw] text-[#353935]/30 font-[1000] tracking-tighter leading-[0.85] italic uppercase">
                        lets connect
                    </h2>
                    <p className="text-xl md:text-lg font-black italic opacity-30 uppercase tracking-tight">
                        Let’s build something amazing together. Hire me to craft clean,
                        fast and beautiful <br /> user interfaces for your product.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-6 ">
                    {/* Main Toggle Button */}
                    <button
                        onClick={() => setShowContact(!showContact)}
                        className="px-20 p-6 text-left text-2xl text-[#353935] font-black uppercase italic transition-all group relative border-[3px] border-black rounded-2xl bg-white hover:bg-orange-500 hover:text-white shadow-[8px_8px_0px_0px_rgba(251,146,60,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
                    >
                        {showContact ? 'close' : 'contact'}
                    </button>

                    {/* Sketchy Socials */}
                    <div className="flex items-center gap-3">
                        <SketchySocial label="Github" />
                        <SketchySocial label="twitter" />
                        <SketchySocial label="youtube" />
                    </div>
                </div>

                {/* Expandable Contact Area */}
                <div className={`transition-all pt-10 duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${showContact ? 'max-h-[1200px] opacity-100 pb-20' : 'max-h-0 opacity-0 overflow-hidden'
                    }`}>
                    <ContactForm />
                </div>
            </main>


        </div>
    );
}