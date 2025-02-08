import useAnimeList from '../../../hooks/api/useAnimeList';
import AnimeListHeader from './AnimeListHeader';
import AnimeListItem from './AnimeListItem';
import ErrorMessage from './ErrorMessage';
import LoadingSkeleton from './LoadingSkeleton';
import LoadMoreButton from './LoadMoreButton';

const AnimeList = ({ animeInput, isSearching = false }) => {
	const {animeList, meta, isLoading, isError, isFading, loadMore} = useAnimeList(animeInput)

	if(isLoading) {
		return <LoadingSkeleton isSearching={isSearching} isLoading={isLoading} />
	}

	if(isError || !animeList.length) {
		return <ErrorMessage />
	}

	return (
		<div className="screen-max-width w-full">
			<div className="pb-8">
				<AnimeListHeader 
					total={meta.pagination.total} 
					isSearching={isSearching} 
				/>

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

						<LoadMoreButton 
							isVisible={animeList?.length < meta?.pagination?.total}
							onClick={loadMore}
						/>
					</div>
				)}
			</div>
		</div>
	)
}

export default AnimeList