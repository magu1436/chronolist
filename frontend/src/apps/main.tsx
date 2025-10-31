import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/assets/index.css'
import App from './App.tsx'
import { RouterProvider } from 'react-router-dom'
import routesBasic from './routes/routeBasic.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <RouterProvider router={routesBasic} />
  </StrictMode>,
)
