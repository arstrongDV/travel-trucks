import style from './HeroSection.module.css'
import Link from 'next/link'

const HeroSection = () => {
  return (
    <section className={style.heroSection}>
      <div className={style.heroContainer}>
            <div className={style.textSection}>
                <h1>Campers of your dreams</h1>
                <p>You can find everything you want in our catalog</p>
            </div>

            <Link className={style.btn} href="/catalog">View Now</Link>
      </div>
    </section>
  )
}

export default HeroSection;