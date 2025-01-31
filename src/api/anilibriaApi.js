import axios from 'axios';

const BASE_URL = import.meta.env.VITE_ANILIBRIA_BASE_API_URL

export const fetchAllAnimeData = async () => {
	try {
		const { data } = await axios.get(`${BASE_URL}/title/updates`, {
			params: { 
				limit: 100,
				filter: 'id,names,genres,posters,season',
			}
		})

		return data
	} catch (error) {
		console.error(error.message)
	}
}

export const fetchAnimeData = async (animeId) => {
	try {
		const { data } = await axios.get(`${BASE_URL}/title?id=${animeId}`, {
			params: {
				filter: 'id,names,genres,posters,type,status,player.list.24,description,season'
			}
		})
		return data
	} catch (error) {
		console.error(error.message)
	}
}