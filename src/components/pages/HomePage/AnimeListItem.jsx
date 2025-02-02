
const AnimeListItem = ({ anime, isFading }) => {
	return (
		<a 
			href={`/anime/${anime.names.en}?id=${anime.id}`} 
			className={`flex flex-col rounded-lg overflow-hidden w-full max-w-[300px] relative transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}
		>
			<div className="w-full min-h-[380px] max-h-[380px] rounded-lg overflow-hidden">
				<img 
					src={`https://anilibria.tv${anime.posters.original.url}` || null}
					className='bg-gray-700 w-full h-full object-cover transition-all duration-300 hover:scale-[1.05] hover:brightness-70'
				/>
			</div>

			<h5 className='text-purple-500 text-base mt-2 line-clamp-2'>
				{anime.names.ru || null}
			</h5>

			<span className='text-sm text-gray-400 mt-auto'>
				{anime.season.year || null}
			</span>

			{anime.score && (
				<div className="absolute top-5 left-0 bg-purple-500 px-2 py-1 rounded-br-md rounded-tr-md flex items-center gap-1 shadow-md shadow-purple-400 pointer-events-none">
					<img 
						src="/images/star_icon.svg" 
						alt="rating"
					/>

					<span className="text-white text-sm relative bottom-[-2px]">
						{parseFloat(anime.score).toFixed(1)}
					</span>
				</div>
			)}
		</a>
	)
}

export default AnimeListItem