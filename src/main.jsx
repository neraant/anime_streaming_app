import { lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Preloader from './components/common/Preloader.jsx'
import { SidebarProvider } from './contexts/SidebarContext'
import './index.css'

// pages with lazy loading
const Home = lazy(() => import('./pages/Home'))
const NotFound = lazy(() => import('./pages/NotFound'))
const AnimePage = lazy(() => import('./pages/AnimePage'))
const AiPage = lazy(() => import('./pages/AiPage'))

// react query
const queryClient = new QueryClient()

// react router
const router = createBrowserRouter([
  {
    path: '/',
    element: 
      <Suspense fallback={<Preloader />} >
        <App />
      </Suspense>,
    errorElement: <NotFound />,
  },
  {
    path: '/anime',
    element: 
      <Suspense fallback={<Preloader />} >
        <Home />
      </Suspense>,
    errorElement: <NotFound />,
  },
  {
    path: '/anime/:id',
    element: 
      <Suspense fallback={<Preloader />} >
        <AnimePage />
      </Suspense>,
    errorElement: <NotFound />,
  },
  {
    path: '/aiAssistant',
    element: 
      <Suspense fallback={<Preloader />} >
        <AiPage />
      </Suspense>,
    errorElement: <NotFound />,
  },
])

createRoot(document.getElementById('root')).render(
    <SidebarProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </SidebarProvider>
)
