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
	
	const [isVolumeVisible, setIsVolumeVisible] = useState(false)
	let hideTimeout;

	const [videoState, setVideoState] = useState({
    isPlaying: false,
    isFullscreen: false,
    progress: 0,
    currentTime: "00:00",
    endTime: "00:00",
    isReady: false,
		isControlVisible: true,
		volume: localStorage.getItem('volume') || 0.8,
		isMuted: false,
  })

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
		if(videoState.isReady) {
			if(!screenfull.isFullscreen) {
				videoContainerRef.current.dataset.scrollY = window.scrollY
			}

			const video = videoRef?.current?.getInternalPlayer()
			if(!video) return
			
			if (screenfull.isEnabled && !/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
				screenfull.toggle(videoContainerRef.current);
			} else if (video.requestFullscreen) {
				video.requestFullscreen();
			} else if (video.webkitEnterFullscreen) {
				video.webkitEnterFullscreen();
			}
			
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

	const handleVolumeChange = (e) => {
		const video = videoRef.current.getInternalPlayer()
		if(!video) return

		const newVolume = e.target.value
		video.volume = newVolume
		
		localStorage.setItem('volume', newVolume)

		console.log(newVolume);

		setVideoState(prev => ({
			...prev,
			volume: newVolume,
			isMuted: newVolume == 0,
		}));
	}

	const handleMuted = () => {
		setVideoState(prev => {
			const video = videoRef?.current?.getInternalPlayer()
			if(!video) return

			const isNowMuted = !videoState.isMuted;

  		video.muted = isNowMuted;

			return {
				...prev,
				isMuted: isNowMuted,
			}
		})
	}

	const showVolume = () => {
		clearTimeout(hideTimeout)
		setIsVolumeVisible(true)
	}

	const hideVolume = () => {
		hideTimeout = setTimeout(() => {
			setIsVolumeVisible(false)
		}, 2000)
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

	// Scroll when fullscreen off
	useEffect(() => {
		if (screenfull.isEnabled) {
			const handleFullscreenChange = () => {
				if(!screenfull.isFullscreen) {
					const savedScrollY = videoContainerRef.current.dataset.scrollY 
					window.scrollTo({ top: savedScrollY, behavior: "instant" })
				}
			}

			screenfull.on("change", handleFullscreenChange)
			return () => screenfull.off("change", handleFullscreenChange)
		}
	}, []);

	// Update progress
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

	// Set options when change episode
	useEffect(() => {
		const video = videoRef.current?.getInternalPlayer()

		if(!video) return

		setVideoState(prev => ({
			...prev,
			progress: 0,
			currentTime: "00:00",
			isPlaying: true,
			isReady: false,
		}))
	}, [activeEpisode])

	// Controll video controls (hidding)
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

	return { videoRef, videoContainerRef, videoState, togglePlay, toggleFullscreen, handleSeek, handleReady, handleVolumeChange, handleMuted, showVolume, hideVolume, isVolumeVisible }
}

export default useVideoPlayer