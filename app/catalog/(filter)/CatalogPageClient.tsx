'use client'
import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { getCampers, getCampersParams } from '@/services/campers';
import style from './Layout.module.css'
import TruckCard from '@/components/TruckCard';
import NotFound from '@/components/ui/NotFound';

interface CatalogPageClientProps {
    initialParams: getCampersParams;
}

const CatalogPageClient = ({ initialParams }: CatalogPageClientProps) => {
  const searchParams = useSearchParams();

  const location = searchParams.get('location') || undefined;
  const form = (searchParams.get('form') as getCampersParams['form']) || undefined;
  const engine = (searchParams.get('engine') as getCampersParams['engine']) || undefined;
  const transmission = (searchParams.get('transmission') as getCampersParams['transmission']) || undefined;

  const params: getCampersParams = useMemo(() => ({
    page: initialParams.page ?? 1,
    perPage: initialParams.perPage,
    ...(location && { location }),
    ...(form && { form }),
    ...(engine && { engine }),
    ...(transmission && { transmission }),
  }), [initialParams.page, initialParams.perPage, location, form, engine, transmission]);

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
