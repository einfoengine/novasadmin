'use client';

import React, { useState } from 'react';
import { MagnifyingGlassIcon, PencilIcon, ChevronDownIcon, ChevronRightIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
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
  onEdit?: (item: Item) => void;
  onDelete?: (ids: string[]) => void;
  actionButton?: {
    label: string;
    href: string;
  };
}

export default function TableGroups({
  data,
  columns,
  onEdit,
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

  // Filter data based on search term
  const filteredGroups = data.map(group => ({
    ...group,
    items: group.items.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  })).filter(group => group.items.length > 0);

  // Handle selection
  const handleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (items: Item[]) => {
    setSelectedIds((prev) =>
      prev.length === items.length ? [] : items.map((item) => item.id)
    );
  };

  const handleGroupSelect = (groupId: string, items: Item[]) => {
    setSelectedGroups((prev) => {
      if (prev.includes(groupId)) {
        // Remove group selection and all its items
        setSelectedIds((ids) => ids.filter(id => !items.find(item => item.id === id)));
        return prev.filter(id => id !== groupId);
      } else {
        // Add group selection and all its items
        setSelectedIds((ids) => [...ids, ...items.map(item => item.id)]);
        return [...prev, groupId];
      }
    });
  };

  const handleSelectAllGroups = () => {
    const allItems = filteredGroups.flatMap(group => group.items);
    if (selectedGroups.length === filteredGroups.length) {
      setSelectedGroups([]);
      setSelectedIds([]);
    } else {
      setSelectedGroups(filteredGroups.map(group => group.id));
      setSelectedIds(allItems.map(item => item.id));
    }
  };

  const handleDeleteSelected = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedIds.length} selected items?`)) {
      onDelete?.(selectedIds);
      setSelectedIds([]);
      setSelectedGroups([]);
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
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold text-gray-900">Products</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedGroups.length === filteredGroups.length && filteredGroups.length > 0}
              onChange={handleSelectAllGroups}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-sm font-medium text-gray-700">Select All</span>
          </div>
          {selectedIds.length > 0 && onDelete && (
            <button onClick={handleDeleteSelected} title={`Delete ${selectedIds.length} selected items`}>
              <TrashIcon className="h-5 w-5" />
            </button>
          )}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {actionButton && (
            <Link href={actionButton.href}>
              {actionButton.label}
            </Link>
          )}
        </div>
      </div>

      {/* Tables */}
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
                  <p className="mt-1 text-sm text-gray-500">{group.description}</p>
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
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <input
                        type="checkbox"
                        checked={selectedIds.length === group.items.length && group.items.length > 0}
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
                    {onEdit && (
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    )}
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
                          className="px-4 py-4 whitespace-nowrap text-sm text-gray-900"
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
                      {onEdit && (
                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button onClick={() => onEdit(item)}>
                            <PencilIcon className="h-5 w-5" />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}

      {/* Image Popup */}
      {hoveredImage && (
        <div
          className="fixed z-50 bg-white rounded-lg shadow-xl border border-gray-200 p-2"
          style={{
            width: '300px',
            height: '300px',
            left: `${popupPosition.x + 60}px`,
            top: `${popupPosition.y - 150}px`,
          }}
        >
          <div className="w-full h-full rounded-md overflow-hidden">
            <img
              src={hoveredImage.src}
              alt={hoveredImage.alt}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
} 