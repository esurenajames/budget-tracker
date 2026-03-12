'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ConfigProvider, theme as antdTheme, App } from 'antd';

let message: any;
let notification: any;
let modal: any;

export { message, notification, modal };

/**
 * Static bridge helper to capture Ant Design's context-aware instances.
 * This allows static utility functions to use the same theme/context as the rest of the app.
 */
function StaticApp() {
    const {
        message: msg,
        notification: notify,
        modal: mdl
    } = App.useApp();

    message = msg;
    notification = notify;
    modal = mdl;

    return null;
}

import { createClient } from '@/utils/supabase/client';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>('system');
    const [isDark, setIsDark] = useState<boolean>(false);
    const supabase = createClient();

    // Initialize theme from localStorage or default to system
    useEffect(() => {
        const savedTheme = (localStorage.getItem('app-theme') as Theme) || 'system';
        setThemeState(savedTheme);
        applyTheme(savedTheme);
        
        // Fetch preference from Supabase if user is logged in
        const syncSupabaseTheme = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data, error } = await supabase
                    .from('users')
                    .select('"isDark"')
                    .eq('id', user.id)
                    .single();
                
                if (!error && data) {
                    const supabaseTheme: Theme = data.isDark ? 'dark' : 'light';
                    setThemeState(supabaseTheme);
                    applyTheme(supabaseTheme);
                    localStorage.setItem('app-theme', supabaseTheme);
                }
            }
        };

        syncSupabaseTheme();

        // Listen for auth changes to sync theme on login
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' && session?.user) {
                syncSupabaseTheme();
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    // Listen to system theme changes if 'system' is currently selected
    useEffect(() => {
        if (theme !== 'system') return;

        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const handler = (e: MediaQueryListEvent) => {
            const systemIsDark = e.matches;
            setIsDark(systemIsDark);
            applyThemeClasses(systemIsDark);
        };

        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, [theme]);

    const applyThemeClasses = (dark: boolean) => {
        const root = window.document.documentElement;
        if (dark) {
            root.classList.remove('light');
            root.classList.add('dark');
            root.setAttribute('data-theme', 'dark');
        } else {
            root.classList.remove('dark');
            root.classList.add('light');
            root.setAttribute('data-theme', 'light');
        }
    };

    const applyTheme = (newTheme: Theme) => {
        let isDarkMode = false;

        const systemIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (newTheme === 'system') {
            isDarkMode = systemIsDark;
        } else {
            isDarkMode = newTheme === 'dark';
        }

        setIsDark(isDarkMode);
        applyThemeClasses(isDarkMode);
    };

    const setTheme = async (newTheme: Theme) => {
        setThemeState(newTheme);
        localStorage.setItem('app-theme', newTheme);
        applyTheme(newTheme);

        // Update Supabase if user is logged in
        const { data: { user } } = await supabase.auth.getUser();
        if (user && newTheme !== 'system') {
            await supabase
                .from('users')
                .update({ isDark: newTheme === 'dark' })
                .eq('id', user.id);
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <ConfigProvider
                theme={{
                    algorithm: isDark
                        ? antdTheme.darkAlgorithm
                        : antdTheme.defaultAlgorithm,
                    token: isDark
                        ? {
                            colorBgElevated: '#18181b',
                        }
                        : undefined,
                }}
            >
                <div style={{ display: 'none' }}>
                    <App>
                        <StaticApp />
                    </App>
                </div>
                {children}
            </ConfigProvider>
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
