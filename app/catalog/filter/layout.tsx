import React from 'react'
import style from './Layout.module.css'

export default function RootLayout({
  children,
  sidebar
}: Readonly<{
  children: React.ReactNode;
  sidebar:  React.ReactNode;
}>) {
  return (
    <div className={style.container}>
        {sidebar}
        {children}
    </div>
  );
}
