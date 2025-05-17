'use client'

import React, { useState } from 'react';
import TableHeader from '@/elements/TableHeader';

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
}: TableBuilderProps<T>) => {
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

  // Handle bulk actions
  const handleBulkEdit = () => {
    if (selectedIds.length === 1 && onEdit) {
      const selectedItem = data.find(item => item.id === selectedIds[0]);
      if (selectedItem) {
        onEdit(selectedItem);
      }
    }
  };

  const handleBulkDelete = () => {
    if (selectedIds.length > 0 && onDelete) {
      if (window.confirm(`Are you sure you want to delete ${selectedIds.length} selected items?`)) {
        selectedIds.forEach(id => {
          const item = data.find(item => item.id === id);
          if (item) {
            onDelete(item);
          }
        });
        setSelectedIds([]);
      }
    }
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
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
            {String(value)}
          </span>
        );
      case 'link':
        return (
          <a
            href={column.linkHref?.(value) || '#'}
            className=" duration-200"
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
        onEdit={selectedIds.length > 0 ? handleBulkEdit : undefined}
        onDelete={selectedIds.length > 0 ? handleBulkDelete : undefined}
        actionButton={actionButton}
      />
      <div className="rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y">
          <thead>
            <tr>
              {selectable && (
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === data.length && data.length > 0}
                    onChange={handleSelectAll}
                    className="rounded"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {paginatedData.map((item) => (
              <tr
                key={item.id}
                onClick={() => onRowClick && onRowClick(item)}
                className={`${onRowClick ? 'cursor-pointer' : ''}  duration-200 group relative ${
                  selectedIds.includes(item.id) ? 'bg-opacity-50' : ''
                }`}
              >
                {selectable && (
                  <td className="px-6 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(item.id)}
                      onChange={() => handleSelect(item.id)}
                      className="rounded"
                    />
                  </td>
                )}
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-6 py-4 whitespace-nowrap text-sm  duration-200"
                  >
                    {formatCellValue(column, item[column.key as keyof T])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center p-4 border-t">
          <span className="text-sm">
            Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
            <span className="font-medium">
              {Math.min(startIndex + itemsPerPage, filteredData.length)}
            </span>{' '}
            of <span className="font-medium">{filteredData.length}</span> results
          </span>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 rounded border  duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="px-3 py-1 rounded border  duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
