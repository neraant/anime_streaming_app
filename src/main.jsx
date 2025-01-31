import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import { SidebarProvider } from './contexts/SidebarContext'
import './index.css'
import AnimePage from './pages/AnimePage.jsx'
import NotFound from './pages/NotFound.jsx'
import WelcomePage from './pages/WelcomePage.jsx'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
  },
  {
    path: '/welcome',
    element: <WelcomePage />,
    errorElement: <NotFound />,
  },
  {
    path: '/anime/:id',
    element: <AnimePage />,
    errorElement:<NotFound />,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SidebarProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </SidebarProvider>
  </StrictMode>,
)
