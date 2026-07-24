import { Metadata } from 'next';
import CatalogPageClient from './CatalogPageClient';
import { PER_PAGE } from '../../../constans/constants';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getCampers, getCampersParams, getCampersResponse } from '@/services/campers';
import { Form, Engine, Transmission } from '@/types/campers';

interface CatalogPageProps {
    searchParams: Promise<{
        location?: string;
        form?: Form;
        engine?: Engine;
        transmission?: Transmission;
    }>;
}

export async function generateMetadata({ searchParams }: CatalogPageProps): Promise<Metadata> {
    const { location, form, engine, transmission } = await searchParams;

    const filters = [engine, transmission, form, location && `in ${location}`].filter(Boolean);

    const title = filters.length
        ? `${filters.join(', ')} campers | TravelTrucks catalog`
        : 'Catalog | TravelTrucks';

    const description = filters.length
        ? `Browse campers and trucks filtered by ${filters.join(', ')}. Find the perfect vehicle for your trip with TravelTrucks.`
        : 'Browse our catalog of campers and trucks to find the perfect vehicle for your trip.';

    const query = new URLSearchParams({
        ...(location && { location }),
        ...(form && { form }),
        ...(engine && { engine }),
        ...(transmission && { transmission }),
    }).toString();

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: `/catalog${query ? `?${query}` : ''}`,
            siteName: 'TravelTrucks',
            type: 'website',
            images: [{
                url: '/images/heroImage.jpg',
                width: 1200,
                height: 630,
                alt: 'TravelTrucks catalog',
            }],
        },
    };
}

export default async function Catalog({ searchParams }: CatalogPageProps) {
  const { location, form, engine, transmission } = await searchParams;

  const params: getCampersParams = {
    page: 1,
    perPage: PER_PAGE,
    ...(location && { location }),
    ...(form && { form }),
    ...(engine && { engine }),
    ...(transmission && { transmission }),
  };

  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["campers", params],
    queryFn: ({ pageParam }) => getCampers({ ...params, page: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: getCampersResponse) => {
      return lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined;
    },
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogPageClient initialParams={params} />
    </HydrationBoundary>
  )
}
