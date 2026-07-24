'use client'

import { useEffect } from 'react'
import style from './error.module.css'

interface ErrorPageProps {
    error: Error & { digest?: string }
    reset: () => void
}

export default function Error({ error, reset }: ErrorPageProps) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <section className={style.container}>
            <div className={style.text}>
                <h3>Something went wrong</h3>
                <p>An unexpected error occurred. Please try again.</p>
            </div>

            <button className={style.btn} onClick={() => reset()}>Try again</button>
        </section>
    )
}
