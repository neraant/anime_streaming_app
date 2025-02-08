import { FaBrain, FaUser } from 'react-icons/fa6';
import ReactMarkdown from "react-markdown";

const Message = ({ message }) => {
	const isAssistant = message.role === "assistant"
	
	return (
		<span className={`text-white text-base p-4 bg-gray-900 w-fit rounded-2xl flex items-center gap-2 ${isAssistant ? "" : "ml-auto"}`}>
			{isAssistant && (
				<div className="p-2 bg-gray-600 rounded-full mb-auto">
				<FaBrain fontSize={12} />
			</div>
			)}

			<span className="flex flex-col">
				<ReactMarkdown components={{ hr: () => (<span className='h-3' />)}}>
					{message.content}
				</ReactMarkdown>
			</span>

			{!isAssistant && (
				<div className="p-2 bg-gray-600 rounded-full mb-auto">
					<FaUser fontSize={12} />
				</div>
			)}
		</span>
	)
}

export default Message