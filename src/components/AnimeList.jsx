import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useDebounce } from 'use-debounce';
import { fetchAllAnimeData } from '../api/anilibriaApi';
import AnimeListItem from './AnimeListItem';

const AnimeList = ({ animeInput }) => {
	const [debouncedAnimeInput] = useDebounce(animeInput, 700)
	const [isFading, setIsFading] = useState(false)
	const [page, setPage] = useState(1)
	const {data, isLoading, isError} = useQuery(
		['animeList'],
		() => fetchAllAnimeData(),
		{ keepPreviousData: true, refetchOnWindowFocus: false }
	)
	console.log("animeList: ", data);

	// const {data, isLoading, isError} = useQuery(
	// 	['animeList', debouncedAnimeInput],
	// 	() => fetchAllAnimeData(debouncedAnimeInput),
	// 	{ keepPreviousData: true, refetchOnWindowFocus: false }
	// )

	// useEffect(() => {
	// 	window.scrollTo({ top: 0, behavior: 'smooth' })
	// }, [page])

	useEffect(() => {
		setIsFading(true)
		const timeout = setTimeout(() => {
			setIsFading(false)
		}, 300)

		return () => {
			clearTimeout(timeout)
		}
	}, [data])

	

	if(isLoading) {
		return (
			<div className="screen-max-width w-full">
				<h3 className='text-3xl text-white font-axiformaBold mb-4'>
					Anime
				</h3>

				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-6 gap-x-3 pb-11">
					{Array.from({ length: 8 }).map((_, index) => (
						<div key={index} className="rounded-lg overflow-hidden w-full">
							<div className="bg-gray-700 w-full h-[300px] rounded-lg animate-pulse" />

							<div className="w-[80%] mt-2 bg-gray-700 h-4 rounded-md animate-pulse" />

							<div className="w-[30%] mt-2 bg-gray-700 h-4 rounded-md animate-pulse" />
						</div>
					))}
				</div>
			</div>
		)
	}

	if(isError || !data) {
		return <h3 className='text-white text-4xl'>Ooops, something gone wrong, try again!</h3>
	}
	
	// const lastPage = data.pagination?.last_visible_page || 1;

	return (
		<div className="screen-max-width w-full">
			<div className="pb-8">
				<h3 className='text-3xl text-white font-axiformaBold mb-4'>
					Anime
				</h3>

				<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-6 gap-x-3'>
					{data && data?.list?.flat().map((anime, index) => (
						<AnimeListItem
							key={index} 
							anime={anime} 
							isFading={isFading}
						/>
					))}
				</div>

				<div className="flex gap-2 items-center mt-7">
					<button 
						className='cursor-pointer p-1 bg-purple-500 rounded-lg'
						onClick={() => setPage(prev => prev - 1)}
						disabled={page === 1}
					>
						<img src="/images/pagination-arrow_icon.svg" alt="back" width={28} height={28}/>
					</button>

					<div className="text-white ml-auto mr-auto">
						{/* Page {page} of {lastPage || 0} */}
					</div>

					<button 
						className='cursor-pointer p-1 bg-purple-500 rounded-lg'
						onClick={() => setPage(prev => prev + 1)}	
						// disabled={page >= lastPage}
					>
						<img src="/images/pagination-arrow_icon.svg" alt="next" width={28} height={28} style={{transform: "rotate(180deg)"}}/>
					</button>
				</div>
			</div>
		</div>
	)
}

export default AnimeList