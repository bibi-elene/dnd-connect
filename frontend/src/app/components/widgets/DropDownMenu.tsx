import { LogoutIcon } from '../icons/LogoutIcon';
import { AccountSettingsIcon } from '../icons/AccountSettingsIcon';
import { useNavigate } from '@/app/utils/navigation';
import { DropDownArrowIcon } from '../icons/DropDownArrowIcon';

interface DropdownMenuProps {
  isOpen: boolean;
  onLogout: () => void;
  username: string;
  toggleDropdown: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  isOpen,
  onLogout,
  username,
  toggleDropdown,
}) => {
  const { goToDashboard } = useNavigate();

  return (
    <div className="relative">
      <button
        className="flex items-center space-x-2 focus:outline-none"
        onClick={toggleDropdown}
      >
        <span className="text-xl hover:text-gray-300">{username}</span>
        <DropDownArrowIcon />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden w-48">
          <button
            onClick={() => goToDashboard()}
            className="w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center space-x-2"
          >
            <AccountSettingsIcon />
            <span>Account Settings</span>
          </button>
          <button
            onClick={onLogout}
            className="w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center space-x-2"
          >
            <LogoutIcon />
            <span>Log Out</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
