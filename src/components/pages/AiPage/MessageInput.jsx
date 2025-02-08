import { useState } from 'react'
import { FaArrowRight, FaSpinner } from 'react-icons/fa6'

const MessageInput = ({ onSend, isLoading }) => {
	const [userMessage, setUserMessage] = useState("")
	
	const handleSubmit = (e) => {
		e.preventDefault()

		if(userMessage.trim()) {
			onSend(userMessage.trim())
			setUserMessage("")
		}
	}

	return (
		<form 
			className="w-full py-4 px-4 bg-gray-900 mt-4 relative rounded-md flex"
			onSubmit={(e) => handleSubmit(e, userMessage.trim())}
			onKeyDown={e => {
				if(e.key === "Enter") handleSubmit(e, userMessage.trim())
			}}
		>
			<textarea 
				type="text" 
				className='w-full pr-2 text-white placeholder:text-gray-700 text-base outline-none border-none  resize-none field-sizing-content max-w-[calc(100%-32px)] max-h-[100px] overflow-y-auto' 
				placeholder='Привет! Что хочешь спросить?'
				value={userMessage}
				onChange={(e) => setUserMessage(e.target.value)}
			/>

			<button 
				type='submit'
				className='p-2 bg-white rounded-full absolute right-2 top-3 cursor-pointer' 
				onClick={null}
			>
				{isLoading
					? <FaSpinner className='animate-spin' fontSize={16} /> 
					: <FaArrowRight fontSize={16} />
				}
			</button>
		</form>
	)
}

export default MessageInput