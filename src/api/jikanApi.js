import axios from 'axios';

export const fetchAnimeData = async ({anime = "", page = 1, animeId = null}) => {
	const BASE_URL = import.meta.env.VITE_JIKAN_BASE_API_URL

	let url = `${BASE_URL}/anime`

	if (anime) {
		url = `${BASE_URL}/anime?q=${encodeURIComponent(anime)}`;
	} else if (animeId) {
		url = `${BASE_URL}/anime/${animeId}`;
	} else {
		url = `${BASE_URL}/anime?page=${page}&limit=20`;
	}

	console.log(url);

	const { data } = await axios.get(url)
	return data
}