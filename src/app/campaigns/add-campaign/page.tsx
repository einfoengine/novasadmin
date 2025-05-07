'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const europeanCountries = [
  'Albania', 'Andorra', 'Austria', 'Belarus', 'Belgium', 'Bosnia and Herzegovina',
  'Bulgaria', 'Croatia', 'Czech Republic', 'Denmark', 'Estonia', 'Finland',
  'France', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy',
  'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Malta', 'Moldova',
  'Monaco', 'Montenegro', 'Netherlands', 'North Macedonia', 'Norway', 'Poland',
  'Portugal', 'Romania', 'Russia', 'San Marino', 'Serbia', 'Slovakia',
  'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Ukraine', 'United Kingdom',
  'Vatican City'
]

export default function AddCampaign() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    country: '',
    assigned: '',
    typeofuser: 'Admin',
    creatingdate: '',
    startdate: '',
    enddate: '',
    status: 'Active',
    totalcost: '',
    invoicestatus: 'Pending'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Add API call to save campaign
    console.log('Campaign Data:', formData)
    router.push('/admin')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div>
        <main className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mt-8">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Campaign Information</h3>
              </div>
              <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {/* Campaign Name */}
                  <div className='nt-admin-add-campaign-form-input-field nt-campaign-name'>
                    <label htmlFor="campaignname" className="block text-sm font-medium text-gray-700 mb-1">
                      Campaign Name
                    </label>
                    <input
                      type="text"
                      name="campaignname"
                      id="campaignname"
                      required
                      value={"Campaign Name"}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                    />
                  </div>
                  {/* Campaign Type */}
                  <div className='nt-admin-add-campaign-form-input-field nt-campaign-type'>
                    <label htmlFor="campaignname" className="block text-sm font-medium text-gray-700 mb-1">
                      Campaign Type
                    </label>
                    <input
                      type="text"
                      name="Campaign Type"
                      id="Campaign Type"
                      required
                      value={"Campaign Type"}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                    />
                  </div>
                  {/* Store Code */}
                  <div className='nt-admin-add-campaign-form-input-field nt-campaign-type'>
                    <label htmlFor="campaignname" className="block text-sm font-medium text-gray-700 mb-1">
                      Store Code
                    </label>
                    <input
                      type="text"
                      name="Store code"
                      id="Store code"
                      required
                      value={"Store code"}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                    />
                  </div>
                  {/* Country */}
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    <select
                      name="country"
                      id="country"
                      required
                      value={formData.country}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                    >
                      <option value="">Select a country</option>
                      {europeanCountries.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>

                  {/* Assigned */}
                  <div>
                    <label htmlFor="assigned" className="block text-sm font-medium text-gray-700 mb-1">
                      Assigned
                    </label>
                    <input
                      type="number"
                      name="assigned"
                      id="assigned"
                      required
                      value={formData.assigned}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                    />
                  </div>

                  {/* Start Date */}
                  <div>
                    <label htmlFor="startdate" className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="startdate"
                      id="startdate"
                      required
                      value={formData.startdate}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                    />
                  </div>

                  {/* End Date */}
                  <div>
                    <label htmlFor="enddate" className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      name="enddate"
                      id="enddate"
                      required
                      value={formData.enddate}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                    />
                  </div>

                  {/* Status */}
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      name="status"
                      id="status"
                      required
                      value={formData.status}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>

                  {/* Total Cost */}
                  <div>
                    <label htmlFor="totalcost" className="block text-sm font-medium text-gray-700 mb-1">
                      Total Cost (৳)
                    </label>
                    <input
                      type="number"
                      name="totalcost"
                      id="totalcost"
                      required
                      value={formData.totalcost}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                    />
                  </div>

                  {/* Invoice Status */}
                  <div>
                    <label htmlFor="invoicestatus" className="block text-sm font-medium text-gray-700 mb-1">
                      Invoice Status
                    </label>
                    <select
                      name="invoicestatus"
                      id="invoicestatus"
                      required
                      value={formData.invoicestatus}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Paid">Paid</option>
                      <option value="Overdue">Overdue</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => router.push('/admin')}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                  >
                    Create Campaign
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 