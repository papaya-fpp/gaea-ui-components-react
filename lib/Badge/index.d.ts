import React from 'react';
interface BadgeProps {
    count?: number;
    overflowCount?: number;
    dot?: boolean;
    className?: string;
    style?: React.StyleHTMLAttributes<object>;
    size?: ('default' | 'small');
}
declare const Badge: React.FC<BadgeProps>;
export default Badge;
