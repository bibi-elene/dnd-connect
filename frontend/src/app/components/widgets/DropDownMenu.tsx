'use client';

import { useEffect, useRef } from 'react';
import { DropDownArrowIcon } from '../icons/DropDownArrowIcon';
import { FaUserCog, FaTachometerAlt, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from '@/app/utils/navigation';

interface DropdownMenuProps {
  isOpen: boolean;
  onLogout: () => void;
  username: string;
  toggleDropdown: () => void;
  setDropdownOpen: (isOpen: boolean) => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  isOpen,
  onLogout,
  username,
  toggleDropdown,
  setDropdownOpen,
}) => {
  const { goToDashboard, goToAccountSettings } = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, setDropdownOpen]);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 px-4 py-2 text-white rounded-md hover:opacity-80 focus:outline-none"
      >
        <span className="text-lg">{username}</span>
        <DropDownArrowIcon />
      </button>

      {isOpen && (
        <div
          // On mobile: left-0 and full width; on larger screens: align right with fixed width.
          className="absolute left-0 sm:left-auto sm:right-0 mt-2 text-white rounded-md shadow-lg w-full sm:w-52 z-50 overflow-hidden transition-all duration-200 ease-in-out"
          style={{ opacity: 1, transform: 'scale(1)' }}
        >
          <button
            onClick={goToAccountSettings}
            className="w-full text-left px-4 py-3 flex items-center space-x-2 text-sm hover:opacity-80"
          >
            <FaUserCog className="text-base" />
            <span>Account Settings</span>
          </button>

          <button
            onClick={goToDashboard}
            className="w-full text-left px-4 py-3 flex items-center space-x-2 text-sm hover:opacity-80"
          >
            <FaTachometerAlt className="text-base" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={onLogout}
            className="w-full text-left px-4 py-3 flex items-center space-x-2 text-sm border-t border-gray-700 hover:opacity-80"
          >
            <FaSignOutAlt className="text-base" />
            <span>Log Out</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
