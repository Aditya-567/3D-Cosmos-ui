import emailjs from "@emailjs/browser";
import { Github, Send, Shield, Twitter, Youtube } from 'lucide-react';
import { useState } from 'react';

// --- CONTACT FORM ---
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
                () => { setIsSubmitting(false); setSuccess(true); setFormState({ name: '', email: '', message: '' }); setTimeout(() => setSuccess(false), 5000); },
                (error) => { setIsSubmitting(false); console.error("EmailJS Error:", error); alert("Something went wrong. Please try again."); }
            );
    };

    if (success) {
        return (
            <div className="py-10 flex flex-col items-center gap-4 text-center">
                <Shield size={40} className="text-orange-500" />
                <h2 className="text-xl font-black uppercase italic text-white">Message Sent!</h2>
                <p className="text-sm font-mono text-white/40">We'll get back to you soon.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Name</label>
                    <input
                        required type="text"
                        className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white text-sm font-bold placeholder:text-white/20 focus:outline-none focus:border-orange-500 transition-colors"
                        placeholder="Your name"
                        value={formState.name}
                        onChange={e => setFormState({ ...formState, name: e.target.value })}
                    />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Email</label>
                    <input
                        required type="email"
                        className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white text-sm font-bold placeholder:text-white/20 focus:outline-none focus:border-orange-500 transition-colors"
                        placeholder="your@email.com"
                        value={formState.email}
                        onChange={e => setFormState({ ...formState, email: e.target.value })}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Message</label>
                <textarea
                    required rows={4}
                    className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white text-sm font-bold placeholder:text-white/20 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                    placeholder="Tell me about your project…"
                    value={formState.message}
                    onChange={e => setFormState({ ...formState, message: e.target.value })}
                />
            </div>
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-black border-[3px] border-black rounded-xl text-white text-sm font-black uppercase italic flex items-center justify-center gap-2 hover:bg-orange-500 hover:border-orange-500 active:scale-[.98] transition-all disabled:opacity-50 shadow-[4px_4px_0px_0px_rgba(251,146,60,1)]"
            >
                {isSubmitting ? 'Sending…' : <><span>Send Message</span><Send size={14} /></>}
            </button>
        </form>
    );
};

// --- MAIN EXPORT ---
export default function Contact() {
    const [formOpen, setFormOpen] = useState(false);

    const socials = [
        { icon: Github, label: 'GitHub', href: '#' },
        { icon: Twitter, label: 'Twitter', href: '#' },
        { icon: Youtube, label: 'YouTube', href: '#' },
    ];

    return (
        <div className="w-full bg-[#0f0f0f] border-t-[3px] border-black">
            <style>{`
                .contact-form-wrap {
                    display: grid;
                    grid-template-rows: 0fr;
                    opacity: 0;
                    transition: grid-template-rows 0.6s cubic-bezier(0.23,1,0.32,1), opacity 0.4s ease;
                }
                .contact-form-wrap.open {
                    grid-template-rows: 1fr;
                    opacity: 1;
                }
                .contact-form-inner {
                    overflow: hidden;
                }
            `}</style>

            <div className="w-[92%] sm:w-[86%] md:w-[80%] mx-auto py-10 sm:py-14 md:pt-24 md:pb-16">

                {/* Top row: headline + subtitle */}
                <div className="mb-8 md:mb-10">
                    <div>
                        <h2
                            className="font-[1000] tracking-tighter leading-[0.82] italic uppercase text-white/70"
                            style={{ fontSize: 'clamp(2.2rem, 8.5vw, 7.5rem)' }}
                        >
                            Get in Touch
                        </h2>
                        <div className="mt-3 md:mt-4 h-1.5 w-24 sm:w-36 bg-orange-500 rounded-full" />
                    </div>
                    <p className="mt-4 md:mt-6 text-xs sm:text-sm text-white/40 font-mono leading-relaxed max-w-xl">
                        Let's build something amazing together. Hire me to craft clean,
                        fast and beautiful user interfaces for your product.
                    </p>
                </div>

                {/* Button row */}
                <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                    {/* Contact CTA button — rounded rectangle */}
                    <button
                        onClick={() => setFormOpen(!formOpen)}
                        className="px-6 sm:px-10 py-3 sm:py-4 border-[1px] border-orange-500 rounded-2xl text-white text-sm sm:text-base font-black uppercase italic hover:bg-orange-500 hover:text-white transition-all duration-200 hover:scale-110 hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-2 group"
                    >
                        <Send size={16} className={`transition-transform duration-300 ${formOpen ? 'rotate-45' : 'group-hover:translate-x-1'}`} />
                        {formOpen ? 'Close' : 'Contact'}
                    </button>

                    {/* Social circle buttons */}
                    {socials.map(({ icon: Icon, label, href }) => (
                        <a
                            key={label}
                            href={href}
                            aria-label={label}
                            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white/15 flex flex-col items-center justify-center text-white/50 hover:bg-orange-500 hover:text-white hover:scale-110 hover:border-orange-500 transition-all duration-200 shadow-none hover:translate-x-0.5 hover:translate-y-0.5 group"
                        >
                            <Icon size={16} className="sm:hidden" />
                            <Icon size={20} className="hidden sm:block" />
                            <span className="text-[7px] sm:text-[8px] font-black uppercase mt-0.5">{label}</span>
                        </a>
                    ))}
                </div>

                {/* Expandable form */}
                <div className={`contact-form-wrap mt-10 ${formOpen ? 'open' : ''}`}>
                    <div className="contact-form-inner">
                        <div className="border-2 border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-8 bg-white/5 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.04)]">
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500 mb-6">Send a message</p>
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer strip */}
            <div className="w-full border-t border-white/10 px-4 sm:px-6 py-4 flex items-center justify-between flex-wrap gap-2">
                <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">© 2025 Cosmos Collection</span>
                <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Built with React + WebGL</span>
            </div>
        </div>
    );
}


