import React from "react";

interface props {
  dateFilterActive: boolean;
  setDateValue: (value: string) => void;
}
export const FilterByDate = ({ dateFilterActive, setDateValue }: props) => {
  const options = [
    { label: "Hari Ini", value: "today" },
    { label: "Sejak Kemarin", value: "yesterday" },
    { label: "Minggu Ini", value: "1-week" },
    { label: "Bulan Ini", value: "1-month" },
    { label: "2 Bulan Terakhir", value: "2-month" },
    { label: "3 Bulan Terakhir", value: "3-month" },
    { label: "Tahun Ini", value: "1-year" },
  ];

  return (
    <div
      className={`absolute top-44 left-48 w-60 z-[99] bg-white border border-gray-300 shadow-md ${
        dateFilterActive ? "block" : "hidden"
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="m-4 max-h-40 overflow-y-auto space-y-1">
        {options.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setDateValue(value)}
            className="w-full text-left px-2 py-1 text-sm hover:bg-orange-100 transition-colors"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};
