const AnimeDetails = ({ anime }) => {
	return (
		<section className='relative mb-6'>
			<div className="flex flex-col items-center md:flex-row md:items-start gap-4 w-full">
				<div className="flex flex-col">
					<img 
						src={`https://anilibria.tv${anime.posters.original.url || anime.posters.medium.url}`} 
						alt="poster" 
						className='w-full h-full object-cover max-w-[300px] max-h-[420px] rounded-md'
					/>

					{anime.score && (
						<div className="flex items-center p-1 bg-gray-900 rounded-md mt-2">
							<img src="/images/star_icon.svg" alt="rating" />
							
							<span className='text-sm text-gray-200 relative bottom-[-1px] ml-1'>
								{parseFloat(anime.score).toFixed(1)}{' '} 
								<span className='underline'>
									({anime.scored_by})
								</span>
							</span>
						</div>
					)}
				</div>

				<div className="flex flex-col w-full">
					<h2 className='text-purple-500 font-axiformaBold text-2xl mb-2 text-pretty'>
						{anime?.names?.ru || "no information"}
					</h2>

					<h4 className='text-gray-200 font-axiforma text-lg mb-6 text-pretty'>
						{anime?.names?.en || null}
					</h4>

					<div className="grid grid-cols-6 w-full">
						<div className="grid grid-cols-1 col-span-3 md:col-span-2 gap-y-4">
							<span className='text-gray-300 font-axiforma text-sm'>
								Type
							</span>

							<span className='text-gray-300 font-axiforma text-sm'>
								Year of release
							</span>

							<span className='text-gray-300 font-axiforma text-sm'>
								Status
							</span>

							<span className='text-gray-300 font-axiforma text-sm'>
								Episodes
							</span>

							<span className='text-gray-300 font-axiforma text-sm'>
								Duration
							</span>
						</div>

						<div className="grid grid-cols-1 col-span-3 md:col-span-4 gap-y-4">
							<span className='text-gray-200 font-axiforma text-base'>
								{anime.type.string || "no information"}
							</span>

							<span className='text-gray-200 font-axiforma text-base'>
								{anime.season.year || "no information"}
							</span>

							<span className='text-gray-200 font-axiforma text-base'>
								{anime.status.string || "no information"}
							</span>

							<span className='text-gray-200 font-axiforma text-base'>
								{anime.type.episodes ? `${anime.type.episodes} эп.` : "no information"}
							</span>

							<span className='text-gray-200 font-axiforma text-base'>
								{anime.type.length ? `${anime.type.length} мин.` : "no information"}
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default AnimeDetails