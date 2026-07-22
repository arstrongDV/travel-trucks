import React from 'react'
import style from './HeroSection.module.css'

const HeroSection = () => {
  return (
    <section className={style.heroSection}>
      <div className={style.heroContainer}>
            <div className={style.textSection}>
                <h1>Campers of your dreams</h1>
                <p>You can find everything you want in our catalog</p>
            </div>

            <button className={style.btn}>View Now</button>
      </div>
    </section>
  )
}

export default HeroSection
