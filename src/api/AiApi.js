import OpenAI from 'openai';
import { TEMPLATE_MESSAGE } from '../utils';

const BASE_URL = import.meta.env.VITE_CHATGPT_BASE_API_URL
const API_KEY = import.meta.env.VITE_CHATGPT_API_KEY
const AI_MODEL = import.meta.env.VITE_CHATGPT_MODEL

const openai = new OpenAI({
	baseURL: BASE_URL,
  apiKey: API_KEY,
	dangerouslyAllowBrowser: true,
});

export const fetchAiAnswer = async (userQuestion) => {
	const message = TEMPLATE_MESSAGE + userQuestion	
	try {
		console.log("fetch");
		const response = await openai.chat.completions.create({
			model: AI_MODEL,
			messages: [
				{
					"role": "user",
					"content": userQuestion,
				}
			]
		})
		return response
	} catch (error) {
		console.error("Ошибка API:", error.response?.data || error.message);
	}
}