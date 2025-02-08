import { FaRotate } from 'react-icons/fa6'

const ErrorMessage = () => {
	return (
		<div className='screen-max-width'>
			<div className="flex flex-col">
				<span className='text-white text-xl mb-4'>
					Упс, что-то пошло не так! Попробуйте 
					<span className='text-purple-500'> перезагрузить </span> 
					страницу🥰
				</span>

				<button 
					className='w-fit py-2 px-3 bg-purple-500 rounded-md text-white text-base cursor-pointer flex gap-2 items-center  transition-all duration-300 hover:bg-purple-400'
					onClick={() => location.reload()}
				>
				<FaRotate fontSize={18} className='relative bottom-[1px]' /> Перезагрузить
				</button>
			</div>
		</div>
	)
}

export default ErrorMessage