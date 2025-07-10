import ActionButton from "./actionButton";
import { Pencil, CheckSquare, Trash } from "lucide-react";

type ActionProps = {
  show: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onNote: () => void;
};

type SearchBarProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  actions?: ActionProps;
};

const SearchBar = ({ value, onChange, onKeyDown, actions }: SearchBarProps) => (
  <div>
    <div className="flex items-center gap-2 mb-4">
      <input
        type="text"
        placeholder="Search name, phone, email..."
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="border border-gray-400 rounded-lg p-2 px-5 w-full max-w-md"
      />
      {actions?.show && (
        <div className="flex gap-2 ml-4">
          <ActionButton
            onClick={actions.onEdit}
            icon={<Pencil size={16} />}
            label="Edit"
            color="bg-yellow-400"
          />
          <ActionButton
            onClick={actions.onDelete}
            icon={<Trash size={16} />}
            label="Delete"
            color="bg-red-400"
          />
          <ActionButton
            onClick={actions.onNote}
            icon={<CheckSquare size={16} />}
            label="Create Task"
            color="bg-green-400"
          />
        </div>
      )}
    </div>
  </div>
);

export default SearchBar;
