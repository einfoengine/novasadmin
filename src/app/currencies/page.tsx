"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

interface Currency {
  currencyId: string;
  currencyName: string;
  rateAgainstEuro: number;
  symbol: string;
  exchangeableCountries: string[];
}

export default function CurrenciesPage() {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCurrency, setEditingCurrency] = useState<Currency | null>(null);
  const [formData, setFormData] = useState<Partial<Currency>>({
    currencyId: "",
    currencyName: "",
    rateAgainstEuro: 0,
    symbol: "",
    exchangeableCountries: []
  });

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch('/currencies.json');
        const data = await response.json();
        setCurrencies(data.currencies);
      } catch (error) {
        console.error('Error fetching currencies:', error);
        toast.error('Failed to load currency data');
      } finally {
        setLoading(false);
      }
    };

    fetchCurrencies();
  }, []);

  const handleOpenModal = (currency?: Currency) => {
    if (currency) {
      setEditingCurrency(currency);
      setFormData(currency);
    } else {
      setEditingCurrency(null);
      setFormData({
        currencyId: "",
        currencyName: "",
        rateAgainstEuro: 0,
        symbol: "",
        exchangeableCountries: []
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCurrency(null);
    setFormData({
      currencyId: "",
      currencyName: "",
      rateAgainstEuro: 0,
      symbol: "",
      exchangeableCountries: []
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.currencyId || !formData.currencyName || !formData.symbol) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (editingCurrency) {
      // Update existing currency
      setCurrencies(currencies.map(currency => 
        currency.currencyId === editingCurrency.currencyId ? { ...formData as Currency } : currency
      ));
      toast.success('Currency updated successfully');
    } else {
      // Add new currency
      setCurrencies([...currencies, formData as Currency]);
      toast.success('Currency added successfully');
    }

    handleCloseModal();
  };

  const handleDelete = (currencyId: string) => {
    if (window.confirm('Are you sure you want to delete this currency?')) {
      setCurrencies(currencies.filter(currency => currency.currencyId !== currencyId));
      toast.success('Currency deleted successfully');
    }
  };

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
          <h1 className="text-2xl font-bold text-gray-900">Currencies</h1>
          <button
            onClick={() => handleOpenModal()}
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
          >
            Add New Currency
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Currency ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Currency Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Symbol
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rate (EUR)
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Exchangeable Countries
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currencies.map((currency) => (
                  <tr key={currency.currencyId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {currency.currencyId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {currency.currencyName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {currency.symbol}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {currency.rateAgainstEuro.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="flex flex-wrap gap-1">
                        {currency.exchangeableCountries.map((country, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {country}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleOpenModal(currency)}
                          className="text-gray-600 hover:text-gray-900"
                          title="Edit"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(currency.currencyId)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Currency Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingCurrency ? 'Edit Currency' : 'Add New Currency'}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="currencyId" className="block text-sm font-medium text-gray-700">
                    Currency ID
                  </label>
                  <input
                    type="text"
                    id="currencyId"
                    value={formData.currencyId}
                    onChange={(e) => setFormData({ ...formData, currencyId: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                    placeholder="e.g., EUR"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="currencyName" className="block text-sm font-medium text-gray-700">
                    Currency Name
                  </label>
                  <input
                    type="text"
                    id="currencyName"
                    value={formData.currencyName}
                    onChange={(e) => setFormData({ ...formData, currencyName: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                    placeholder="e.g., Euro"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="symbol" className="block text-sm font-medium text-gray-700">
                    Symbol
                  </label>
                  <input
                    type="text"
                    id="symbol"
                    value={formData.symbol}
                    onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                    placeholder="e.g., €"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="rateAgainstEuro" className="block text-sm font-medium text-gray-700">
                    Rate Against Euro
                  </label>
                  <input
                    type="number"
                    id="rateAgainstEuro"
                    value={formData.rateAgainstEuro}
                    onChange={(e) => setFormData({ ...formData, rateAgainstEuro: parseFloat(e.target.value) })}
                    step="0.01"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="exchangeableCountries" className="block text-sm font-medium text-gray-700">
                    Exchangeable Countries
                  </label>
                  <textarea
                    id="exchangeableCountries"
                    value={formData.exchangeableCountries?.join(', ')}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      exchangeableCountries: e.target.value.split(',').map(country => country.trim())
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                    placeholder="Enter countries separated by commas"
                    rows={3}
                    required
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-4 border-t">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800"
                  >
                    {editingCurrency ? 'Update Currency' : 'Add Currency'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 