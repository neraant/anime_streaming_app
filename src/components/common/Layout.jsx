import { useEffect } from 'react'
import { useSidabar } from '../../contexts/SidebarContext'
import Footer from './Footer'
import Header from './Header'
import Sidebar from './Sidebar'

const Layout = ({ children }) => {
	const { isSidebar, setIsSidebar } = useSidabar()
	
	useEffect(() => {
		if(isSidebar) {
			document.querySelector('body').classList.add("sidebar")
		} else {
			document.querySelector('body').classList.remove("sidebar")
		}

		return () => {
			document.querySelector('body').classList.remove("sidebar")
		}
	}, [isSidebar])

	return (
		<div className='w-full h-full overflow-x-hidden'>
			<Sidebar />

			<div className={`w-full h-full min-h-screen transition-transform duration-500 ${isSidebar ? 'translate-x-[350px]' : 'translate-x-0'}`}>
				<Header />

				<main className={`w-full min-h-[calc(100dvh-176px)]`}>
					{children}
				</main>

				<Footer />
			</div>
			
			<div 
				className={`fixed inset-0 w-full h-full bg-black transition-all duration-500 ${isSidebar ? 'opacity-50 visible' : 'opacity-0 invisible'}`}
				onClick={() => setIsSidebar(false)}
			/>
		</div>
	)
}

export default Layout