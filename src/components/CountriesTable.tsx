'use client'

import React, { useEffect, useState } from "react";
import TableHeader from "./TableHeader";

interface Country {
  id: string;
  name: string;
  totalStores: number;
  currency: string;
  exchangeRate: number;
}

const fetchCountries = async (): Promise<Country[]> => {
  const res = await fetch("/countries.json");
  const data = await res.json();
  return data.countries;
};

const CountriesTable: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchCountries().then(setCountries);
  }, []);

  const filtered = countries.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.id.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow overflow-x-auto">
      <TableHeader
        icon={<span role="img" aria-label="globe">🌍</span>}
        title="Countries"
        searchTerm={search}
        onSearchChange={setSearch}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={setItemsPerPage}
        totalItems={filtered.length}
      />
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Total Stores</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Currency</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Exchange Rate</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
          {paginated.map((country) => (
            <tr key={country.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{country.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{country.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{country.totalStores}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{country.currency}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{country.exchangeRate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center p-4">
        <span className="text-sm text-gray-600 dark:text-gray-300">
          Page {page} of {totalPages}
        </span>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <button
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CountriesTable;
