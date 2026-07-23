'use client'
import { createContext, useCallback, useContext, useState, ReactNode } from 'react'

type CatalogSection = 'sidebar' | 'trucks'

interface CatalogLoadingContextValue {
  isLoading: boolean
  setSectionLoading: (section: CatalogSection, loading: boolean) => void
}

const CatalogLoadingContext = createContext<CatalogLoadingContextValue | null>(null)

export const useCatalogLoading = () => {
  const ctx = useContext(CatalogLoadingContext)
  if (!ctx) throw new Error('useCatalogLoading must be used within CatalogLoadingProvider')
  return ctx
}

export const CatalogLoadingProvider = ({ children }: { children: ReactNode }) => {
  const [loadingSections, setLoadingSections] = useState<Record<CatalogSection, boolean>>({
    sidebar: true,
    trucks: true,
  })

  const setSectionLoading = useCallback((section: CatalogSection, loading: boolean) => {
    setLoadingSections((prev) => (prev[section] === loading ? prev : { ...prev, [section]: loading }))
  }, [])

  const isLoading = loadingSections.sidebar || loadingSections.trucks

  return (
    <CatalogLoadingContext.Provider value={{ isLoading, setSectionLoading }}>
      {children}
    </CatalogLoadingContext.Provider>
  )
}
