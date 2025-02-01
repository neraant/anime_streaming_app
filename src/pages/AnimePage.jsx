import { FaArrowLeft } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { fetchAnimeData } from '../api/anilibriaApi';
import AnimeDetails from '../components/AnimeDetails';
import Layout from '../components/Layout';

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

	console.log(data);

	if(isLoading) {
		return (
			<Layout>
				<div className="screen-max-width">
					<div className='flex flex-col items-center md:flex-row md:items-start gap-4 w-full'>
						<div className="">
							<div className='w-[250px] h-[355px] rounded-md bg-gray-700 animate-pulse' />
						</div>

						<div className="flex flex-col w-full h-full">
							<div className="bg-gray-700 animate-pulse w-[70%] h-8 mb-2 rounded-md" />

							<div className="bg-gray-700 animate-pulse w-[50%] h-7 mb-6 rounded-md" />
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
				</div>
			</Layout>
		</>
	)
}

export default AnimePage