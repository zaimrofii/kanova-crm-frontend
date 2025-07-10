"use client";
import { Pencil } from "lucide-react";
import { Contact } from "../../types/index";
import EditPopup from "../popup/editPopup";
import { useContactStore } from "../../store/useContactStore";
import { useRouter } from "next/navigation";

type ContactTableProps = {
  contacts: Contact[];
  setIdClient: React.Dispatch<React.SetStateAction<string>>;
  setEditActive: React.Dispatch<React.SetStateAction<boolean>>;
  deleteContact: (id: string) => void;
};

const ContactTable = ({
  contacts,
  setIdClient,
  // IdClient,
  deleteContact,
  setEditActive,
}: ContactTableProps) => {
  const setSelectedId = useContactStore((state) => state.setSelectedId);
  const router = useRouter();

  return (
    <div className="overflow-x-auto">
      <div className="grid [grid-template-columns:4vw_1fr_1fr_1fr_1fr] font-semibold bg-gray-100 p-2 shadow-md rounded">
        <div></div>
        <div>Name</div>
        <div>Email</div>
        <div>No. Telepon</div>
        <div>LifeCycle</div>
      </div>
      <div className="h-80 overflow-y-auto">
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <div
              key={contact.id}
              className="grid [grid-template-columns:4vw_1fr_1fr_1fr_1fr] items-center px-2 pl-5 py-3 hover:bg-gray-50 border-b border-gray-200"
            >
              <div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setIdClient(contact.id);
                  }}
                >
                  <EditPopup
                    deleteContact={deleteContact}
                    contactId={contact.id}
                    setEditActive={() => {
                      setEditActive(true);
                      // ← set di sini saat klik edit, bukan saat render
                    }}
                  >
                    <Pencil
                      strokeWidth={1.2}
                      size={20}
                      className="text-blue-400 cursor-pointer hover:text-blue-600"
                    />
                  </EditPopup>
                </div>
              </div>
              <div>
                <button
                  onClick={() => {
                    setSelectedId(contact.id); // ✅ Set dulu ke Zustand
                    router.push("/contact-detail"); // ✅ Baru pindah halaman
                  }}
                  className="text-blue-500 hover:underline font-semibold cursor-pointer"
                >
                  {contact.name}
                </button>
              </div>
              <div>{contact.email}</div>
              <div>{contact.phone_number}</div>
              <div>{contact.lifecycle_stage}</div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500">
            Data Tidak Ditemukan
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactTable;
