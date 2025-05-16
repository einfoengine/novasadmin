'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/app/providers';
import { 
  HomeIcon, 
  UserIcon, 
  BriefcaseIcon, 
  UsersIcon, 
  BuildingStorefrontIcon, 
  ShoppingBagIcon, 
  CurrencyEuroIcon, 
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
    name: 'Products', 
    href: '/products', 
    icon: ShoppingBagIcon,
    submenu: [
      { name: 'All Products', href: '/products', icon: ShoppingBagIcon },
      { name: 'Categories', href: '/products/categories', icon: ViewColumnsIcon },
      { name: 'Inventory', href: '/products/inventory', icon: ClipboardDocumentCheckIcon },
    ]
  },
  { 
    name: 'Messages', 
    href: '/messages', 
    icon: EnvelopeIcon,
    submenu: []
  },
  { 
    name: 'Countries', 
    href: '/countries', 
    icon: FlagIcon,
    submenu: [
      { name: 'List', href: '/countries', icon: BriefcaseIcon },
    ]
  },
  { 
    name: 'Store', 
    href: '/store', 
    icon: BuildingStorefrontIcon,
    submenu: [
      { name: 'List', href: '/store', icon: BriefcaseIcon },
      { name: 'Admin', href: '/store/admin', icon: BriefcaseIcon },
      { name: 'Clients', href: '/store/clients', icon: UsersIcon },
      { name: 'Country Manager', href: '/store/country-manager', icon: UsersIcon },
      { name: 'Store Manager', href: '/store/store-manager', icon: UsersIcon },
      { name: 'Production Manager', href: '/store/production-manager', icon: UsersIcon },
    ]
  },
  { 
    name: 'Template', 
    href: '/template', 
    icon: ViewColumnsIcon,
    submenu: [
      { name: 'List', href: '/template', icon: BriefcaseIcon },
      { name: 'Admin', href: '/template/admin', icon: BriefcaseIcon },
      { name: 'Clients', href: '/template/clients', icon: UsersIcon },
      { name: 'Country Manager', href: '/template/country-manager', icon: UsersIcon },
      { name: 'Store Manager', href: '/template/store-manager', icon: UsersIcon },
      { name: 'Production Manager', href: '/template/production-manager', icon: UsersIcon },
    ]
  },
  { 
    name: 'Campaign', 
    href: '/campaigns', 
    icon: ClipboardDocumentCheckIcon,
    submenu: [
      { name: 'All Campaigns', href: '/campaigns', icon: ClipboardDocumentCheckIcon },
      { name: 'Add Campaign', href: '/campaigns/add-campaign', icon: BriefcaseIcon },
      { name: 'Campaign Summary', href: '/campaigns/campaign-summary', icon: BriefcaseIcon },
      { name: 'Store Brief', href: '/campaigns/store-brief', icon: BriefcaseIcon },
    ]
  },
  { 
    name: 'Users', 
    href: '/users', 
    icon: UserIcon,
    submenu: [
      { name: 'List', href: '/users', icon: BriefcaseIcon },
      { name: 'Admin', href: '/users/admin', icon: BriefcaseIcon },
      { name: 'Clients', href: '/users/clients', icon: UsersIcon },
      { name: 'Country Manager', href: '/users/country-manager', icon: UsersIcon },
      { name: 'Store Manager', href: '/users/store-manager', icon: UsersIcon },
      { name: 'Production Manager', href: '/users/production-manager', icon: UsersIcon },
    ]
  },
  { 
    name: 'Currencies', 
    href: '/currencies', 
    icon: CurrencyEuroIcon,
    submenu: []
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<{ [key: string]: boolean }>({});
  const { theme } = useTheme();

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
    <aside className={`w-64 ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-r flex flex-col h-full`}>
      <div className={`flex items-center justify-center h-16 ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'} border-b`}>
        <h1 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>NovasAdmin</h1>
      </div>
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {menuItems.map(item => (
          <div key={item.name}>
            <div
              className={`flex items-center justify-between px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                isActive(item.href)
                  ? theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'
                  : theme === 'dark' ? 'text-gray-300 hover:bg-gray-800 hover:text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
              onClick={() => item.submenu.length > 0 ? toggleSubmenu(item.name) : null}
            >
              <div className="flex items-center">
                <item.icon className={`w-5 h-5 mr-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} />
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
                  <ChevronDownIcon className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} /> : 
                  <ChevronRightIcon className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} />
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
                        ? theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'
                        : theme === 'dark' ? 'text-gray-300 hover:bg-gray-800 hover:text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <subItem.icon className={`w-4 h-4 mr-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} />
                    {subItem.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
      <div className={`p-4 ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'} border-t`}>
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} flex items-center justify-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            U
          </div>
          <div className="ml-3">
            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>User Name</p>
            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>user@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
