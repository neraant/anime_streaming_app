import { useEffect, useState } from 'react';

const useVideoVolume = (videoRef, setVideoState, videoState) => {
	const [isVolumeVisible, setIsVolumeVisible] = useState(false)
	let hideTimeout;
	
	const handleVolumeChange = (e) => {
		const video = videoRef.current.getInternalPlayer()
		if(!video) return

		const newVolume = e.target.value
		video.volume = newVolume
		
		localStorage.setItem('volume', newVolume)

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

	useEffect(() => {
		const video = videoRef?.current?.getInternalPlayer()
		if(!video) return

		video.volume = videoState.volume
		console.log("volume changed");
	}, [videoState.isReady])

	return {handleVolumeChange, handleMuted, showVolume, hideVolume, isVolumeVisible}
}

export default useVideoVolume