import { useEffect, useRef, useState } from 'react'
import CarouselButtons from './CarouselButtons'
import EmptyCarousel from './EmptyCarousel'
import ProfileCarouselItem from './ProfileCarouselItem'

const ProfileCarousel = ({ title, contentList, setContentList }) => {
	const [curSlide, setCurSlide] = useState(0)
	const [visibleSlides, setVisibleSlides] = useState(1)
	const [totalSlides, setTotalSlides] = useState(contentList.length)
	
	const carouselRef = useRef(null)
	
	const slideWidth = 308

	const nextSlide = () => {
		setCurSlide(prev => Math.min(prev + 1, totalSlides - visibleSlides))
	}

	const prevSlide = () => {
		setCurSlide(prev => Math.max(prev - 1, 0))
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
		setTotalSlides(contentList.length)
	}, [contentList])

	return (
		<section className='my-12'>
			<div className="screen-max-width">
				{contentList && contentList.length > 0 ? (
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
								{contentList && contentList.slice(0, 10).map(({anime: anime, action: action}, index) => (
									<ProfileCarouselItem
										key={index}
										anime={anime}
										action={action}
										setContentList={setContentList}
										contentList={contentList}
									/>
								))}
							</div>

							<CarouselButtons 
								prevSlide={prevSlide}
								nextSlide={nextSlide}
							/>
						</div>
					</div>
				) : (
					<EmptyCarousel 
						title={title} 
						nextSlide={nextSlide}
						prevSlide={prevSlide}
					/>
				)}
			</div>
		</section>
	)
}

export default ProfileCarousel