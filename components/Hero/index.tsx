import React from 'react'
import style from './HeroSection.module.css'
import { useRouter } from 'next/navigation'

const HeroSection = () => {
    const router = useRouter()
  return (
    <section className={style.heroSection}>
      <div className={style.heroContainer}>
            <div className={style.textSection}>
                <h1>Campers of your dreams</h1>
                <p>You can find everything you want in our catalog</p>
            </div>

            <button className={style.btn} onClick={() => router.push('/catalog')}>View Now</button>
      </div>
    </section>
  )
}

export default HeroSection