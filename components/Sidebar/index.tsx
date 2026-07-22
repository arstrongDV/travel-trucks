'use client'
import React from 'react'
import style from './Sidebar.module.css'
import { CiMap } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import { useQuery } from '@tanstack/react-query';
import { getCampersFilters } from '@/services/campers';
import { FromFilters, EngineFilters, TransmissionFilters } from '../../constans/filters'

const Sidebar = () => {

    const {data, isLoading, isError} = useQuery({
        queryKey: ["filters"],
        queryFn: () => getCampersFilters()
    })

    if(isLoading) return <p role="status">Loading...</p>

  return (
    <aside className={style.sidebarContainer}>
        <form className={style.filtersWrapper} onSubmit={(e) => e.preventDefault()}>
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
                        {data?.engines.map((form) => (
                            <li key={form}>
                                <label className={style.listItem}>
                                    <input type='radio' name="form" value={form} />
                                    <span>{EngineFilters[form]}</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </fieldset>

                <fieldset className={style.listWrapper}>
                    <legend>Transmission</legend>
                    <ul className={style.filterList}>
                        {data?.transmissions.map((form) => (
                            <li key={form}>
                                <label className={style.listItem}>
                                    <input type='radio' name="form" value={form} />
                                    <span>{TransmissionFilters[form]}</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </fieldset>
            </div>

            <div className={style.btns}>
                <button type="submit">Search</button>
                <button type="reset"> <RxCross1 aria-hidden="true"/>  Clear filters</button>
            </div>
        </form>
    </aside>
  )
}

export default Sidebar
