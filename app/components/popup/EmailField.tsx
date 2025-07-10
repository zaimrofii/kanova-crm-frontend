"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContactStore } from "@/app/store/useContactStore";
import { Contact } from "@/app/types";

type EmailFieldProps = {
  isActive: string;
  setIsActive: (val: string) => void;
  sendEmail: (data: { subject: string; message: string }) => void;
  fetchDataInteractions: () => void;
};

export const EmailField: React.FC<EmailFieldProps> = ({
  isActive,
  setIsActive,
  sendEmail,
  fetchDataInteractions,
}) => {
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  });
  const [contact, setContact] = useState<Contact | null>(null);
  const selectedId = useContactStore((state) => state.selectedId);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!selectedId) return;

    try {
      // Simpan sebagai interaction
      await axios.post(`http://localhost:8000/api/notes/`, {
        client: selectedId,
        note: formData.message,
        // type: "Email",
      });

      // Kirim email
      sendEmail(formData);
      fetchDataInteractions();

      // Reset & tutup
      setFormData({ subject: "", message: "" });
      setIsActive("");
    } catch (err) {
      console.error("Gagal kirim email atau simpan interaksi:", err);
    }
  };

  const getContact = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/clients/${selectedId}/`
      );
      setContact(res.data);
    } catch (err) {
      console.error("Gagal ambil data contact", err);
    }
  };

  useEffect(() => {
    if (selectedId) getContact();
  }, [selectedId]);

  return (
    <div
      className={`${
        isActive === "Emails" ? "scale-100" : "scale-0"
      } fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[40vw] z-10 rounded transition shadow-xl h-auto pb-3`}
    >
      {/* Header */}
      <div className="flex justify-between rounded-t-md items-center bg-blue-500 h-12 px-8">
        <h1 className="text-white text-xl font-light">Email</h1>
        <h1
          className="text-white text-2xl cursor-pointer"
          onClick={() => setIsActive("")}
        >
          x
        </h1>
      </div>

      {/* Content */}
      <div className="w-[90%] mx-auto mt-2">
        <p className="border-b border-gray-300 pb-2 text-left">
          for
          <span className="font-semibold text-blue-600 px-2 py-0.5">
            {contact?.name || "Unknown"}
          </span>
        </p>
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          className="w-full border-b border-gray-300 text-base pb-2 mt-2 focus:outline-none"
          value={formData.subject}
          onChange={handleChange}
        />
        <textarea
          name="message"
          className="w-full h-32 mt-3 border-b border-gray-300 text-base pt-2 focus:outline-none"
          placeholder="Tulis di sini..."
          value={formData.message}
          onChange={handleChange}
        />
        <div className="flex justify-start mt-2">
          <button className="bg-blue-500 button" onClick={handleSubmit}>
            Send Email
          </button>
        </div>
      </div>
    </div>
  );
};
