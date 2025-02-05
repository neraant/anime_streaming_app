import { gsap } from 'gsap/gsap-core'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

// Регистрируем CSSPlugin
import { useGSAP } from '@gsap/react'
import { CSSPlugin } from 'gsap/CSSPlugin'
gsap.registerPlugin(CSSPlugin)

const WelcomePage = () => {
	const navigate = useNavigate()
	const mainRef = useRef()
	const animRef = useRef()

	useEffect(() => {
		animRef.current = gsap.to(mainRef.current, {
			y: "-100vh",
			duration: 0.6,
			paused: true,
			ease: "power2.out",
		})
	}, [])

	useGSAP(() => {
		// Изображение
		gsap.to(".img-anim", {
			scale: 1,
			opacity: 1,
			duration: 0.6,
		}),

		// Див с текстом
		gsap.to(".div-anim", {
			y: 0,
			opacity: 1,
			delay: 0.6,
		}),

		// Анимация тени
		gsap.to(".left-shadow", {
			y: -15,
			opacity: 0.5,
			duration: 2,
			repeat: -1,
			yoyo: true,
			ease: "power1.inOut"
		}),

		// Анимация тени
		gsap.to(".right-shadow", {
			y: 15,
			opacity: 0.5,
			duration: 2,
			repeat: -1,
			yoyo: true,
			ease: "power1.inOut"
		})
	}, [])

	const handleButtonClick = () => {
		animRef.current.play()

		setTimeout(() => {	
			navigate('/anime')
		}, 600)
	}

	return (
		<div ref={mainRef} className='main-anim flex-center flex-col h-[100dvh]'>
			<div className="img-anim opacity-0 scale-[0.6] w-full realtive">
				<div className="bg-purple-500 rounded-full w-[380px] h-[380px] absolute z-0 top-[-10%]" />
				
				<img 
					className='relative z-1'
					src="./images/welcome_bg.png" 
					alt="welcome"
				/>
			</div>
			
			<div className="screen-max-width flex flex-col items-center div-anim opacity-0 translate-y-[20px]">
				<h1 className=' text-3xl text-center text-white mb-5 mt-5'>
					Регистрация
				</h1>

				<p className='text-white text-base text-center mb-8'>
					Смотри аниме здесь с AniLibria!
				</p>

				<button
					onClick={handleButtonClick} 
					className=" text-center text-base text-white p-[2px] gradient-border w-full h-full rounded-full cursor-pointer relative"
				>
					<div className="absolute top-[15px] left-[-20px] bg-[#19A1BE] h-[86px] w-[60%] rounded-full opacity-40 blur-2xl pointer-events-none left-shadow" />
					
					<div className="rounded-full bg-gray-800 py-2 w-full h-[40px] pointer-events-none" />

					<div className="absolute top-[12px] left-[50%] -translate-x-[50%]">
						Смореть
					</div>
					
					<div className="absolute top-[-15px] right-[-20px] bg-[#7D4192] h-[60px] w-[60%] rounded-full opacity-40 blur-2xl pointer-events-none right-shadow" />
				</button>
			</div>
		</div>
	)
}

export default WelcomePage