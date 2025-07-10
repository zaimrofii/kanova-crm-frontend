"use client";
import React, { useState } from "react";
import axios from "axios";
import { Pencil } from "lucide-react";
import { Contact } from "../../types";

interface EditableFieldProps {
  label: string;
  fieldKey: keyof Contact;
  value: string | undefined;
  contact: Contact | null;
  onUpdate: (updated: Contact) => void;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  isEditing: boolean;
}

const EditableField: React.FC<EditableFieldProps> = ({
  label,
  fieldKey,
  value,
  contact,
  onUpdate,
  setIsEditing,
  isEditing,
}) => {
  const [tempValue, setTempValue] = useState(value || "");

  const handleSubmit = async () => {
    if (!contact) return;
    try {
      const res = await axios.put(
        `http://localhost:8000/api/clients/${contact.id}/`,
        {
          ...contact,
          [fieldKey]: tempValue,
        }
      );
      onUpdate(res.data);
      setIsEditing(false);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="mb-3 py-2 group relative hover:bg-blue-50 hover:border-b border-blue-500"
    >
      <h1 className="text-sm group-hover:-translate-y-1 transition mb-1 text-gray-500">
        {label}
      </h1>

      {isEditing ? (
        <input
          autoFocus
          type="text"
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
            else if (e.key === "Escape") setIsEditing(false);
          }}
          className="border border-gray-400 px-3 py-2 rounded w-full text-sm"
        />
      ) : (
        <p
          onClick={() => {
            setIsEditing(true);
            setTempValue(value || "");
          }}
          className="flex items-center gap-1 cursor-pointer"
        >
          {value || <span className="italic text-gray-400">Empty</span>}
          <Pencil className="h-4 w-4 text-blue-400 opacity-0 group-hover:opacity-100 transition" />
        </p>
      )}
    </div>
  );
};

export default EditableField;
