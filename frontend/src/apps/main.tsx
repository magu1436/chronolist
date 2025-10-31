import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/assets/index.css'
import { RouterProvider } from 'react-router-dom'
import routesBasic from './routes/routeBasic.tsx'
import "bootstrap/dist/css/bootstrap.min.css"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={routesBasic} />
  </StrictMode>,
)
