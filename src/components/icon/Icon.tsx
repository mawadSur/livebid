import { useEffect, useState } from "react";
import iconPack from "../../icons.json";

type Props = {
  icon: keyof typeof iconPack;
  className?: string;
  size?: "sm" | "md" | "lg";
  onClick?: (...args: any) => void;
};

const Icon = ({
  icon,
  className = "",
  onClick = () => {},
  size = "md",
}: Props) => {
  const [imgSrc, setImgSrc] = useState<string>("");

  useEffect(() => {
    const cont = document.getElementById("icon-cont");
    if (!cont) return;
    const color = window.getComputedStyle(cont).color;
    setImgSrc(
      `data:image/svg+xml;utf8,${encodeURIComponent(
        iconPack[icon].replaceAll("currentColor", color)
      )}`
    );
  }, [icon]);

  const sizeClasses = {
    sm: "w-4 h-4", // 16px
    md: "w-6 h-6", // 24px
    lg: "w-8 h-8", // 32px
  };

  return (
    <div
      id="icon-cont"
      onClick={onClick}
      className={`flex items-center justify-center h-full w-full outline-none text-inherit fill-current ${className}`}
    >
      <img className={`${sizeClasses[size]} bg-none`} src={imgSrc} />
    </div>
  );
};

export default Icon;
