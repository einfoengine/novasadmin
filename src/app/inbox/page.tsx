"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  EnvelopeIcon, 
  EnvelopeOpenIcon, 
  PaperAirplaneIcon,
  MagnifyingGlassIcon,
  ArchiveBoxIcon,
  TrashIcon
} from "@heroicons/react/24/outline";
import StatsCard from "@/components/StatsCard";
import { useRouter } from "next/navigation";

interface Message {
  id: string;
  from: string;
  subject: string;
  content: string;
  date: string;
  read: boolean;
  priority: "high" | "medium" | "low";
}

export default function InboxPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('/messages.json');
        const data = await response.json();
        setMessages(Array.isArray(data) ? data : data.messages || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setMessages([]);
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  // Reset to first page when search term or items per page changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, itemsPerPage]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading messages...</div>
        </div>
      </div>
    );
  }

  const filteredMessages = messages.filter(message =>
    message.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMessages = filteredMessages.slice(startIndex, startIndex + itemsPerPage);

  const handleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedIds(prev =>
      prev.length === paginatedMessages.length ? [] : paginatedMessages.map(m => m.id)
    );
  };

  const handleDelete = () => {
    setMessages(prev => prev.filter(msg => !selectedIds.includes(msg.id)));
    setSelectedIds([]);
  };

  const handleArchive = () => {
    // In a real app, this would move messages to an archive
    setMessages(prev => prev.filter(msg => !selectedIds.includes(msg.id)));
    setSelectedIds([]);
  };

  const unreadCount = messages.filter(m => !m.read).length;
  const highPriorityCount = messages.filter(m => m.priority === "high").length;
  const sentCount = messages.filter(m => m.from === "me").length;

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      // Calculate start and end of visible pages
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust if at the start
      if (currentPage <= 2) {
        end = 4;
      }
      // Adjust if at the end
      if (currentPage >= totalPages - 1) {
        start = totalPages - 3;
      }
      
      // Add ellipsis if needed
      if (start > 2) {
        pages.push('...');
      }
      
      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Add ellipsis if needed
      if (end < totalPages - 1) {
        pages.push('...');
      }
      
      // Always show last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  const handleMessageClick = (messageId: string) => {
    router.push(`/inbox/${messageId}`);
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatsCard
          title="Unread Messages"
          value={unreadCount.toString()}
          icon={<EnvelopeIcon className="w-6 h-6" />}
          iconColor="#6366f1"
          iconBg="#eef2ff"
          percentage=""
          percentageColor="#6b7280"
          trend="+5 new"
        />
        <StatsCard
          title="High Priority"
          value={highPriorityCount.toString()}
          icon={<EnvelopeOpenIcon className="w-6 h-6" />}
          iconColor="#f59e42"
          iconBg="#fff7ed"
          percentage=""
          percentageColor="#6b7280"
          trend="2 urgent"
        />
        <StatsCard
          title="Sent Messages"
          value={sentCount.toString()}
          icon={<PaperAirplaneIcon className="w-6 h-6" />}
          iconColor="#10b981"
          iconBg="#ecfdf5"
          percentage=""
          percentageColor="#6b7280"
          trend="+12%"
        />
      </div>

      <div className="nt-inbox-table bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="nt-table-top flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <EnvelopeIcon className="h-6 w-6 text-gray-900" />
              <h1 className="text-2xl font-bold text-gray-900">Inbox</h1>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                }}
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value={5}>5 per page</option>
                <option value={10}>10 per page</option>
                <option value={50}>50 per page</option>
                <option value={100}>100 per page</option>
                <option value={filteredMessages.length}>All</option>
              </select>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
              {selectedIds.length > 0 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleArchive}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                    title="Archive"
                  >
                    <ArchiveBoxIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleDelete}
                    className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-md"
                    title="Delete"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              )}
              <Link
                href="/inbox/compose"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Compose
              </Link>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === paginatedMessages.length && paginatedMessages.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedMessages.map((message) => (
                <tr 
                  key={message.id} 
                  className={`${
                    !message.read ? "bg-gray-50" : ""
                  } cursor-pointer transition-colors duration-200 hover:bg-gray-50 group`}
                  onClick={() => handleMessageClick(message.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(message.id)}
                      onChange={() => handleSelect(message.id)}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
                    {message.from}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex flex-col">
                      <span className="font-medium group-hover:text-indigo-600 transition-colors duration-200">{message.subject}</span>
                      <span className="text-gray-500 truncate max-w-md group-hover:text-gray-700 transition-colors duration-200">{message.content}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-200">
                    {message.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full transition-colors duration-200 ${
                      message.priority === "high" 
                        ? "bg-red-100 text-red-800 group-hover:bg-red-200" 
                        : message.priority === "medium"
                        ? "bg-yellow-100 text-yellow-800 group-hover:bg-yellow-200"
                        : "bg-green-100 text-green-800 group-hover:bg-green-200"
                    }`}>
                      {message.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-200">
                    {message.read ? "Read" : "Unread"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
              <span className="font-medium">
                {Math.min(startIndex + itemsPerPage, filteredMessages.length)}
              </span>{" "}
              of <span className="font-medium">{filteredMessages.length}</span> results
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {getPageNumbers().map((page, index) => (
                page === '...' ? (
                  <span key={`ellipsis-${index}`} className="px-3 py-1 text-gray-500">...</span>
                ) : (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(Number(page))}
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                      currentPage === page
                        ? "bg-indigo-600 text-white"
                        : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                )
              ))}
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
