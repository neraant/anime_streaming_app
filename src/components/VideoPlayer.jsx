import { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaPause, FaPlay } from 'react-icons/fa';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ anime }) => {
	const episodesContainerRef = useRef()
	const episodesListRef = useRef()
	const videoRef = useRef()

	const [episodes, setEpisodes] = useState({
		activeEpisode: "1",
		episodesOffset: 0,
		episodesOffsetWidth: 0,
		totalEpisodesWidth: 0,
		episodesPerPage: 1,
	})

	const [videoOptions, setVideoOptions] = useState({
		videoUrl: "",
		isPlaying: false,
		quality: "fhd",
		speed: 1,
		volume: 1,
		isMuted: false,
		isFullscreen: false,
		startTime: "00:00",
		endTime: null,
		currentTime: "00:00",
		isSeeking: false,
		isBuffering: false,
		hasEnded: false,
	})

	// Video control
	const controlVideo = (action) => {
		const video = videoRef.current?.getInternalPlayer()

		if(video) { 
			switch (action) {
				case "pause-play":
					setVideoOptions((prev) => ({
						...prev,
						isPlaying: !prev.isPlaying
					}))

					if(videoOptions.hasEnded) {
						setVideoOptions(prev => ({
							...prev,
							currentTime: prev.startTime,
						}))
					}
					break;
			
				default:
					break;
			}
		}
	}

	// Episodes control
	const handleEpisodes = (type, key = null) => {
		setEpisodes(prev => {
			let newOffset = prev.episodesOffset
		
			switch (type) {
				case "next": {
					const maxOffset = Math.ceil(prev.totalEpisodesWidth / prev.episodesOffsetWidth) - 1;
					if (newOffset < maxOffset) {
						newOffset += 1;
					}
					break;
				}
				case "prev": {
					if (newOffset > 0) {
						newOffset -= 1;
					}
					break;
				}
				case "change": {
					return { ...prev, activeEpisode: key };
				}
				default:
					break;
			}

			return { ...prev, episodesOffset: newOffset };
		})
	}

	// Calc scroll offset
	useEffect(() => {
		const updateSizes = () => {
			const container = episodesContainerRef.current
			const list = episodesListRef.current
			
			if (container && list) {
				const containerWidth = container.offsetWidth
				const totalWidth = list.scrollWidth
				const episodesPerPage = Math.floor(containerWidth / 80)

				setEpisodes(prev => ({
					...prev,
					episodesOffsetWidth: containerWidth,
					totalEpisodesWidth: totalWidth,
					episodesPerPage
				}))
			}
		}

		updateSizes()
		window.addEventListener("resize", updateSizes)
		
		return () => {
			window.removeEventListener("resize", updateSizes)
		}
	}, [anime]);
	
	// Change episode
	useEffect(() => {
		const episodeHLS = anime.player.list[episodes.activeEpisode]?.hls;
		setVideoOptions(prev => ({
			...prev,
			videoUrl: `https://cache.libria.fun/${episodeHLS?.fhd || episodeHLS?.hd || episodeHLS?.sd}`,
			isPlaying: false,
		}));
	}, [episodes.activeEpisode])

	return (
		<section className='text-white'>
			<div 
				className="w-full h-full relative group cursor-pointer overflow-hidden rounded-md"
			>
				<ReactPlayer 
					ref={videoRef}
					url={videoOptions.videoUrl}
					width="100%"
          height="100%"
					playing={videoOptions.isPlaying}
					onClick={() => controlVideo("pause-play")}
				/>

				{/* Пауза, плей */}
				<div className={`absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] bg-[#00000090] p-5 rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none ${!videoOptions.isPlaying ? 'opacity-100' : 'opacity-0'}`}>
					{videoOptions.isPlaying ? (
						<button className='cursor-pointer flex-center'>
							<FaPause fontSize={26} />
						</button>
					) : (
						<button className='cursor-pointer flex-center'>
							<FaPlay fontSize={26} />
						</button>
					)}
				</div>
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
						className='flex items-center gap-2 py-2 transition-all duration-300'
						style={{transform: `translate(${-episodes.episodesOffset * 100}%)`}}
						ref={episodesListRef}
					>
						{Object.keys(anime.player.list).map((key, index) => (
							<li key={index} className='flex-center' >
								<button 
									className={`cursor-pointer py-1 px-3 rounded-md bg-purple-500 transition-all duration-300 hover:bg-purple-700 ${episodes.activeEpisode === key ? 'bg-purple-700' : ''}`}
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