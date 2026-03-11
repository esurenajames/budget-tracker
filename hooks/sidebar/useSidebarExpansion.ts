import { useState, useEffect } from 'react';
import { MenuGroup } from '@/interface/sidebar';

export function useSidebarExpansion(pathname: string, menuGroups: MenuGroup[]) {
    const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('sidebar_expanded_menus');
        let initialExpanded: string[] = [];
        if (saved) {
            try {
                initialExpanded = JSON.parse(saved);
            } catch (e) { }
        }

        const activeGroups = menuGroups.flatMap(group =>
            group.items.filter(item =>
                item.subItems?.some(sub => sub.href === pathname)
            ).map(item => item.name)
        );

        const merged = Array.from(new Set([...initialExpanded, ...activeGroups]));
        setExpandedMenus(merged);
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('sidebar_expanded_menus', JSON.stringify(expandedMenus));
        }
    }, [expandedMenus, isInitialized]);

    const toggleSubMenu = (menuName: string) => {
        setExpandedMenus(prev =>
            prev.includes(menuName)
                ? prev.filter(m => m !== menuName)
                : [...prev, menuName]
        );
    };

    return { expandedMenus, toggleSubMenu };
}
