import React from 'react';
import { Bell } from 'lucide-react';

/**
 * Comman Header Component
 * @returns {JSX.Element}
 */
const Header: React.FC<{}> = (): JSX.Element => {
  return (
    <header className="bg-black text-white h-16 flex items-center justify-between px-6 shadow-md fixed top-0 left-0 right-0 z-10">
      {/* Right-side Icons */}
      <div className="flex items-center space-x-4">
        <Bell size={24} />
      </div>
    </header>
  );
};

export default Header;
