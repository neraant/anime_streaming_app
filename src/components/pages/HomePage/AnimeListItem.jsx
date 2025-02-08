import { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useUser } from '../../../contexts/UserContext';
import { addFavorite, isFavorite, removeFavorite } from '../../../Services/firebaseFavoritesServices';

const AnimeListItem = ({ anime, isFading }) => {
	const { user, isAuthenticated, isLoading } = useUser() 
	const [isFavoriteAnime, setIsFavoriteAnime] = useState(false)

	useEffect(() => {
		const getIsFavoriteAnime = async () => {
			if(user?.uid && anime.id) {
				try {
					const isFav = await isFavorite(user?.uid, String(anime?.id))
					setIsFavoriteAnime(isFav)
				} catch (error) {
					console.error("Ошибки при выявлении является ли аниме понравившимся: ", error)
				}
			}
		}
		getIsFavoriteAnime()
	}, [isLoading])

	const handleFavorites = async (e) => {
		e.preventDefault()

		const favoriteAnime = {
			id: anime?.id, 
			name: anime.name,
			genres: anime?.genres || null,
			year: anime?.year,
			favoritesIn: anime?.added_in_users_favorites,
			poster: anime.poster,
			url: `/anime/${anime?.alias}?id=${anime?.id}`,
		}

		try {
			if(!isFavoriteAnime) {	
				await addFavorite(user?.uid, anime?.id, favoriteAnime)
				setIsFavoriteAnime(true)
				console.log("Аниме добавлено!");
			} else {
				await removeFavorite(user?.uid, anime?.id)
				setIsFavoriteAnime(false)
				console.log("Аниме удалено!");
			}
		} catch (error) {
			console.error("Ошибка при добавлении аниме в понравившиеся: ", error)
		}
	}

	return (
		<Link 
			to={`/anime/${anime.alias}?id=${anime.id}`} 
			className={`realtive z-0 flex flex-col rounded-lg overflow-hidden w-full max-w-[350px] relative transition-opacity duration-300 group ${isFading ? 'opacity-0' : 'opacity-100'}`}
		>
			<div className="relative w-full min-h-[380px] max-h-[380px] rounded-lg overflow-hidden">
				<img 
					src={`https://anilibria.top${anime.poster.optimized.src}` || '/images/no_anime_banner.png'}
					className='bg-gray-700 w-full h-full object-cover transition-all duration-300 group-hover:scale-[1.05] group-hover:brightness-70'
					alt='poster'
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

			{isAuthenticated && (
				<button 
					className={`absolute z-1 top-5 right-5 cursor-pointer transition-all duration-300 opacity-0 group-hover:opacity-100 ${isFavoriteAnime ? "text-[#ad46ff]" : "text-white"}`}
					onClick={handleFavorites}
				>
					<FaHeart size={28} />
				</button>
			)}
		</Link>
	)
}

export default AnimeListItem