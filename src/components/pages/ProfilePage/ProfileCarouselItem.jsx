import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useUser } from '../../../contexts/UserContext';
import { addFavorite, removeFavorite } from '../../../Services/firebaseFavoritesServices';

const ProfileCarouselItem = ({ anime, action, contentList, setContentList }) => {
	const { user } = useUser()
	const [isFavoriteAnime, setIsFavoriteAnime] = useState(true)

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
		<Link 
			to={anime.url}
			className='relative w-full shrink-0 max-w-[300px] overflow-hidden rounded-2xl'
		>
			<img 
				src={`https://anilibria.top${anime.poster.optimized.src}` || '/images/no_anime_banner.png'} 
				alt="poster"
			/>

			<div className="absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-[#000000] to-transparent pointer-events-none flex items-end p-4">
				<div className="mt-auto flex flex-col w-full h-full max-h-[60px]">
					<h3 className='text-white text-sm text-pretty line-clamp-2'>
						{anime?.name?.main || "Название не найдено"}
					</h3>

					<span className='text-gray-300 text-sm mt-auto'>
						{anime.year}
					</span>
				</div>
			</div>

			{action === "favorite" && (
				<button 
					className={`absolute z-1 top-5 right-5 cursor-pointer transition-all duration-300 ${isFavoriteAnime ? "text-[#ad46ff]" : "text-white"}`}
					onClick={handleFavorites}
				>
					<FaHeart size={28} />
				</button>
			)}
		</Link>
	)
}

export default ProfileCarouselItem