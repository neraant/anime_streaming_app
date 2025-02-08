import { useEffect, useRef, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
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
				) : (
					<div className="relative flex flex-col gap-4">
						<h5 className='text-white font-semibold text-xl'>
							{title}
						</h5>

						<h3 className='text-white text-2xl font-semibold w-full text-center max-w-[50dvw] absolute top-[50%] left-[50%] translate-y-[calc(-50%+28px)] translate-x-[-50%]'>
							Здесь пока что пусто!
						</h3>

						<div className="realtive flex gap-2 w-full h-full min-h-[300px] blur-xs">
							<span className='w-full h-full min-h-[428px] flex-none max-w-[300px] bg-gradient-to-t from-gray-400 to-gray-200 rounded-2xl opacity-50' />
							<span className='w-full h-full min-h-[428px] flex-none max-w-[300px] bg-gradient-to-t from-gray-400 to-gray-200 rounded-2xl opacity-50' />
							<span className='w-full h-full min-h-[428px] flex-none max-w-[300px] bg-gradient-to-t from-gray-400 to-gray-200 rounded-2xl opacity-50' />
							<span className='w-full h-full min-h-[428px] flex-none max-w-[300px] bg-gradient-to-t from-gray-400 to-gray-200 rounded-2xl opacity-50' />
							<span className='w-full h-full min-h-[428px] flex-none max-w-[300px] bg-gradient-to-t from-gray-400 to-gray-200 rounded-2xl opacity-50' />
							<span className='w-full h-full min-h-[428px] flex-none max-w-[300px] bg-gradient-to-t from-gray-400 to-gray-200 rounded-2xl opacity-50' />

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
				)}
			</div>
		</section>
	)
}

export default ProfileCarousel