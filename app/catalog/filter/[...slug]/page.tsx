import { Metadata } from 'next';
import CatalogPageClient from './CatalogPageClient';
import { PER_PAGE } from '../../../../constans/constants';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getCampers } from '@/services/campers';

export const metadata: Metadata = {
  title: 'Catalog | TravelTrucks',
  description: 'Browse our catalog of campers and trucks to find the perfect vehicle for your trip.',
};

export default async function Catalog() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["campers"],
    queryFn: () => getCampers({ page: 1, perPage: PER_PAGE })
  })
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogPageClient />
    </HydrationBoundary>
  )
}