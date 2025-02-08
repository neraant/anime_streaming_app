import { useEffect, useRef, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { getFavorites } from '../../../Services/firebaseFavoritesServices'
import { useUser } from '../../../contexts/UserContext'
import ProfileCarouselItem from './ProfileCarouselItem'

const ProfileCarousel = ({ title, content }) => {
	const { user, isLoading } = useUser()
	const [curSlide, setCurSlide] = useState(0)
	const [visibleSlides, setVisibleSlides] = useState(1)
	const [favoritesList, setFavoritesList] = useState([])
	const [totalSlides, setTotalSlides] = useState(favoritesList.length)
	const carouselRef = useRef(null)
	
	const slideWidth = 308

	const nextSlide = () => {
		setCurSlide(prev => Math.min(prev + 1, totalSlides - visibleSlides))
	}

	const prevSlide = () => {
		setCurSlide(prev => Math.max(prev - 1, 0))
	}

	const getFavoritesList = async () => {
		if(user?.uid) {
			try {
				const fetchFavoritesList = await getFavorites(user?.uid)
				setFavoritesList(fetchFavoritesList)
				setTotalSlides(fetchFavoritesList.length)
			} catch (error) {
				console.error("Ошибка при получении списка понравившихся: ", error)
			}
		}
	}
	
	// Carousel functionallity
	useEffect(() => {
		const updateVisibleSlides = () => {
			if (carouselRef.current) {
				const containerWidth = carouselRef.current.offsetWidth
				setVisibleSlides(Math.floor(containerWidth / slideWidth))
			}
		}

		updateVisibleSlides()
		window.addEventListener('resize', updateVisibleSlides)
		return () => window.removeEventListener('resize', updateVisibleSlides)
	}, [totalSlides])

	// Getting favorites
	useEffect(() => {
		getFavoritesList()
		setTotalSlides(favoritesList.length)
	}, [user])

	return (
		<section className='my-12'>
			<div className="screen-max-width">
				<div className="flex flex-col gap-4">
					<h5 className='text-white font-semibold text-xl'>
						{title}
					</h5>

					<div className="relative">
						<div 
							className='w-full flex gap-2 transition-all ease-in-out duration-500'
							style={{ transform: `translateX(-${curSlide * slideWidth}px)` }}
							ref={carouselRef}
						>
							{favoritesList && favoritesList.map(({anime: anime}, index) => (
								<ProfileCarouselItem
									key={index}
									anime={anime}
								/>
							))}
						</div>

						<div>
							<button 
								className='absolute top-[50%] left-0 translate-y-[-50%] cursor-pointer'
								onClick={prevSlide}
							>
								<FaChevronLeft color='white' size={30} />
							</button>

							<button 
								className='absolute top-[50%] right-0 translate-y-[-50%] cursor-pointer'
								onClick={nextSlide}
							>
								<FaChevronRight color='white' size={30} />
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default ProfileCarousel