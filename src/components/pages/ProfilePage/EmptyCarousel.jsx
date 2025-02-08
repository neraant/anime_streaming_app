import CarouselButtons from './CarouselButtons'

const EmptyCarousel = ({ title, prevSlide, nextSlide }) => {
	return (
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

				<CarouselButtons 
					prevSlide={prevSlide}
					nextSlide={nextSlide}
				/>
			</div>
		</div>
	)
}

export default EmptyCarousel