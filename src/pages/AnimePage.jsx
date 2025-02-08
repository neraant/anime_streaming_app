import { useCallback, useEffect, useReducer } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchAnimeData } from '../api/anilibriaApi';
import Layout from '../components/common/Layout';
import AnimeDetails from '../components/pages/AnimePage/AnimeDetails';
import EpisodeDetails from '../components/pages/AnimePage/EpisodeDetails';
import VideoPlayer from '../components/pages/AnimePage/VideoPlayer';
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
	const queryParams = new URLSearchParams(useLocation().search)
	const animeId = queryParams.get("id")

	const navigate = useNavigate()

	// Getting user info
	const { user, isAuthenticated } = useUser()

	// Store episode data (name, date etc.)
	const initialState = {
		episodeInfo: {
			name: "",
			date: "",
		}
	}
	const [state, dispatch] = useReducer(episodeReducer, initialState)

	// Load data
	const { data, isLoading, isError, error } = useQuery(
		["anime", animeId], 
		() => fetchAnimeData(animeId),
		{ enabled: !!animeId, retry: 3, retryDelay: 5000, refetchOnWindowFocus: false }
	)

	// Getting episode info
	const handleEpisodeChange = useCallback((episode) => {
		dispatch({
			type: "change",
			payload: {
				name: episode?.name || null,
				date: episode?.updated_at || null,
			}
		})
	}, [dispatch])

	// Adding anime to history
	useEffect(() => {
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
	}, [data])

	if(isLoading) {
		return (
			<Layout>
				<div className="screen-max-width relative">
					<div className='flex flex-col items-center md:flex-row md:items-start gap-4 w-full mb-6'>
						<div className='flex flex-col'>
							<div className='w-[350px] h-[400px] rounded-md bg-gray-700 animate-pulse' />

							<div className='w-full h-[28px] mt-1 rounded-md bg-gray-700 animate-pulse' />
						</div>

						<div className="flex flex-col w-full h-full">
							<div className="bg-gray-700 animate-pulse w-[70%] h-8 mb-2 rounded-md" />

							<div className="bg-gray-700 animate-pulse w-[50%] h-7 mb-6 rounded-md" />

							<div className="grid grid-cols-6 w-full">
								<div className="grid grid-cols-1 col-span-3 md:col-span-2 gap-y-4">
									<span className="bg-gray-700 animate-pulse w-[40%] h-5 rounded-md" />
									<span className="bg-gray-700 animate-pulse w-[40%] h-5 rounded-md" />
									<span className="bg-gray-700 animate-pulse w-[40%] h-5 rounded-md" />
									<span className="bg-gray-700 animate-pulse w-[40%] h-5 rounded-md" />
									<span className="bg-gray-700 animate-pulse w-[40%] h-5 rounded-md" />
								</div>

								<div className="grid grid-cols-1 col-span-3 md:col-span-4 gap-y-4">
									<span className="bg-gray-700 animate-pulse w-[60%] h-5 rounded-md" />
									<span className="bg-gray-700 animate-pulse w-[60%] h-5 rounded-md" />
									<span className="bg-gray-700 animate-pulse w-[60%] h-5 rounded-md" />
									<span className="bg-gray-700 animate-pulse w-[60%] h-5 rounded-md" />
									<span className="bg-gray-700 animate-pulse w-[60%] h-5 rounded-md" />
								</div>
							</div>

							<div className="flex flex-col gap-2 mt-6">
								<span className="bg-gray-700 animate-pulse w-[30%] h-6 rounded-md" />
								<span className="bg-gray-700 animate-pulse w-[100%] h-48 rounded-md" />
							</div>
						</div>
					</div>

					<div className='w-full h-[200px] bg-gradient-to-b from-transparent to-gray-800 absolute bottom-[0px] left-0 ' />
				</div>
			</Layout>
		)
	}

	if(isError || !data) { 
		return (
			<Layout>
				<div className="screen-max-width">
					<div className="flex flex-col items-center gap-8 py-24">
						<img src="/images/no_anime.png" alt="not found" className='max-w-[300px]' />

						<span className='text-center text-white text-2xl'>
							Хмм... Данных об этом аниме нет!
						</span>

						<button 
							className='w-fit py-2 px-3 bg-purple-500 rounded-md text-white text-base cursor-pointer flex gap-2 items-center  transition-all duration-300 hover:bg-purple-400'
							onClick={() => navigate(-1)}
						>
							<FaArrowLeft fontSize={16} className='relative bottom-[1px]' /> 
							Вернуться назад
						</button>
					</div>
				</div>
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