import ReactPlayer from 'react-player';
import { BounceLoader } from 'react-spinners';
import useEpisodes from '../../../../hooks/player/useEpisodes';
import useVideoPlayer from '../../../../hooks/player/useVideoPlayer';
import useVideoQuality from '../../../../hooks/player/useVideoQuality';
import EpisodeCarousel from './EpisodeCarousel';
import VideoControls from './VideoControls';

const VideoPlayer = ({ anime, handleEpisodeChange, episodeInfo: {episodeInfo} }) => {
	const { episodes } = useEpisodes(anime, handleEpisodeChange)

	const { videoRef, videoContainerRef, videoState, setVideoState, togglePlay, handleReady, handleBuffer, handleBufferEnd, resetTimer } = useVideoPlayer(episodes.activeEpisode)

	const { videoUrl } = useVideoQuality(anime, episodes, videoRef)

	const showPreview = () => {
		if(videoRef.current && !videoState.isPlaying) {
			videoRef.current.showPreview()
		}
	}

	return (
		<section className='text-white mt-5'>
			<h3 className='font-semibold text-2xl mb-2'>
				Смотреть <span className='text-purple-500'>онлайн</span>
			</h3>

			<div 
				className="flex w-full h-full relative group overflow-hidden rounded-md flex-center"
				ref={videoContainerRef}
			>
				<div 
					className="relative w-full overflow-hidden rounded-md bg-black" style={{ aspectRatio: "16/9" }}
					onClick={(!episodes.activeEpisode && !videoState.isPlaying) ? showPreview : togglePlay}
					onMouseMove={videoState.isPlaying ? resetTimer : null}
					onTouchStart={() => { 
						resetTimer(); 
						setVideoState(prev => ({ ...prev, isControlVisible: true })); 
					}}
				>
					{videoState.isBuffering && (
						<div className='absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]'>
							<BounceLoader color='#ad46ff' />
						</div>
					)}

					<ReactPlayer 
						width="100%"
						height="100%"
						ref={videoRef}
						controls={false}
						playsinline 
						
						onReady={handleReady}
						onBuffer={handleBuffer}
						onBufferEnd={handleBufferEnd}

						playing={videoState.isPlaying}
						url={videoUrl}
						light={"/images/watch_bg.png"}
						className="absolute top-0 left-0"
					/>
				</div>

				<VideoControls
					anime={anime}
					episodes={episodes}
					videoRef={videoRef}
				/>
			</div>

			<EpisodeCarousel
				anime={anime}
				episodeInfo={episodeInfo}
			/>
		</section>
	)
}

export default VideoPlayer