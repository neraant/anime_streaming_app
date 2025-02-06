import { FaHeart } from 'react-icons/fa';

const AnimeListItem = ({ anime, isFading }) => {
	return (
		<a 
			href={`/anime/${anime.alias}?id=${anime.id}`} 
			className={`flex flex-col rounded-lg overflow-hidden w-full max-w-[350px] relative transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}
		>
			<div className="relative w-full min-h-[380px] max-h-[380px] rounded-lg overflow-hidden group">
				<img 
					src={`https://anilibria.top${anime.poster.optimized.src}` || null}
					className='bg-gray-700 w-full h-full object-cover transition-all duration-300 hover:scale-[1.05] hover:brightness-70'
				/>

				{anime?.genres && (
					<span className='text-xs text-white bg-[#000000ca] w-full absolute bottom-0 left-0 p-2 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 text-pretty pointer-events-none'>
						{anime.genres.map(genre => genre.name).join(" | ")}
					</span>
				)}
			</div>

			<h5 className='text-purple-500 text-base my-2 line-clamp-2'>
				{anime.name.main || null}
			</h5>

			<span className='text-sm text-gray-400 mt-auto'>
				{anime.year || null}
			</span>

			{anime?.genres && (	
				<span className='text-xs text-white w-full opacity-100 md:opacity-0 text-pretty pb-0.5'>
					{anime.genres.map(genre => genre.name).join(" | ")}
				</span>
			)}

			{anime.added_in_users_favorites && (
				<div className="absolute top-5 left-0 bg-purple-500 px-2 py-1 rounded-br-md rounded-tr-md flex items-center gap-1 shadow-md shadow-purple-400 pointer-events-none">
					<FaHeart color='#ffffff' size={14} />

					<span className="text-white text-sm">
						{anime.added_in_users_favorites}
					</span>
				</div>
			)}
		</a>
	)
}

export default AnimeListItem