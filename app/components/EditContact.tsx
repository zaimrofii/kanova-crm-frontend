import React, { useEffect, useState } from "react";
import axios from "axios";

type EditContactProps = {
  id: string;
  setActive: (value: boolean) => void;
  active: boolean;
  fetchContacts: () => void;
  editActive: boolean;
  setEditActive: (value: boolean) => void;
  from: string;
};
type FormData = {
  name: string;
  email: string;
  phone_number: string;
  company: string;
  job_title: string;
  lifecycle_stage: string;
  status: string;
  [key: string]: string;
};
export const EditContact: React.FC<EditContactProps> = ({
  id,
  setActive,
  active,
  fetchContacts,
  editActive,
  setEditActive,
  from,
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone_number: "",
    company: "",
    job_title: "",
    lifecycle_stage: "",
    status: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/contacts/${id}/`,
        formData
      );
      console.log("Berhasil update:", response.data);
      fetchContacts();
    } catch {
      console.error("Gagal update data:");
    }
  };

  const getContactById = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/contacts/${id}/`);
      setFormData(res.data);
    } catch (error) {
      console.error("Gagal ambil data:", error);
    }
  };

  useEffect(() => {
    if (id) getContactById();
  }, [id]);

  const handleClose = () => {
    if (from === "contact") {
      setActive(false);
    } else {
      setEditActive(false);
    }
  };

  return (
    <div
      className={`edit-contact ${
        active || editActive ? "edit-contact-active" : ""
      }`}
    >
      <div id="header">
        <h1>Edit</h1>
        <h1 onClick={handleClose}>x</h1>
      </div>

      <div id="container">
        <form className="form">
          {[
            { id: "email", label: "Email", type: "text" },
            { id: "name", label: "Name", type: "text" },
            { id: "job_title", label: "Job Title", type: "text" },
            { id: "phone_number", label: "Phone Number", type: "number" },
            { id: "company", label: "Company", type: "text" },
          ].map(({ id, label, type }) => (
            <div className="input" key={id}>
              <label htmlFor={id}>{label} :</label>
              <input
                id={id}
                type={type}
                name={id}
                placeholder={`Masukkan ${label.toLowerCase()}`}
                value={formData[id] || ""}
                onChange={handleChange}
              />
            </div>
          ))}

          <div className="input">
            <label htmlFor="lifecycle_stage">Lifecycle Stage :</label>
            <select
              id="lifecycle_stage"
              name="lifecycle_stage"
              value={formData.lifecycle_stage || ""}
              onChange={handleChange}
            >
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

          <div className="input">
            <label htmlFor="status">Lead Status :</label>
            <input
              id="status"
              type="text"
              name="status"
              placeholder="Status"
              value={formData.status || ""}
              onChange={handleChange}
            />
          </div>
        </form>
      </div>

      <div className="button">
        <button
          onClick={() => {
            handleUpdate();
            handleClose();
          }}
        >
          Update
        </button>
        <button type="button" onClick={handleClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};
