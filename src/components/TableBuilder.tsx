'use client'

import React, { useState } from 'react';
import TableHeader from '@/elements/TableHeader';
import { useTheme } from '@/app/providers';

interface Column {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'currency' | 'date' | 'status' | 'link' | 'custom';
  format?: (value: unknown) => string;
  className?: string;
  linkHref?: (value: unknown) => string;
}

interface TableBuilderProps<T extends { id: string }> {
  data: T[];
  columns: Column[];
  title: string;
  icon?: React.ReactNode;
  searchable?: boolean;
  selectable?: boolean;
  onRowClick?: (item: T) => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  actionButton?: {
    label: string;
    href: string;
  };
  itemsPerPage?: number;
  className?: string;
}

const TableBuilder = <T extends { id: string }>({
  data,
  columns,
  title,
  icon,
  selectable = false,
  onRowClick,
  onEdit,
  onDelete,
  actionButton,
  itemsPerPage: initialItemsPerPage = 10,
  className = '',
}: TableBuilderProps<T>) => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  // Filter data based on search term
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // Handle selection
  const handleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedIds((prev) =>
      prev.length === paginatedData.length ? [] : paginatedData.map((item) => item.id)
    );
  };

  // Format cell value based on column type
  const formatCellValue = (column: Column, value: unknown) => {
    if (column.format) {
      return column.format(value);
    }

    switch (column.type) {
      case 'currency':
        return `$${Number(value).toFixed(2)}`;
      case 'number':
        return Number(value).toLocaleString();
      case 'date':
        return new Date(value as string).toLocaleDateString();
      case 'status':
        return (
          <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
              value === 'active' || value === 'success'
                ? theme === 'dark'
                  ? 'bg-green-900 text-green-300'
                  : 'bg-green-100 text-green-800'
                : value === 'pending' || value === 'warning'
                ? theme === 'dark'
                  ? 'bg-yellow-900 text-yellow-300'
                  : 'bg-yellow-100 text-yellow-800'
                : theme === 'dark'
                ? 'bg-red-900 text-red-300'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {String(value)}
          </span>
        );
      case 'link':
        return (
          <a
            href={column.linkHref?.(value) || '#'}
            className={`${
              theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-900'
            } group-hover:text-indigo-600 transition-colors duration-200`}
          >
            {String(value)}
          </a>
        );
      default:
        return String(value);
    }
  };

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow overflow-x-auto ${className}`}>
      <TableHeader
        icon={icon}
        title={title}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={setItemsPerPage}
        totalItems={filteredData.length}
        selectedCount={selectedIds.length}
        actionButton={actionButton}
      />

      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <tr>
            {selectable && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <input
                  type="checkbox"
                  checked={selectedIds.length === paginatedData.length && paginatedData.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.key}
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider ${column.className || ''}`}
              >
                {column.label}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} divide-y divide-gray-200 dark:divide-gray-700`}>
          {paginatedData.map((item) => (
            <tr
              key={item.id}
              onClick={() => onRowClick?.(item)}
              className={`transition-colors duration-200 ${
                onRowClick ? 'cursor-pointer' : ''
              } ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} group`}
            >
              {selectable && (
                <td className="px-6 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(item.id)}
                    onChange={() => handleSelect(item.id)}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </td>
              )}
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white ${
                    column.type === 'link' ? '' : 'group-hover:text-indigo-600'
                  } transition-colors duration-200 ${column.className || ''}`}
                >
                  {formatCellValue(column, item[column.key as keyof T])}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center space-x-3">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(item)}
                        className="text-gray-400 hover:text-indigo-600 transition-colors duration-200"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(item)}
                        className="text-gray-400 hover:text-red-600 transition-colors duration-200"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center p-4 border-t border-gray-200 dark:border-gray-700">
        <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
          <span className="font-medium">
            {Math.min(startIndex + itemsPerPage, filteredData.length)}
          </span>{' '}
          of <span className="font-medium">{filteredData.length}</span> results
        </span>
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 rounded ${
              theme === 'dark'
                ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } disabled:opacity-50`}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className={`px-3 py-1 rounded ${
              theme === 'dark'
                ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } disabled:opacity-50`}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableBuilder; 
