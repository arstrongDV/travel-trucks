'use client'
import { getCampers } from '@/services/campers';
import { PER_PAGE } from '../../constans/constants';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react'

const CatalogPageClient = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["campers", page, PER_PAGE],
    queryFn: () => getCampers({
      page,
      perPage: PER_PAGE
    }),
    placeholderData: keepPreviousData
  })

  if (isLoading) return <p>Loading...</p>

  return (
    <div>
      
    </div>
  )
}

export default CatalogPageClient
