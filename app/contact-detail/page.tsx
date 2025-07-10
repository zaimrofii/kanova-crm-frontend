"use client";
import React, { useEffect, useState } from "react";
import {
  StickyNote,
  Mail,
  Phone,
  CalendarClock,
  CheckSquare,
  History,
  type LucideIcon,
  // ChevronLeft,
} from "lucide-react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useContactStore } from "../store/useContactStore";
import { Contact } from "../types";
import { EmailField } from "../components/popup/EmailField";
import { Note } from "../components/popup/Note";
import ActivitySection from "../components/contact-detail/ActivitySection";
import EditableField from "../components/contact-detail/EditableField";

interface ContactDetailProps {
  name: string;
  id: number;
}
export interface Interaction {
  id: number;
  type: string;
  note: string;
  created_at: string;
}
const ContactDetail: React.FC<ContactDetailProps> = ({ name, id }) => {
  const [isActive, setIsActive] = useState<string>("");
  const [messageActive, setMessageActive] = useState<string>("Activity");
  const [contactStatus, setContactStatus] = useState<string>("Activity");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isEditingField, setIsEditingField] = useState<string | null>(null);
  const selectedId = useContactStore((state) => state.selectedId);
  const [type, setType] = useState(null);

  const iconItems: [label: string, Icon: LucideIcon, type: string][] = [
    ["Note", StickyNote, "note"],
    ["Email", Mail, "email"],
    ["Call", Phone, "call"],
    ["Task", CalendarClock, "task"],
    ["Meeting", CheckSquare, "meeting"],
    ["Log", History, "log"],
  ];
  const [dataInteractions, setDataInteractions] = useState<Interaction[]>([]);
  const fetchDataInteractions = () => {
    axios
      .get(
        `http://localhost:8000/api/notes/?contact=${selectedId}${
          type ? `&type=${type}` : ""
        }`
      )
      .then((res) => setDataInteractions(res.data))
      .catch((err) => console.log("error fetching interactions", err));
  };
  useEffect(() => {
    if (selectedId) {
      const fetchData = async () => {
        try {
          const res = await axios.get(
            `http://localhost:8000/api/clients/${selectedId}/`
          );
          const contact = res.data;
          setSelectedContact(contact);

          // fetch status berdasarkan field 'status' dari contact
          if (contact.status) {
            const statusRes = await axios.get(
              `http://localhost:8000/api/statuses/${contact.status}/`
            );
            setContactStatus(statusRes.data.label);
          }
        } catch (err) {
          console.error("Error fetching contact or status:", err);
        }
      };

      fetchData();
    }
  }, [selectedId]);

  useEffect(() => {
    console.log("status :", contactStatus);
  }, [contactStatus]);
  useEffect(() => {
    fetchDataInteractions();
  }, []);
  return (
    <>
      <Navbar />
      <div
        className="flex justify-between text-gray-800"
        onClick={() => setIsEditingField("")}
      >
        <div className="h-[100vh] w-1/3 flex pt-20 flex-col gap-6 px-8 overflow-y-scroll">
          <div className="flex gap-5 items-center">
            {/* <ChevronLeft className="cursor-pointer" /> */}
            <h1 className="font-semibold text-xl">Contact Detail</h1>
          </div>

          <div className="flex gap-5">
            <div className="w-20 h-20 bg-gray-500 rounded-full"></div>
            <div>
              <h1 className="text-2xl">{selectedContact?.name}</h1>
              <h1 className="text-lg">{selectedContact?.job_title}</h1>
              <h1 className="text-lg">jokosuli@gmaikl.com</h1>
            </div>
          </div>

          <div className="flex justify-around mt-5 border-b border-gray-400 pb-5">
            {iconItems.map(([label, Icon]) => (
              <div
                key={label}
                onClick={() => setIsActive(label)}
                className="flex flex-col w-15 h-15 justify-center rounded-full bg-gray-200 items-center cursor-pointer text-gray-500 hover:text-blue-600 transition"
              >
                <Icon />
                <p className="text-xs">{label}</p>
              </div>
            ))}
          </div>

          <div className="pb-20">
            <EditableField
              label="Email"
              fieldKey="email"
              isEditing={isEditingField === "email"}
              setIsEditing={(val) => setIsEditingField(val ? "email" : null)}
              value={selectedContact?.email}
              contact={selectedContact}
              onUpdate={(updatedContact) => setSelectedContact(updatedContact)}
            />

            <EditableField
              label="Phone Number"
              fieldKey="phone_number"
              isEditing={isEditingField === "phone_number"}
              setIsEditing={(val) =>
                setIsEditingField(val ? "phone_number" : null)
              }
              value={selectedContact?.phone_number}
              contact={selectedContact}
              onUpdate={(updatedContact) => setSelectedContact(updatedContact)}
            />

            <EditableField
              label="Lifecycle Stage"
              fieldKey="lifecycle_stage"
              isEditing={isEditingField === "lifecycle_stage"}
              setIsEditing={(val) =>
                setIsEditingField(val ? "lifecycle_stage" : null)
              }
              value={selectedContact?.lifecycle_stage}
              contact={selectedContact}
              onUpdate={(updatedContact) => setSelectedContact(updatedContact)}
            />

            <EditableField
              label="Company Name"
              fieldKey="company"
              isEditing={isEditingField === "company"}
              setIsEditing={(val) => setIsEditingField(val ? "company" : null)}
              value={selectedContact?.company}
              contact={selectedContact}
              onUpdate={(updatedContact) => setSelectedContact(updatedContact)}
            />
            <EditableField
              label="Lead Status"
              fieldKey="status"
              isEditing={isEditingField === "status"}
              setIsEditing={(val) => setIsEditingField(val ? "status" : null)}
              value={contactStatus}
              contact={selectedContact}
              onUpdate={(updatedContact) => setSelectedContact(updatedContact)}
            />
            <EditableField
              label="Create date"
              fieldKey="created_at"
              isEditing={isEditingField === "created_at"}
              setIsEditing={(val) =>
                setIsEditingField(val ? "created_at" : null)
              }
              value={
                selectedContact?.created_at
                  ? new Intl.DateTimeFormat("en-GB", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    }).format(new Date(selectedContact.created_at))
                  : ""
              }
              contact={selectedContact}
              onUpdate={(updatedContact) => setSelectedContact(updatedContact)}
            />
          </div>
        </div>

        <EmailField
          isActive={isActive}
          setIsActive={setIsActive}
          name={name}
          id={id}
          sendEmail={(formData) => {
            axios
              .post(`http://localhost:8000/api/send-email/`, {
                to_email: name,
                subject: formData.subject,
                message: formData.message,
              })
              .then((res) => console.log("Email sent:", res.data))
              .catch((err) => console.log("Error sending email:", err));
          }}
          fetchDataInteractions={() => {
            axios
              .get(`http://localhost:8000/api/interactions/?contact=${id}`)
              .then((res) => console.log(res.data))
              .catch((err) => console.log("error fetching interactions", err));
          }}
        />

        <Note
          isActive={isActive}
          setIsActive={setIsActive}
          fetchDataInteractions={fetchDataInteractions}
          type={type}
          // name={name}
          // id={id}
        />

        <ActivitySection
          // id={id}
          messageActive={messageActive}
          setMessageActive={setMessageActive}
          setIsActive={setIsActive}
          setDataInteractions={setDataInteractions}
          dataInteractions={dataInteractions}
          fetchDataInteractions={fetchDataInteractions}
          setType={setType}
        />
      </div>
    </>
  );
};

export default ContactDetail;
