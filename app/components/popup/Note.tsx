"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useContactStore } from "@/app/store/useContactStore";
import { Contact } from "@/app/types";

interface NoteProps {
  isActive: string;
  setIsActive: (value: string) => void;
  type: string;
  fetchDataInteractions: () => void;
}

export const Note: React.FC<NoteProps> = ({
  isActive,
  setIsActive,
  fetchDataInteractions,
  type,
}) => {
  const [noteText, setNoteText] = useState("");
  const [contact, setContact] = useState<Contact | null>(null);
  const selectedId = useContactStore((state) => state.selectedId);

  const getContact = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/clients/${selectedId}/`
      );
      setContact(res.data);
    } catch (err) {
      console.error("Gagal mengambil data contact", err);
    }
  };

  const handleCreateNote = async () => {
    if (!selectedId || !noteText.trim()) return;

    try {
      const response = await axios.post("http://localhost:8000/api/notes/", {
        client: selectedId,
        note: noteText,
        type: type,
      });

      // ✅ Hanya dijalankan jika POST berhasil
      if (response.status === 201 || response.status === 200) {
        fetchDataInteractions();
        console.log("Catatan berhasil dibuat:", response.data);
      }
    } catch (err) {
      console.error("Gagal membuat catatan:", err);
    } finally {
      setNoteText("");
      setIsActive("");
    }
  };

  useEffect(() => {
    if (selectedId) getContact();
  }, [selectedId]);
  useEffect(() => {
    console.log("type ;", type);
  }, []);
  return (
    <div
      className={`${
        isActive === "Note" || isActive === "Task" ? "scale-100" : "scale-0"
      } fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
         bg-white w-[40vw] h-auto z-10 rounded shadow-xl transition pb-3`}
    >
      {/* Header */}
      <div className="h-12 bg-blue-500 rounded-t-md px-5 flex justify-between items-center text-xl text-white">
        <h1>{isActive}</h1>
        <button className="cursor-pointer" onClick={() => setIsActive("")}>
          x
        </button>
      </div>

      {/* Content */}
      <div className="px-5 py-2">
        <p className="mb-3">
          for{" "}
          <span className="text-blue-600 font-semibold">
            {contact?.name || "Unknown"}
          </span>
        </p>

        <textarea
          name="note"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Tulis di sini..."
          className="px-5 py-2 w-full h-[8rem] border rounded focus:outline-none"
        />

        <div className="flex justify-end mt-2">
          <button className="button bg-blue-500" onClick={handleCreateNote}>
            Create Note
          </button>
        </div>
      </div>
    </div>
  );
};
