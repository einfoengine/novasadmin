import { ReactNode } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ArchiveBoxIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface TableHeaderProps {
  icon: ReactNode;
  title: string;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (value: number) => void;
  totalItems: number;
  selectedCount?: number;
  onArchive?: () => void;
  onDelete?: () => void;
  actionButton?: {
    label: string;
    href: string;
    onClick?: () => void;
  };
}

export default function TableHeader({
  icon,
  title,
  searchTerm,
  onSearchChange,
  itemsPerPage,
  onItemsPerPageChange,
  totalItems,
  selectedCount = 0,
  onArchive,
  onDelete,
  actionButton
}: TableHeaderProps) {
  return (
    <div className="p-6 border-b border-gray-200">
      <div className="nt-table-top flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          {icon}
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={itemsPerPage}
            onChange={(e) => {
              onItemsPerPageChange(Number(e.target.value));
            }}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={50}>50 per page</option>
            <option value={100}>100 per page</option>
            <option value={totalItems}>All</option>
          </select>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          {selectedCount > 0 && (
            <div className="flex items-center gap-2">
              {onArchive && (
                <button
                  onClick={onArchive}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-200"
                  title="Archive"
                >
                  <ArchiveBoxIcon className="h-5 w-5" />
                </button>
              )}
              {onDelete && (
                <button
                  onClick={onDelete}
                  className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-md transition-colors duration-200"
                  title="Delete"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              )}
            </div>
          )}
          {actionButton && (
            <Link
              href={actionButton.href}
              onClick={actionButton.onClick}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              {actionButton.label}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
} 