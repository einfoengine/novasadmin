import React from "react";
import CountriesTable from "@/components/CountriesTable";
import { useTheme } from '@/app/providers';

const CountriesPage = () => {
  const { theme } = useTheme();
  return (
    <main className={`nt-main-content min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} p-6`}>
      <CountriesTable />
    </main>
  );
};

export default CountriesPage;
