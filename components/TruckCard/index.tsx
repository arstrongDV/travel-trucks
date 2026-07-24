import React from 'react'
import style from './TruckCard.module.css'
import Image from 'next/image'
import { Campers } from '@/types/campers'
import { TiStarFullOutline } from "react-icons/ti";
import { CiMap } from "react-icons/ci";
import { FaGasPump } from "react-icons/fa6";
import { LiaSitemapSolid } from "react-icons/lia";
import { FaCarAlt } from "react-icons/fa";
import LinesEllipsis from 'react-lines-ellipsis'
import {FromFilters, EngineFilters, TransmissionFilters} from '../../constans/filters'
import Link from 'next/link';

interface TruckCardProps {
    truck: Campers;
}

const TruckCard = ({ truck }: TruckCardProps) => {
  return (
    <div className={style.truckCardContainer}>
        <div className={style.wrapper}>
            <Image 
                src={truck.coverImage}
                alt={truck.name}
                className={style.truckImage}
                height={240}
                width={219}
            />

            <span className={style.truckInfo}>
                <div className={style.priceReviewsInfo}>
                    <div className={style.priceInfo}>
                        <h4>{truck.name}</h4>
                        <p>
                            {new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(truck.price)}
                        </p>
                    </div>
                    <span className={style.locationReviewsInfo}>
                        <span className={style.ratingInfo}>
                            <TiStarFullOutline className={style.starIcon} />
                            <p>{truck.rating} ({truck.totalReviews} Reviews)</p>
                        </span>
                        <span className={style.locationInfo}>
                            <CiMap className={style.iconMap} aria-hidden="true" />
                             <p>{truck.location}</p>
                        </span>
                    </span>
                </div>

                <LinesEllipsis
                    text={truck.description}
                    className={style.description}
                    maxLine='1'
                    ellipsis='...'
                    trimRight
                    basedOn='letters'
                />

                <ul className={style.characteristicsList}>
                    <li className={style.characteristicsElement}>
                        <FaGasPump className={style.characIcon} />
                        {EngineFilters[truck.engine]}
                    </li>
                    <li className={style.characteristicsElement}>
                        <LiaSitemapSolid className={style.characIcon} />
                        {TransmissionFilters[truck.transmission]}
                    </li>
                    <li className={style.characteristicsElement}>
                        <FaCarAlt className={style.characIcon} />
                        {FromFilters[truck.form]}
                    </li>
                </ul>

                <Link 
                    className={style.btnShowMore}
                    href={`/catalog/${truck.id}`}
                    target='_blank'
                    rel="noopener noreferrer"
                >
                    Show more
                </Link>
            </span>
        </div>
    </div>
  )
}

export default TruckCard
