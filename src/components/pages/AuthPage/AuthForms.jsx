import { useEffect, useRef, useState } from 'react'
import { FaXmark } from 'react-icons/fa6'
import AuthSignInForm from './AuthSignInForm'
import AuthSignUpForm from './AuthSignUpForm'

const AuthForms = () => {
	const [form, setForm] = useState(1)
	const [validateMessage, setValidateMessage] = useState("")

	const logoRef = useRef()

	useEffect(() => {
		if(!logoRef.current) return
		logoRef.current.style.transform = `rotateY(${form * 180}deg)`
	}, [form])

	useEffect(() => {
		if (!validateMessage) return;
		const validateTimeout = setTimeout(() => {
			setValidateMessage("");
		}, 2000);
	
		return () => clearTimeout(validateTimeout);
	}, [validateMessage]);

	useEffect(() => {
		setValidateMessage("");  
	}, [form]);

	return (
		<>
			<div   
				className={`absolute top-5 left-[50%] translate-x-[-50%] p-3 rounded-md bg-red-500 flex items-center justify-center gap-2 transition-all duration-300 ease-in-out pointer-events-none ${validateMessage ? "opacity-100 scale-x-100 w-full max-w-120" : "opacity-0 scale-x-0 w-0 max-w-0"}`}
			>
				<FaXmark color='white' />

				<p className='text-white '>
					{validateMessage}
				</p>
			</div>

			<section className='max-h-[100dvh] pb-4'>
				<div className="screen-max-width">
					<div className="w-full h-full flex flex-col items-center overflow-hidden">
						<img 
							ref={logoRef}
							src="/images/logo.svg" 
							alt="logotype" 
							className='w-full max-w-30 md:max-w-50 transition-all duration-600'
						/>
						
						<div 
							className="w-full h-full flex justify-center md:items-center transition-all duration-600 ease-in-out"
							style={{translate: `${form * 50}%`,}}
						>
							<AuthSignInForm 
								setValidateMessage={setValidateMessage} 
								validateMessage={validateMessage} 
								setForm={setForm} 
							/>

							<AuthSignUpForm 
								setValidateMessage={setValidateMessage} 
								validateMessage={validateMessage} 
								setForm={setForm} 
							/>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default AuthForms