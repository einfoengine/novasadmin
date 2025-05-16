"use client";

import { useState } from "react";
import StatsCard from "@/components/StatsCard";
import { ArrowTrendingUpIcon, ClockIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

export default function ComposeMessagePage() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate sending
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setTo("");
      setSubject("");
      setBody("");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col items-center p-4">
      <div className="w-full bg-white rounded-lg shadow p-6 mt-8">
        <h1 className="text-2xl font-bold mb-6">Compose Message</h1>
        {sent ? (
          <div className="text-green-600 text-center mb-4">Message sent!</div>
        ) : null}
        <form onSubmit={handleSend} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">To</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-sm"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              required
              placeholder="Recipient email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Subject</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-sm"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              placeholder="Subject"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-sm min-h-[120px]"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              placeholder="Write your message..."
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-5 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
              onClick={() => {
                setTo("");
                setSubject("");
                setBody("");
                setSent(false);
              }}
            >
              Discard
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded bg-black text-white hover:bg-gray-800 disabled:opacity-60"
              disabled={sending}
            >
              {sending ? "Sending..." : "Send"}
            </button>
          </div>
        </form>
      </div>
      {/* Product Menu */}
      <div className="w-full bg-white rounded-lg shadow p-6 mt-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-xl font-bold">Products</h2>
          <div className="flex items-center gap-2">
            <select className="border border-gray-300 rounded px-2 py-1 text-sm">
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
            <button
              className="px-4 py-2 rounded bg-black text-white hover:bg-gray-800 text-sm"
              onClick={() => window.location.href = '/products/add'}
            >
              Add New Product
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatsCard title="Last Modified" value="-" icon={<ClockIcon className="h-6 w-6" />} iconColor="#6366f1" iconBg="#eef2ff" percentage="-" percentageColor="#6b7280" trend="" />
          <StatsCard title="New Products" value="-" icon={<ArrowTrendingUpIcon className="h-6 w-6" />} iconColor="#10b981" iconBg="#ecfdf5" percentage="-" percentageColor="#6b7280" trend="" />
          <StatsCard title="Invoice Status" value="-" icon={<DocumentTextIcon className="h-6 w-6" />} iconColor="#f59e42" iconBg="#fff7ed" percentage="-" percentageColor="#6b7280" trend="" />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Product Name</th>
                <th className="px-4 py-3">Size</th>
                <th className="px-4 py-3">Type of Material</th>
                <th className="px-4 py-3">Printing Channel</th>
                <th className="px-4 py-3">Printing Machine</th>
                <th className="px-4 py-3">Printing Surface</th>
                <th className="px-4 py-3">Die Mood</th>
                <th className="px-4 py-3">Gluing</th>
                <th className="px-4 py-3">Finishing</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* Example row, all values null/empty */}
              <tr>
                <td className="px-4 py-2 text-center"><div className="w-12 h-12 bg-gray-100 rounded" /></td>
                <td className="px-4 py-2 text-center">-</td>
                <td className="px-4 py-2 text-center">-</td>
                <td className="px-4 py-2 text-center">-</td>
                <td className="px-4 py-2 text-center">-</td>
                <td className="px-4 py-2 text-center">-</td>
                <td className="px-4 py-2 text-center">-</td>
                <td className="px-4 py-2 text-center">-</td>
                <td className="px-4 py-2 text-center">-</td>
                <td className="px-4 py-2 text-center">-</td>
                <td className="px-4 py-2 text-center">-</td>
                <td className="px-4 py-2 text-center">
                  <button className="text-blue-600 hover:underline mr-2">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex justify-end mt-4 gap-2">
          <button className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300">Prev</button>
          <span className="px-3 py-1">1</span>
          <button className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300">Next</button>
        </div>
      </div>
    </div>
  );
}
