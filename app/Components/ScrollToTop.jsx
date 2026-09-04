"use client"
import React, { useState, useEffect } from 'react';
import { ArrowUp } from './Icons';
import { useParams } from 'next/navigation';
import { getTranslation } from "../translations/portfolio/load-translations";

export default function ScrollToTop() {
    const { lang } = useParams();
    const [mounted, setMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [t, setT] = useState("Back to Top");

    const isAr = lang === 'ar' || lang === 'fa';

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const fetchTranslation = async () => {
            const dictionary = await getTranslation(lang || 'en');
            if (dictionary?.scrollToTop?.backToTop) {
                setT(dictionary.scrollToTop.backToTop);
            }
        };
        fetchTranslation();
    }, [lang]);

    const updateScrollProgress = () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / scrollHeight) * 100;
        setScrollProgress(scrolled);

        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', updateScrollProgress);
        return () => {
            window.removeEventListener('scroll', updateScrollProgress);
        };
    }, []);

    const radius = 24;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (scrollProgress / 100) * circumference;

    if (!mounted) return null;

    return (
        <div className={`fixed bottom-8 ${isAr ? 'left-8' : 'right-8'} z-[60] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'}`}>
            <button
                onClick={scrollToTop}
                className="relative flex items-center justify-center p-3 group"
                aria-label="Scroll to top"
            >
                {/* Background Glow */}
                <div className="absolute inset-0 bg-emerald-500/20 dark:bg-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Progress Ring */}
                <svg className="absolute w-[60px] h-[60px] -rotate-90">
                    <circle
                        cx="30"
                        cy="30"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="transparent"
                        className="text-gray-200/20 dark:text-slate-700/50"
                    />
                    <circle
                        cx="30"
                        cy="30"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray={circumference}
                        style={{ strokeDashoffset: offset, transition: 'stroke-dashoffset 0.1s linear' }}
                        strokeLinecap="round"
                        fill="transparent"
                        className="text-emerald-500 dark:text-blue-400"
                    />
                </svg>

                {/* Main Button Shell */}
                <div className="relative w-11 h-11 bg-white/70 dark:bg-slate-900/80 backdrop-blur-sm border border-white/40 dark:border-slate-800 rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.1)] group-hover:bg-emerald-500 dark:group-hover:bg-blue-600 group-hover:border-emerald-400 dark:group-hover:border-blue-500 transition-all duration-500">
                    <ArrowUp aria-hidden="true" className="w-5 h-5 text-emerald-600 dark:text-blue-400 group-hover:text-white transition-colors duration-500 group-hover:-translate-y-1" />

                    {/* Ripple Effect Animation */}
                    <div className="absolute inset-0 rounded-full border-2 border-emerald-500 dark:border-blue-500 opacity-0 group-hover:animate-ping-slow"></div>
                </div>

                {/* Hint Text */}
                <span className={`absolute ${isAr ? 'left-full ml-4' : 'right-full mr-4'} px-3 py-1 bg-slate-900 dark:bg-slate-800 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 ${isAr ? '-translate-x-2 group-hover:translate-x-0' : 'translate-x-2 group-hover:translate-x-0'} transition-all duration-300 pointer-events-none whitespace-nowrap shadow-md`}>
                    {t}
                </span>
            </button>
            <style jsx>{`
                @keyframes ping-slow {
                    75%, 100% {
                        transform: scale(1.5);
                        opacity: 0;
                    }
                }
                .group-hover\:animate-ping-slow {
                    animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
                }
            `}</style>
        </div>
    );
}
