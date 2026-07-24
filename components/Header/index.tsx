'use client'
import React, { useState } from 'react'
import style from './Header.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HiMenu, HiX } from 'react-icons/hi'

const Header = () => {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <Link href='/' onClick={() => setIsMenuOpen(false)}>
              <Image src='/icons/logo.svg' alt='logo' width={136} height={15}/>
        </Link>

        <button
            type='button'
            className={style.burger}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
            {isMenuOpen ? <HiX aria-hidden="true" /> : <HiMenu aria-hidden="true" />}
        </button>

      <nav className={`${style.menu} ${isMenuOpen ? style.menuOpen : ''}`}>
        {navLinks.map(({href, label}) => (
            <Link
                key={label}
                href={href}
                className={`${style.link} ${isActiveLink(href) ? style.activeLink : ''}`}
                onClick={() => setIsMenuOpen(false)}
            >
                {label}
            </Link>
        ))}
      </nav>
    </header>
  )
}

export default Header
