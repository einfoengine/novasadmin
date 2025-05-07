'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const countries = [
  { name: 'United States', currency: 'USD', symbol: '$' },
  { name: 'United Kingdom', currency: 'GBP', symbol: '£' },
  { name: 'European Union', currency: 'EUR', symbol: '€' },
  { name: 'Japan', currency: 'JPY', symbol: '¥' },
  { name: 'Australia', currency: 'AUD', symbol: 'A$' },
  { name: 'Canada', currency: 'CAD', symbol: 'C$' },
  { name: 'Switzerland', currency: 'CHF', symbol: 'Fr' },
  { name: 'China', currency: 'CNY', symbol: '¥' },
  { name: 'India', currency: 'INR', symbol: '₹' },
  { name: 'Bangladesh', currency: 'BDT', symbol: '৳' },
]

export default function Currency() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    country: '',
    currency: '',
    exchangeRate: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Add API call to save currency settings
    console.log('Currency Data:', formData)
    router.push('/dashboard')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = countries.find(country => country.name === e.target.value)
    setFormData(prev => ({
      ...prev,
      country: e.target.value,
      currency: selectedCountry?.currency || ''
    }))
  }

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Currency Settings</h3>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Country Selection */}
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <select
                name="country"
                id="country"
                required
                value={formData.country}
                onChange={handleCountryChange}
                className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
              >
                <option value="">Select a country</option>
                {countries.map(country => (
                  <option key={country.name} value={country.name}>
                    {country.name} ({country.symbol})
                  </option>
                ))}
              </select>
            </div>

            {/* Currency */}
            <div>
              <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
                Currency
              </label>
              <input
                type="text"
                name="currency"
                id="currency"
                required
                value={formData.currency}
                onChange={handleChange}
                className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                readOnly
              />
            </div>

            {/* Exchange Rate */}
            <div>
              <label htmlFor="exchangeRate" className="block text-sm font-medium text-gray-700 mb-1">
                Exchange Rate (to BDT)
              </label>
              <input
                type="number"
                name="exchangeRate"
                id="exchangeRate"
                required
                value={formData.exchangeRate}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 