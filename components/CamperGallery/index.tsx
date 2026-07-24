'use client'
import React, { useState } from 'react'
import Image from 'next/image'

import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'

import { Thumbs, FreeMode } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/thumbs'

import style from './CamperGallery.module.css'
import type { CamperGallery as CamperGalleryImage } from '@/types/campers'

interface CamperGalleryProps {
  gallery: CamperGalleryImage[];
  name: string;
}

const CamperGallery = ({ gallery, name }: CamperGalleryProps) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)

    return (
        <div className={style.galleryContainer}>
            <Swiper
                spaceBetween={27}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                modules={[FreeMode, Thumbs]}
                className={style.mainSwiper}
            >
                {gallery.map((image, index) => (
                <SwiperSlide key={image.id}>
                    <div className={style.mainImageWrapper}>
                        <Image
                            src={image.original}
                            alt={`${name} photo ${index + 1}`}
                            fill
                            priority={index === 0}
                            sizes="(max-width: 1200px) 100vw, 1200px"
                            className={style.mainImage}
                        />
                    </div>
                </SwiperSlide>
                ))}
            </Swiper>

            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={32}
                slidesPerView="auto"
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Thumbs]}
                className={style.thumbsSwiper}
            >
                {gallery.map((image, index) => (
                <SwiperSlide key={image.id} className={style.thumbSlide}>
                    <div className={style.thumbImageWrapper}>
                        <Image
                            src={image.thumb}
                            alt={`${name} thumbnail ${index + 1}`}
                            fill
                            sizes="150px"
                            className={style.image}
                        />
                    </div>
                </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default CamperGallery;