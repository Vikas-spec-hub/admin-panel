import { useState } from 'react';
import { LogOut, Menu, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuthentication';

interface ISidebarProps {
  pages: { name: string; icon: JSX.Element; route: string }[];
}

/**
 * Comman Sidebar for the whole project
 * @param {ISidebarProps}
 * @returns {JSX.Element}
 */
const Sidebar: React.FC<ISidebarProps> = ({
  pages,
}: ISidebarProps): JSX.Element => {
  //React state
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  // Hooks
  const { logout } = useAuth();
  const location = useLocation();

  // Toggle the sidebar for mobile view
  const toggleMobileSidebar = () => setIsMobileOpen(!isMobileOpen);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden p-2 text-gray-500 focus:outline-none"
        onClick={toggleMobileSidebar}
      >
        <Menu size={24} />
      </button>
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white h-screen w-64 transition-width duration-300 ease-in-out z-20 md:block ${
          isMobileOpen ? 'block' : 'hidden'
        } md:flex flex-col`}
      >
        {/* Logo */}
        <div className="flex items-center justify-center py-4 px-6 bg-black">
          <div className="font-bold">Your Logo</div>
          <h1 className={`text-xl font-bold block`}></h1>
        </div>

        {/* Profile */}
        {/* TODO : Replace the admin info */}
        <div className="flex items-center p-4 border-b border-gray-700">
          <User size={32} />
          <div className="ml-4">
            <h2 className="text-lg font-semibold">John Doe</h2>
            <p className="text-sm text-gray-400">Admin</p>
          </div>
        </div>

        {/* Pages */}
        <ul className="flex-grow">
          {pages.map((page, idx) => (
            <Link key={idx} to={page.route}>
              <li
                key={idx}
                className={`flex items-center px-6 py-3 cursor-pointer ${location.pathname === page.route ? 'bg-white' : 'hover:bg-gray-700 '} `}
              >
                <div
                  className={` ${location.pathname === page.route ? 'text-black' : 'text-white'}`}
                >
                  {page.icon}
                </div>
                <span
                  className={`ml-4 ${location.pathname === page.route ? 'text-black' : 'text-white'} `}
                >
                  {page.name}
                </span>
              </li>
            </Link>
          ))}
        </ul>
        <div
          className="p-4 flex  items-center justify-center cursor-pointer"
          onClick={logout}
        >
          <LogOut />
          <p className="ml-1 text-center space-x-4">Logout</p>
        </div>
      </div>

      {/* Overlay for mobile view */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
          onClick={toggleMobileSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
