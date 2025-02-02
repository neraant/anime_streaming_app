import { FaRightToBracket } from 'react-icons/fa6'
import { useSidabar } from '../../contexts/SidebarContext'

const Sidebar = () => {
	const {isSidebar, setIsSidebar} = useSidabar()
	
	return (
		<aside className={`absolute top-0 left-0 w-full h-[100dvh] transition-all duration-500 ${isSidebar ? 'left-[-350px]' : 'left-[-120%]'}`}>
			<div 
				className={`absolute top-0 right-[-350px] z-20 w-[100dvw] h-full bg-gray-900 transition-all duration-500 ${isSidebar ? 'opacity-50' : 'opacity-0 pointer-events-none'}`} 
				onClick={() => setIsSidebar(false)}
			/>
			
			<div className='absolute left-0 top-0 w-[100dvw] z-50 max-w-[350px] bg-gray-900 h-[100dvh] shadow-inner py-8'>
				
				<a href="/anime">
					<h1 className='text-white font-axiforma text-5xl mb-8 px-8'>
						AniAnt
					</h1>
				</a>
				
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
						<a href="#" className='flex gap-2' >
							<FaRightToBracket fontSize={20} />
							Выйти
						</a>
					</li>
				</ul>
			</div>
		</aside>
	)
}

export default Sidebar