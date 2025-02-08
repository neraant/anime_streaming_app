import { useEffect, useState } from 'react';
import { isFavorite } from '../../../Services/firebaseFavoritesServices';
import { useUser } from '../../../contexts/UserContext';
import AnimeDescription from './AnimeDescription';
import AnimeInfoRow from './AnimeInfoRow';
import AnimePoster from './AnimePoster';

const AnimeDetails = ({ anime }) => {
	const { user } = useUser()
	const [isFavoriteAnime, setIsFavoriteAnime] = useState(false)

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
				<AnimePoster 
					anime={anime} 
					isFavoriteAnime={isFavoriteAnime} 
					setIsFavoriteAnime={setIsFavoriteAnime} 
				/>

				<div className="flex flex-col w-full">
					<h2 className='text-purple-500 font-semibold text-3xl mb-1 text-pretty'>
						{anime.name.main}
					</h2>

					<h4 className='text-gray-200 text-sm mb-6 text-pretty'>
						{anime.name.english}
					</h4>

					<div className="flex flex-col gap-1.5 w-full">
						<AnimeInfoRow 
							label="Тип" 
							value={anime.type.description || "no information"} 
						/>
						<AnimeInfoRow 
							label="Жанр" 
							value={anime.genres.map((genre) => genre.name).join(' | ')}
						/>
						<AnimeInfoRow 
							label="Год выхода" 
							value={anime.year || "no information"}
						/>
						<AnimeInfoRow 
							label="Статус" 
							value={anime.is_ongoing ? "Онгоинг" : anime.is_in_production ? "Ожидается" : "Завершён"}
						/>
						<AnimeInfoRow 
							label="Эпизоды" 
							value={anime.episodes_total ? `${anime.episodes_total}` : "Нет информации"}
						/>
						<AnimeInfoRow 
							label="Длительность" 
							value={anime.average_duration_of_episode ? `~ ${anime.average_duration_of_episode} мин.` : "Нет информации"}
						/>
						<AnimeInfoRow 
							label="Возраст" 
							value={anime.age_rating.label || "Нет информации"}
						/>
					</div>

					<AnimeDescription description={anime.description} />
				</div>
			</div>
		</section>
	)
}

export default AnimeDetails