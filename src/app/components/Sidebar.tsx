'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, UserIcon, BriefcaseIcon, UsersIcon, BuildingStorefrontIcon, PresentationChartBarIcon, CogIcon } from '@heroicons/react/24/outline';

const tabs = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Users', href: '/users', icon: UserIcon },
  { name: 'Admin', href: '/admin', icon: UsersIcon },
  { name: 'Clients', href: '/clients', icon: BriefcaseIcon },
  { name: 'Production', href: '/production', icon: BuildingStorefrontIcon },
  { name: 'Production House', href: '/production-house', icon: BuildingStorefrontIcon },
  { name: 'Director', href: '/director', icon: PresentationChartBarIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname.startsWith('/admin');
    }
    return pathname === href;
  };

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg flex flex-col h-full">
      <div className="flex items-center justify-center h-16 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">NovasAdmin</h1>
      </div>
      <nav className="flex-1 px-4 py-4 space-y-1">
        {tabs.map(tab => (
          <Link
            key={tab.name}
            href={tab.href}
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              isActive(tab.href)
                ? 'bg-gray-900 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <tab.icon className="w-5 h-5 mr-3" />
            {tab.name}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center text-white">
            U
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">User Name</p>
            <p className="text-xs text-gray-500">user@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
