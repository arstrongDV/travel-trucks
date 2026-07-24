import type { ReactNode } from 'react'
import style from './Layout.module.css'

export default function CatalogLayout({
  children,
  sidebar,
}: Readonly<{
  children: ReactNode;
  sidebar: ReactNode;
}>) {
  return (
    <div className={style.container}>
      {sidebar}
      {children}
    </div>
  );
}
