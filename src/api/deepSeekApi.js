import OpenAI from 'openai'

const BASE_URL = import.meta.env.VITE_DEEPSEEK_BASE_URL_API
const API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY
const AI_MODEL = import.meta.env.VITE_DEEPSEEK_MODEL

const openai = new OpenAI({
	baseURL: BASE_URL,
	apiKey: API_KEY,
	dangerouslyAllowBrowser: true,
	defaultHeaders: {},
})

export const fetchAiAnswer = async (userQuestion) => {
	try {
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
		console.error(error)
	}
}