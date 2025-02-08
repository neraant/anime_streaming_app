import React from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'

const CarouselButtons = ({ prevSlide, nextSlide }) => {
	return (
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
	)
}

export default CarouselButtons