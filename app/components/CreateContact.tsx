import React, { useEffect, useState } from "react";
import axios from "axios";

interface Props {
  active: boolean;
  setActive: (active: boolean) => void;
  fetchContacts: () => void;
  setNoteActive?: (active: boolean) => void;
}

type ClientStatus = {
  id: string;
  label: string;
};

export const CreateContact: React.FC<Props> = ({
  active,
  setActive,
  fetchContacts,
  setNoteActive,
}) => {
  const [status, setStatus] = useState<ClientStatus[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    company: "",
    job_title: "",
    lifecycle_stage: "",
    status: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getStatus = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/statuses/");
      setStatus(res.data);
    } catch {
      console.error("Gagal ambil status");
    }
  };

  const postContact = async () => {
    try {
      await axios.post("http://localhost:8000/api/clients/", formData);
      fetchContacts();
      console.log("berghasil bro...!!");
    } catch {
      console.error("Gagal posting");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await postContact();
    setFormData({
      name: "",
      email: "",
      phone_number: "",
      company: "",
      job_title: "",
      lifecycle_stage: "",
      status: "",
    });
    fetchContacts();
  };

  useEffect(() => {
    getStatus();
  }, []);

  return (
    <div
      className={`fixed border border-gray-300 top-0 right-0 h-[40vw] w-[45rem] mt-18 bg-white shadow-xl z-30 transform transition-transform duration-300 ${
        active ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center bg-blue-600 h-16 px-6 text-white">
        <h1 className="text-2xl font-semibold">Create Contact</h1>
        <button
          onClick={() => {
            setActive(false);
            setNoteActive?.(false);
          }}
          className="text-5xl cursor-pointer font-light hover:text-gray-200"
        >
          ×
        </button>
      </div>

      {/* Form */}
      <div className="overflow-y-auto px-8 py-10 h-[35vw]">
        <form onSubmit={handleSubmit} className="space-y-5">
          <FormField
            label="Email"
            name="email"
            value={formData.email}
            handleChange={handleChange}
          />
          <FormField
            label="Name"
            name="name"
            value={formData.name}
            handleChange={handleChange}
          />
          <FormField
            label="Job Title"
            name="job_title"
            value={formData.job_title}
            handleChange={handleChange}
          />
          <FormField
            label="Phone Number"
            name="phone_number"
            type="number"
            value={formData.phone_number}
            handleChange={handleChange}
          />
          <FormField
            label="Company"
            name="company"
            value={formData.company}
            handleChange={handleChange}
          />

          {/* Lifecycle Stage */}
          <div className="flex flex-col">
            <label htmlFor="lifecycle_stage" className="mb-1">
              Lifecycle Stage:
            </label>
            <select
              id="lifecycle_stage"
              name="lifecycle_stage"
              value={formData.lifecycle_stage}
              onChange={handleChange}
              className="h-10 px-3 rounded border border-gray-300"
            >
              <option value="">-- Pilih --</option>
              <option value="Lead">Lead</option>
              <option value="MQL (Marketing Qualified Lead)">
                MQL (Marketing Qualified Lead)
              </option>
              <option value="SQL (Sales Qualified Lead)">
                SQL (Sales Qualified Lead)
              </option>
              <option value="Opportunity">Opportunity</option>
              <option value="Customer">Customer</option>
              <option value="Evangelist / Promoter">
                Evangelist / Promoter
              </option>
            </select>
          </div>

          {/* Status */}
          <div className="flex flex-col">
            <label htmlFor="status" className="mb-1">
              Lead Status:
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="h-10 px-3 rounded border border-gray-300"
            >
              <option value="">-- Pilih Status --</option>
              {status.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold cursor-pointer"
            >
              Create
            </button>
            <button
              type="button"
              onClick={() => setActive(false)}
              className="bg-gray-200 hover:bg-gray-300 text-blue-700 px-6 py-2 rounded font-semibold cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Reusable Form Field Component
const FormField = ({
  label,
  name,
  value,
  handleChange,
  type = "text",
}: {
  label: string;
  name: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="mb-1">
      {label}:
    </label>
    <input
      id={name}
      type={type}
      name={name}
      value={value}
      onChange={handleChange}
      placeholder={`Masukkan ${label.toLowerCase()}`}
      className="h-10 px-3 border border-gray-300 rounded text-gray-800"
    />
  </div>
);
