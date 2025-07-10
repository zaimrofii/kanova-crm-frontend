"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContactStore } from "@/app/store/useContactStore";
import { Interaction } from "@/app/contact-detail/page";

interface ActivitySectionProps {
  messageActive: string;
  setMessageActive: (value: string) => void;
  setIsActive: (value: string) => void;
  dataInteractions: Interaction[];
  setDataInteractions: React.Dispatch<React.SetStateAction<Interaction[]>>;
  setType: React.Dispatch<React.SetStateAction<string | null>>;
  fetchDataInteractions: () => void;
}

const filterTabs: [label: string, type: string][] = [
  // ["Activity", "activity"],
  ["Notes", "note"],
  ["Emails", "email"],
  ["Calls", "call"],
  ["Tasks", "task"],
  ["Meetings", "meeting"],
];

const ActivitySection: React.FC<ActivitySectionProps> = ({
  messageActive,
  setMessageActive,
  setIsActive,
  dataInteractions,
  setDataInteractions,
  fetchDataInteractions,
  setType,
}) => {
  const [lineActive, setLineActive] = useState("Activity");

  const selectedId = useContactStore((state) => state.selectedId);

  const filterDataInteractions = (type: string) => {
    axios
      .get(`http://localhost:8000/api/notes/?client=${selectedId}&type=${type}`)
      .then((res) => setDataInteractions(res.data))
      .catch((err) => console.log("error filtering interactions", err));
  };

  useEffect(() => {
    if (selectedId) fetchDataInteractions();
  }, [selectedId]);

  return (
    <div className="pt-20 px-5 w-2/3 h-[26vh]">
      {/* <input
        type="text"
        placeholder="Search activity..."
        className="h-10 w-80 px-5 rounded-xl border border-gray-400"
      /> */}

      <div className="flex py-3 text-gray-800 text-md border-b border-gray-400 mb-4 relative">
        {filterTabs.map(([label, type]) => (
          <button
            key={label}
            onClick={() => {
              setMessageActive(label);
              setLineActive(label);
              setType(type); // ✅ ini penting
              filterDataInteractions(type); // filter spesifik
            }}
            className={`px-4 py-2 ${
              lineActive === label
                ? "border-b-4 border-gray-800 font-semibold"
                : ""
            }`}
          >
            {label}
          </button>
        ))}

        <button
          className={`${
            ["Notes", "Emails", "Tasks"].includes(messageActive)
              ? "absolute"
              : "hidden"
          } bottom-3 right-8 button bg-green-500`}
          onClick={() =>
            setIsActive(
              messageActive === "Emails"
                ? "Emails"
                : messageActive === "Tasks"
                ? "Task"
                : "Note"
            )
          }
        >
          Create {messageActive.slice(0, -1)}
        </button>
      </div>

      <div className="flex h-[70vh] overflow-scroll relative">
        <div className="space-y-2 w-full">
          {dataInteractions.map((item) => (
            <div className="mb-3" key={item.id}>
              <h1 className="text-gray-600">
                {new Date(item.created_at).toLocaleDateString()}
              </h1>
              <div className="p-5 bg-white rounded-lg shadow w-4/5">
                <h1 className="text-gray-600 mb-2">
                  noted by <span className="font-semibold">Bagas Pramudi</span>
                </h1>
                <h1>{item.note}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivitySection;
