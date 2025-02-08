import { useNavigate } from 'react-router-dom'

const ErrorMessage = () => {
	const navigate = useNavigate()
	
	return (
			<div className="screen-max-width">
				<div className="flex flex-col items-center gap-8 py-24">
					<img src="/images/no_anime.png" alt="not found" className='max-w-[300px]' />

					<span className='text-center text-white text-2xl'>
						Хмм... Данных об этом аниме нет!
					</span>

					<button 
						className='w-fit py-2 px-3 bg-purple-500 rounded-md text-white text-base cursor-pointer flex gap-2 items-center  transition-all duration-300 hover:bg-purple-400'
						onClick={() => navigate(-1)}
					>
						<FaArrowLeft fontSize={16} className='relative bottom-[1px]' /> 
						Вернуться назад
					</button>
				</div>
			</div>
	)
}

export default ErrorMessage