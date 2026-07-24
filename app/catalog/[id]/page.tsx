import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Metadata } from 'next';
import CatalogDetailsPageClient from './CatalogDetailsPageClient';
import { getCamper, getCamperReviews } from '@/services/campers';

interface catalogDetailsProps {
    params: Promise<{id: string}>;
}

export async function generateMetadata({ params }: catalogDetailsProps): Promise<Metadata> {
    const { id } = await params;
    const camper = await getCamper(id);

    return{
        title: camper.name,
        description: camper.description,
        openGraph: {
            title: camper.name,
            description: camper.description,
            url: `http://localhost:3000/catalog/${id}`,
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
    queryFn: () => getCamper(id)
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
