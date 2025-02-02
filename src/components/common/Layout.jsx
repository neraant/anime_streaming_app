import { useSidabar } from '../../contexts/SidebarContext'
import Footer from './Footer'
import Header from './Header'
import Sidebar from './Sidebar'

const Layout = ({ children }) => {
	const { isSidebar } = useSidabar()
	
	return (
		<div className={`w-full max-w-[100dvw] transition-all duration-500 ${isSidebar ? 'translate-x-[350px]' : 'translate-x-[0px]'}`}>
      <Header />
			<main className={`w-full min-h-[calc(100dvh-176px)]`}>
        {children}
      </main>
			<Sidebar />
			<Footer />
		</div>
	)
}

export default Layout