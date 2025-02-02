import { FaArrowLeft } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { fetchAnimeData } from '../api/anilibriaApi';
import Layout from '../components/common/Layout';
import AnimeDetails from '../components/pages/AnimePage/AnimeDetails';
import VideoPlayer from '../components/pages/AnimePage/VideoPlayer';

const useQueryParams = () => {
	return new URLSearchParams(useLocation().search)
}

const AnimePage = () => {
	const query = useQueryParams()
	const animeId = query.get("id")

	const { data, isLoading, isError, error } = useQuery(
		["anime", animeId], 
		() => fetchAnimeData(animeId),
		{ enabled: !!animeId, retry: 3, retryDelay: 5000, refetchOnWindowFocus: false }
	)

	if(isLoading) {
		return (
			<Layout>
				<div className="screen-max-width">
					<div className='flex flex-col items-center md:flex-row md:items-start gap-4 w-full'>
						<div className='flex flex-col'>
							<div className='w-[250px] h-[355px] rounded-md bg-gray-700 animate-pulse' />
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
							onClick={() => history.back()}
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
					<VideoPlayer anime={data} />
				</div>
			</Layout>
		</>
	)
}

export default AnimePage