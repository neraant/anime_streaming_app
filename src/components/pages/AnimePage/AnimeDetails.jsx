import { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { addFavorite, isFavorite, removeFavorite } from '../../../Services/firebaseFavoritesServices';
import { useUser } from '../../../contexts/UserContext';

const AnimeDetails = ({ anime }) => {
	const { user } = useUser()
	const [isFavoriteAnime, setIsFavoriteAnime] = useState(false)

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

	const checkIfFavorite = async () => {
		if(user?.uid && anime?.id) {
			try {
				const isFav = await isFavorite(user.uid, anime.id)
				setIsFavoriteAnime(isFav)
			} catch (error) {
				console.error("Ошибка при проверке является ли favorite: ", error)
			}
		}
	}

	useEffect(() => {
		checkIfFavorite()
	}, [user])

	return (
		<section className='relative mb-6'>
			<div className="flex flex-col items-center md:flex-row md:items-start gap-4 w-full">
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

						<button 
							className={`flex items-center gap-1 cursor-pointer transition-all duration-300 ml-auto ${isFavoriteAnime ? "text-[#ad46ff]" : "text-white"}`}
							onClick={handleFavorites}
						>
							{!isFavoriteAnime ? "Добавить" : "Добавлено"}
							<FaHeart size={16} />
						</button>
					</div>
				</div>

				<div className="flex flex-col w-full">
					<h2 className='text-purple-500 font-semibold text-3xl mb-1 text-pretty'>
						{anime.name.main}
					</h2>

					<h4 className='text-gray-200 text-sm mb-6 text-pretty'>
						{anime.name.english}
					</h4>

					<div className="flex flex-col gap-1.5 w-full">
						<div className="flex items-start gap-3">
							<span className='text-gray-300 text-sm'>
								Тип
							</span>

							<span className='text-white font-semibold text-sm'>
								{anime.type.description || "no information"}
							</span>
						</div>

						<div className="flex items-start gap-3">
							<span className='text-gray-300 text-sm'>
								Жанр
							</span>

							<span className='text-white font-semibold text-sm text-pretty'>
								{anime.genres.map((genre) => genre.name).join(' | ')}
							</span>
						</div>

						<div className="flex items-start gap-3">
							<span className='text-gray-300 text-sm'>
								Год выхода
							</span>

							<span className='text-white font-semibold text-sm'>
								{anime.year || "no information"}
							</span>
						</div>

						<div className="flex items-start gap-3">
							<span className='text-gray-300 text-sm'>
								Статус
							</span>

							<span className='text-white font-semibold text-sm'>
								{anime.is_ongoing ? "Онгоинг" : anime.is_in_production ? "Ожидается" : "Завершён"}
							</span>
						</div>

						<div className="flex items-start gap-3">
							<span className='text-gray-300 text-sm'>
								Эпизоды
							</span>

							<span className='text-white font-semibold text-sm'>
								{anime.episodes_total ? `${anime.episodes_total} эп.` : "Нет информации"}
							</span>
						</div>

						<div className="flex items-start gap-3">
							<span className='text-gray-300 text-sm'>
								Длительность
							</span>

							<span className='text-white font-semibold text-sm'>
								{anime.average_duration_of_episode ? `~ ${anime.average_duration_of_episode} мин.` : "Нет информации"}
							</span>
						</div>

						<div className="flex items-start gap-3">
							<span className='text-gray-300 text-sm'>
								Возраст
							</span>

							<span className='text-white font-semibold text-sm'>
								{anime.age_rating.label}
							</span>
						</div>
					</div>

					<div className="flex flex-col gap-1 mt-6">
						<h5 className='text-purple-500 font-semibold'>
							Описание
						</h5>

						<p className='text-gray-200 font-light text-sm'>
							{anime.description}
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export default AnimeDetails