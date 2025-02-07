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
		volume: parseFloat(localStorage.getItem('volume')) || 0.8,
		isMuted: false,
		isBuffering: true,
  })

	const handleBuffer = () => {
		setVideoState(prev => ({
			...prev,
			isBuffering: true,
		}))
	}

	const handleBufferEnd = () => {
		setVideoState(prev => ({
			...prev,
			isBuffering: false,
		}))
	}

	const togglePlay = () => {
		const video = videoRef.current?.getInternalPlayer();
		if (!video || !videoState.isReady) return;

		
		setVideoState((prev) => {
			const newPlayingState = !prev.isPlaying
			newPlayingState ? video.play() : video.pause()
			
			if(newPlayingState) {
				resetTimer()
			} else {
				clearTimeout(hideControlsRef.current)
				setVideoState(prev => ({ ...prev, isControlVisible: true }));
			}

			return  {
				...prev,
				isPlaying: newPlayingState,
			}
		});
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

		if(video.duration) {
			const seekTo = (e.target.value / 100) * video.duration
			video.currentTime = seekTo
	
			setVideoState(prev => ({
				...prev,
				progress: e.target.value,
				currentTime: formatTime(seekTo)
			}))
		}
	}

	const handleReady = () => {
		setVideoState((prev) => ({ 
			...prev, 
			isReady: true, 
			isPlaying: true,
		}))
	}

	const resetTimer = () => {
		setVideoState(prev => ({
			...prev,
			isControlVisible: true,
		}));
	
		if (hideControlsRef.current) {
			clearTimeout(hideControlsRef.current);
		}
	
		if (videoRef.current?.getInternalPlayer()?.paused === false) {
			hideControlsRef.current = setTimeout(() => {
				setVideoState(prev => ({
					...prev,
					isControlVisible: false,
				}));
			}, 3000);
		}
	};

	// Controll video controls
	useEffect(() => {
		resetTimer()
		return () => clearTimeout(hideControlsRef.current)
	}, [])

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

		return () => {
			clearInterval(intervalRef.current)
			intervalRef.current = null
		}
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

	// Exit video on "Escape"
	useEffect(() => {
		const handleFullscreenChange = () => {
			setVideoState(prev => ({
				...prev,
				isFullscreen: screenfull.isFullscreen,
			}));
		};
	
		if (screenfull.isEnabled) {
			screenfull.on("change", handleFullscreenChange);
		}
	
		return () => {
			if (screenfull.isEnabled) {
				screenfull.off("change", handleFullscreenChange);
			}
		};
	}, []);

	return { videoRef, videoContainerRef, videoState, setVideoState, togglePlay, toggleFullscreen, handleSeek, handleReady, handleBuffer, handleBufferEnd, resetTimer }
}

export default useVideoPlayer