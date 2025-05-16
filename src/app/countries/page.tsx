import React from "react";
import CountriesTable from "@/components/CountriesTable";

const CountriesPage = () => {
  return (
    <main className="nt-main-content min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <CountriesTable />
    </main>
  );
};

export default CountriesPage;
