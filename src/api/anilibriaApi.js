import axios from 'axios';

const BASE_URL = import.meta.env.VITE_ANILIBRIA_BASE_API_URL

export const fetchAllAnimeData = async (animeName = '') => {
	let url = `${BASE_URL}/title/updates`
	
	const params = {
		limit: 20,
		filter: 'id,names,genres,posters,season',
	}

	if(animeName) {
		url = `${BASE_URL}/title/search`;
		params.search = animeName;
	}

	try {
		const { data } = await axios.get(url, { params })
		return data
	} catch (error) {
		console.error(error.message)
	}
}

export const fetchAnimeData = async (animeId) => {
	console.log("BASE_URL:", BASE_URL);
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