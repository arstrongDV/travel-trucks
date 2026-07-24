'use client'
import React, { useState } from 'react'
import style from './Sidebar.module.css'
import { CiMap } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import { useSuspenseQuery } from '@tanstack/react-query';
import { getCampersFilters } from '@/services/campers';
import { FromFilters, EngineFilters, TransmissionFilters } from '../../constans/filters'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const Sidebar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isFormEmpty, setIsFormEmpty] = useState(true);

    const {data} = useSuspenseQuery({
        queryKey: ["filters"],
        queryFn: () => getCampersFilters()
    })

    const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const params = new URLSearchParams(searchParams.toString())

        for (const [key, value] of formData.entries()) {
            if (value) {
                if(key == "location") {
                    params.set(key, (value as string).trim().toLowerCase())
                } else{
                    params.set(key, value as string)
                }
            } else {
                params.delete(key)
            }
        }

        router.push(`${pathname}?${params.toString()}`)
    }

    const onFormChange = (e: React.ChangeEvent<HTMLFormElement>) => {
        const formData = new FormData(e.currentTarget)
        const hasValue = Array.from(formData.values()).some(
            (value) => typeof value === 'string' && value.trim() !== ''
        )
        setIsFormEmpty(!hasValue)
    }

  return (
    <aside className={style.sidebarContainer}>
        <form
            className={style.filtersWrapper}
            onSubmit={onSubmit}
            onChange={onFormChange}
            onReset={() => setIsFormEmpty(true)}
        >
            <label className={style.locationFillter} htmlFor="location">
                Location

                <div className={style.inputWrapper}>
                    <CiMap className={style.iconMap} aria-hidden="true" />
                    <input
                        className={style.inputLocation}
                        type='text'
                        id='location'
                        name='location'
                        placeholder='Kyiv'
                    />
                </div>
            </label>

            <div className={style.fillters}>
                <h3>Filters</h3>

                <fieldset className={style.listWrapper}>
                    <legend>Camper form</legend>
                    <ul className={style.filterList}>
                        {data?.forms.map((form) => (
                            <li key={form}>
                                <label className={style.listItem}>
                                    <input type='radio' name="form" value={form} />
                                    <span>{FromFilters[form]}</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </fieldset>

                <fieldset className={style.listWrapper}>
                    <legend>Engine</legend>
                    <ul className={style.filterList}>
                        {data?.engines.map((engine) => (
                            <li key={engine}>
                                <label className={style.listItem}>
                                    <input type='radio' name="engine" value={engine} />
                                    <span>{EngineFilters[engine]}</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </fieldset>

                <fieldset className={style.listWrapper}>
                    <legend>Transmission</legend>
                    <ul className={style.filterList}>
                        {data?.transmissions.map((transmission) => (
                            <li key={transmission}>
                                <label className={style.listItem}>
                                    <input type='radio' name="transmission" value={transmission} />
                                    <span>{TransmissionFilters[transmission]}</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </fieldset>
            </div>

            <div className={style.btns}>
                <button className={style.btnSearch} type="submit" disabled={isFormEmpty}>Search</button>
                <button className={style.btnReset} type="reset" onClick={() => router.push(pathname)}> <RxCross1 aria-hidden="true"/>  Clear filters</button>
            </div>
        </form>
    </aside>
  )
}

export default Sidebar
