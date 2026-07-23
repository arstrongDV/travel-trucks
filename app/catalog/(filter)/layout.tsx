'use client'
import React from 'react'
import style from './Layout.module.css'
import { CatalogLoadingProvider, useCatalogLoading } from '@/components/ui/Loader/CatalogLoadingProvider'
import Loader from '@/components/ui/Loader'

function CatalogLayoutContent({
  children,
  sidebar
}: Readonly<{
  children: React.ReactNode;
  sidebar: React.ReactNode;
}>) {
  const { isLoading } = useCatalogLoading()

  return (
    <div className={style.container}>
      {isLoading && <Loader />}
      <div style={{ display: isLoading ? 'none' : 'contents' }}>
        {sidebar}
        {children}
      </div>
    </div>
  )
}

export default function RootLayout({
  children,
  sidebar
}: Readonly<{
  children: React.ReactNode;
  sidebar: React.ReactNode;
}>) {
  return (
    <CatalogLoadingProvider>
      <CatalogLayoutContent sidebar={sidebar}>{children}</CatalogLayoutContent>
    </CatalogLoadingProvider>
  );
}
