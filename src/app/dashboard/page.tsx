"use client";
import StatsCard from "@/components/StatsCard";

import { UsersIcon, ChartBarIcon, ClipboardDocumentIcon, ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="nt-dashboard-main-content w-full">
        {/* Content */}
        <main className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-2 lg:grid-cols-3">
            <StatsCard title="Campaigns" value="71,897" icon={<ChartBarIcon className="w-6 h-6 text-gray-900" />} iconColor="text-gray-500" iconBg="bg-gray-100" percentage="12%" percentageColor="text-green-500" trend="Increased by"/>
            
            <StatsCard
              title="New Products"
              value="71,897"
              icon={<UsersIcon className="w-6 h-6 text-gray-900" />}
              iconColor="text-gray-500"
              iconBg="bg-gray-100"
              percentage="12%"
              percentageColor="text-green-500"
              trend="Increased by"
            />

            <StatsCard
              title="Total Users"
              value="71,897"
              icon={<UsersIcon className="w-6 h-6 text-gray-900" />}
              iconColor="text-gray-500"
              iconBg="bg-gray-100"
              percentage="12%"
              percentageColor="text-green-500"
              trend="Increased by"
            />
          </div>

          {/* Recent Activity */}
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
            <div className="mt-4 overflow-hidden bg-white shadow sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {[1, 2, 3, 4, 5].map((item) => (
                  <li key={item}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">Activity {item}</p>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                            Completed
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {item} hour ago
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 