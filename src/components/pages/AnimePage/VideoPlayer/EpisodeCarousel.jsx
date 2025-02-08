import React from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import useEpisodes from '../../../../hooks/player/useEpisodes'

const EpisodeCarousel = ({ anime, episodeInfo }) => {
	const { episodes, episodesContainerRef, episodesListRef } = useEpisodes()
	
	return (
		<div 
			className={`mt-2 w-full bg-gray-900 rounded-md flex relative overflow-hidden transition-all duration-300 ${episodeInfo.name || episodeInfo.date && "rounded-bl-md rounded-br-md none"}`}
		>
			<button 
				className='absolute z-5 left-2 top-[50%] translate-y-[-50%] cursor-pointer'
				onClick={() => handleEpisodes("prev")}
				disabled={episodes.episodesOffset === 0}
			>
				<FaChevronLeft fontSize={22} />
			</button>
			
			<div 
				className="overflow-hidden max-w-[calc(100%-80px)] ml-10" 
				ref={episodesContainerRef}
			>
				<ul 
					className='flex items-center gap-2 py-2 px-1 transition-all duration-300'
					style={{transform: `translate(${-episodes.episodesOffset * 100}%)`}}
					ref={episodesListRef}
				>
					{Object.keys(anime.episodes).map((key, index) => (
						<li 
							key={index} 
							className='flex-center' 
						>
							<button 
								className={`cursor-pointer py-1 px-3 rounded-md outline-1 outline-transparent hover:outline-1 hover:underline hover:outline-purple-500 transition-all duration-300 ${episodes.activeEpisode === key ? 'bg-purple-700' : ''}`}
								onClick={() => handleEpisodes("change", key)}
							>
								{Number(key) + 1}
							</button>
						</li>
					))}
				</ul>
			</div>

			<button 
				className='absolute z-5 right-2 top-[50%] translate-y-[-50%] cursor-pointer'
				onClick={() => handleEpisodes("next")}
				disabled={(episodes.episodesOffset + 1) * episodes.episodesOffsetWidth >= episodes.totalEpisodesWidth}
			>
				<FaChevronRight fontSize={22} />
			</button>
		</div>
	)
}

export default EpisodeCarousel