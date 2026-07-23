import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom';
import { Oval } from 'react-loader-spinner';
import style from './Loader.module.css'

const Loader = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return createPortal((
    <div className={style.backdrop}>
      <div className={style.loaderContaier}>
          <Oval
              visible={true}
              height="80"
              width="80"
              color="#5c7069"
              secondaryColor="#f0f0f0"
              strokeWidth={3}
              strokeWidthSecondary={3}
              ariaLabel="loading"
          />

          <div className={style.loaderText}>
            <h4>Loading tracks...</h4>

            <p>Please wait while we fetch the best travel trucks for you</p>
          </div>

      </div>
    </div>
  ), document.body)
}
export default Loader
