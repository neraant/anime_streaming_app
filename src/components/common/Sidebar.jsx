import { FaChevronDown, FaRightToBracket } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { useSidabar } from '../../contexts/SidebarContext'
import { logOut } from '../../Services/firebaseAuthService'

const Sidebar = () => {
	const {isSidebar, setIsSidebar} = useSidabar()
	const navigate = useNavigate()
	
	return (
		<aside className={`absolute top-0 left-0 w-full max-w-[350px] h-[100dvh] transition-all duration-500 ${isSidebar ? 'left-[0px]' : 'left-[-120%]'}`}>
			<div className='absolute left-0 top-0 w-full z-50 bg-gray-900 h-[100dvh] shadow-inner py-8'>
				<div className="flex items-center justify-between mb-8 px-8">
					<a href="/anime">
						<h1 className='text-white  text-5xl'>
							AniAnt
						</h1>
					</a>

					<button 
						className='cursor-pointer animate-bounce rotate-[90deg]'
						onClick={() => setIsSidebar(false)}
					>
						<FaChevronDown color='white' fontSize={24} />
					</button>
				</div>
				
				<ul className='flex flex-col h-[calc(100%-100px)]'>
					<li className='text-white text-base flex items-center'>
						<a href="#" className='w-full py-4 px-8 transition-bg duration-300 hover:bg-[#ffffff40]'>
							Аниме
						</a>
					</li>

					<span className='inline-block w-full bg-white h-[1px] opacity-30' />

					<li className='text-white text-base flex items-center'>
						<a href="#" className='w-full py-4 px-8 transition-bg duration-300 hover:bg-[#ffffff40]'>
							Любимые
						</a>
					</li>

					<span className='inline-block w-full bg-white h-[1px] opacity-30' />

					<li className='text-white text-base flex items-center'>
						<a href="#" className='w-full py-4 px-8 transition-bg duration-300 hover:bg-[#ffffff40]'>
							История
						</a>
					</li>

					<span className='inline-block w-full bg-white h-[1px] opacity-30' />

					<li className='text-white text-base flex items-center'>
						<a href="/aiAssistant" className='w-full py-4 px-8 transition-bg duration-300 hover:bg-[#ffffff40]'>
							AI помощник
						</a>
					</li>

					<li className='text-white text-base mt-auto px-8'>
						<button 
							onClick={() => {
								logOut();
								navigate("/anime")
							}} 
							className='flex gap-2 cursor-pointer' 
						>
							<FaRightToBracket fontSize={20} />
							Выйти
						</button>
					</li>
				</ul>
			</div>
		</aside>
	)
}

export default Sidebar