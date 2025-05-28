'use client';

import React, { useState } from 'react';
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  TrashIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Item {
  id: string;
  name: string;
  image: string;
  size: number[];
  materials: string[];
  'printer-ids': string[];
  'finisher-ids': string[];
  'others-ids': string[];
  description: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  items: Item[];
}

interface TableGroupsProps {
  data: Product[];
  columns: {
    key: string;
    label: string;
    type?: string;
    render?: (item: Item) => React.ReactNode;
  }[];
  onDelete?: (ids: string[]) => void;
  actionButton?: {
    label: string;
    href: string;
  };
}

export default function TableGroups({
  data,
  columns,
  onDelete,
  actionButton,
}: TableGroupsProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [expandedGroups, setExpandedGroups] = useState<string[]>(data.map(group => group.id));
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [hoveredImage, setHoveredImage] = useState<{ src: string; alt: string } | null>(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  const filteredGroups = data.map(group => ({
    ...group,
    items: group.items.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  })).filter(group => group.items.length > 0);

  const handleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (items: Item[]) => {
    const itemIds = items.map((item) => item.id);
    const allSelected = itemIds.every((id) => selectedIds.includes(id));
    setSelectedIds(
      allSelected
        ? selectedIds.filter((id) => !itemIds.includes(id))
        : [...selectedIds, ...itemIds.filter(id => !selectedIds.includes(id))]
    );
  };

  const handleGroupSelect = (groupId: string, items: Item[]) => {
    setSelectedGroups((prev) => {
      if (prev.includes(groupId)) {
        setSelectedIds((ids) => ids.filter((id) => !items.some((item) => item.id === id)));
        return prev.filter((id) => id !== groupId);
      } else {
        setSelectedIds((ids) => Array.from(new Set([...ids, ...items.map((item) => item.id)])));
        return [...prev, groupId];
      }
    });
  };

  const handleSelectAllGroups = () => {
    const allItems = filteredGroups.flatMap(group => group.items);
    const allItemIds = allItems.map(item => item.id);
    const allSelected = allItemIds.every(id => selectedIds.includes(id));
    setSelectedGroups(allSelected ? [] : filteredGroups.map(group => group.id));
    setSelectedIds(allSelected ? [] : allItemIds);
  };

  const handleDeleteSelected = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedIds.length} selected items?`)) {
      onDelete?.(selectedIds);
      setSelectedIds([]);
      setSelectedGroups([]);
    }
  };

  const handleEditGroup = () => {
    const group = data.find(group => selectedGroups.includes(group.id));
    if (group && group.items.length > 0) {
      router.push(`/products/${group.items[0].id}/edit`);
    }
  };

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) =>
      prev.includes(groupId) ? prev.filter(id => id !== groupId) : [...prev, groupId]
    );
  };

  const handleImageHover = (e: React.MouseEvent<HTMLDivElement>, src: string, alt: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPopupPosition({
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY
    });
    setHoveredImage({ src, alt });
  };

  const handleImageLeave = () => {
    setHoveredImage(null);
  };

  const handleProductClick = (group: Product) => {
    router.push(`/products/${group.id}`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Products</h1>
        <div className="flex items-center gap-2">
          {selectedGroups.length === 1 && (
            <button onClick={handleEditGroup} title="Edit group">
              <PencilIcon className="h-5 w-5" />
            </button>
          )}
          {selectedIds.length > 0 && onDelete && (
            <button onClick={handleDeleteSelected} title="Delete selected">
              <TrashIcon className="h-5 w-5" />
            </button>
          )}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedGroups.length === filteredGroups.length && filteredGroups.length > 0}
              onChange={handleSelectAllGroups}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-sm font-medium text-gray-700">Select All</span>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-white sm:text-sm"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {actionButton && <Link href={actionButton.href}>{actionButton.label}</Link>}
        </div>
      </div>

      {/* Grouped Table */}
      {filteredGroups.map((group) => (
        <div key={group.id} className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedGroups.includes(group.id)}
                  onChange={() => handleGroupSelect(group.id, group.items)}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <div>
                  <h2 
                    className="text-lg font-medium text-gray-900 cursor-pointer hover:text-primary"
                    onClick={() => handleProductClick(group)}
                  >
                    {group.name}
                  </h2>
                  <p className="text-sm text-gray-500">{group.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-lg font-medium text-gray-900">${group.price.toFixed(2)}</span>
                <button onClick={() => toggleGroup(group.id)}>
                  {expandedGroups.includes(group.id) ? (
                    <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronRightIcon className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
          </div>
          {expandedGroups.includes(group.id) && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={group.items.every(item => selectedIds.includes(item.id))}
                        onChange={() => handleSelectAll(group.items)}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                    </th>
                    {columns.map((column) => (
                      <th
                        key={column.key}
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {group.items.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(item.id)}
                          onChange={() => handleSelect(item.id)}
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                        />
                      </td>
                      {columns.map((column) => (
                        <td
                          key={column.key}
                          className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap"
                        >
                          {column.render ? (
                            column.render(item)
                          ) : column.key === 'image' ? (
                            <div 
                              className="w-12 h-12 rounded-md overflow-hidden cursor-pointer"
                              onMouseEnter={(e) => handleImageHover(e, item.image, item.name)}
                              onMouseLeave={handleImageLeave}
                            >
                              <img
                                src={item[column.key]}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            item[column.key as keyof Item]
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}

      {/* Image Preview */}
      {hoveredImage && (
        <div
          className="fixed z-50 bg-white rounded-lg shadow-xl border p-2"
          style={{
            width: '300px',
            height: '300px',
            left: `${popupPosition.x + 60}px`,
            top: `${popupPosition.y - 150}px`,
          }}
        >
          <img
            src={hoveredImage.src}
            alt={hoveredImage.alt}
            className="w-full h-full object-contain rounded-md"
          />
        </div>
      )}
    </div>
  );
}
