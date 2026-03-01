import { ChevronRight, Coffee, DollarSign, Heart, IndianRupee, Sparkles, X, Zap } from 'lucide-react';
import { useState } from 'react';

/**
 * UTILITY: Load Razorpay Script
 */
const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

export default function Payment() {
    const [isOpen, setIsOpen] = useState(false);
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('INR'); // 'INR' or 'USD'
    const [isPaying, setIsPaying] = useState(false);
    const [status, setStatus] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('upi'); // 'all' | 'upi'
    const [upiId, setUpiId] = useState('');
    const [selectedUpiApp, setSelectedUpiApp] = useState(null); // 'google_pay' | 'phonepe' | 'paytm' | null

    const upiApps = [
        {
            id: 'google_pay',
            label: 'GPay',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/512px-Google_Pay_Logo.svg.png'
        },
        {
            id: 'phonepe',
            label: 'PhonePe',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/PhonePe_Logo.png/800px-PhonePe_Logo.png'
        },
        {
            id: 'paytm',
            label: 'Paytm',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo_%28standalone%29.svg/800px-Paytm_Logo_%28standalone%29.svg.png'
        },
        {
            id: 'bhim',
            label: 'BHIM',
            logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6e/BHIM_logo.svg/800px-BHIM_logo.svg.png'
        }
    ];

    // Preset tip amounts
    const presets = {
        INR: [50, 100, 200, 500], // Updated minimum to 50
        USD: [1, 3, 5, 10]
    };

    const currencyConfig = {
        INR: { symbol: '₹', icon: IndianRupee, rate: 100 }, // Razorpay expects paise for INR
        USD: { symbol: '$', icon: DollarSign, rate: 100 }   // Razorpay expects cents for USD
    };

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => {
        setIsOpen(false);
        setStatus(null);
        setAmount('');
        setUpiId('');
        setSelectedUpiApp(null);
    };

    const handlePayment = async () => {
        const finalAmount = parseInt(amount);

        // Check for negative or zero values
        if (!finalAmount || finalAmount <= 0) {
            alert('Please enter a valid positive amount!');
            return;
        }

        // Check minimum limit for INR
        if (currency === 'INR' && finalAmount < 50) {
            alert('Minimum tip amount for INR is ₹50.');
            return;
        }

        setIsPaying(true);

        const isLoaded = await loadRazorpayScript();
        if (!isLoaded) {
            alert('Razorpay SDK failed to load.');
            setIsPaying(false);
            return;
        }

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: finalAmount * currencyConfig[currency].rate,
            currency: currency,
            name: "Indie Dev Support",
            description: `Thanks for the ${currency} tip!`,
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
            handler: function (response) {
                console.log('Payment Success:', response);
                setStatus('success');
                setIsPaying(false);
                setTimeout(() => handleClose(), 4000);
            },
            prefill: {
                name: "Supporter",
                email: "supporter@example.com",
                contact: "9999999999",
                ...(paymentMethod === 'upi' && upiId ? { vpa: upiId } : {})
            },
            theme: { color: "#6366f1" },
            modal: {
                ondismiss: function () {
                    setIsPaying(false);
                }
            },
            ...(paymentMethod === 'upi' ? {
                config: {
                    display: {
                        blocks: {
                            upi_block: {
                                name: 'Pay using UPI',
                                instruments: [
                                    ...(selectedUpiApp
                                        ? [{ method: 'upi', flows: ['intent'], apps: [selectedUpiApp] }]
                                        : [{ method: 'upi', flows: ['intent'], apps: ['google_pay', 'phonepe', 'paytm', 'bhim'] }]
                                    ),
                                    { method: 'upi', flows: ['collect'] },
                                    { method: 'upi', flows: ['qr'] }
                                ]
                            }
                        },
                        sequence: ['block.upi_block'],
                        preferences: { show_default_blocks: false }
                    }
                }
            } : {})
        };

        try {
            const rzp1 = new window.Razorpay(options);
            rzp1.on('payment.failed', function (response) {
                console.error('Payment Failed:', response.error);
                alert(`Payment failed: ${response.error.description}`);
                setIsPaying(false);
            });
            rzp1.open();
        } catch (error) {
            console.error('Razorpay Error:', error);
            alert('Could not open Razorpay. Please try again.');
            setIsPaying(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans text-slate-800 relative overflow-hidden selection:bg-indigo-100 selection:text-indigo-700">

            {/* Dynamic Background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] left-[20%] w-96 h-96 bg-indigo-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                <div className="absolute top-[20%] right-[20%] w-96 h-96 bg-purple-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-32 left-[40%] w-96 h-96 bg-pink-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
            </div>

            <div className="z-10 text-center max-w-lg px-6 relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 border border-white/60 backdrop-blur-sm text-xs font-bold text-indigo-600 mb-6 shadow-sm">
                    <Sparkles size={12} />
                    <span>New Experience</span>
                </div>
                <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-6 tracking-tight drop-shadow-sm">
                    Support the Craft
                </h1>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                    Building free apps for India takes time and chai. <br />
                    Check the widget in the top-right corner!
                </p>

                {/* Helper Note */}
                <div className="group relative mx-auto inline-block">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative px-6 py-4 bg-white rounded-lg leading-none flex items-center divide-x divide-gray-200">
                        <span className="pr-4 text-gray-700 text-sm font-medium">Razorpay Configured</span>
                        <span className="pl-4 text-green-600 text-sm font-bold font-mono">Key loaded from .env</span>
                    </div>
                </div>
            </div>

            {/* --- WIDGET CONTAINER --- */}
            <div className={`fixed top-6 right-6 z-50 flex flex-col items-end`}>

                {/* TRIGGER BUTTON - GEMINI STYLE */}
                <div className={`transition-all duration-500 transform ${isOpen ? 'opacity-0 scale-50 pointer-events-none translate-x-10 -translate-y-10' : 'opacity-100 scale-100'}`}>
                    <button
                        onClick={handleOpen}
                        className="group relative flex items-center justify-center w-16 h-16 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 z-50 overflow-hidden"
                    >
                        {/* Gemini-like Animated Background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-[length:200%_200%] animate-gemini-shimmer"></div>

                        {/* Inner Ring for depth */}
                        <div className="absolute inset-[2px] bg-slate-900 rounded-full flex items-center justify-center overflow-hidden">
                            {/* Subtle internal shine */}
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-white/10 to-transparent opacity-50"></div>

                            <Coffee className="text-white relative z-10 group-hover:rotate-12 transition-transform duration-300" size={24} />

                            {/* Steam Animation */}
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                <div className="steam-one"></div>
                                <div className="steam-two"></div>
                            </div>
                        </div>

                        {/* Tooltip Label */}
                        <span className="absolute right-20 bg-white px-3 py-1.5 rounded-lg shadow-xl text-sm font-bold text-slate-800 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 whitespace-nowrap border border-slate-100">
                            Buy me a coffee? ☕️
                        </span>
                    </button>
                </div>

                {/* EXPANDED CARD */}
                <div
                    className={`
            absolute top-0 right-0
            w-[360px] bg-white/90 backdrop-blur-2xl rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]
            border border-white/50 ring-1 ring-black/5
            transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-top-right
            ${isOpen ? 'opacity-100 scale-100 translate-y-0 translate-x-0' : 'opacity-0 scale-50 -translate-y-10 translate-x-10 pointer-events-none'}
          `}
                >
                    {/* Header Pattern */}
                    <div className="h-24 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 relative overflow-hidden rounded-t-3xl">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 w-8 h-8 bg-black/20 hover:bg-black/40 text-white rounded-full flex items-center justify-center transition-all backdrop-blur-sm z-10"
                        >
                            <X size={14} strokeWidth={3} />
                        </button>
                        <div className="absolute bottom-4 left-6 text-white">
                            <div className="flex items-center gap-2 mb-1">
                                <Heart className="fill-pink-400 text-pink-400 animate-pulse" size={16} />
                                <span className="text-xs font-bold uppercase tracking-widest opacity-90">Support Creator</span>
                            </div>
                            <h2 className="text-xl font-bold tracking-tight">Enjoying the app?</h2>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="p-6">

                        {status === 'success' ? (
                            // SUCCESS STATE
                            <div className="text-center py-4">
                                <div className="relative inline-block mb-4">
                                    <div className="absolute inset-0 bg-green-400 blur-xl opacity-20 rounded-full"></div>
                                    <div className="w-20 h-20 bg-gradient-to-tr from-green-400 to-emerald-500 rounded-full flex items-center justify-center relative shadow-lg animate-bounce-slow">
                                        <Zap size={36} className="text-white fill-white" />
                                    </div>
                                </div>
                                <h4 className="text-2xl font-black text-slate-800 mb-2 animate-in slide-in-from-bottom-2 fade-in duration-500 delay-100">Amazing!</h4>
                                <p className="text-slate-500 text-sm animate-in slide-in-from-bottom-2 fade-in duration-500 delay-200">
                                    Your <span className="font-bold text-slate-800">{currencyConfig[currency].symbol}{amount}</span> contribution helps keep the servers running.
                                </p>
                                <button
                                    onClick={handleClose}
                                    className="mt-8 text-sm font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-6 py-2 rounded-full transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        ) : (
                            // PAYMENT FORM
                            <>
                                {/* Currency Toggle */}
                                <div className="flex justify-center mb-6">
                                    <div className="bg-slate-100 p-1 rounded-xl flex items-center shadow-inner">
                                        {['INR', 'USD'].map((curr) => (
                                            <button
                                                key={curr}
                                                onClick={() => {
                                                    setCurrency(curr);
                                                    setAmount(''); // Reset amount when switching currency
                                                }}
                                                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${currency === curr
                                                    ? 'bg-white text-indigo-600 shadow-sm scale-100'
                                                    : 'text-slate-500 hover:text-slate-700 scale-95 hover:scale-100'
                                                    }`}
                                            >
                                                {curr === 'INR' ? '₹ Rupee' : '$ Dollar'}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Payment Method Toggle */}
                                <div className="flex justify-center mb-4">
                                    <div className="bg-slate-100 p-1 rounded-xl flex items-center shadow-inner">
                                        <button
                                            onClick={() => { setPaymentMethod('all'); setSelectedUpiApp(null); setUpiId(''); }}
                                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${paymentMethod === 'all'
                                                    ? 'bg-white text-indigo-600 shadow-sm'
                                                    : 'text-slate-500 hover:text-slate-700'
                                                }`}
                                        >
                                            All Methods
                                        </button>
                                        <button
                                            onClick={() => setPaymentMethod('upi')}
                                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${paymentMethod === 'upi'
                                                    ? 'bg-white text-indigo-600 shadow-sm'
                                                    : 'text-slate-500 hover:text-slate-700'
                                                }`}
                                        >
                                            <img
                                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1200px-UPI-Logo-vector.svg.png"
                                                alt="UPI"
                                                className="h-3"
                                            />
                                            UPI Only
                                        </button>
                                    </div>
                                </div>

                                {/* UPI Apps + ID Input */}
                                {paymentMethod === 'upi' && (
                                    <div className="mb-4 space-y-3">
                                        {/* Quick App Buttons */}
                                        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Quick Pay via</p>
                                        <div className="grid grid-cols-4 gap-2">
                                            {upiApps.map((app) => (
                                                <button
                                                    key={app.id}
                                                    onClick={() => setSelectedUpiApp(selectedUpiApp === app.id ? null : app.id)}
                                                    className={`flex flex-col items-center gap-1.5 py-2.5 px-1 rounded-xl border-2 transition-all duration-200 ${selectedUpiApp === app.id
                                                            ? 'border-indigo-500 bg-indigo-50 shadow-md scale-105'
                                                            : 'border-slate-100 bg-white hover:border-indigo-200 hover:shadow-sm'
                                                        }`}
                                                >
                                                    <img src={app.logo} alt={app.label} className="h-6 w-auto object-contain" />
                                                    <span className={`text-[10px] font-bold ${selectedUpiApp === app.id ? 'text-indigo-600' : 'text-slate-500'}`}>
                                                        {app.label}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                        {/* Manual UPI ID */}
                                        <input
                                            type="text"
                                            value={upiId}
                                            onChange={(e) => setUpiId(e.target.value)}
                                            placeholder="Or enter UPI ID (e.g. name@upi) — optional"
                                            className="w-full px-4 py-3 bg-violet-50 border-2 border-violet-100 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm text-slate-800 placeholder:text-slate-400"
                                        />
                                    </div>
                                )}

                                <p className="text-sm text-slate-500 mb-4 font-medium">Select an amount to tip</p>

                                {/* Presets Grid */}
                                <div className="grid grid-cols-4 gap-3 mb-6">
                                    {presets[currency].map((val, idx) => (
                                        <button
                                            key={`${currency}-${val}`}
                                            onClick={() => setAmount(val)}
                                            style={{ animationDelay: `${idx * 50}ms` }}
                                            className={`
                        relative group overflow-hidden py-3 rounded-xl text-sm font-bold border transition-all duration-300
                        ${isOpen ? 'animate-enter-up' : ''}
                        ${amount === val
                                                    ? 'border-indigo-500 bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105'
                                                    : 'border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 bg-white hover:shadow-md'}
                      `}
                                        >
                                            <span className="relative z-10">{currencyConfig[currency].symbol}{val}</span>
                                            {amount !== val && <div className="absolute inset-0 bg-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>}
                                        </button>
                                    ))}
                                </div>

                                {/* Custom Input */}
                                <div className="relative mb-6 group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <span className={`font-bold transition-colors ${amount ? 'text-indigo-600' : 'text-slate-400'}`}>
                                            {currencyConfig[currency].symbol}
                                        </span>
                                    </div>
                                    <input
                                        type="number"
                                        min={currency === 'INR' ? "50" : "1"}
                                        value={amount}
                                        onChange={(e) => {
                                            // Prevent negative inputs
                                            const val = e.target.value;
                                            if (val === '' || parseFloat(val) >= 0) {
                                                setAmount(val);
                                            }
                                        }}
                                        onKeyDown={(e) => {
                                            // Prevent typing minus sign
                                            if (e.key === '-' || e.key === 'e') {
                                                e.preventDefault();
                                            }
                                        }}
                                        placeholder={`Enter amount (Min ${currency === 'INR' ? '₹50' : '$1'})`}
                                        className="w-full pl-8 pr-4 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold text-slate-800 placeholder:font-normal placeholder:text-slate-400"
                                    />
                                </div>

                                {/* Pay Button */}
                                <button
                                    onClick={handlePayment}
                                    disabled={isPaying || !amount}
                                    className={`
                    group w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-xl 
                    transition-all transform active:scale-[0.98] relative overflow-hidden
                    ${isPaying
                                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                                            : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5'}
                  `}
                                >
                                    {/* Shimmer effect overlay */}
                                    {!isPaying && (
                                        <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent z-10"></div>
                                    )}

                                    {isPaying ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                                            <span>Processing...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="relative z-10">Pay {amount ? `${currencyConfig[currency].symbol}${amount}` : ''}</span>
                                            <ChevronRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>

                                <div className="mt-5 flex items-center justify-center gap-2 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Secured by</span>
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" alt="Razorpay" className="h-3.5" />
                                </div>
                            </>
                        )}
                    </div>
                </div>

            </div>

            <style>{`
        /* Gemini Shimmer Animation */
        @keyframes geminiShimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gemini-shimmer {
          animation: geminiShimmer 3s linear infinite;
        }

        /* Blob Animation */
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }

        /* Steam Animation for Coffee */
        .steam-one, .steam-two {
            position: absolute;
            background-color: white;
            border-radius: 50%;
            opacity: 0;
            filter: blur(4px);
        }
        .steam-one {
            width: 6px;
            height: 15px;
            left: 40%;
            animation: steam 2s infinite ease-out;
        }
        .steam-two {
            width: 4px;
            height: 12px;
            left: 60%;
            animation: steam 1.5s infinite ease-out 0.5s;
        }
        @keyframes steam {
            0% { transform: translateY(0) scale(1); opacity: 0; }
            50% { opacity: 0.6; }
            100% { transform: translateY(-15px) scale(1.5); opacity: 0; }
        }

        /* Shimmer for Pay Button */
        @keyframes shimmer {
            100% { transform: translateX(100%); }
        }
        .animate-shimmer {
            animation: shimmer 1.5s infinite;
        }

        /* Entry Animation for Preset Buttons */
        @keyframes enterUp {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-enter-up {
            animation: enterUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) backwards;
        }

        /* Slow Bounce for Success */
        @keyframes bounceSlow {
            0%, 100% { transform: translateY(-5%); }
            50% { transform: translateY(5%); }
        }
        .animate-bounce-slow {
            animation: bounceSlow 3s infinite ease-in-out;
        }
      `}</style>
        </div>
    );
}