import { ReactNode } from "react";

type ActionButtonProps = {
  onClick: () => void;
  icon: ReactNode;
  label: string;
  color?: string;
};

const ActionButton = ({
  onClick,
  icon,
  label,
  color = "bg-gray-200",
}: ActionButtonProps) => (
  <button
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
    className={`flex items-center gap-1 ${color} px-3 py-1 rounded`}
  >
    {icon} {label}
  </button>
);

export default ActionButton;
