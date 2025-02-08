import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { fetchAiAnswer } from '../api/AiApi';
import Layout from '../components/common/Layout';
import ChatBox from '../components/pages/AiPage/ChatBox';
import MessageInput from '../components/pages/AiPage/MessageInput';
import { ALLOWED_TOPICS } from '../utils';

const ALLOWED_TOPICS_LOWER = ALLOWED_TOPICS.map(topic => topic.toLowerCase());

const isKeywordsIncludesWord = (message) => {
	const lowerMessage = message.toLowerCase();
	return ALLOWED_TOPICS_LOWER.some(topic => lowerMessage.includes(topic));
};

const AiPage = () => {
	const [messages, setMessages] = useState([])

	const { mutate, isLoading, isError } = useMutation(fetchAiAnswer, {
		onSuccess: (data) => {
			setMessages(prev => ([
				...prev,
				{role: "assistant", content: data?.choices[0]?.message?.content || "Извини, я сейчас не работаю, попробуй в другой раз"},
			]))
		}
	})

	const handleAiForm = (message) => {
		setMessages(prev => ([
			...prev,
			{role: "user", content: message.trim()},
		]))
		
		if (!isKeywordsIncludesWord(message)) {
      setTimeout(() => {
        setMessages(prev => [...prev, { role: "assistant", content: "Извините, я могу говорить только про Аниме!" }]);
      }, 2000);
      return;
    }

		mutate(message)
	}

	// Error state
	useEffect(() => {
		if(isError) {
			setMessages(prev => ([
				...prev,
				{role: "assistant", content: "Кажется что-то пошло не так, попробуйте в другой раз!"},
			]))
		}
	}, [isError])

	return (
		<Layout>
			<div className="screen-max-width">
				<div className="w-full min-h-[calc(100dvh-176px)] flex flex-col py-4">
					<ChatBox messages={messages} />
					<MessageInput onSend={handleAiForm} isLoading={isLoading} />
				</div>
			</div>
		</Layout>
	)
}

export default AiPage