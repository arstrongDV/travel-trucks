import SmallLoader from '@/components/ui/Loader/SmallLoader'
import style from '@/components/ui/Loader/Loader.module.css'

export default function Loading() {
  return (
    <div className={style.backdrop}>
      <div className={style.loaderContaier}>
        <SmallLoader />

        <div className={style.loaderText}>
          <h4>Loading trucks...</h4>
          <p>Please wait while we fetch the best travel trucks for you</p>
        </div>
      </div>
    </div>
  )
}
