import { useEffect, useRef, useState } from 'react';
import { FaArrowRight, FaBrain, FaSpinner, FaUser } from 'react-icons/fa6';
import ReactMarkdown from 'react-markdown';
import { useMutation } from 'react-query';
import { fetchAiAnswer } from '../api/deepSeekApi';
import Layout from '../components/common/Layout';
import { ALLOWED_TOPICS } from '../utils';

const ALLOWED_TOPICS_LOWER = ALLOWED_TOPICS.map(topic => topic.toLowerCase());

const isKeywordsIncludesWord = (message) => {
	const lowerMessage = message.toLowerCase();
	return ALLOWED_TOPICS_LOWER.some(topic => lowerMessage.includes(topic));
};

const AiPage = () => {
	const [userMessage, setUserMessage] = useState("")
	const [messages, setMessages] = useState([])
	const chatDiv = useRef()

	const { mutate, data, isLoading, isError } = useMutation(fetchAiAnswer, {
		onSuccess: (data) => {
			setMessages(prev => ([
				...prev,
				{role: "assistant", content: data?.choices[0]?.message?.content || "Извини, я сейчас не работаю, попробуй в другой раз😊"},
			]))
		}
	})

	const handleAiForm = (e, message) => {
		e.preventDefault()

		if(!message) return
		if(!isKeywordsIncludesWord(message)) {
			setMessages(prev => ([
				...prev,
				{role: "user", content: message},
			]))
			setUserMessage("")
			
			setTimeout(() => {
				setMessages(prev => ([
					...prev,
					{role: "assistant", content: "Извините, я могу говорить только про Аниме!😊"},
				]))
			}, 2000)
			return
		}

		mutate(message)

		setMessages(prev => ([
			...prev,
			{role: "user", content: userMessage.trim()},
		]))

		setUserMessage("")
	}

	useEffect(() => {
		if(chatDiv.current) {
			chatDiv.current.scrollTo({ top: chatDiv.current.scrollHeight, behavior: "smooth" })
		}
	}, [messages])

	if(isError) {
		setMessages(prev => ([
			...prev,
			{role: "assistant", content: "Кажется что-то пошло не так, попробуйте в другой раз!😊"},
		]))
	}

	return (
		<Layout>
			<div className="screen-max-width">
				<div className="w-full min-h-[calc(100dvh-176px)] flex flex-col py-4">
					<div ref={chatDiv} id="ai-box" className="h-full flex flex-col gap-2 min-h-[calc(100dvh-280px)] max-h-[calc(100dvh-280px)] bg-gray-800 overflow-y-auto pr-2">
						{messages.map((message, index) => (
							message.role === "assistant" ? (
								<span key={index} className='text-white font-sans text-base p-4 bg-gray-900 w-fit rounded-2xl flex items-center gap-2'>
									<div className="p-2 bg-gray-600 rounded-full mb-auto">
										<FaBrain fontSize={12} />
									</div>
										<span className="flex flex-col">
											<ReactMarkdown components={{ hr: () => (
												<span className='h-3' />
											) }}>
												{message.content}
											</ReactMarkdown>
										</span>
								</span>
							) : (
								<span key={index} className='text-white font-sans text-base p-4 bg-gray-900 w-fit rounded-2xl flex items-center gap-2 ml-auto'>
									{message.content}
									<div className="p-2 bg-gray-600 rounded-full mb-auto">
										<FaUser fontSize={12} />
									</div>
								</span>
							)
						))}
					</div>
					
					<form 
						className="w-full py-4 px-4 bg-gray-900 mt-4 relative rounded-md flex"
						onSubmit={(e) => handleAiForm(e, userMessage.trim())}
					>
						<textarea 
							type="text" 
							className='w-full pr-2 text-white placeholder:text-gray-700 text-base outline-none border-none font-sans resize-none field-sizing-content max-w-[calc(100%-32px)] max-h-[100px] overflow-y-auto' 
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
				</div>
			</div>
		</Layout>
	)
}

export default AiPage