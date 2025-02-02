import { FaChevronLeft, FaChevronRight, FaCompress, FaExpand, FaPause, FaPlay } from 'react-icons/fa';
import ReactPlayer from 'react-player';
import useEpisodes from '../../../hooks/useEpisodes';
import useVideoPlayer from '../../../hooks/useVideoPlayer';

const VideoPlayer = ({ anime }) => {

	const { episodesContainerRef, episodesListRef, episodes, handleEpisodes } = useEpisodes(anime)

	const { videoRef, videoState, togglePlay, toggleFullscreen, handleSeek } = useVideoPlayer(episodes.activeEpisode)

	return (
		<section className='text-white mt-5'>
			<h3 className='font-axiformaBold text-2xl mb-2'>
				Смотреть <span className='text-purple-500'>онлайн</span>
			</h3>
			<div 
				className="w-full h-full relative group overflow-hidden rounded-md flex-center"
			>
				{episodes.activeEpisode ? (
					<>
						<ReactPlayer 
							width="100%"
							height="100%"
							ref={videoRef}
							controls={false}
							url={`https://cache.libria.fun/${anime.player.list[episodes.activeEpisode]?.hls?.fhd || ""}`}
							playing={videoState.isPlaying}
							onClick={togglePlay}
						/>

						{/* play/pause */}
						<div className={`absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] bg-[#00000090] p-5 rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none ${!videoState.isPlaying ? 'opacity-100' : 'opacity-0'}`}>
							<button className='cursor-pointer flex-center'>
								{videoState.isPlaying ? (<FaPause fontSize={26} />) : 
									(<FaPlay fontSize={26} />)}
							</button>
						</div>

						{/* control bar */}
						<div className="absolute bottom-0 left-0 w-full bg-[#18181B80] h-10 flex items-center p-2">
							{/* play/pause */}
							<button 
								className='cursor-pointer mr-4'
								onClick={togglePlay}
							>
								{videoState.isPlaying ? (<FaPause fontSize={18} />) : 
									(<FaPlay fontSize={18} />)}
							</button>

							{/* video progress */}
							<div className="flex items-center mr-2 relative bottom-[-1px]">
								<span className='text-white text-xs min-w-9'>{videoState.currentTime}</span>
								<span>/</span>
								<span className='text-white text-xs min-w-9'>{videoState.endTime}</span>
							</div>

							{/* progress bar */}
							<input
								type='range'
								min='0'
								max='100'
								step={0.05}
								value={videoState.progress}
								onChange={handleSeek}
								className='h-full relative z-10 cursor-pointer w-full'
							/>

							{/* fullscreen */}
							<button 
								className='cursor-pointer ml-4'
								onClick={toggleFullscreen}
							>
								{!videoState.isFullscreen ? (<FaExpand />) : (<FaCompress />)}
							</button>
						</div>

					</>
				) : (
					<div className="w-full h-full min-h-[70vh] flex-center relative  bg-gradient-to-r from-violet-900 to-indigo-900">
						<img className='absolute left-[-50px] bottom-[-20%] h-full object-contain z-0' src="/images/watch_bg.png" alt="banner" />
						
						<p className='relative z-1 text-xl text-white text-center'>
							Смотри Аниме на <br/> 
							<span className='text-4xl text-purple-500 font-axiformaBold'>AniAnt</span>
						</p>
					</div>
				)}
			</div>

			<div 
				className="my-2 w-full bg-gray-900 rounded-md flex relative overflow-hidden"
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
						{Object.keys(anime.player.list).map((key, index) => (
							<li key={index} className='flex-center' >
								<button 
									className={`cursor-pointer py-1 px-3 rounded-md outline-1 outline-transparent hover:outline-1 hover:underline hover:outline-purple-500 transition-all duration-300 ${episodes.activeEpisode === key ? 'bg-purple-700' : ''}`}
									onClick={() => handleEpisodes("change", key)}
								>
									{key}
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
		</section>
	)
}

export default VideoPlayer