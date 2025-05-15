"use client";

import { useRouter } from "next/navigation";
import { EnvelopeIcon, StarIcon } from "@heroicons/react/24/outline";

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

export default function MessageDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const message = mockMessages.find((msg) => msg.id === Number(params.id));

  if (!message) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Message not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white shadow rounded-lg p-8">
        <button
          onClick={() => router.back()}
          className="mb-4 text-blue-600 hover:underline text-sm"
        >
          &larr; Back to Inbox
        </button>
        <div className="flex items-center gap-2 mb-2">
          <EnvelopeIcon className="h-6 w-6 text-gray-700" />
          <span className="font-semibold text-lg text-gray-900">{message.subject}</span>
          {message.unread && <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded">Unread</span>}
        </div>
        <div className="mb-4 text-gray-700">
          <span className="font-medium">From:</span> {message.sender}
        </div>
        <div className="mb-6 text-gray-700">
          {message.preview}
        </div>
        <div className="flex gap-2">
          <StarIcon className={`h-5 w-5 ${message.starred ? "text-yellow-400" : "text-gray-400"}`} fill={message.starred ? "#facc15" : "none"} />
          <span className="text-xs text-gray-400">{message.date}</span>
        </div>
      </div>
    </div>
  );
}
