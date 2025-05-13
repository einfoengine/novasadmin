'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronDownIcon, UserIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import Breadcrumb from '@/components/Breadcrumb'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <header className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-3 h-[63px]">
          <div className="flex items-center">
            <Breadcrumb />
          </div>
          <div className="relative inline-block text-left">
            <div className="flex items-center gap-2">
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
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-3 h-[63px]">
        <div className="flex items-center">
          <Breadcrumb />
        </div>

        {/* User Avatar & Dropdown */}
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
                  <UserIcon className="w-5 h-5 mr-2 text-gray-500" />
                  Profile
                </a>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Cog6ToothIcon className="w-5 h-5 mr-2 text-gray-500" />
                  Settings
                </a>
                <div className="border-t border-gray-100"></div>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2 text-gray-500" />
                  Logout
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
} 