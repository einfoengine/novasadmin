'use client'
import Link from "next/link";
import { useState } from "react";
import { PrinterIcon, PlusIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
export default function Dashboard() {
  const [open, setOpen] = useState(false);

  const data = [
    {
      id: 1,
      country: "Campaign",
      assigned: "10",
      typeofuser: "Admin",
      creatingdate: "2025-05-07",
      startdate: "2025-05-07",
      enddate: "2025-05-07",
      status: "Active",
      totalcost: "1000",
      invoicestatus: "Paid",
    },
    {
      id: 2,
      country: "Campaign",
      assigned: "10",
      typeofuser: "Admin",
      creatingdate: "2025-05-07",
      startdate: "2025-05-07",
      enddate: "2025-05-07",
      status: "Active",
      totalcost: "1000",
      invoicestatus: "Paid",
    },
    {
      id: 3,
      country: "Campaign",
      assigned: "10",
      typeofuser: "Admin",
      creatingdate: "2025-05-07",
      startdate: "2025-05-07",
      enddate: "2025-05-07",
      status: "Active",
      totalcost: "1000",
      invoicestatus: "Paid",
    },
    {
      id: 4,
      country: "Campaign",
      assigned: "10",
      typeofuser: "Admin",
      creatingdate: "2025-05-07",
      startdate: "2025-05-07",
      enddate: "2025-05-07",
      status: "Active",
      totalcost: "1000",
      invoicestatus: "Paid",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="ml-64">
      <header className="bg-white shadow">
      <div className="flex items-center justify-between px-4 py-1 mx-auto max-w-7xl sm:px-6 lg:px-8 h-[63px]">
        <h4 className="text-gray-900 text-xl font-semibold">Campaign</h4>

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
      </div>
    </header>

        {/* End of Header */}

        <main className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* Inner top nav */}
          <div className="mt-8 nt-top-nav">
            <div className="nt-inner-top mb-6">
              <ul className="flex flex-wrap gap-2">
                {[
                  "Campaign",
                  "Product",
                  "Country",
                  "Store",
                  "Template",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="flex items-center gap-1 text-white bg-black px-3 py-1 rounded hover:bg-gray-800"
                    >
                      <PlusIcon className="w-4 h-4" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>

            </div>

            {/* Table Section */}
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
              <div className="min-w-full nt-campaign-table">
                {/* Header */}
                <div className="flex bg-gray-100 text-gray-700 font-semibold text-sm px-4 py-2">
                  <div className="w-12">ID</div>
                  <div className="w-32">Country</div>
                  <div className="w-24">Assigned</div>
                  <div className="w-24">User Type</div>
                  <div className="w-32">Creating Date</div>
                  <div className="w-32">Start Date</div>
                  <div className="w-32">End Date</div>
                  <div className="w-20">Status</div>
                  <div className="w-24">Total Cost</div>
                  <div className="w-28">Invoice Status</div>
                  <div className="w-20 text-center">Action</div>
                </div>

                {/* Data Rows */}
                {data.map((item) => (
                  <div key={item.id} className="flex text-sm px-4 py-2 border-t border-gray-200 hover:bg-gray-50">
                    <div className="w-12">{item.id}</div>
                    <div className="w-32">{item.country}</div>
                    <div className="w-24">{item.assigned}</div>
                    <div className="w-24">{item.typeofuser}</div>
                    <div className="w-32">{item.creatingdate}</div>
                    <div className="w-32">{item.startdate}</div>
                    <div className="w-32">{item.enddate}</div>
                    <div className="w-20">{item.status}</div>
                    <div className="w-24">৳{item.totalcost}</div>
                    <div className="w-28">{item.invoicestatus}</div>
                    <div className="w-20 text-center text-blue-600 hover:underline cursor-pointer flex justify-center items-center gap-1"><PrinterIcon className="w-5 h-5" /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
