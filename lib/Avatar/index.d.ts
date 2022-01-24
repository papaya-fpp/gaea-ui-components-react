import React from 'react';
interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: number | string;
    src?: string;
    icon?: string;
    shape?: 'circle' | 'square';
}
declare const Avatar: React.FC<AvatarProps>;
export default Avatar;
