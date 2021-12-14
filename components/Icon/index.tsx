import React from "react";

interface IconProps {
  name: string;
  className?: string;
  color?: string;
  size?: string | number;
}
const Icon: React.FC<IconProps> = ({
  name,
  className = "",
  color = "",
  size = ""
}) => {
  return (
    <svg 
      className={`icon  ${className}`}
      style={{
        color: color,
        fontSize: size + "px"
      }}
      aria-hidden="true"
    >
      <use xlinkHref={`#icon-${name}`}></use>
    </svg >
  );
};

export default Icon;
