"use client";
import { useState, useEffect } from "react";
import CampaignList from "@/components/CampaignList";
import StatsCard from "@/components/StatsCard";
import { UsersIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import LoadingSpinner from "@/components/loadingSpinner";

interface Campaign {
    campaignId: string;
    campaignName: string;
    country: string;
    assigned: string;
    userType: string;
    creatingDate: string;
    startDate: string;
    endDate: string;
    status: string;
    totalCost: number;
    invoiceStatus: string;
  }

const RecentActitities = () => {
  return (
    <div id='nt-recent-activities'>
        <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
            <div className="mt-4 overflow-hidden bg-white shadow sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {campaigns.slice(0, 5).map((campaign) => (
                  <li key={campaign.campaignId}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">{campaign.campaignName}</p>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            campaign.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {campaign.status}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {new Date(campaign.creatingDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
    </div>
  )
}

export default RecentActitities