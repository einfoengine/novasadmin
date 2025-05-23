'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/app/providers';
import { 
  HomeIcon, 
  UserIcon, 
  BriefcaseIcon, 
  BuildingStorefrontIcon, 
  ShoppingBagIcon, 
  CurrencyEuroIcon, 
  ChevronDownIcon,
  ChevronRightIcon,
  EnvelopeIcon,
  FlagIcon,
  ViewColumnsIcon,
  ClipboardDocumentCheckIcon,
  PaperAirplaneIcon,
  BuildingOffice2Icon,
  DocumentIcon,
  PrinterIcon,
  RectangleGroupIcon,
  PuzzlePieceIcon
} from '@heroicons/react/24/outline';

const menuItems = [
  { 
    name: 'Dashboard', 
    href: '/dashboard', 
    icon: HomeIcon,
    submenu: []
  },
  { 
    name: 'Messages', 
    // href: '/messages', 
    icon: EnvelopeIcon,
    submenu: [
      { name: 'All', href: '/messages', icon: ShoppingBagIcon },
      { name: 'Inbox', href: '/messages/inbox', icon: ViewColumnsIcon },
      { name: 'Sent', href: '/messages/sent', icon: ClipboardDocumentCheckIcon },
    ]
  },
  { 
    name: 'Products', 
    href: '/products', 
    icon: ShoppingBagIcon,
    submenu: []
  },
  { 
    name: 'Countries', 
    href: '/countries', 
    icon: FlagIcon,
    submenu: [
    ]
  },
  { 
    name: 'Stores', 
    href: '/stores',
    icon: BuildingStorefrontIcon,
    submenu: []
  },
  { 
    name: 'Productions', 
    href: '/productions', 
    icon: BuildingOffice2Icon,
    submenu: [
      { name: 'Materials', href: '/productions/materials', icon: DocumentIcon },
      { name: 'Printers', href: '/productions/printers', icon: PrinterIcon },
      { name: 'Finishers', href: '/productions/finishers', icon: RectangleGroupIcon},
      { name: 'Others', href: '/productions/others', icon: PuzzlePieceIcon },
    ]
  },
  { 
    name: 'Templates', 
    href: '/templates', 
    icon: ViewColumnsIcon,
    submenu: []
  },
  { 
    name: 'Campaign', 
    href: '/campaigns', 
    icon: ClipboardDocumentCheckIcon,
    submenu: []
  },
  { 
    name: 'Currencies', 
    href: '/currencies', 
    icon: CurrencyEuroIcon,
    submenu: []
  },
  { 
    name: 'Users', 
    href: '/users', 
    icon: UserIcon,
    submenu: []
  },
  { 
    name: 'Invoice', 
    href: '/invoice', 
    icon: PaperAirplaneIcon,
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
