import { useEffect, useRef, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const ProfileCarousel = ({ title, content }) => {
	const [curSlide, setCurSlide] = useState(0)
	const [visibleSlides, setVisibleSlides] = useState(1)
	const carouselRef = useRef(null)
	
	const totalSlides = 20
	const slideWidth = 308

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
	}, [])

	const nextSlide = () => {
		setCurSlide(prev => Math.min(prev + 1, totalSlides - visibleSlides))
	}

	const prevSlide = () => {
		setCurSlide(prev => Math.max(prev - 1, 0))
	}
	
	return (
		<section className='mt-6'>
			<div className="screen-max-width">
				<div className="flex flex-col gap-2">
					<h5 className='text-white font-semibold text-xl'>
						{title}
					</h5>

					<div className="relative">

						<div 
							className='w-full h-[340px] flex gap-2 transition-all ease-in-out duration-500'
							style={{ transform: `translateX(-${curSlide * slideWidth}px)` }}
							ref={carouselRef}
						>
							{Array.from({ length: 20 }).map((_, index) => (
								<div key={index} className="flex-none flex-center h-full w-[300px] bg-purple-500">
									{index + 1}
								</div>
							))}
						</div>

						<div className="absolute inset-0 flex items-center justify-between">
							<button onClick={prevSlide}>
								<FaChevronLeft color='white' size={30} />
							</button>

							<button onClick={nextSlide}>
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