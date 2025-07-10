// app/contacts/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/contact-component/header";
import FilterTabs from "../components/contact-component/filterTab";
import SearchBar from "../components/contact-component/searchBar";
import ContactTable from "../components/contact-component/contactTable";
import Navbar from "../components/Navbar";
import { CreateContact } from "../components/CreateContact";
import EditContact from "../components/popup/editContact";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  lifecycle_stage: string;
}

const Contacts: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [idClient, setIdClient] = useState("");

  const [selectedId, setSelectedId] = useState("");
  const [checkedId, setCheckedId] = useState<string | false>(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const [isActive, setIsActive] = useState(false);
  const [editActive, setEditActive] = useState(false);
  const [noteActive, setNoteActive] = useState(false);
  const [dateFilterActive, setDateFilterActive] = useState(false);

  const fetchContacts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/clients/");
      setContacts(res.data);
    } catch {
      console.error("Error fetching contacts");
    }
  };

  const fetchBySearch = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/clients/?search=${searchValue}`
      );
      setContacts(res.data);

      setSearchValue("");
    } catch {
      console.error("Error searching contacts");
    }
  };

  const fetchCustomers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/clients/?search=Customer"
      );
      setContacts(res.data);
    } catch {
      console.error("Error fetching customers");
    }
  };

  const fetchByDate = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/contacts/?range=${dateValue}`
      );
      setContacts(res.data);
    } catch {
      console.error("Error fetching by date");
    }
  };

  const fetchContactById = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/contacts/${selectedId}/`
      );
      setSelectedContact(res.data);
    } catch {
      console.error("Error fetching contact by ID");
    }
  };

  const deleteContact = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8000/api/clients/${idClient}/`);
      fetchContacts();
    } catch {
      console.error("Error deleting contact");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") fetchBySearch();
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    if (selectedId) fetchContactById();
  }, [selectedId]);

  useEffect(() => {
    if (dateValue) fetchByDate();
  }, [dateValue]);

  useEffect(() => {
    const handleClick = () => {
      setCheckedId(false);
      setDateFilterActive(false);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <Navbar />
      <EditContact
        idClient={idClient}
        editActive={editActive}
        setEditActive={setEditActive}
        fetchContacts={fetchContacts}
      />
      <div className="w-[90vw] h-[100vh] py-10 pt-20 mx-auto">
        <Header onAddContact={() => setIsActive(true)} />
        <FilterTabs
          onAll={fetchContacts}
          onCustomers={fetchCustomers}
          onDateToggle={() => setDateFilterActive(!dateFilterActive)}
          setContacts={setContacts}
        />
        <div className="bg-white p-4 rounded-2xl shadow-xl border border-gray-100">
          <SearchBar
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
            actions={{
              show: !!checkedId,
              onEdit: () => setEditActive(true),
              onDelete: () => deleteContact(selectedId),
              onNote: () => setNoteActive(!noteActive),
            }}
          />

          <ContactTable
            contacts={contacts}
            selectedId={selectedId}
            deleteContact={deleteContact}
            setEditActive={setEditActive}
            setIdClient={setIdClient}
            // idClient={idClient}
          />
        </div>

        <CreateContact
          active={isActive}
          setActive={setIsActive}
          fetchContacts={fetchContacts}
        />
      </div>{" "}
      {/* Ini menutup div w-[90vw] */}
    </>
  );
};
export default Contacts;
