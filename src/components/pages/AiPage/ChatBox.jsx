import React, { useEffect, useRef } from 'react'
import Message from './Message'

const ChatBox = ({ messages }) => {
	const chatDiv = useRef()

	useEffect(() => {
		if(chatDiv.current) {
			chatDiv.current.scrollTo({ top: chatDiv.current.scrollHeight, behavior: "smooth" })
		}
	}, [messages])

	return (
		<div ref={chatDiv} id="ai-box" className="h-full flex flex-col gap-2 min-h-[calc(100dvh-280px)] max-h-[calc(100dvh-280px)] bg-gray-800 overflow-y-auto pr-2">
			{messages.map((message, index) => (
				<Message key={index} message={message} />
			))}
		</div>
	)
}

export default ChatBox