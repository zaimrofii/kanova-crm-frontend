import React from "react";

type IconTailProps = {
  text: string;
  active: boolean;
};

export const IconTail: React.FC<IconTailProps> = ({ text, active }) => {
  return (
    <div
      className={`absolute top-[-3rem] right-1/2 translate-x-1/2 
        whitespace-nowrap bg-orange-500 text-white px-4 py-2 rounded-lg 
        transform origin-bottom transition-transform duration-100
        ${active ? "scale-100" : "scale-0"}`}
    >
      <p className="text-sm m-0">{text}</p>
      <div
        className="w-4 h-4 bg-orange-500 absolute right-1/2 
        translate-x-1/2 rotate-45"
        style={{ bottom: "-0.5rem" }}
      />
    </div>
  );
};
