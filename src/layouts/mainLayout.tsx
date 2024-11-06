import { Outlet } from 'react-router-dom';
import {
  Calendar,
  Clipboard,
  FileEdit,
  Gamepad,
  Gift,
  Home,
  User,
  Workflow,
} from 'lucide-react';

import Sidebar from '@/components/sidebar';
import Header from '@/components/header';

/**
 * Main Layout
 * @returns {JSX.Element}
 */
const Layout: React.FC = () => {
  // List of pages which is rendered on the sidebar
  const pages = [
    { name: 'Dashboard', icon: <Home />, route: '/' }, // Home icon for dashboard
    {
      name: 'Games',
      icon: <Gamepad />,
      route: '/game',
    },
    { name: 'Users', icon: <User />, route: '/user' }, // Users icon for user
    { name: 'Offers', icon: <Gift />, route: '/offer' }, // Gift icon for offers
    {
      name: 'Quizs',
      icon: <Clipboard />,
      route: '/quiz',
    },
    {
      name: 'Events',
      icon: <Calendar />,
      route: '/event',
    },
    {
      name: 'Work',
      icon: <Workflow />,
      route: '/work',
    },
    {
      name: 'Juicer Feed',
      icon: <FileEdit />,
      route: '/juicerfeed',
    },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar pages={pages} />
      <div className="flex-grow">
        {/* Header */}
        <Header />
        {/* Main content area */}
        <main className="pt-24 p-8 w-full overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
