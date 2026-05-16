import React, { useState } from 'react';

const Header = () => {
    const [lang, setLang] = useState('en');

    const content = {
        en: {
            slogan: "Your blood can save a life",
            title: "BLOOD FINDER",
            subtitle: "Live AI-Powered Donor Network",
            btn: "বাংলা"
        },
        bn: {
            slogan: "আপনার রক্তে বেঁচে যেতে পারে কারো জীবন",
            title: "ব্লাড ফাইন্ডার",
            subtitle: "লাইভ এআই-পাওয়ার্ড ডোনার নেটওয়ার্ক",
            btn: "English"
        }
    };

    const toggleLang = () => {
        setLang(lang === 'en' ? 'bn' : 'en');
        // আপনি চাইলে এখানে একটি গ্লোবাল স্টেট ব্যবহার করতে পারেন পুরো সাইট ট্রান্সলেট করতে, 
        // তবে হেডারে এটি যোগ করলে সাইটটি দেখতে অনেক প্রফেশনাল লাগবে।
    };

    return (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-900 via-red-800 to-slate-900 p-8 shadow-2xl border border-red-700/30 text-center">
            {/* Language Switcher */}
            <div className="absolute top-4 right-4">
                <button 
                    onClick={toggleLang}
                    className="btn btn-xs btn-outline border-red-400 text-red-100 hover:bg-red-600 hover:border-red-600"
                >
                    {content[lang].btn}
                </button>
            </div>

            {/* Slogan */}
            <p className="text-red-300 font-medium tracking-widest text-xs md:text-sm uppercase mb-2 animate-pulse">
                {content[lang].slogan}
            </p>

            {/* Main Title */}
            <h1 className="text-4xl md:text-6xl font-black text-white mb-2 drop-shadow-lg">
                {content[lang].title}
            </h1>

            {/* Subtitle */}
            <div className="flex items-center justify-center gap-2">
                <span className="h-[1px] w-8 bg-red-500/50"></span>
                <p className="text-slate-400 text-xs md:text-sm font-light tracking-widest uppercase">
                    {content[lang].subtitle}
                </p>
                <span className="h-[1px] w-8 bg-red-500/50"></span>
            </div>
        </div>
    );
};

export default Header;