import { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { FaRotate } from 'react-icons/fa6';
import { useMutation } from 'react-query';
import { useDebounce } from 'use-debounce';
import { fetchAllAnimeData } from '../../../api/anilibriaApi';
import AnimeListItem from './AnimeListItem';

const AnimeList = ({ animeInput, isSearching = false }) => {
	const [debouncedAnimeInput] = useDebounce(animeInput, 700)
	const [isFading, setIsFading] = useState(false)
	const [visibleAnime, setVisibleAnime] = useState(20)
	const [page, setPage] = useState(1)
	const [animeList, setAnimeList] = useState([])
	const [meta, setMeta] = useState({pagination: {
		current_page: 1,
		total: 0,
		total_pages: 1,
	}})
	
	const { mutate, data, isLoading, isError } = useMutation(
		({ animeName, page }) => fetchAllAnimeData({ animeName, page })
	)

	useEffect(() => {
    setAnimeList([]);
    setPage(1);
    setVisibleAnime(20);
		setMeta({ pagination: { current_page: 1, total: 0, total_pages: 1 } });
    mutate({ animeName: debouncedAnimeInput.trim(), page: 1 });
	}, [debouncedAnimeInput]);

	useEffect(() => {
		if(!data) return

		const normalizedData = Array.isArray(data.data) 
			? data.data 
			: Array.isArray(data) 
			? data 
			: [];

		const normalizedMeta = data?.meta || { 
			pagination: { total: normalizedData.length } 
		};

		setAnimeList(prev => ([...prev, ...normalizedData]))
		setMeta(normalizedMeta)

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
				<h3 className='flex items-center gap-2 text-3xl text-white font-semibold mb-4'>
					{!isSearching ? 'Аниме' : "Найдено"}
					{isLoading && (
						<FaSpinner className='animate-spin' fontSize={24} />
					)}
				</h3>

				<div className="pb-8">
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6 gap-x-3">
						{Array.from({ length: 20 }).map((_, index) => (
							<div key={index} className="rounded-lg overflow-hidden w-full">
								<div className="bg-gray-700 w-full h-[380px] rounded-lg animate-pulse" />

								<div className="w-[80%] mt-2 bg-gray-700 h-4 rounded-md animate-pulse" />

								<div className="w-[30%] mt-2 bg-gray-700 h-4 rounded-md animate-pulse" />
							</div>
						))}
					</div>
				</div>
			</div>
		)
	}

	if(isError || !data) {
		return (
			<div className='screen-max-width'>
				<div className="flex flex-col">
					<span className='text-white text-xl mb-4'>
						Упс, что-то пошло не так! Попробуйте 
						<span className='text-purple-500'> перезагрузить </span> 
						страницу🥰
					</span>

					<button 
						className='w-fit py-2 px-3 bg-purple-500 rounded-md text-white text-base cursor-pointer flex gap-2 items-center  transition-all duration-300 hover:bg-purple-400'
						onClick={() => location.reload()}
					>
					<FaRotate fontSize={18} className='relative bottom-[1px]' /> Перезагрузить
					</button>
				</div>
			</div>
		)
	}

	return (
		<div className="screen-max-width w-full">
			<div className="pb-8">
				<div className="flex justify-between items-center">
					<h3 className='flex items-center gap-2 text-3xl text-white font-semibold mb-4'>
						{!isSearching ? 'Аниме' : "Найдено"}
						<span className='text-purple-500 text-sm mt-auto mb-[6px]'>
							({meta.pagination.total})
						</span>
					</h3>

					<div className="flex items-center">
						{/* Фильтрация */}
					</div>
				</div>

				{!animeList ? (
						<span className='text-white text-xl mb-4'>
							Аниме по такому запросу не найдено🙄
						</span>
				) : (
					<div className='flex flex-col items-center w-full'>
						<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6 gap-x-3'>
							{animeList.map((anime, index) => (
								<AnimeListItem
									key={index} 
									anime={anime} 
									isFading={isFading}
								/>
							))}
						</div>

						{animeList?.length < meta?.pagination?.total && (
							<div className="mt-6">
								<button 
									className='py-2 px-4 bg-purple-500 text-white rounded-md cursor-pointer transition-bg duration-300 hover:bg-purple-900'
									onClick={() => {
										if (meta.pagination.total > visibleAnime) {
											setPage(prev => prev + 1)
											setVisibleAnime(prev => Math.min(prev + 20, meta.pagination.total));
											mutate({ animeName: debouncedAnimeInput.trim(), page: page + 1 });
										}
									}}
								>
									Загрузить ещё
								</button>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default AnimeList