'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

export default function UserMenu() {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative inline-block text-left">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="relative">
          <Image
            src="/images/avatar-placeholder.png"
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full border-2 border-gray-200"
          />
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900">John Doe</span>
          <span className="text-xs text-gray-500">Administrator</span>
        </div>
        <ChevronDownIcon className="w-5 h-5 text-gray-600" />
      </div>

      {open && (
        <div className="absolute right-0 mt-2 w-48 origin-top-right bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <div className="py-1">
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <svg
                className="w-5 h-5 mr-2 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Profile
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <svg
                className="w-5 h-5 mr-2 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Settings
            </a>
            <div className="border-t border-gray-100"></div>
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              <svg
                className="w-5 h-5 mr-2 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </a>
          </div>
        </div>
      )}
    </div>
  )
} 