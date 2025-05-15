"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
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
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userPref = localStorage.getItem("theme");
      const systemPref = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (userPref === "dark" || (!userPref && systemPref)) {
        setDarkMode(true);
        document.documentElement.classList.add("dark");
      } else {
        setDarkMode(false);
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  const handleStar = (id: number) => {
    setMessages((msgs) =>
      msgs.map((msg) =>
        msg.id === id ? { ...msg, starred: !msg.starred } : msg
      )
    );
  };

  const handleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleDelete = () => {
    setMessages((msgs) => msgs.filter((msg) => !selectedIds.includes(msg.id)));
    setSelectedIds([]);
  };

  const handleMarkRead = () => {
    setMessages((msgs) =>
      msgs.map((msg) =>
        selectedIds.includes(msg.id) ? { ...msg, unread: false } : msg
      )
    );
    setSelectedIds([]);
  };

  const handleArchive = () => {
    setMessages((msgs) => msgs.filter((msg) => !selectedIds.includes(msg.id)));
    setSelectedIds([]);
  };

  const router = useRouter();

  return (
    <div className={darkMode ? "min-h-screen bg-gray-900 text-white" : "min-h-screen bg-gray-50 text-gray-900"}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center-top gap-2">
            <h1 className="text-2xl font-bold flex gap-2">
              <EnvelopeIcon className="h-7 w-7 text-black" /> Inbox
            </h1>
          </div>
          <div className="flex items-center gap-2">
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
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === messages.length && messages.length > 0}
                    onChange={(e) =>
                      setSelectedIds(e.target.checked ? messages.map((m) => m.id) : [])
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
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {messages.map((msg) => (
                <tr
                  key={msg.id}
                  className={`hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
                    msg.unread ? "font-bold bg-gray-100 dark:bg-gray-900" : ""
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
                    <span className="text-gray-900 dark:text-gray-100">{msg.sender}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                      onClick={() => router.push(`/inbox/${msg.id}`)}
                    >
                      {msg.subject}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-gray-500 dark:text-gray-300">
                    <span
                      className="hover:underline cursor-pointer"
                      onClick={() => router.push(`/inbox/${msg.id}`)}
                    >
                      {msg.preview}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs text-gray-400 dark:text-gray-400">
                    {msg.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {messages.length === 0 && (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              No messages.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
