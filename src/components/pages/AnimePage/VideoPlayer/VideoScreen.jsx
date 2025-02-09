import React from 'react';
import ReactPlayer from 'react-player';
import { BounceLoader } from 'react-spinners';
import useEpisodes from '../../../../hooks/player/useEpisodes';
import useVideoPlayer from '../../../../hooks/player/useVideoPlayer';
import useVideoQuality from '../../../../hooks/player/useVideoQuality';

const VideoScreen = ({ anime, handleEpisodeChange }) => {
	const { episodes } = useEpisodes(anime, handleEpisodeChange)

	const { videoRef, videoState, setVideoState, togglePlay, handleReady, handleBuffer, handleBufferEnd, resetTimer } = useVideoPlayer(episodes.activeEpisode)

	const { videoUrl } = useVideoQuality(anime, episodes, videoRef)

	const showPreview = () => {
		if(videoRef.current && !videoState.isPlaying) {
			videoRef.current.showPreview()
		}
	}

	return (
		<div 
			className="relative w-full overflow-hidden rounded-md bg-black" style={{ aspectRatio: "16/9" }}
			onClick={togglePlay}
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
	)
}

export default VideoScreen