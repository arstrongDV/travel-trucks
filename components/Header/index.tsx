'use client'
import React from 'react'
import style from './Header.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Header = () => {
    const pathname = usePathname();

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/catalog', label: 'Catalog' }
    ];

    const isActiveLink = (href: string) => {
        if(href == '/') return pathname == '/'
        return pathname.startsWith(href)
    }

  return (
    <header className={style.headerContainer}>
        <Link href='/'>
              <Image src='/icons/logo.svg' alt='logo' width={136} height={15}/>
        </Link>

      <nav className={style.menu}>
        {navLinks.map(({href, label}) => (
            <Link 
                key={label}
                href={href} 
                className={`${style.link} ${isActiveLink(href) ? style.activeLink : ''}`}
            >
                {label}
            </Link>
        ))}
      </nav>
    </header>
  )
}

export default Header
