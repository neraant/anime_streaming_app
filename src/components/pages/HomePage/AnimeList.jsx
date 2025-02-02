import { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { FaRotate } from 'react-icons/fa6';
import { useMutation } from 'react-query';
import { useDebounce } from 'use-debounce';
import { fetchAllAnimeData } from '../../../api/anilibriaApi';
import AnimeListItem from './AnimeListItem';

const AnimeList = ({ animeInput }) => {
	const [debouncedAnimeInput] = useDebounce(animeInput, 700)
	const [isFading, setIsFading] = useState(false)
	const [page, setPage] = useState(1)

	const { mutate, data, isLoading, isError } = useMutation(
		({ animeName, page }) => fetchAllAnimeData({ animeName, page })
	)

	useEffect(() => {
    setPage(1);
  }, [debouncedAnimeInput]);

	useEffect(() => {
    mutate({ animeName: debouncedAnimeInput.trim(), page });
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}, [debouncedAnimeInput, page]);

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
				<h3 className='flex items-center gap-2 text-3xl text-white font-axiformaBold mb-4'>
					Аниме
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

					<div className="flex gap-2 items-center mt-7 w-full">
						<button 
							className='cursor-pointer p-1 bg-purple-500 rounded-lg'
							disabled
						>
							<img src="/images/pagination-arrow_icon.svg" alt="back" width={28} height={28}/>
						</button>

						<div className="text-white ml-auto mr-auto">
							Page 0 of 0
						</div>

						<button 
							className='cursor-pointer p-1 bg-purple-500 rounded-lg'
							disabled
						>
							<img src="/images/pagination-arrow_icon.svg" alt="next" width={28} height={28} style={{transform: "rotate(180deg)"}}/>
						</button>
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

	const lastPage = data.pagination?.pages || 1;

	return (
		<div className="screen-max-width w-full">
			<div className="pb-8">
				<div className="flex justify-between items-center">
					<h3 className='flex items-center gap-2 text-3xl text-white font-axiformaBold mb-4'>
						Аниме 
						<span className='text-purple-500 text-sm mt-auto mb-[6px]'>
							({data.pagination.total_items})
						</span>
					</h3>

					<div className="flex items-center">
						{/* Фильтрация */}
					</div>
				</div>

				{data && !(data.list.length) ? (
						<span className='text-white text-xl mb-4'>
							Аниме по такому запросу не найдено🙄
						</span>
				) : (
					<div className='flex flex-col items-center w-full'>
						<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6 gap-x-3'>
							{data && data.list.flat().map((anime, index) => (
								<AnimeListItem
									key={index} 
									anime={anime} 
									isFading={isFading}
								/>
							))}
						</div>

						<div className="flex gap-2 items-center mt-7 w-full">
							<button 
								className='cursor-pointer p-1 bg-purple-500 rounded-lg'
								onClick={() => setPage(prev => prev - 1)}
								disabled={page === 1}
							>
								<img src="/images/pagination-arrow_icon.svg" alt="back" width={28} height={28}/>
							</button>

							<div className="text-white ml-auto mr-auto">
								Page {page} of {lastPage || 0}
							</div>

							<button 
								className='cursor-pointer p-1 bg-purple-500 rounded-lg'
								onClick={() => setPage(prev => prev + 1)}	
								disabled={page >= lastPage}
							>
								<img src="/images/pagination-arrow_icon.svg" alt="next" width={28} height={28} style={{transform: "rotate(180deg)"}}/>
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default AnimeList