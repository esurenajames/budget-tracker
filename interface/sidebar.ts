export interface SubMenuItem {
    name: string;
    href: string;
}

export interface MenuItem {
    name: string;
    icon: any;
    href?: string;
    subItems?: SubMenuItem[];
}

export interface MenuGroup {
    title: string;
    items: MenuItem[];
}
