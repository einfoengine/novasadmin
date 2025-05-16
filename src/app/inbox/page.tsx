"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { EnvelopeIcon, StarIcon, TrashIcon, ArchiveBoxIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

interface Message {
  id: number;
  sender: string;
  subject: string;
  preview: string;
  date: string;
  unread: boolean;
  starred: boolean;
}

const mockMessages: Message[] = [
  {
    id: 1,
    sender: "Alice Johnson",
    subject: "Welcome to NovasAdmin!",
    preview: "Hi there, welcome to the platform. Let us know if you need anything!",
    date: "2025-05-16",
    unread: true,
    starred: false,
  },
  {
    id: 2,
    sender: "Support Team",
    subject: "Your account has been updated",
    preview: "Your profile information was successfully updated.",
    date: "2025-05-15",
    unread: false,
    starred: true,
  },
  {
    id: 3,
    sender: "Marketing",
    subject: "New campaign features",
    preview: "Check out the latest updates to campaign management.",
    date: "2025-05-14",
    unread: true,
    starred: false,
  },
];

export default function InboxPage() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [showRead, setShowRead] = useState(true);
  const router = useRouter();

  // Filtered and searched messages
  const filteredMessages = messages.filter((msg) => {
    const matchesSearch =
      msg.sender.toLowerCase().includes(search.toLowerCase()) ||
      msg.subject.toLowerCase().includes(search.toLowerCase()) ||
      msg.preview.toLowerCase().includes(search.toLowerCase());
    const matchesRead = showRead ? true : msg.unread;
    return matchesSearch && matchesRead;
  });

  const handleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleDelete = () => {
    setMessages((msgs) => msgs.filter((msg) => !selectedIds.includes(msg.id)));
    setSelectedIds([]);
  };


  const handleArchive = () => {
    setMessages((msgs) => msgs.filter((msg) => !selectedIds.includes(msg.id)));
    setSelectedIds([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <h1 className="text-2xl font-bold flex gap-2 shrink-0">
              <EnvelopeIcon className="h-7 w-7 text-black" /> Messages
            </h1>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search messages..."
              className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-sm"
            />
            <label className="flex items-center gap-2 text-sm cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={showRead}
                onChange={() => setShowRead((v) => !v)}
                className="form-checkbox"
              />
              Show read messages
            </label>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {selectedIds.length > 0 && (
              <>
                <button
                  onClick={handleDelete}
                  className="p-2 rounded hover:bg-red-100 text-red-600"
                  aria-label="Delete"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={handleArchive}
                  className="p-2 rounded hover:bg-gray-200 text-gray-600"
                  aria-label="Archive"
                >
                  <ArchiveBoxIcon className="h-5 w-5" />
                </button>
              </>
            )}
            <button
              className="p-2 rounded bg-black text-white hover:bg-gray-800 flex items-center gap-1 ml-2"
              aria-label="Compose New"
              onClick={() => router.push('/inbox/compose')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487a2.25 2.25 0 1 1 3.182 3.182L7.5 20.213l-4.182 1 1-4.182 12.544-12.544z" />
              </svg>
              <span className="hidden sm:inline">Compose New</span>
            </button>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === filteredMessages.length && filteredMessages.length > 0}
                    onChange={(e) =>
                      setSelectedIds(e.target.checked ? filteredMessages.map((m) => m.id) : [])
                    }
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Sender
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Preview
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredMessages.map((msg) => (
                <tr
                  key={msg.id}
                  className={`hover:bg-gray-50 cursor-pointer ${
                    msg.unread ? "font-bold bg-gray-100" : ""
                  }`}
                >
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(msg.id)}
                      onChange={() => handleSelect(msg.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="text-gray-900">{msg.sender}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className="text-blue-600 hover:underline cursor-pointer"
                      onClick={() => router.push(`/inbox/${msg.id}`)}
                    >
                      {msg.subject}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-gray-500">
                    <span
                      className="hover:underline cursor-pointer"
                      onClick={() => router.push(`/inbox/${msg.id}`)}
                    >
                      {msg.preview}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs text-gray-400">
                    {msg.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredMessages.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No messages.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
