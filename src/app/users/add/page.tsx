"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface UserFormData {
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

export default function AddUserPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const userData: UserFormData = {
      userId: formData.get("userId") as string,
      userName: formData.get("userName") as string,
      userType: formData.get("userType") as string,
      avatarUrl: formData.get("avatarUrl") as string,
      joiningDate: formData.get("joiningDate") as string,
      endingDate: formData.get("endingDate") as string,
      status: formData.get("status") as string,
      contact: formData.get("contact") as string,
      address: formData.get("address") as string,
    };

    try {
      // Here you would typically make an API call to save the user
      console.log("New user data:", userData);
      
      // For now, we'll just redirect back to the users page
      router.push("/users");
    } catch (error) {
      console.error("Error adding user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Add New User</h1>
          <Link
            href="/users"
            className="text-gray-600 hover:text-gray-900"
          >
            Back to Users
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
                User ID
              </label>
              <input
                type="text"
                name="userId"
                id="userId"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                placeholder="e.g., U004"
              />
            </div>

            <div>
              <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="userName"
                id="userName"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                placeholder="Enter full name"
              />
            </div>

            <div>
              <label htmlFor="userType" className="block text-sm font-medium text-gray-700">
                User Type
              </label>
              <select
                name="userType"
                id="userType"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
              >
                <option value="">Select user type</option>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Staff">Staff</option>
              </select>
            </div>

            <div>
              <label htmlFor="avatarUrl" className="block text-sm font-medium text-gray-700">
                Avatar URL
              </label>
              <input
                type="text"
                name="avatarUrl"
                id="avatarUrl"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                placeholder="/images/avatars/user.jpg"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="joiningDate" className="block text-sm font-medium text-gray-700">
                  Joining Date
                </label>
                <input
                  type="date"
                  name="joiningDate"
                  id="joiningDate"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                />
              </div>

              <div>
                <label htmlFor="endingDate" className="block text-sm font-medium text-gray-700">
                  Ending Date
                </label>
                <input
                  type="date"
                  name="endingDate"
                  id="endingDate"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                name="status"
                id="status"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
              >
                <option value="">Select status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                Contact Number
              </label>
              <input
                type="tel"
                name="contact"
                id="contact"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                placeholder="+44 7123 456789"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <textarea
                name="address"
                id="address"
                required
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                placeholder="Enter full address"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Link
                href="/users"
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 disabled:opacity-50"
              >
                {loading ? "Adding..." : "Add User"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 