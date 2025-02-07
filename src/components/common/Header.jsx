import { useEffect, useState } from 'react'
import { FaSpinner } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { useSidabar } from '../../contexts/SidebarContext'
import { useUser } from '../../contexts/UserContext'
import { getUser } from '../../Services/firebaseUserServices'
import userIcon from '/images/user_icon.svg'

const Header = () => {
	const { setIsSidebar } = useSidabar()
	const [ windowSize, setWindowSize ] = useState(window.innerWidth > 767)
	const { user, setUser } = useUser()
	const [isLoading, setIsLoading] = useState(false)

	const handleResize = () => {
		setWindowSize(window.innerWidth > 767)
	}

	// Getting user
	useEffect(() => {
		const getUserData = async () => {
			const userId = JSON.parse(localStorage.getItem("user"))?.uid

			if(userId) {
				setIsLoading(true)
				try {
					const user = await getUser(userId)
					setUser(user)
				} catch (error) {
					console.error("Ошибка при попытке получить пользователя: ", error)
				} finally {
					setIsLoading(false)
				}
			}
		}
		getUserData()
	}, [])

	// Handle resize
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
						<Link 
							to={`/profile`}
							className='relative rounded-full overflow-hidden w-14 h-14'
						>
							<img 
								src={user?.photoURL || userIcon}
								alt="avatar"
								className=' bg-[#ffffff80] w-full h-full object-cover'
							/>

							{isLoading && (
								<div className="absolute top-0 left-0 bg-[#00000070] w-full h-full flex-center animate-spin">
									<FaSpinner color='white' size={26} />
								</div>
							)}
						</Link>

						<div>
							<p className='text-white font-semibold text-base'>Добро пожаловать!</p>

							<span className='text-white text-lg flex items-center gap-2'>
								{user?.displayName || "Гость"}
								
								{isLoading && (
									<FaSpinner color='white' size={16} className='animate-spin' />
								)}
							</span>
						</div>
					</div>

					{windowSize && (
						<Link to="/anime">
							<h1 className='text-white font-semibold text-5xl mr-[186px]'>
								AniAnt
							</h1>
						</Link>
					)}

					<button 
						type='button'
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