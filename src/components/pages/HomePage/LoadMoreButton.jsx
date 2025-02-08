const LoadMoreButton = ({ isVisible, onClick }) => {
	if (!isVisible) return null
	
	return (
		<div className="mt-6">
			<button 
				className='py-2 px-4 bg-purple-500 text-white rounded-md cursor-pointer transition-bg duration-300 hover:bg-purple-900'
				onClick={onClick}
			>
				Загрузить ещё
			</button>
		</div>
	)
}

export default LoadMoreButton