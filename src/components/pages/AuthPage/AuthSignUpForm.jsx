import { useEffect, useState } from 'react';
import { FaCircleCheck, FaEnvelope, FaLock, FaSpinner } from 'react-icons/fa6';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { signUpWithEmail, signWithGoogle } from '../../../Services/firebaseAuthService';

const validatePassword = (password) => {
	const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
	return passwordRegex.test(password);
}

const validateEmail = (email) => {
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return emailRegex.test(email);
}

const validationMessages = {
  isSymbol: "Спец. символ",
  isLatin: "Буква латинского алфавита",
  isNumber: "Цифра",
  isLength: "Минимум 8 символов"
};

const AuthSignUpForm = ({ setForm, setValidateMessage }) => {
	const [isEmailFocused, setIsEmailFocused] = useState(false)
	const [isPasswordFocused, setIsPasswordFocused] = useState(false)
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const [passwordValidation, setPasswordValidation] = useState({
		isSymbol: false,
		isLatin: false,
		isNumber: false,
		isLength: false
	});

	const navigate = useNavigate()

	const emailMutation = useMutation({
		mutationFn: async () => signUpWithEmail(email.toLowerCase(), password),
		onSuccess: (user) => {
			localStorage.setItem("user", JSON.stringify(user))
			setTimeout(() => {
				setEmail("")
				setPassword("")
			}, 1000)
			setValidateMessage("");
			navigate("/anime")
		},
		onError: (error) => {
			setValidateMessage(error.message || "Ошибка при регистрации!")
			console.error(error)
		}
	})

	const handleSubmitSignInForm = async (e) => {
		e.preventDefault()

		if(!email || !password) return

		if(!validateEmail(email)) {
			setValidateMessage("Email введён неверно!")
			return
		}
		if(!validatePassword(password)) {
			setValidateMessage("Пароль введён неверно!")
			return
		}

		emailMutation.mutate()
	}

	const handleGoogleSign = async () => {
		try {
			const user = await signWithGoogle()
			localStorage.setItem("user", JSON.stringify(user))
			setValidateMessage(false)
			navigate("/anime")
		} catch (error) {
			setValidateMessage(error.message || "Ошибка при входе через Google!");
		}
	}

	useEffect(() => {
		setPasswordValidation({
			isSymbol: /[@$!%*?&]/.test(password),
			isLatin: /[A-Za-z]/.test(password),
			isNumber: /\d/.test(password),
			isLength: password.length >= 8
		});
	}, [password]);

	return (
		<>
			<form onSubmit={handleSubmitSignInForm} className='flex flex-col items-center w-full flex-none'>
				<h2 className='text-white font-semibold text-2xl md:text-3xl'>
					Зарегистрироваться
				</h2>

				<div className="flex flex-col gap-6 w-full mt-10 max-w-100">
					<label className='relative' htmlFor="signUpEmail">
						<span 
							className="top-[50%] translate-y-[-50%] absolute left-3 text-gray-300 flex items-center gap-2"
						>
							<FaEnvelope />
							
							<span className={`relative transition-all duration-300 px-1 bg-gray-900 rounded-md ${isEmailFocused ? "-top-5.5 " : "top-0"}`}>
								Email
							</span>
						</span>
			
						<input 
							type='text' 
							name="signUpEmail"
							id='signUpEmail'
							className='w-full bg-gray-900 p-3 pl-10 rounded-md border-none text-white transition-all duration-300 focus:bg-[#ad46ff75] outline-1 outline-transparent focus:outline-purple-500'
							value={email}
							autoComplete='email'
							onChange={e => setEmail(e.target.value)}
							onFocus={() => setIsEmailFocused(true)}
							onBlur={e => e.target.value === "" && setIsEmailFocused(false)}
						/>
					</label>

					<div className="">
						<label className='relative' htmlFor="signUpPassword">
							<span 
								className="top-[50%] translate-y-[-50%] absolute left-3 text-gray-300 flex items-center gap-2"
							>
								<FaLock />
								
								<span className={`relative transition-all duration-300 px-1 bg-gray-900 rounded-md ${isPasswordFocused ? "-top-5.5 " : "top-0"}`}>
									Пароль
								</span>
							</span>
				
							<input 
								type='password' 
								name="signUpPassword"
								id='signUpPassword'
								className='w-full bg-gray-900 p-3 pl-10 rounded-md border-none text-white transition-all duration-300 focus:bg-[#ad46ff75] outline-1 outline-transparent focus:outline-purple-500'
								value={password}
								autoComplete='current-password'
								onChange={e => setPassword(e.target.value)}
								onFocus={() => setIsPasswordFocused(true)}
								onBlur={e => e.target.value === "" && setIsPasswordFocused(false)}
							/>
						</label>

						<div className="flex flex-col mt-2 gap-[2px]">
						{Object.entries(passwordValidation).map(([key, value]) => (
							<span key={key} className={`text-xs flex items-center gap-1.5 ${value ? 'text-green-600' : 'text-gray-200'}`}>
								<FaCircleCheck color={value ? 'green' : 'gray'} />
								{validationMessages[key]}
							</span>
						))}
						</div>
					</div>
				</div>

				<button 
					type="submit"
					className={`mt-5 w-full text-white bg-purple-500 rounded-full py-3 font-semibold cursor-pointer transition-all duration-300 hover:bg-purple-800 max-w-100 flex justify-center items-center gap-3 ${emailMutation.isLoading && "bg-purple-800"}`	}
					disabled={emailMutation.isLoading}
				>
					Зарегистрироваться
					{emailMutation.isLoading && (
						<span className='animate-spin'>
							<FaSpinner color='white' size={16} />
						</span>
					)}
				</button>

				<div className="flex flex-col gap-4 w-full max-w-100">
					<div className="flex items-center gap-3 mt-10">
						<span className='w-full h-[1px] bg-white opacity-10' />

						<span className='flex-none text-white'>
							Или продолжите с
						</span>

						<span className='w-full h-[1px] bg-white opacity-10' />
					</div>

					<div className="flex-center">
						<button 
							className='bg-gray-900 rounded-lg border-1 border-[#ffffff30] p-2 cursor-pointer transition-all duration-300 hover:brightness-125'
							onClick={handleGoogleSign}
						>
							<img src="/images/google_icon.svg" alt="google" width={32} />
						</button>
					</div>
				</div>

				<p className='text-white flex gap-1 items-center mt-8'>
					Уже есть аккаунт?
					<button 
						className='text-purple-500 cursor-pointer'
						onClick={(e) => {
							e.preventDefault();
							setForm(prev => prev * -1);
						}} 
					>
						Войти
					</button>
				</p>
			</form>
		</>
	)
}

export default AuthSignUpForm