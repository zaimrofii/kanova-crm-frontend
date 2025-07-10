const Header = ({ onAddContact }: { onAddContact: () => void }) => (
  <div className="flex justify-between items-center mb-4">
    <h1 className="text-3xl font-bold">Kontak</h1>
    <button onClick={onAddContact} className="bg-blue-500 button">
      Tambah Kontak
    </button>
  </div>
);
export default Header;
