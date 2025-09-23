import React, { Suspense } from 'react'
import { LoaderCircle } from 'lucide-react'

const LazyLoader = ({ children }) => {
  return (
    <Suspense 
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <LoaderCircle className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
            <p className="text-muted-foreground">Cargando...</p>
          </div>
        </div>
      }
    >
      {children}
    </Suspense>
  )
}

export default LazyLoader
