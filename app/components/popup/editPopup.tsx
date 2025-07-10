"use client";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useState } from "react";

type PopupMenuProps = {
  children: React.ReactNode;
  setEditActive: React.Dispatch<React.SetStateAction<boolean>>;
  contactId: string;
  deleteContact: (id: string) => void;
};

export default function EditPopup({
  children,
  setEditActive,
  contactId,
  deleteContact,
}: PopupMenuProps) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setPos({ x: e.clientX, y: e.clientY });
    setOpen(true);
  };

  return (
    <div onClick={handleClick}>
      {children}
      <Popup
        open={open}
        onClose={() => setOpen(false)}
        arrow={false}
        closeOnDocumentClick
        contentStyle={{
          width: "20rem",
          position: "fixed",
          top: pos.y,
          left: pos.x,
          padding: "10px",
          background: "#fff",
          border: "1px solid #ddd",
          borderRadius: "8px",
          zIndex: 1000,
        }}
      >
        <div className="text-sm">
          <button
            onClick={() => {
              setOpen(false);
              setEditActive(true);
              console.log("Edit id:", contactId); // ← id aman di sini!
            }}
            className="block w-full border-none outline-none text-left px-3 py-1 hover:bg-gray-100"
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => {
              setOpen(false);
              deleteContact(contactId);
            }}
            className="block w-full text-left px-3 py-1 text-red-600 hover:bg-red-100"
          >
            🗑️ Delete
          </button>
        </div>
      </Popup>
    </div>
  );
}
