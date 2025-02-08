import { useEffect, useRef, useState } from 'react'
import { FaCheck, FaPen } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { logOut } from '../../../Services/firebaseAuthService'
import { getUser, updateUser } from '../../../Services/firebaseUserServices'
import { useUser } from '../../../contexts/UserContext'

const ProfileDetails = () => {
	const { user, setUser, isLoading } = useUser()
	
	const [editName, setEditName] = useState("")
	const [isEditName, setIsEditName] = useState(false)
	const nameRef = useRef()

	const navigate = useNavigate()

	const handleSignOut = async () => {
		try {
			logOut()	
			setUser(null)
			navigate("/anime")
		} catch (error) {
			console.error("Ошибка во время выхода из аккаунта: ", error)
		}
	}

	const confirmEditName = async () => {
    if(!editName || editName.length > 16) {
			nameRef.current.style.borderBottom = '1px solid red'
			return
		}
		
		setIsEditName(false);

    const updatedUser = { ...user, displayName: editName }; 

    try {
        await updateUser(user.uid, editName);
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
        console.error("Ошибка при изменении имени: ", error);
    }
	};

	// Getting user
	useEffect(() => {
		const getUserData = async () => {
			if(user?.uid) {
				try {
					const userData = await getUser(user?.uid)
					setEditName(userData.displayName)
					localStorage.setItem("user", JSON.stringify({...user, displayName: editName}))
				} catch (error) {
					console.error("Ошибка при попытке получить пользователя: ", error)
				}
			}
		}
		getUserData()
	}, [user])

	useEffect(() => {
		if(isEditName) {
			nameRef.current?.focus()
		}
	}, [isEditName])

	if(isLoading) {
		return (
			<div className='screen-max-width'>
				<div className="flex items-center justify-between w-full">
					<div className="flex items-center w-full gap-4">
						<span className='bg-gray-300 animate-pulse w-full max-w-30 h-30 rounded-full' />

						<div className="flex flex-col gap-0.5 w-full">
							<span className='w-full h-8 max-w-[30%] bg-gray-300 animate-pulse rounded-md' />
							<span className='w-full h-5 max-w-[20%] bg-gray-300 animate-pulse rounded-md' />
						</div>

						<span className='bg-gray-300 animate-pulse w-full max-w-20 h-10 rounded-md ml-auto' />
					</div>
				</div>
			</div>
		)
	}

	return (
		<section>
			<div className="screen-max-width">
				{/* avatar - name - email */}
				<div className="flex items-center gap-4">
					<div className="relative overflow-hidden w-20 h-20 sm:w-30 sm:h-30 rounded-full group bg-purple-500">
						<img 
							className='relative z-0 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-full w-full h-full object-cover transition-all border-b-1 border-b-transparent duration-300'
							src={user?.photoURL || '/images/user_icon.svg'} 
							alt="avatar"
						/>
					</div>

					<div className="flex flex-col gap-0.5 leading-normal">
						{isEditName ? (
							<div className='flex items-center gap-2'>
								<input 
									type="text" 
									value={editName} 
									onChange={e => setEditName(e.target.value)}
									className='text-white font-semibold text-2xl outline-none border-none max-w-45'
									ref={nameRef}
								/>

								<button className='cursor-pointer' onClick={confirmEditName}>
									<FaCheck size={16} color='white' />
								</button>
							</div>
						) : (
							<h3 className='font-semibold text-base sm:text-2xl text-white flex items-center gap-2'>
								{user?.displayName || "Гость"}

								<button 
									className='cursor-pointer text-sm sm:text-base' 
									onClick={() => setIsEditName(true)}
								>
									<FaPen />
								</button>
							</h3>
						)}

						<span className='text-xs sm:text-sm text-gray-300'>
							{user?.email || "example@gmail.com"}
						</span>
					</div>

					<button 
						className='py-2 px-4 rounded-md bg-red-500 ml-auto text-white transition-all duration-300 hover:bg-red-700 cursor-pointer hidden sm:flex'
						onClick={handleSignOut}	
					>
						Выйти
					</button>
				</div>
			</div>
		</section>
	)
}

export default ProfileDetails