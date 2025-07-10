"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, useDragControls } from "framer-motion";

type Props = {
  id: string;
  idClient: string;
  editActive: boolean;
  setEditActive: (active: boolean) => void;
  fetchContacts: () => void;
};

type ClientStatus = {
  id: string;
  label: string;
};

const EditContact: React.FC<Props> = ({
  id,
  editActive,
  setEditActive,
  fetchContacts,
  idClient,
}) => {
  const [statusOptions, setStatusOptions] = useState<ClientStatus[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    company: "",
    job_title: "",
    lifecycle_stage: "",
    status: "",
  });
  const [initialData, setInitialData] = useState(formData);
  const controls = useDragControls();

  const getContactById = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/clients/${idClient}/`
      );
      const newData = {
        name: res.data.name || "",
        email: res.data.email || "",
        phone_number: res.data.phone_number || "",
        company: res.data.company || "",
        job_title: res.data.job_title || "",
        lifecycle_stage: res.data.lifecycle_stage || "",
        status: res.data.status || "",
      };
      setFormData(newData);
      setInitialData(newData);
    } catch {
      console.error("Gagal ambil data contact");
    }
  };
  const isFormChanged =
    JSON.stringify(formData) !== JSON.stringify(initialData);

  const getStatuses = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/statuses/");
      setStatusOptions(res.data);
    } catch {
      console.error("Gagal ambil status");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateContact = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8000/api/clients/${idClient}/`,
        formData
      );
      fetchContacts();
      setEditActive(false);
    } catch {
      console.error("Gagal update contact");
    }
  };

  useEffect(() => {
    if (editActive && idClient) {
      getContactById();
      getStatuses();
    }
  }, [editActive, idClient]);

  //   if (!editActive) return null;
  return (
    <motion.div drag dragControls={controls} dragListener={false}>
      <div
        className={`${
          editActive ? "scale-100" : "scale-0"
        } fixed w-[35rem] h-[70vh] bg-white border-l border-gray-300 shadow-lg z-999 transition`}
      >
        <div
          onPointerDown={(e) => controls.start(e)}
          className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center"
        >
          <h2 className="text-xl font-semibold">Edit Contact</h2>
          <button
            onClick={() => {
              setEditActive(false);
              console.log(editActive);
            }}
            className="text-3xl hover:text-gray-200"
          >
            ×
          </button>
        </div>
        <form
          onSubmit={updateContact}
          className="p-8 space-y-4 overflow-y-auto h-[56vh]"
        >
          <FormField
            label="Name"
            name="name"
            value={formData.name}
            handleChange={handleChange}
          />
          <FormField
            label="Email"
            name="email"
            value={formData.email}
            handleChange={handleChange}
          />
          <FormField
            label="Phone Number"
            name="phone_number"
            value={formData.phone_number}
            handleChange={handleChange}
          />
          <FormField
            label="Company"
            name="company"
            value={formData.company}
            handleChange={handleChange}
          />
          <FormField
            label="Job Title"
            name="job_title"
            value={formData.job_title}
            handleChange={handleChange}
          />
          <FormField
            label="Lifecycle Stage"
            name="lifecycle_stage"
            value={formData.lifecycle_stage}
            handleChange={handleChange}
          />

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
              {statusOptions.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={!isFormChanged}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Simpan
            </button>
            <button
              type="button"
              onClick={() => setEditActive(false)}
              className="bg-gray-200 px-6 py-2 rounded hover:bg-gray-300 text-blue-700"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

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
      name={name}
      type={type}
      value={value}
      onChange={handleChange}
      className="h-10 px-3 border border-gray-300 rounded text-gray-800"
    />
  </div>
);
export default EditContact;
