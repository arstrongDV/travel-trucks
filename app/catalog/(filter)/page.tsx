import { Metadata } from 'next';
import CatalogPageClient from './CatalogPageClient';
import { PER_PAGE } from '../../../constans/constants';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getCampers, getCampersParams } from '@/services/campers';
import { Form, Engine, Transmission } from '@/types/campers';

interface CatalogPageProps {
    searchParams: Promise<{
        location?: string;
        from?: Form;
        engine?: Engine;
        transmission?: Transmission;
    }>;
}

export const metadata: Metadata = {
  title: 'Catalog | TravelTrucks',
  description: 'Browse our catalog of campers and trucks to find the perfect vehicle for your trip.',
};

export default async function Catalog({ searchParams }: CatalogPageProps) {
  const { location, from, engine, transmission } = await searchParams;

  const params: getCampersParams = {
    page: 1,
    perPage: PER_PAGE,
    ...(location && { location }),
    ...(from && { from }),
    ...(engine && { engine }),
    ...(transmission && { transmission }),
  };

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["campers", params],
    queryFn: () => getCampers(params)
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogPageClient initialParams={params} />
    </HydrationBoundary>
  )
}
