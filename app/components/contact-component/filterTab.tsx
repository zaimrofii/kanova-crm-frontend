type FilterTabsProps = {
  onAll: () => void;
  onCustomers: () => void;
  onDateToggle: () => void;
};

const FilterTabs = ({ onAll, onCustomers, onDateToggle }: FilterTabsProps) => (
  <>
    <div className="flex mb-4">
      <button
        onClick={onAll}
        className="px-5 shadow py-2 bg-white border border-gray-300 text-lg w-80 rounded-l-lg"
      >
        Semua Kontak
      </button>
      <button
        onClick={onCustomers}
        className="px-5 shadow py-2 bg-white border border-gray-200 text-lg w-80 rounded-r-lg"
      >
        Semua Customer
      </button>
    </div>
    <div className="flex gap-4 mb-4 cursor-pointer font-semibold text-[color:var(--primary)] text-lg">
      <h2>Pemilik Kontak</h2>
      <h2
        onClick={(e) => {
          e.stopPropagation();
          onDateToggle();
        }}
      >
        Tanggal Dibuat
      </h2>
    </div>
  </>
);

export default FilterTabs;
