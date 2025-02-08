import { useEffect, useReducer } from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { fetchAnimeData } from '../api/anilibriaApi';
import Layout from '../components/common/Layout';
import AnimeDetails from '../components/pages/AnimePage/AnimeDetails';
import EpisodeDetails from '../components/pages/AnimePage/EpisodeDetails';
import ErrorMessage from '../components/pages/AnimePage/ErrorMessage';
import LoadingSkeleton from '../components/pages/AnimePage/LoadingSkeleton';
import VideoPlayer from '../components/pages/AnimePage/VideoPlayer/VideoPlayer';
import { useUser } from '../contexts/UserContext';
import { addHistory } from '../Services/firebaseHistoryServices';

const useQueryParams = () => {
	return new URLSearchParams(useLocation().search)
}

const episodeReducer = (state, action) => {
	switch(action.type) {
		case "change": 
			return {
				...state,
				episodeInfo: {
					name: action.payload.name,
					date: action.payload.date,
				}
			}
		default:
			return state;
	}
}

const AnimePage = () => {
	const queryParams = useQueryParams()
	const animeId = queryParams.get("id")

	// Getting user info
	const { user } = useUser()

	// Store episode data (name, date etc.)
	const initialState = {
		episodeInfo: {
			name: "",
			date: "",
		}
	}
	const [state, dispatch] = useReducer(episodeReducer, initialState)

	// Load data
	const { data, isLoading, isError } = useQuery(
		["anime", animeId], 
		() => fetchAnimeData(animeId),
		{ enabled: !!animeId, retry: 3, retryDelay: 5000, refetchOnWindowFocus: false }
	)

	// Getting episode info
	const handleEpisodeChange = (episode) => {
		dispatch({
			type: "change",
			payload: {
				name: episode?.name || null,
				date: episode?.updated_at || null,
			}
		})
	}

	// Adding anime to history
	useEffect(() => {
		if(!user?.uid || !data) return

		const addAnimeToHistory = async () => {		
			if(user?.uid && data) {
				const updatedAnime = {
					id: data?.id || null, 
					name: data?.name || null,
					genres: data?.genres || null,
					year: data?.year || null,
					favoritesIn: data?.added_in_users_favorites || data?.favoritesIn,
					poster: data.poster || null,
					url: `/anime/${data?.alias}?id=${data?.id}`,
				}

				try {
					await addHistory(user?.uid, data?.id, updatedAnime)
				} catch (error) {
					console.error("Ошибка при добавлении в историю: ", error)
				}
			}
		}

		addAnimeToHistory()
	}, [user?.uid, data])

	if(isLoading) {
		return (
			<Layout>
				<LoadingSkeleton />
			</Layout>
		)
	}

	if(isError || !data) { 
		return (
			<Layout>
				<ErrorMessage />
			</Layout>
		)
	}

	return (
		<>
			<Layout>
				<div className="screen-max-width">
					<AnimeDetails anime={data} />
					<VideoPlayer 
						episodeInfo={state} 
						handleEpisodeChange={handleEpisodeChange} 
						anime={data} 
					/>
					<EpisodeDetails episodeInfo={state} />
				</div>
			</Layout>
		</>
	)
}

export default AnimePage