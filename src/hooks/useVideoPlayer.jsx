import { useEffect, useRef, useState } from 'react';
import screenfull from 'screenfull';

const formatTime = (seconds) => {
	const hrs = Math.floor(seconds / 3600);
	const mins = Math.floor((seconds % 3600) / 60);
	const secs = Math.floor(seconds % 60);

	if (hrs > 0) {
			return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
	} else {
			return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
	}
}

const useVideoPlayer = (activeEpisode) => {
	const videoRef = useRef()
	const intervalRef = useRef()
	
	const [videoState, setVideoState] = useState({
    isPlaying: false,
    isFullscreen: false,
    progress: 0,
    currentTime: "00:00",
    endTime: "00:00",
    isBuffering: false,
  })

	useEffect(() => {
		const video = videoRef.current?.getInternalPlayer()
		if(!video) return

		const updateProgress = () => {
			setVideoState(prev => ({
				...prev,
				progress: (video.currentTime / video.duration) * 100,
				currentTime: formatTime(video.currentTime),
			}))
		}

		if(videoState.isPlaying) {
			intervalRef.current = setInterval(() => {
				updateProgress()
			}, 1000)
		} else {
			clearInterval(intervalRef.current)
		}

		return () => clearInterval(intervalRef.current)
	}, [videoState.isPlaying])

	useEffect(() => {
		const video = videoRef.current?.getInternalPlayer()

		if(!video) return
		
		console.log(videoRef.current.getInternalPlayer());
		// const endTime = formatTime(video.duration)

		setVideoState(prev => ({
			...prev,
			// endTime,
			progress: 0,
			currentTime: "00:00",
			isPlaying: false,
		}))
	}, [activeEpisode])

	const togglePlay = () => {
		setVideoState(prev => ({
			...prev,
			isPlaying: !prev.isPlaying,
		}))
	}

	const toggleFullscreen = () => {
		if(screenfull.isEnabled) {
			screenfull.toggle(videoRef.current.getInternalPlayer())
			setVideoState(prev => ({
				...prev,
				isFullscreen: !prev.isFullscreen,
			}))
		}
	}

	const handleSeek = (e) => {
		const video = videoRef.current.getInternalPlayer()
		if(!video) return

		const seekTo = (e.target.value / 100) * video.duration
		video.currentTime = seekTo

		setVideoState(prev => ({
			...prev,
			progress: e.target.value,
			current: formatTime(seekTo)
		}))
	}

	return { videoRef, videoState, togglePlay, toggleFullscreen, handleSeek }
}

export default useVideoPlayer