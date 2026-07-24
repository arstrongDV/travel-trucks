'use client'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { keepPreviousData, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getCampers, getCampersParams } from '@/services/campers';
import style from './Layout.module.css'
import TruckCard from '@/components/TruckCard';
import { useCatalogLoading } from '@/components/ui/Loader/CatalogLoadingProvider';
import NotFound from '@/components/ui/NotFound';

interface CatalogPageClientProps {
    initialParams: getCampersParams;
}

const CatalogPageClient = ({ initialParams }: CatalogPageClientProps) => {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(initialParams.page ?? 1);

  const location = searchParams.get('location') || undefined;
  const form = (searchParams.get('form') as getCampersParams['form']) || undefined;
  const engine = (searchParams.get('engine') as getCampersParams['engine']) || undefined;
  const transmission = (searchParams.get('transmission') as getCampersParams['transmission']) || undefined;

  useEffect(() => {
    setPage(1);
  }, [location, form, engine, transmission]);

  const params: getCampersParams = useMemo(() => ({
    page,
    perPage: initialParams.perPage,
    ...(location && { location }),
    ...(form && { form }),
    ...(engine && { engine }),
    ...(transmission && { transmission }),
  }), [page, initialParams.perPage, location, form, engine, transmission]);

const { 
    data, 
    isLoading, 
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["campers", params],
    queryFn: ({ pageParam }) => getCampers({ ...params, page: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined;
    },
    placeholderData: keepPreviousData,
  })

  const { setSectionLoading } = useCatalogLoading();

  useEffect(() => {
    setSectionLoading('trucks', isLoading);
  }, [isLoading, setSectionLoading]);

  const campers = data?.pages.flatMap((p) => p.campers) ?? [];

  if (isError) return <p>Something went wrong.</p>

  if (!isLoading && campers.length === 0) return <NotFound />

  return (
    <aside className={style.trucksListContainer}>
      <ul className={style.trucksList}>
        {campers.map((truck) => (
          <li className={style.truck} key={truck.id}>
            <TruckCard truck={truck} />
          </li>
        ))}
      </ul>

      {hasNextPage && (
        <button 
          className={style.btnLoadMore} 
          onClick={() => fetchNextPage()} 
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Loading...' : 'Load More'}
        </button>
      )}
    </aside>
  )
}

export default CatalogPageClient
