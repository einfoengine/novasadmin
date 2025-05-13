'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HomeIcon, 
  UserIcon, 
  BriefcaseIcon, 
  UsersIcon, 
  BuildingStorefrontIcon, 
  PresentationChartBarIcon, 
  ShoppingBagIcon, 
  CurrencyEuroIcon, 
  DocumentTextIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  EnvelopeIcon,
  FlagIcon,
  ViewColumnsIcon,
  ClipboardDocumentCheckIcon
} from '@heroicons/react/24/outline';


const menuItems = [
  { 
    name: 'Dashboard', 
    href: '/dashboard', 
    icon: HomeIcon,
    submenu: []
  },
  { 
    name: 'Inbox', 
    href: '/inbox', 
    icon: EnvelopeIcon,
    submenu: []
  },
  { 
    name: 'Products', 
    href: '/products', 
    icon: ShoppingBagIcon,
    submenu: [
      { name: 'List', href: '/users/', icon: BriefcaseIcon },
      { name: 'Admin', href: '/users/admin', icon: BriefcaseIcon },
      { name: 'Clients', href: '/users/clients', icon: UsersIcon },
      { name: 'Country Manager', href: '/users/country-manager', icon: UsersIcon },
      { name: 'Store Manager', href: '/users/store-manager', icon: UsersIcon },
      { name: 'Production Manager', href: '/users/production-manager', icon: UsersIcon },
    ]
  },
  { 
    name: 'Country', 
    href: '/country', 
    icon: FlagIcon,
    submenu: [
      { name: 'List', href: '/users/', icon: BriefcaseIcon },
      { name: 'Admin', href: '/users/admin', icon: BriefcaseIcon },
      { name: 'Clients', href: '/users/clients', icon: UsersIcon },
      { name: 'Country Manager', href: '/users/country-manager', icon: UsersIcon },
      { name: 'Store Manager', href: '/users/store-manager', icon: UsersIcon },
      { name: 'Production Manager', href: '/users/production-manager', icon: UsersIcon },
    ]
  },
  { 
    name: 'Store', 
    href: '/store', 
    icon: BuildingStorefrontIcon,
    submenu: [
      { name: 'List', href: '/users/', icon: BriefcaseIcon },
      { name: 'Admin', href: '/users/admin', icon: BriefcaseIcon },
      { name: 'Clients', href: '/users/clients', icon: UsersIcon },
      { name: 'Country Manager', href: '/users/country-manager', icon: UsersIcon },
      { name: 'Store Manager', href: '/users/store-manager', icon: UsersIcon },
      { name: 'Production Manager', href: '/users/production-manager', icon: UsersIcon },
    ]
  },
  { 
    name: 'Template', 
    href: '/template', 
    icon: ViewColumnsIcon,
    submenu: [
      { name: 'List', href: '/users/', icon: BriefcaseIcon },
      { name: 'Admin', href: '/users/admin', icon: BriefcaseIcon },
      { name: 'Clients', href: '/users/clients', icon: UsersIcon },
      { name: 'Country Manager', href: '/users/country-manager', icon: UsersIcon },
      { name: 'Store Manager', href: '/users/store-manager', icon: UsersIcon },
      { name: 'Production Manager', href: '/users/production-manager', icon: UsersIcon },
    ]
  },
  { 
    name: 'Campaign', 
    href: '/campaign', 
    icon: ClipboardDocumentCheckIcon,
    submenu: [
      { name: 'List', href: '/users/', icon: BriefcaseIcon },
      { name: 'Admin', href: '/users/admin', icon: BriefcaseIcon },
      { name: 'Clients', href: '/users/clients', icon: UsersIcon },
      { name: 'Country Manager', href: '/users/country-manager', icon: UsersIcon },
      { name: 'Store Manager', href: '/users/store-manager', icon: UsersIcon },
      { name: 'Production Manager', href: '/users/production-manager', icon: UsersIcon },
    ]
  },
  { 
    name: 'Users', 
    href: '/users', 
    icon: UserIcon,
    submenu: [
      { name: 'List', href: '/users/', icon: BriefcaseIcon },
      { name: 'Admin', href: '/users/admin', icon: BriefcaseIcon },
      { name: 'Clients', href: '/users/clients', icon: UsersIcon },
      { name: 'Country Manager', href: '/users/country-manager', icon: UsersIcon },
      { name: 'Store Manager', href: '/users/store-manager', icon: UsersIcon },
      { name: 'Production Manager', href: '/users/production-manager', icon: UsersIcon },
    ]
  },
  { 
    name: 'Campaigns', 
    href: '/campaigns', 
    icon: UsersIcon,
    submenu: []
  },
  { 
    name: 'Products', 
    href: '/products', 
    icon: ShoppingBagIcon,
    submenu: []
  },
  { 
    name: 'Production', 
    href: '/production', 
    icon: BuildingStorefrontIcon,
    submenu: []
  },
  { 
    name: 'Currencies', 
    href: '/currencies', 
    icon: CurrencyEuroIcon,
    submenu: []
  },
  { 
    name: 'Production House', 
    href: '/production-house', 
    icon: BuildingStorefrontIcon,
    submenu: []
  },
  { 
    name: 'Director', 
    href: '/director', 
    icon: PresentationChartBarIcon,
    submenu: []
  },
  { 
    name: 'Invoices', 
    href: '/invoices', 
    icon: DocumentTextIcon,
    submenu: []
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    setMounted(true);
    // Initialize expanded state for menus with submenus
    const initialExpandedState: { [key: string]: boolean } = {};
    menuItems.forEach(item => {
      if (item.submenu.length > 0) {
        initialExpandedState[item.name] = pathname.startsWith(item.href);
      }
    });
    setExpandedMenus(initialExpandedState);
  }, [pathname]);

  const isActive = (href: string) => {
    if (!mounted) return false;
    return pathname === href || pathname.startsWith(href + '/');
  };

  const toggleSubmenu = (menuName: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuName]: !prev[menuName]
    }));
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="flex items-center justify-center h-16 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">NovasAdmin</h1>
      </div>
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {menuItems.map(item => (
          <div key={item.name}>
            <div
              className={`flex items-center justify-between px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                isActive(item.href)
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => item.submenu.length > 0 ? toggleSubmenu(item.name) : null}
            >
              <div className="flex items-center">
                <item.icon className="w-5 h-5 mr-3" />
                {item.submenu.length > 0 ? (
                  <span>{item.name}</span>
                ) : (
                  <Link href={item.href} className="flex items-center">
                    <span>{item.name}</span>
                  </Link>
                )}
              </div>
              {item.submenu.length > 0 && (
                expandedMenus[item.name] ? 
                  <ChevronDownIcon className="w-4 h-4" /> : 
                  <ChevronRightIcon className="w-4 h-4" />
              )}
            </div>
            {item.submenu.length > 0 && expandedMenus[item.name] && (
              <div className="ml-8 mt-1 space-y-1">
                {item.submenu.map(subItem => (
                  <Link
                    key={subItem.name}
                    href={subItem.href}
                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive(subItem.href)
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <subItem.icon className="w-4 h-4 mr-3" />
                    {subItem.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
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
