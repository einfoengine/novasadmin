"use client";

import { useState, useEffect } from "react";
import { 
  EnvelopeIcon, 
  EnvelopeOpenIcon, 
  PaperAirplaneIcon
} from "@heroicons/react/24/outline";
import StatsCard from "@/components/StatsCard";
import { useRouter } from "next/navigation";
import { useTheme } from '@/app/providers';
import TableBuilder from "@/components/TableBuilder";

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
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('/data/messages.json');
        const data = await response.json();
        setMessages(data.messages || []);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading messages...</div>
        </div>
      </div>
    );
  }

  const handleRowClick = (message: Message) => {
    router.push(`/messages/${message.id}`);
  };

  const handleDelete = (message: Message) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      setMessages(prev => prev.filter(m => m.id !== message.id));
    }
  };

  const columns = [
    { 
      key: 'from', 
      label: 'From',
      className: 'text-gray-900 dark:text-white'
    },
    { 
      key: 'subject', 
      label: 'Subject',
      type: 'link' as const,
      linkHref: (value: unknown) => `/messages/${value}`,
      className: 'text-gray-900 dark:text-white'
    },
    { 
      key: 'content', 
      label: 'Preview',
      className: 'text-gray-900 dark:text-white'
    },
    { 
      key: 'date', 
      label: 'Date',
      type: 'date' as const,
      className: 'text-gray-900 dark:text-white'
    },
    { 
      key: 'priority', 
      label: 'Priority',
      type: 'status' as const,
      className: 'text-gray-900 dark:text-white'
    },
    { 
      key: 'read', 
      label: 'Status',
      type: 'status' as const,
      format: (value: unknown) => (value as boolean) ? 'Read' : 'Unread',
      className: 'text-gray-900 dark:text-white'
    },
  ];

  const unreadCount = messages.filter(m => !m.read).length;
  const highPriorityCount = messages.filter(m => m.priority === "high").length;
  const sentCount = messages.filter(m => m.from === "me").length;

  return (
    <div className={`p-6 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
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

      <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow`}>
        <TableBuilder
          data={messages}
          columns={columns}
          title="Inbox"
          icon={<EnvelopeIcon className={`h-6 w-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} />}
          searchable
          selectable
          onRowClick={handleRowClick}
          onDelete={handleDelete}
          actionButton={{
            label: "Compose",
            href: "/messages/compose"
          }}
        />
      </div>
    </div>
  );
}
