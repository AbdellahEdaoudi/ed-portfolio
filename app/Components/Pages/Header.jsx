"use client"
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { AlignJustify, ChevronDown } from '../Icons';
import Image from 'next/image';
import { useTheme } from '../ThemeProvider';

const languages = [
    { code: 'en', name: 'English', countryCode: 'gb' },
    { code: 'es', name: 'Español', countryCode: 'es' },
    { code: 'fr', name: 'Français', countryCode: 'fr' },
    { code: 'de', name: 'Deutsch', countryCode: 'de' },
    { code: 'nl', name: 'Nederlands', countryCode: 'nl' },
    { code: 'it', name: 'Italiano', countryCode: 'it' },
    { code: 'ar', name: 'العربية', countryCode: 'ma' },
    { code: 'pt', name: 'Português', countryCode: 'pt' },
    { code: 'sv', name: 'Svenska', countryCode: 'se' },
    { code: 'ru', name: 'Русский', countryCode: 'ru' },
    { code: 'fa', name: 'فارسی', countryCode: 'ir' },
    { code: 'vi', name: 'Tiếng Việt', countryCode: 'vn' },
    { code: 'zh', name: '中文', countryCode: 'cn' },
    { code: 'ja', name: '日本語', countryCode: 'jp' },
    { code: 'hi', name: 'हिन्दी', countryCode: 'in' },
    { code: 'tr', name: 'Türkçe', countryCode: 'tr' },
    { code: 'ko', name: '한국어', countryCode: 'kr' },
    { code: 'id', name: 'Indonesia', countryCode: 'id' },
    { code: 'pl', name: 'Polski', countryCode: 'pl' },
];

