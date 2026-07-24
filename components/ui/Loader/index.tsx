import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom';
import { Oval } from 'react-loader-spinner';
import style from './Loader.module.css'
import SmallLoader from './SmallLoader';

const Loader = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return createPortal((
    <div className={style.backdrop}>
      <div className={style.loaderContaier}>
          <SmallLoader />
          
          <div className={style.loaderText}>
            <h4>Loading tracks...</h4>

            <p>Please wait while we fetch the best travel trucks for you</p>
          </div>

      </div>
    </div>
  ), document.body)
}
export default Loader
