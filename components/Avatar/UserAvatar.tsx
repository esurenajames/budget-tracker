'use client';

import React from 'react';
import { Avatar } from 'antd';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface UserAvatarProps {
    src?: string;
    name?: string;
    domainAccount?: string;
    size?: number;
    className?: string;
}

export default function UserAvatar({ src, name, size = 32, className }: UserAvatarProps) {
    return (
        <Avatar
            src={src}
            size={size}
            className={cn("bg-accent-1 text-white font-bold", className)}
        >
            {name?.charAt(0) || 'U'}
        </Avatar>
    );
}
