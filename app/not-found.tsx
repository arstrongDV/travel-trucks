import Image from 'next/image'
import Link from 'next/link'
import style from './not-found.module.css'

export default function NotFound() {
  return (
    <section className={style.container}>
      <Image
        className={style.image}
        src="/images/notFound.png"
        alt="Page not found"
        width={488}
        height={463}
      />

      <div className={style.text}>
        <h3>Page not found</h3>
        <p>The page you`re looking for doesn`t exist or has been moved.</p>
      </div>

      <Link className={style.btn} href="/">Back to Home</Link>
    </section>
  )
}
