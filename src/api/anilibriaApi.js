import axios from 'axios';

const BASE_URL = import.meta.env.VITE_ANILIBRIA_BASE_API_URL

export const fetchAllAnimeData = async ({animeName = '', page = 1}) => {
	let url = `${BASE_URL}/anime/catalog/releases`
	
	const params = {
		page,
		limit: 20,
	}

	if(animeName) {
		url = `${BASE_URL}/app/search/releases`;
		params.query = animeName;
		params.include = "meta";
	}

	try {
		const { data } = await axios.get(url, { 
			params,
		})
		return data
	} catch (error) {
		console.error('Error message:', error.message);
  	console.error('Error response:', error.response ? error.response.data : 'No response');
	}
}

export const fetchAnimeData = async (animeId) => {
	try {
		const { data } = await axios.get(`${BASE_URL}/anime/releases/${animeId}`)
		return data
	} catch (error) {
		console.error(error.message)
	}
}