import { FaHeart } from 'react-icons/fa6'
import { addFavorite } from '../../../Services/firebaseFavoritesServices'
import { useUser } from '../../../contexts/UserContext'

const AnimePoster = ({ anime, isFavoriteAnime, setIsFavoriteAnime }) => {
	const {user} = useUser()
	
	const handleFavorites = async (e) => {
		e.preventDefault()

		const favoriteAnime = {
			id: anime?.id || null, 
			name: anime.name || null,
			genres: anime?.genres || null,
			year: anime?.year || null,
			favoritesIn: anime?.added_in_users_favorites || anime?.favoritesIn,
			poster: anime.poster || null,
			url: `/anime/${anime?.alias}?id=${anime?.id}`,
		}

		try {
			if(!isFavoriteAnime) {	
				await addFavorite(user?.uid, anime?.id, favoriteAnime)
				setIsFavoriteAnime(true)
			} else {
				await removeFavorite(user?.uid, anime?.id)
				setIsFavoriteAnime(false)
			}
		} catch (error) {
			console.error("Ошибка при добавлении аниме в понравившиеся: ", error)
		}
	}
	
	return (
		<div className="flex flex-col">
			<img 
				src={`https://anilibria.top${anime.poster.optimized.src}`} 
				alt="poster" 
				className='w-full h-full object-cover min-w-[250px] md:max-w-[250px] max-h-[500px] md:max-h-[420px] rounded-md shrink-0'
			/>

			<div className="flex items-center p-1 bg-gray-900 rounded-md mt-2">
				<FaHeart size={14} color='red' />
				
				<span className='text-sm text-gray-200 relative ml-1'>
					{anime.added_in_users_favorites || 0}
				</span>

				{user && (
					<button 
						className={`flex items-center gap-1 cursor-pointer transition-all duration-300 ml-auto ${isFavoriteAnime ? "text-[#ad46ff]" : "text-white"}`}
						onClick={handleFavorites}
					>
						{!isFavoriteAnime ? "Добавить" : "Добавлено"}
						<FaHeart size={16} />
					</button>
				)}
			</div>
		</div>
	)
}

export default AnimePoster