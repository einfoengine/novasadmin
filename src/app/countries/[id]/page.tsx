import { Suspense } from 'react';
import CountryStoresClient from './CountryStoresClient';

export default function CountryStoresPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CountryStoresClient />
    </Suspense>
  );
}
