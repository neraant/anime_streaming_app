import { lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Preloader from './components/common/Preloader.jsx'
import PrivateRoutes from './components/common/PrivateRoutes.jsx'
import { SidebarProvider } from './contexts/SidebarContext'
import { UserProvider } from './contexts/UserContext.jsx'
import './index.css'
import AnimeSearch from './pages/AnimeSearch.jsx'
import AuthPage from './pages/AuthPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import ScrollToTop from './components/common/ScrollToTop.jsx'

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
		element: (
			<Suspense fallback={<Preloader />}>
				<ScrollToTop />
				<App />
			</Suspense>
		),
		errorElement: <NotFound />
	},
	{
		path: '/anime',
		element: (
			<Suspense fallback={<Preloader />}>
				<ScrollToTop />
				<Home />
			</Suspense>
		),
		errorElement: <NotFound />
	},
	{
		path: '/anime/search',
		element: (
			<Suspense fallback={<Preloader />}>
				<ScrollToTop />
				<AnimeSearch />
			</Suspense>
		),
		errorElement: <NotFound />
	},
	{
		path: '/anime/:id',
		element: (
			<Suspense fallback={<Preloader />}>
				<ScrollToTop />
				<AnimePage />
			</Suspense>
		),
		errorElement: <NotFound />
	},
	{
		path: '/profile',
		element: (
			<PrivateRoutes>
				<Suspense fallback={<Preloader />}>
					<ScrollToTop />
					<ProfilePage />
				</Suspense>
			</PrivateRoutes>
		),
		errorElement: <NotFound />
	},
	{
		path: '/sign',
		element: (
			<Suspense fallback={<Preloader />}>
				<ScrollToTop />
				<AuthPage />
			</Suspense>
		),
		errorElement: <NotFound />
	},
	{
		path: '/aiAssistant',
		element: (
			<Suspense fallback={<Preloader />}>
				<ScrollToTop />
				<AiPage />
			</Suspense>
		),
		errorElement: <NotFound />
	}
])

createRoot(document.getElementById('root')).render(
	<SidebarProvider>
		<QueryClientProvider client={queryClient}>
			<UserProvider>
				<RouterProvider router={router} />
			</UserProvider>
		</QueryClientProvider>
	</SidebarProvider>
)
