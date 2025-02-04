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
	const videoRef = useRef(null)
	const intervalRef = useRef(null)
	const hideControlsRef = useRef(null)
	const videoContainerRef = useRef(null)
	
	const [videoState, setVideoState] = useState({
    isPlaying: false,
    isFullscreen: false,
    progress: 0,
    currentTime: "00:00",
    endTime: "00:00",
    isReady: false,
		isControlVisible: true,
  })

	useEffect(() => {
		const video = videoRef.current?.getInternalPlayer()
		if(!video) return

		const updateProgress = () => {
			setVideoState(prev => ({
				...prev,
				progress: (video.currentTime / video.duration) * 100,
				currentTime: formatTime(video.currentTime || 0),
				endTime: formatTime(video.duration || 0),
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
		
		setVideoState(prev => ({
			...prev,
			progress: 0,
			currentTime: "00:00",
			isPlaying: false,
			isReady: false,
		}))
	}, [activeEpisode])

	const togglePlay = () => {
		const video = videoRef.current?.getInternalPlayer();
		if (!video || !videoState.isReady) return;

		setVideoState((prev) => ({
			...prev,
			isPlaying: !prev.isPlaying,
		}));

		if (!videoState.isPlaying) {
			video.play();
		} else {
			video.pause();
		}
	};

	const toggleFullscreen = () => {
		if(screenfull.isEnabled && videoState.isReady) {
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

	const handleReady = () => {
		setVideoState((prev) => ({ 
			...prev, 
			isReady: true, 
			isPlaying: true,
		}))
	}

	const resetHideControlsTimer = () => {
		clearTimeout(hideControlsRef.current)
		setVideoState(prev => ({
			...prev,
			isControlVisible: true,
		}))

		setVideoState(prev => {
			if(prev.isPlaying) { 
				hideControlsRef.current = setTimeout(() => {
					setVideoState(prev => ({
						...prev,
						isControlVisible: false,
					}))
				}, 3000)
			}
			return { ...prev, isControlVisible: true };
		})
	}

	useEffect(() => {
		const videoContainer = videoContainerRef.current
		if(!videoContainer) return

		const showControls = () => resetHideControlsTimer()

		videoContainer.addEventListener('mousemove', showControls)
		videoContainer.addEventListener('keydown', showControls)

		return () => {
			videoContainer.removeEventListener('mousemove', showControls)
			videoContainer.removeEventListener('keydown', showControls)
		}
	}, [])

	return { videoRef, videoContainerRef, videoState, togglePlay, toggleFullscreen, handleSeek, handleReady }
}

export default useVideoPlayer