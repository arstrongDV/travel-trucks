import React from 'react'
import style from './NotFound.module.css'
import Image from 'next/image'
import { RxCross1 } from "react-icons/rx";
import { usePathname, useRouter } from 'next/navigation';

const NotFound = () => {
    const router = useRouter();
    const pathname = usePathname();

  return (
    <section className={style.notFoundContainer}>
      <Image className={style.notFoundImage} src='/images/notFound.png' alt="not found" width={488} height={463} />

      <div className={style.notFoundText}>
        <h3>No campers found</h3>
        <p>We couldn`t find any campers that match your filters. Try adjusting your search or clearing some filters.</p>
      </div>

      <div className={style.notFoundBtns}>
            <button className={style.btnReset} onClick={() => router.push(pathname)}> <RxCross1 aria-hidden="true"/>  Clear filters</button>
            <button className={style.btnSearch} onClick={() => router.push('/catalog')}>View all campers</button>
      </div>
    </section>
  )
}

export default NotFound
