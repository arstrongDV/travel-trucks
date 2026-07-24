'use client'
import { getCamper } from '@/services/campers';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import style from './CatalogDetails.module.css'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import CamperGallery from '@/components/CamperGallery';
import { CiMap } from 'react-icons/ci';
import { TiStarFullOutline } from 'react-icons/ti';
import Loader from '@/components/ui/Loader';
import {FromFilters} from '../../../constans/filters'
import Comments from '@/components/Comments';
import BookForm from '@/components/BookForm';

interface CatalogDetailsPageClientProps {
    catalogId: string;
}

const CatalogDetailsPageClient = ({ catalogId }: CatalogDetailsPageClientProps) => {

    const {data, isLoading, isError} = useQuery({
        queryKey: ['camper', catalogId],
        queryFn: () => getCamper(catalogId)
    })

    if (isLoading) {
        return <Loader />
    }

    if (isError || !data) {
        return <p>Failed to load camper details.</p>
    }

  return (
    <section className={style.catalogDetailsContainer}>
        <div className={style.topPart}>
            <CamperGallery gallery={data.gallery} name={data.name} />
            <aside className={style.mainInfo}>
                <div className={style.truckDescriptionWrapper}>
                    <div className={style.priceInfo}>
                        <h4>{data.name}</h4>
                    </div>
                    <span className={style.locationReviewsInfo}>
                        <div className={style.ratingWrapper}>
                            <span className={style.ratingInfo}>
                                <TiStarFullOutline className={style.starIcon} />
                                <p>{data.rating} ({data.totalReviews} Reviews)</p>
                            </span>
                            <span className={style.locationInfo}>
                                <CiMap className={style.iconMap} aria-hidden="true" />
                                    <p>{data.location}</p>
                            </span>
                        </div>

                        <p className={style.price}>
                            {new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(data.price)}
                        </p>
                    </span>

                    <p className={style.description}>{data.description}</p>
                </div>

                <div className={style.truckInfoWrapper}>
                    <div className={style.details}>
                        <h4>Vehicle details</h4>
                        <ul className={style.detailsList}>
                            {data.amenities.map((e, i) => (
                                <li key={i} className={style.detailElement}>
                                    {e}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={style.line}></div>

                    <ul className={style.characteristicsList}>
                        <li key={data.form} className={style.characteristicElem}>
                            <span className={style.key}>Form</span>
                            <span className={style.value}>{FromFilters[data.form]}</span>
                        </li>
                        <li key={data.length} className={style.characteristicElem}>
                            <span className={style.key}>Length</span>
                            <span className={style.value}>{data.length}</span>
                        </li>
                        <li key={data.width} className={style.characteristicElem}>
                            <span className={style.key}>Width</span>
                            <span className={style.value}>{data.width}</span>
                        </li>
                        <li key={data.height} className={style.characteristicElem}>
                            <span className={style.key}>Height</span>
                            <span className={style.value}>{data.height}</span>
                        </li>
                        <li key={data.tank} className={style.characteristicElem}>
                            <span className={style.key}>Tank</span>
                            <span className={style.value}>{data.tank}</span>
                        </li>
                        <li key={data.consumption} className={style.characteristicElem}>
                            <span className={style.key}>Consumption</span>
                            <span className={style.value}>{data.consumption}</span>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>

        <div className={style.bottomPart}>
            <h4>Reviews</h4>
            
            <div className={style.commentWrapper}>
                <Comments catalogId={catalogId} />
                <BookForm catalogId={catalogId} />
            </div>
        </div>
    </section>
  )
}

export default CatalogDetailsPageClient;