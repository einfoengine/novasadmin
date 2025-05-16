'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronDownIcon, UserIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon, BellIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import Breadcrumb from '@/components/Breadcrumb'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Set initial dark mode from localStorage or system preference
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        setDarkMode(true);
        document.documentElement.classList.add('dark');
      } else {
        setDarkMode(false);
        document.documentElement.classList.remove('dark');
      }
    }
  }, [])

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', next);
        localStorage.setItem('theme', next ? 'dark' : 'light');
      }
      return next;
    });
  }

  if (!mounted) {
    return (
      <header className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-3 h-[63px]">
          <div className="flex items-center">
            <Breadcrumb />
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              id='nt-toggle-dark-mode'
              className={`relative w-12 h-7 flex items-center rounded-full p-1 transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-gray-300'}`}
              aria-label="Toggle dark mode"
            >
              <span className={`absolute left-1 top-1 transition-transform duration-300 ${darkMode ? 'translate-x-5' : 'translate-x-0'}`}
                style={{ pointerEvents: 'none' }}
              >
                {darkMode ? (
                  <MoonIcon className="h-5 w-5 text-white" />
                ) : (
                  <SunIcon className="h-5 w-5 text-yellow-500" />
                )}
              </span>
              <span className={`inline-block w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300 ${darkMode ? 'translate-x-5' : 'translate-x-0'}`}></span>
            </button>
            <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors" aria-label="Notifications">
              <BellIcon className={darkMode ? "h-6 w-6 text-gray-700" : "h-6 w-6 text-gray-700"} />
            </button>
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
        </div>
      </header>
    )
  }

  return (
    <header className={`border-b border-gray-200 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className={`flex items-center justify-between px-6 py-3 h-[63px] ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="flex items-center">
          <Breadcrumb />
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className={`relative w-12 h-7 flex items-center rounded-full p-1 transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-gray-300'}`}
            aria-label="Toggle dark mode"
          >
            <span className={`absolute left-1 top-1 transition-transform duration-300 ${darkMode ? 'translate-x-5' : 'translate-x-0'}`}
              style={{ pointerEvents: 'none' }}
            >
              {darkMode ? (
                <MoonIcon className="h-5 w-5 text-white" />
              ) : (
                <SunIcon className="h-5 w-5 text-yellow-500" />
              )}
            </span>
            <span className={`inline-block w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300 ${darkMode ? 'translate-x-5' : 'translate-x-0'}`}></span>
          </button>
          <button className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`} aria-label="Notifications">
            <BellIcon className={darkMode ? "h-6 w-6 text-gray-100" : "h-6 w-6 text-gray-700"} />
          </button>
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
                <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>John Doe</span>
                <span className={`text-xs ${darkMode ? 'text-gray-200' : 'text-gray-500'}`}>Administrator</span>
              </div>
              <ChevronDownIcon className={darkMode ? "w-5 h-5 text-gray-100" : "w-5 h-5 text-gray-600"} />
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
      </div>
    </header>
  )
}