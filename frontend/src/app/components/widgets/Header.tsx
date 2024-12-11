interface HeaderProps {
  title: string;
  username?: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, username, onLogout }) => (
  <header className="flex justify-between items-center border-b pb-4 mb-6">
    <h1 className="text-3xl font-semibold text-gray-700">{title}</h1>
    <div>
      <span className="mr-4 text-gray-700 font-medium text-xl">Hello, {username}</span>
      <button
        onClick={onLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition"
      >
        Log out
      </button>
    </div>
  </header>
);

export default Header;
