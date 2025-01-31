import { useSidabar } from '../contexts/SidebarContext'
import Footer from './Footer'
import Header from './Header'
import Sidebar from './Sidebar'

const Layout = ({ children }) => {
	const { isSidebar } = useSidabar()
	
	return (
		<>
			<Sidebar />
			<div className={`w-full transition-all duration-500 ${isSidebar ? 'translate-x-[350px]' : 'translate-x-[0px]'}`}>
        <Header />
        {children}
      </div>
			<Footer />
		</>
	)
}

export default Layout