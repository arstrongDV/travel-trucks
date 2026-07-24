import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { Suspense } from 'react'
import Sidebar from '@/components/Sidebar'
import SmallLoader from '@/components/ui/Loader/SmallLoader'
import { getCampersFilters } from '@/services/campers'

const SideBar = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['filters'],
    queryFn: getCampersFilters,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<SmallLoader />}>
        <Sidebar />
      </Suspense>
    </HydrationBoundary>
  )
}

export default SideBar
