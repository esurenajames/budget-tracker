'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogIn } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function Navbar() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (pathname !== '/' && pathname !== '/landing') {
        return null;
    }

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b",
                isScrolled
                    ? "bg-white/90 backdrop-blur-md border-gray-200 py-2 shadow-sm"
                    : "bg-white border-transparent py-4"
            )}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg shadow-primary/20">
                            <span className="text-white font-bold text-xs">BT</span>
                        </div>
                        <span className="text-xl font-bold text-primary tracking-tight">
                            Budget Tracker
                        </span>
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <Link 
                        href="/login"
                        className="group relative inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-2.5 rounded-full font-semibold text-[14px] transition-all hover:bg-gray-800 hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-gray-200"
                    >
                        <LogIn className="w-4 h-4" />
                        Get Started
                    </Link>
                </div>
            </div>
        </nav>
    );
}