export default function Header({ content, lang }) {
    const [menu, setMenu] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [isMobileLangOpen, setIsMobileLangOpen] = useState(false);
    const { theme, toggleTheme, mounted } = useTheme();
    const params = useParams();
    const router = useRouter();
    const pathname = usePathname();
    const currentLang = params.lang || lang;
    const langDropdownRef = useRef(null);
    const mobileLangDropdownRef = useRef(null);
    const pathLength = pathname.split('/').filter(Boolean).length;
    if (!content) return null;


    const LinksHeader = [
        { name: content?.home || "Home", path: "/" },
        { name: content?.about || "About", path: "/About" },
        { name: content?.services || "Services", path: "/Services" },
        { name: content?.skills || "Skills", path: "/Skills" },
        { name: content?.projects || "Projects", path: "/Projects" },
        { name: content?.experience || "Experience", path: "/Experience" },
        { name: content?.education || "Education", path: "/Education" },
        { name: content?.contact || "Contact", path: "/Contact" }
    ];


    const LanguageChange = (language) => {
        return pathLength === 1 && pathname.length === 3
            ? `/${language}`
            : pathLength === 1 && pathname.length !== 3
                ? `/${language}${pathname}`
                : pathLength > 1
                    ? `/${language}/${pathname.split('/')[2]}`
                    : `/${language}`;
    };
    const getPath = (language, path) => {
        return pathLength === 1 && pathname.length === 3
            ? `/${language}${path}`
            : pathLength === 1 && pathname.length !== 3
                ? `${path}`
                : pathLength === 2
                    ? `/${language}${path}`
                    : `${path}`;
    };


    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
                setIsLangOpen(false);
            }
            if (mobileLangDropdownRef.current && !mobileLangDropdownRef.current.contains(event.target)) {
                setIsMobileLangOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const selectedLang = languages.find(l => l.code === currentLang) || languages[0];

    return (
        <header className="sticky top-0 z-50 bg-white/70 dark:bg-slate-900/80 backdrop-blur-md border-b border-white/20 dark:border-slate-800/80 shadow-sm transition-all duration-300">
            <div className='flex items-center py-4 justify-evenly text-gray-800 dark:text-gray-100 rounded-sm relative z-50'>
                <div className='hover:scale-105 duration-300'>
                    <Link href={`/`}>
                        <div className="flex items-center gap-2.5 group">
                            {/* Minimalist Logo Mark */}
                            <div className="w-9 h-9 bg-slate-900 dark:bg-blue-800 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-emerald-500/25 dark:group-hover:shadow-blue-500/30 transition-all duration-300 group-hover:scale-105 group-hover:bg-emerald-600 dark:group-hover:bg-blue-500 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <span className="font-bold text-white text-lg tracking-tighter relative z-10">AE</span>
                            </div>

                            {/* Text Brand - Hidden on mobile, visible on desktop */}
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-[0.2em] leading-none group-hover:text-emerald-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                    {content.fullStack || "Full Stack"}
                                </span>
                                <span className="text-sm font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider leading-none mt-0.5 group-hover:text-emerald-700 dark:group-hover:text-blue-400 transition-colors duration-300">
                                    {content.developer || "Developer"}
                                </span>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className='hidden md:flex gap-6 items-center'>
                    {LinksHeader.map((ln, i) => (
                        <Link key={i} href={getPath(lang, ln.path)}
                            className={`${pathname === `/${lang}${ln.path}` || pathname === `${ln.path}` ? "text-green-500 dark:text-blue-400 scale-110" : "text-gray-700 dark:text-gray-200"} cursor-pointer hover:text-green-500 dark:hover:text-blue-400 hover:scale-110 duration-200`}>
                            <span className="flex items-center font-medium text-sm lg:text-base">{ln.name}</span>
                        </Link>
                    ))}

                    {/* Desktop Theme Switcher Button */}
                    <button
                        onClick={toggleTheme}
                        aria-label="Toggle Dark/Light Mode"
                        title={theme === 'dark' ? content?.switchToLight || 'Switch to Light Mode' : content?.switchToDark || 'Switch to Dark Mode'}
                        className="p-2 rounded-xl border border-gray-200 dark:border-slate-700/80 bg-gray-50 dark:bg-slate-800/80 hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-800 dark:text-gray-100 transition-all duration-300 focus:outline-none hover:scale-105 shadow-sm"
                    >
                        {mounted && theme === 'dark' ? (
                            <svg className="w-5 h-5 text-amber-400 transition-transform duration-300 rotate-0 hover:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="4" fill="currentColor" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5 text-amber-400 transition-transform duration-300 -rotate-12 hover:rotate-0" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        )}
                    </button>

                    {/* Desktop Language Switcher */}
                    <div className="relative" ref={langDropdownRef}>
                        <button
                            onClick={() => setIsLangOpen(!isLangOpen)}
                            className="flex items-center gap-2 border border-gray-200 dark:border-slate-700/80 rounded-full px-3 py-1.5 hover:border-green-500 dark:hover:border-blue-400 transition-colors focus:outline-none bg-gray-50 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700"
                        >
                            <span className={`fi fi-${selectedLang.countryCode}`}></span>
                            <span className="text-sm font-medium uppercase text-gray-800 dark:text-gray-200">{selectedLang.code}</span>
                            <ChevronDown className={`w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <div
                            className={`absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-gray-100 dark:border-slate-800 overflow-hidden max-h-80 overflow-y-auto transition-all duration-200 ${isLangOpen ? 'opacity-100 translate-y-0 visible pointer-events-auto' : 'opacity-0 -translate-y-2 invisible pointer-events-none'}`}
                        >
                            {languages.map((langItem) => (
                                <Link
                                    prefetch={false}
                                    href={LanguageChange(langItem.code)}
                                    key={langItem.code}
                                    onClick={() => {
                                        setIsLangOpen(false);
                                        setIsMobileLangOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-green-50 dark:hover:bg-blue-950/50 transition-colors text-left ${currentLang === langItem.code ? 'bg-green-50 dark:bg-blue-950/70 text-green-600 dark:text-blue-400 font-bold' : 'text-gray-700 dark:text-gray-300'}`}
                                >
                                    <span className={`fi fi-${langItem.countryCode}`}></span>
                                    <span className="text-sm font-medium">{langItem.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='flex flex-row-reverse gap-3 items-center md:hidden'>
                    <div onClick={() => setMenu(!menu)} className='cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-gray-800 dark:text-gray-200'>
                        <AlignJustify />
                    </div>

                    {/* Mobile Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        aria-label="Toggle Theme Mobile"
                        className="p-1.5 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-gray-100 transition-all focus:outline-none"
                    >
                        {mounted && theme === 'dark' ? (
                            <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="4" fill="currentColor" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41" />
                            </svg>
                        ) : (
                            <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        )}
                    </button>

                    {/* Mobile Language Switcher */}
                    <div className="relative" ref={mobileLangDropdownRef}>
                        <button
                            onClick={() => setIsMobileLangOpen(!isMobileLangOpen)}
                            className="flex items-center gap-1.5 border border-gray-200 dark:border-slate-700 rounded-lg px-2 py-1.5 hover:border-green-500 dark:hover:border-blue-400 transition-colors focus:outline-none bg-gray-50 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700"
                        >
                            <span className={`fi fi-${selectedLang.countryCode}`}></span>
                            <span className="text-xs font-medium uppercase text-gray-800 dark:text-gray-200">{selectedLang.code}</span>
                            <ChevronDown className={`w-3 h-3 text-gray-600 dark:text-gray-400 transition-transform duration-200 ${isMobileLangOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <div
                            className={`absolute top-full right-0 mt-2 w-40 bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-gray-100 dark:border-slate-800 overflow-hidden max-h-60 overflow-y-auto z-[60] transition-all duration-200 origin-top-right ${isMobileLangOpen ? 'opacity-100 translate-y-0 scale-100 visible pointer-events-auto' : 'opacity-0 -translate-y-2 scale-95 invisible pointer-events-none'}`}
                        >
                            {languages.map((langItem) => (
                                <Link
                                    prefetch={false}
                                    href={LanguageChange(langItem.code)}
                                    key={langItem.code}
                                    onClick={() => {
                                        setIsLangOpen(false);
                                        setIsMobileLangOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-2 px-3 py-2 hover:bg-green-50 dark:hover:bg-blue-950/50 transition-colors text-left text-sm ${currentLang === langItem.code ? 'bg-green-50 dark:bg-blue-950/70 text-green-600 dark:text-blue-400 font-bold' : 'text-gray-700 dark:text-gray-300'}`}
                                >
                                    <span className={`fi fi-${langItem.countryCode}`}></span>
                                    <span className="font-medium">{langItem.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* Mobile Navigation Drawer */}
            <div className={`md:hidden absolute top-full left-0 w-full overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${menu ? 'opacity-100 translate-y-0 visible pointer-events-auto' : 'opacity-0 -translate-y-8 invisible pointer-events-none'}`}>
                <div className="mx-4 my-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl rounded-[2.5rem] shadow-2xl border border-white/20 dark:border-slate-800 overflow-hidden">
                    <div className="p-8">
                        {/* Section 1: Main Links */}
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-blue-400 mb-6 flex items-center gap-2">
                                <span className="w-8 h-[1px] bg-emerald-100 dark:bg-blue-500/30"></span> {content?.mobileMenu?.navigation || "Navigation"}
                            </p>
                            <nav className="space-y-4">
                                {LinksHeader.slice(0, 5).map((ln, i) => (
                                    <Link
                                        key={i}
                                        href={getPath(lang, ln.path)}
                                        onClick={() => setMenu(false)}
                                        className="flex items-center justify-between group"
                                    >
                                        <div className="flex flex-col">
                                            <span className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${pathname === `/${lang}${ln.path}` || pathname === `${ln.path}` ? 'text-emerald-600 dark:text-blue-400' : 'text-slate-900 dark:text-slate-100 group-hover:text-emerald-500 dark:group-hover:text-blue-400'}`}>
                                                {ln.name}
                                            </span>
                                            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">{content?.mobileMenu?.explore || "Explore this section"}</span>
                                        </div>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${pathname === `/${lang}${ln.path}` || pathname === `${ln.path}` ? 'bg-emerald-600 dark:bg-blue-600 text-white' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:bg-emerald-50 dark:group-hover:bg-blue-900/50 group-hover:text-emerald-600 dark:group-hover:text-blue-400'}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                                        </div>
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        {/* Section 2: Quick Career Info */}
                        <div className="grid grid-cols-2 gap-3 mt-4">
                            <Link href={getPath(lang, "/Experience")}
                                onClick={() => setMenu(false)} className={`p-5 rounded-3xl transition-all duration-300 ${pathname === `/${lang}/Experience` || pathname === `/Experience` ? 'bg-slate-900 dark:bg-blue-600 text-white shadow-xl' : 'bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 hover:bg-white border border-slate-100 dark:border-slate-700 shadow-sm'}`}>
                                <div className="text-[10px] font-bold opacity-60 uppercase mb-2">{content?.mobileMenu?.history || "History"}</div>
                                <div className="text-sm font-black italic">{content?.experience || "Experience"}</div>
                            </Link>
                            <Link href={getPath(lang, "/Education")}
                                onClick={() => setMenu(false)} className={`p-5 rounded-3xl transition-all duration-300 ${pathname === `/${lang}/Education` || pathname === `/Education` ? 'bg-slate-900 dark:bg-blue-600 text-white shadow-xl' : 'bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 hover:bg-white border border-slate-100 dark:border-slate-700 shadow-sm'}`}>
                                <div className="text-[10px] font-bold opacity-60 uppercase mb-2">{content?.mobileMenu?.learning || "Learning"}</div>
                                <div className="text-sm font-black italic">{content?.education || "Education"}</div>
                            </Link>
                        </div>

                        {/* Section 3: Call to Action & Footer */}
                        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-6">
                            <Link
                                href={getPath(lang, "/Contact")}
                                onClick={() => setMenu(false)}
                                className="w-full bg-emerald-600 dark:bg-blue-600 text-white h-16 rounded-2xl flex items-center justify-center gap-3 font-bold text-lg hover:bg-emerald-700 dark:hover:bg-blue-700 active:scale-95 transition-all shadow-[0_10px_30px_rgba(16,185,129,0.3)] dark:shadow-[0_10px_30px_rgba(37,99,235,0.3)]"
                            >
                                <span>{content?.contact || "Let's Talk"}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.31-2.31a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                            </Link>

                            <div className="flex items-center justify-between">
                                <div className="flex gap-4">
                                    <Link href="https://github.com/AbdellahEdaoudi" className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-slate-900 dark:hover:bg-blue-600 hover:text-white transition-all">
                                        <Image src={"/icons/github.svg"} alt="Abdellah Edaoudi GitHub" width={30} height={30} className="w-[30px] h-[30px]" />
                                    </Link>
                                    <Link href="https://linkedin.com/in/abdellah-edaoudi" className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-slate-900 dark:hover:bg-blue-600 hover:text-white transition-all">
                                        <Image src={"/icons/linkedin.svg"} alt="Abdellah Edaoudi LinkedIn" width={30} height={30} className="w-[30px] h-[30px]" />
                                    </Link>
                                </div>
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300 dark:text-slate-500">© AE Portfolio ©</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
