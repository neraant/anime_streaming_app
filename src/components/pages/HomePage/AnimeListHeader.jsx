const AnimeListHeader = ({ total, isSearching }) => {
	return (
		<div className="flex justify-between items-center">
			<h3 className='flex items-center gap-2 text-3xl text-white font-semibold mb-4'>
				{!isSearching ? 'Аниме' : "Найдено"}
				<span className='text-purple-500 text-sm mt-auto mb-[6px]'>
					({total})
				</span>
			</h3>

			<div className="flex items-center">
				{/* Фильтрация */}
			</div>
		</div>
	)
}

export default AnimeListHeader