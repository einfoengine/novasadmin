"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface User {
  userId: string;
  userName: string;
  userType: string;
  avatarUrl: string;
  joiningDate: string;
  endingDate: string;
  status: string;
  contact: string;
  address: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/users.json');
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <Link
            href="/users/add"
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
          >
            Add New User
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 bg-gray-100 border-b">
            <div className="col-span-1 font-medium text-gray-900">Avatar</div>
            <div className="col-span-1 font-medium text-gray-900">ID</div>
            <div className="col-span-2 font-medium text-gray-900">Name</div>
            <div className="col-span-1 font-medium text-gray-900">Type</div>
            <div className="col-span-1 font-medium text-gray-900">Status</div>
            <div className="col-span-2 font-medium text-gray-900">Contact</div>
            <div className="col-span-2 font-medium text-gray-900">Address</div>
            <div className="col-span-1 font-medium text-gray-900">Join Date</div>
            <div className="col-span-1 font-medium text-gray-900">End Date</div>
          </div>

          <div className="divide-y divide-gray-200">
            {users.map((user) => (
              <div key={user.userId} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50">
                <div className="col-span-1">
                  <div className="relative w-10 h-10">
                    <Image
                      src={user.avatarUrl}
                      alt={user.userName}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                </div>
                <div className="col-span-1 text-gray-900">{user.userId}</div>
                <div className="col-span-2 text-gray-900">{user.userName}</div>
                <div className="col-span-1 text-gray-900">{user.userType}</div>
                <div className="col-span-1">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    user.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </div>
                <div className="col-span-2 text-gray-900">{user.contact}</div>
                <div className="col-span-2 text-gray-900 truncate">{user.address}</div>
                <div className="col-span-1 text-gray-900">{new Date(user.joiningDate).toLocaleDateString()}</div>
                <div className="col-span-1 text-gray-900">{new Date(user.endingDate).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 