import {
	FaChevronLeft,
	FaChevronRight,
	FaCompress,
	FaExpand,
	FaPause,
	FaPlay,
	FaVolumeDown,
	FaVolumeMute,
	FaVolumeUp
} from 'react-icons/fa'
import ReactPlayer from 'react-player'
import { BounceLoader } from 'react-spinners'
import useEpisodes from '../../../../hooks/player/useEpisodes'
import useVideoPlayer from '../../../../hooks/player/useVideoPlayer'
import useVideoQuality from '../../../../hooks/player/useVideoQuality'
import useVideoVolume from '../../../../hooks/player/useVideoVolume'

const VideoPlayer = ({
	anime,
	handleEpisodeChange,
	episodeInfo: { episodeInfo }
}) => {
	const { episodesContainerRef, episodesListRef, episodes, handleEpisodes } =
		useEpisodes(anime, handleEpisodeChange)

	const {
		videoRef,
		videoContainerRef,
		videoState,
		setVideoState,
		togglePlay,
		toggleFullscreen,
		handleSeek,
		handleReady,
		handleBuffer,
		handleBufferEnd,
		resetTimer
	} = useVideoPlayer(episodes.activeEpisode)

	const {
		qualities,
		activeQuality,
		isShowQuality,
		setIsShowQuality,
		handleVideoQuality,
		videoUrl
	} = useVideoQuality(anime, episodes, videoRef)

	const {
		handleVolumeChange,
		handleMuted,
		showVolume,
		hideVolume,
		isVolumeVisible
	} = useVideoVolume(videoRef, setVideoState, videoState)

	const showPreview = () => {
		if (videoRef.current && !videoState.isPlaying) {
			videoRef.current.showPreview()
		}
	}

	return (
		<section className='text-white mt-5'>
			<h3 className='font-semibold text-2xl mb-2'>
				Смотреть <span className='text-purple-500'>онлайн</span>
			</h3>

			<div
				className='flex w-full h-full relative group overflow-hidden rounded-md flex-center'
				ref={videoContainerRef}
			>
				<div
					className='relative w-full overflow-hidden rounded-md bg-black'
					style={{ aspectRatio: '16/9' }}
					onClick={
						!episodes.activeEpisode && !videoState.isPlaying
							? showPreview
							: togglePlay
					}
					onDoubleClick={toggleFullscreen}
					onMouseMove={videoState.isPlaying ? resetTimer : null}
					onTouchStart={() => {
						resetTimer()
						setVideoState(prev => ({ ...prev, isControlVisible: true }))
					}}
				>
					{videoState.isBuffering && (
						<div className='absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]'>
							<BounceLoader color='#ad46ff' />
						</div>
					)}

					<ReactPlayer
						width='100%'
						height='100%'
						ref={videoRef}
						controls={false}
						playsinline
						onReady={handleReady}
						onBuffer={handleBuffer}
						onBufferEnd={handleBufferEnd}
						playing={videoState.isPlaying}
						url={videoUrl}
						light={'/images/watch_bg.png'}
						className='absolute top-0 left-0'
					/>
				</div>

				<div
					className={`transition-all duration-500 ${
						videoState.isControlVisible && videoState.isReady
							? 'opacity-100'
							: 'opacity-0'
					}`}
				>
					{/* play/pause */}
					<div
						className={`absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] bg-[#00000090] rounded-full transition-opacity duration-300 pointer-events-none`}
					>
						<button
							className='cursor-pointer flex-center p-5'
							onClick={episodes.activeEpisode && togglePlay}
						>
							{videoState.isPlaying ? (
								<FaPause fontSize={26} />
							) : (
								<FaPlay fontSize={26} />
							)}
						</button>
					</div>

					{/* control bar */}
					<div className='absolute bottom-0 left-0 w-full bg-[#18181B80] h-10 flex items-center p-2'>
						{/* play/pause */}
						<button
							className='cursor-pointer mr-2 sm:mr-4'
							onClick={episodes.activeEpisode && togglePlay}
						>
							{videoState.isPlaying ? (
								<FaPause fontSize={18} />
							) : (
								<FaPlay fontSize={18} />
							)}
						</button>

						{/* video progress (time) */}
						<div className='flex items-center gap-[2px] mr-2 relative'>
							<span className='text-white text-xs min-w-9'>
								{videoState.currentTime}
							</span>
							<span>/</span>
							<span className='text-white text-xs min-w-9'>
								{' '}
								{videoState.endTime}
							</span>
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
							style={{ '--progress': `${videoState.progress}%` }}
						></input>

						{/* volume */}
						<div className='relative flex-center mr-2'>
							<button
								className='flex cursor-pointer'
								onMouseEnter={showVolume}
								onMouseLeave={hideVolume}
								onClick={handleMuted}
							>
								{videoState.isMuted ? (
									<FaVolumeMute />
								) : videoState.volume > 0.7 ? (
									<FaVolumeUp />
								) : (
									<FaVolumeDown />
								)}
							</button>

							<input
								type='range'
								min='0'
								max='1'
								step={0.05}
								value={videoState?.volume || 0}
								onChange={handleVolumeChange}
								className={`video-volume absolute left-[50%] top-[-55px] translate-x-[-50%] cursor-pointer rotate-[-90deg] transition-all duration-300 hidden lg:flex ${
									isVolumeVisible ? 'opacity-100' : 'opacity-0'
								}`}
								style={{ '--volume': `${videoState.volume * 100}%` }}
							/>
						</div>

						{/* Quaility */}
						<div className='relative mr-2 sm:mr-4  select-none'>
							<span
								className='cursor-pointer text-sm sm:text-base'
								onClick={() => setIsShowQuality(prev => !prev)}
							>
								{activeQuality}
							</span>

							<ul
								className={`absolute left-[50%] translate-x-[calc(-50%)] flex flex-col bg-[#00000050] rounded-md overflow-hidden transition-all duration-300 ${
									isShowQuality
										? 'bottom-[calc(100%+12px)] opacity-100 visible'
										: 'bottom-[calc(100%)] opacity-0 invisible'
								}`}
							>
								{qualities.map(quality => (
									<button
										className={`py-1 px-4 transition-all duration-300 cursor-pointer ${
											quality.quality === activeQuality
												? 'bg-[#ffffff50]'
												: 'hover:bg-[#ffffff20]'
										}`}
										onClick={() => handleVideoQuality(quality.quality)}
										key={quality.text}
									>
										<li className='text-sm sm:text-base text-center '>
											{quality.text}
										</li>
									</button>
								))}
							</ul>
						</div>

						{/* fullscreen */}
						<button className='cursor-pointer' onClick={toggleFullscreen}>
							{!videoState.isFullscreen ? <FaExpand /> : <FaCompress />}
						</button>
					</div>
				</div>
			</div>

			{/* Episodes line */}
			<div
				className={`mt-2 w-full bg-gray-900 rounded-md flex relative overflow-hidden transition-all duration-300 ${
					episodeInfo.name ||
					(episodeInfo.date && 'rounded-bl-md rounded-br-md none')
				}`}
			>
				<button
					className='absolute z-5 left-2 top-[50%] translate-y-[-50%] cursor-pointer'
					onClick={() => handleEpisodes('prev')}
					disabled={episodes.episodesOffset === 0}
				>
					<FaChevronLeft fontSize={22} />
				</button>

				<div
					className='overflow-hidden max-w-[calc(100%-80px)] ml-10'
					ref={episodesContainerRef}
				>
					<ul
						className='flex items-center gap-2 py-2 px-1 transition-all duration-300'
						style={{
							transform: `translate(${-episodes.episodesOffset * 100}%)`
						}}
						ref={episodesListRef}
					>
						{Object.keys(anime.episodes).map((key, index) => (
							<li key={index} className='flex-center'>
								<button
									className={`cursor-pointer py-1 px-3 rounded-md outline-1 outline-transparent hover:outline-1 hover:underline hover:outline-purple-500 transition-all duration-300 ${
										episodes.activeEpisode === key ? 'bg-purple-700' : ''
									}`}
									onClick={() => handleEpisodes('change', key)}
								>
									{Number(key) + 1}
								</button>
							</li>
						))}
					</ul>
				</div>

				<button
					className='absolute z-5 right-2 top-[50%] translate-y-[-50%] cursor-pointer'
					onClick={() => handleEpisodes('next')}
					disabled={
						(episodes.episodesOffset + 1) * episodes.episodesOffsetWidth >=
						episodes.totalEpisodesWidth
					}
				>
					<FaChevronRight fontSize={22} />
				</button>
			</div>
		</section>
	)
}

export default VideoPlayer
