'use client'

import React, { useState } from 'react';
import TableHeader from '@/elements/TableHeader';
import { useTheme } from '@/app/providers';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

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
                ? 'bg-green-900 text-green-300'
                : value === 'pending' || value === 'warning'
                ? 'bg-yellow-900 text-yellow-300'
                : 'bg-red-900 text-red-300'
            }`}
          >
            {String(value)}
          </span>
        );
      case 'link':
        return (
          <a
            href={column.linkHref?.(value) || '#'}
            className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
          >
            {String(value)}
          </a>
        );
      default:
        return String(value);
    }
  };

  return (
    <div id="nt-table-builder">
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
      <div className="bg-gray-800 rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-900">
            <tr>
              {selectable && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === data.length && data.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-600 text-indigo-600 focus:ring-indigo-500 bg-gray-700"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {paginatedData.map((item) => (
              <tr
                key={item.id}
                onClick={() => onRowClick && onRowClick(item)}
                className={`${onRowClick ? 'cursor-pointer' : ''} hover:bg-gray-700 transition-colors duration-200 group`}
              >
                {selectable && (
                  <td className="px-6 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(item.id)}
                      onChange={() => handleSelect(item.id)}
                      className="rounded border-gray-600 text-indigo-600 focus:ring-indigo-500 bg-gray-700"
                    />
                  </td>
                )}
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 group-hover:text-indigo-400 transition-colors duration-200"
                  >
                    {formatCellValue(column, item[column.key as keyof T])}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center space-x-3">
                      {onEdit && (
                        <button
                          onClick={() => onEdit(item)}
                          className="text-gray-400 hover:text-indigo-400 transition-colors duration-200"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(item)}
                          className="text-gray-400 hover:text-red-400 transition-colors duration-200"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center p-4 border-t border-gray-700 bg-gray-900">
          <span className="text-sm text-gray-400">
            Showing <span className="font-medium text-gray-300">{startIndex + 1}</span> to{' '}
            <span className="font-medium text-gray-300">
              {Math.min(startIndex + itemsPerPage, filteredData.length)}
            </span>{' '}
            of <span className="font-medium text-gray-300">{filteredData.length}</span> results
          </span>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 rounded bg-gray-700 text-gray-200 hover:bg-gray-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="px-3 py-1 rounded bg-gray-700 text-gray-200 hover:bg-gray-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableBuilder; 
