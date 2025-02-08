import { FaVolumeDown, FaVolumeMute, FaVolumeUp } from 'react-icons/fa'
import { FaCompress, FaExpand, FaPause, FaPlay } from 'react-icons/fa6'
import useVideoPlayer from '../../../../hooks/player/useVideoPlayer'
import useVideoQuality from '../../../../hooks/player/useVideoQuality'
import useVideoVolume from '../../../../hooks/player/useVideoVolume'

const VideoControls = (anime, episodes, videoRef) => {
	const { qualities, activeQuality, isShowQuality } = useVideoQuality(anime, episodes, videoRef)

	const { videoState, setVideoState, handleSeek, toggleFullscreen  } = useVideoPlayer(episodes.activeEpisode)

	const { showVolume, hideVolume, handleMuted, handleVolumeChange, isVolumeVisible } = useVideoVolume(videoRef, setVideoState, videoState)

	return (
		<div className={`transition-all duration-500 ${videoState.isControlVisible && videoState.isReady ? 'opacity-100' : 'opacity-0'}`}> 
			{/* play/pause */}
			<div className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] bg-[#00000090] rounded-full transition-opacity duration-300 pointer-events-none" >
				<button 
					className='cursor-pointer flex-center p-5'
					onClick={episodes.activeEpisode && togglePlay}
				>
					{videoState.isPlaying ? (<FaPause fontSize={26} />) : 
						(<FaPlay fontSize={26} />)}
				</button>
			</div>

			{/* control bar */}
			<div className="absolute bottom-0 left-0 w-full bg-[#18181B80] h-10 flex items-center p-2">
				{/* play/pause */}
				<button 
					className='cursor-pointer mr-2 sm:mr-4'
					onClick={episodes.activeEpisode && togglePlay}
				>
					{videoState.isPlaying ? 
						<FaPause fontSize={18} /> : 
						<FaPlay fontSize={18} />
					}
				</button>

				{/* video progress (time) */}
				<div className="flex items-center gap-[2px] mr-2 relative">
					<span className='text-white text-xs min-w-9'>{videoState.currentTime}</span>
					<span>/</span>
					<span className='text-white text-xs min-w-9'> {videoState.endTime}</span>
				</div>

				{/* progress bar */}
				<input
					type='range'
					min='0'
					max='100'
					step={0.01}
					value={videoState?.progress || 0}
					onChange={handleSeek}
					className='video-progress h-full relative z-10 cursor-pointer w-full mr-2'
					style={{ "--progress": `${videoState.progress}%`, }}
				>
				</input>

				{/* volume */}
				<div className="relative flex-center mr-2">
					<button 
						className="flex cursor-pointer"
						onMouseEnter={showVolume}
						onMouseLeave={hideVolume}
						onClick={handleMuted}
					>
						{videoState.isMuted ? 
							<FaVolumeMute /> : videoState.volume > 0.7 ?
							<FaVolumeUp /> : 
							<FaVolumeDown />
						}
					</button>

					<input 
						type='range'
						min='0'
						max='1'
						step={0.05}
						value={videoState?.volume || 0}
						onChange={handleVolumeChange}
						className={`video-volume absolute left-[50%] top-[-55px] translate-x-[-50%] cursor-pointer rotate-[-90deg] transition-all duration-300 hidden lg:flex ${isVolumeVisible ? "opacity-100" : "opacity-0"}`}
						style={{ "--volume": `${videoState.volume * 100}%`, }}
					/>
				</div>

				{/* Quaility */}
				<div className="relative mr-2 sm:mr-4  select-none">
					<span 
						className='cursor-pointer text-sm sm:text-base' 
						onClick={() => setIsShowQuality(prev => !prev)}
					>
						{activeQuality}
					</span>

					<ul className={`absolute left-[50%] translate-x-[calc(-50%)] flex flex-col bg-[#00000050] rounded-md overflow-hidden transition-all duration-300 ${isShowQuality ? "bottom-[calc(100%+12px)] opacity-100 visible" : "bottom-[calc(100%)] opacity-0 invisible"}`}>
						{qualities.map(quality => (
							<button 
								className={`py-1 px-4 transition-all duration-300 cursor-pointer ${quality.quality === activeQuality ? "bg-[#ffffff50]" : "hover:bg-[#ffffff20]"}`}
								onClick={() => handleVideoQuality(quality.quality)}
								key={quality.text}
							>
								<li className="text-sm sm:text-base text-center ">
									{quality.text}
								</li>
							</button>
						))}
					</ul>
				</div>

				{/* fullscreen */}
				<button 
					className='cursor-pointer'
					onClick={toggleFullscreen}
				>
					{!videoState.isFullscreen ? (<FaExpand />) : (<FaCompress />)}
				</button>
			</div>
		</div>
	)
}

export default VideoControls