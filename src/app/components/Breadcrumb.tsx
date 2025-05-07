'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';

export default function Breadcrumb() {
  const pathname = usePathname();

  const generateBreadcrumbs = () => {
    const paths = pathname.split('/').filter(Boolean);
    const breadcrumbs = paths.map((path, index) => {
      const href = `/${paths.slice(0, index + 1).join('/')}`;
      const label = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
      return { href, label };
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <Link
            href="/dashboard"
            className="text-gray-500 hover:text-gray-700"
          >
            <HomeIcon className="h-5 w-5" />
          </Link>
        </li>
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.href} className="flex items-center">
            <ChevronRightIcon className="h-4 w-4 text-gray-400" />
            <Link
              href={breadcrumb.href}
              className={`ml-2 text-sm font-medium ${
                index === breadcrumbs.length - 1
                  ? 'text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {breadcrumb.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
} 