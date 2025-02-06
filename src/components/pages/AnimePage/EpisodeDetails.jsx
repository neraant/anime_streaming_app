const EpisodeDetails = ({ episodeInfo: {episodeInfo} }) => {
	return (
		<section className={`flex flex-col gap-2 px-2 md:px-4 mb-5 rounded-bl-md rounded-br-md bg-gray-900 transition-all duration-300 ${episodeInfo.name || episodeInfo.date ? 'max-h-35 overflow-visible border-t-1 border-[#ffffff20] py-2 md:py-4' : 'max-h-0 overflow-hidden'}`}>
			{episodeInfo.name && (
				<span className='text-gray-200 text-sm'>
					<span className='text-purple-500'>Название: </span>
					{episodeInfo.name}
				</span>
			)}

			{episodeInfo.date && (
				<span className='text-gray-200 text-sm'>
					<span className='text-purple-500'>Дата выхода: </span>
					{new Date(episodeInfo.date).toLocaleString()}
				</span>
			)}
		</section>
	)
}

export default EpisodeDetails