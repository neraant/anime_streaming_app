import { useEffect, useState } from 'react'
import { useSidabar } from '../contexts/SidebarContext'
import userIcon from '/images/user_icon.svg'

const Header = () => {
	const { setIsSidebar } = useSidabar()
	const [ windowSize, setWindowSize ] = useState(window.innerWidth > 767)

	const handleResize = () => {
		setWindowSize(window.innerWidth > 767)
	}

	useEffect(() => {
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])
	
	return (
		<header className='w-full py-8'>
			<div className="screen-max-width">
				<div className="flex justify-between items-center">
					<div className="flex items-center gap-2">
						<a href="#">
							<img 
								src={userIcon}
								alt="avatar" 
								width={48} 
								height={48} 
								className='rounded-full bg-[#ffffff80] p-2'
							/>
						</a>

						<div>
							<p className='text-white text-base'>Welcome!</p>

							<span className='text-white text-lg font-axiformaBold'>Anton</span>
						</div>
					</div>

					{windowSize && (
						<a href="/">
							<h1 className='text-white font-axiforma text-5xl'>
								AniAnt
							</h1>
						</a>
					)}

					<button 
						className='ml-auto md:ml-0 flex flex-col items-end w-6 h-full cursor-pointer'
						onClick={() => setIsSidebar(prev => !prev)}
					>
						<span className='w-6 h-[2px] rounded-[2px] mb-1 bg-white inline-block' />
						<span className='w-3 h-[2px] rounded-[2px] mb-1 bg-white inline-block' />
						<span className='w-6 h-[2px] rounded-[2px] bg-white inline-block' />
					</button>
				</div>
			</div>
		</header>
	)
}

export default Header