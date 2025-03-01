import EmptyCarousel from './EmptyCarousel'
import ProfileCarouselItem from './ProfileCarouselItem'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'

const ProfileCarousel = ({ title, contentList, setContentList }) => {
	return (
		<section className='my-12'>
			<div className='screen-max-width'>
				{contentList.length > 0 ? (
					<div className='flex flex-col gap-4'>
						<h5 className='text-white font-semibold text-xl'>{title}</h5>

						<div className='relative'>
							{/* slides */}
							<div className='swiper w-full flex gap-2 transition-all ease-in-out duration-500'>
								<Swiper
									modules={[Navigation]}
									navigation={{ nextEl: '.next', prevEl: '.prev' }}
									spaceBetween={10}
									slidesPerView='auto'
									loop={false}
								>
									{contentList.slice(0, 20).map(({ anime, action }, index) => (
										<SwiperSlide key={index} style={{ width: '308px' }}>
											<ProfileCarouselItem anime={anime} action={action} />
										</SwiperSlide>
									))}
								</Swiper>
							</div>

							{/* buttons */}
							<div>
								<button className='prev absolute z-1 top-[50%] left-0 translate-y-[-50%] cursor-pointer p-4'>
									<FaChevronLeft color='white' size={30} />
								</button>

								<button className='next absolute z-1 top-[50%] right-0 translate-y-[-50%] cursor-pointer p-4'>
									<FaChevronRight color='white' size={30} />
								</button>
							</div>
						</div>
					</div>
				) : (
					<EmptyCarousel title={title} />
				)}
			</div>
		</section>
	)
}

export default ProfileCarousel
