import React from "react";

interface IconProps {
  name: string;
  className?: string;
  color?: string;
  size?: string | number;
  onClick?: any;
}
const Icon: React.FC<IconProps> = ({
  name,
  onClick,
  className = "",
  color = "",
  size = ""
}) => {
  return (
    <svg
      onClick={onClick}
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
