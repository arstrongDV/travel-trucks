import Sidebar from '@/components/Sidebar'
import { Suspense } from 'react'

const SideBar = () => {
  return (
    <Suspense fallback={<p role="status">Loading...</p>}>
      <Sidebar />
    </Suspense>
  )
}

export default SideBar