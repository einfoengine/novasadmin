"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeftIcon, 
  TrashIcon, 
  ArchiveBoxIcon,
  ArrowUturnLeftIcon
} from "@heroicons/react/24/outline";

interface Message {
  id: string;
  from: string;
  subject: string;
  content: string;
  date: string;
  read: boolean;
  priority: "high" | "medium" | "low";
}

export default function MessageDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [message, setMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch('/messages.json');
        const data = await response.json();
        const messages = Array.isArray(data) ? data : data.messages || [];
        const foundMessage = messages.find((m: Message) => m.id === params.id);
        
        if (foundMessage) {
          setMessage(foundMessage);
        } else {
          // Handle message not found
          router.push('/inbox');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching message:', error);
        setLoading(false);
      }
    };

    fetchMessage();
  }, [params.id, router]);

  const handleReply = () => {
    router.push(`/inbox/compose?replyTo=${message?.id}`);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading message...</div>
        </div>
      </div>
    );
  }

  if (!message) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Message not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/inbox"
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-200"
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">{message.subject}</h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleReply}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                <ArrowUturnLeftIcon className="h-5 w-5" />
                Reply
              </button>
              <button
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-200"
                title="Archive"
              >
                <ArchiveBoxIcon className="h-5 w-5" />
              </button>
              <button
                className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-md transition-colors duration-200"
                title="Delete"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Message Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-sm font-medium text-gray-900">{message.from}</div>
              <div className="text-sm text-gray-500">{message.date}</div>
            </div>
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
              message.priority === "high" 
                ? "bg-red-100 text-red-800" 
                : message.priority === "medium"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-800"
            }`}>
              {message.priority}
            </span>
          </div>
          <div className="prose max-w-none">
            <p className="text-gray-700 whitespace-pre-wrap">{message.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
