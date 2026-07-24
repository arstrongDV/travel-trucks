import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import CatalogDetailsPageClient from './CatalogDetailsPageClient';
import { getCamper, getCamperReviews } from '@/services/campers';

interface catalogDetailsProps {
    params: Promise<{id: string}>;
}

const getCamperOrNotFound = cache(async (id: string) => {
    try {
        return await getCamper(id);
    } catch (error) {
        if (isAxiosError(error) && error.response?.status === 404) {
            notFound();
        }
        throw error;
    }
})

export async function generateMetadata({ params }: catalogDetailsProps): Promise<Metadata> {
    const { id } = await params;
    const camper = await getCamperOrNotFound(id);

    return{
        title: camper.name,
        description: camper.description,
        openGraph: {
            title: camper.name,
            description: camper.description,
            url: `/catalog/${id}`,
            siteName: 'TravelTrucks',
            images: [{
                url: '/images/heroImage.jpg',
                width: 1200,
                height: 630,
                alt: 'TravelTrucks-img',
            }],
        }
    }
}

const CatalogDetailsPage = async ({ params }: catalogDetailsProps) => {
    const { id } = await params;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
    queryKey: ["camper", id],
    queryFn: () => getCamperOrNotFound(id)
    })
    await queryClient.prefetchQuery({
    queryKey: ["camper-reviews", id],
    queryFn: () => getCamperReviews(id)
    })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogDetailsPageClient catalogId={id} />
    </HydrationBoundary>
  )
}

export default CatalogDetailsPage
