import { useEffect, useState } from 'react';

const QUALITY_MAP = {
  fhd: 1080,
  hd: 720,
  sd: 360
};

const REVERSE_QUALITY_MAP = {
  1080: "fhd",
  720: "hd",
  360: "sd"
};

const useVideoQuality = (anime, episodes, videoRef) => {
	const [qualities, setQualities] = useState([])
	const [activeQuality, setActiveQuality] = useState(() => {
		return localStorage.getItem("quality") || qualities.find(q => q) || 360;
	});
	const [isShowQuality, setIsShowQuality] = useState(false)

	// Choose quality
	const handleVideoQuality = (quality) => {
		setIsShowQuality(false)
		
		const video = videoRef?.current?.getInternalPlayer()
		if(!video) return

		const currentTime = video.currentTime

		setActiveQuality(quality)

		localStorage.setItem("quality", quality)

		setTimeout(() => {
			const newVideo = videoRef?.current?.getInternalPlayer()
			if(newVideo) {
				newVideo.currentTime = currentTime
			}
		}, 1000)
	}

	// Getting all possible qualities
	useEffect(() => {
		console.log(anime);
		const videoQualities = Object.keys(anime?.player?.list[episodes?.activeEpisode || 1]?.hls).map(quality => QUALITY_MAP[quality])

		setQualities(videoQualities)
	}, [episodes?.activeEpisode])
	
	return { qualities, activeQuality, setActiveQuality, isShowQuality, setIsShowQuality, handleVideoQuality, REVERSE_QUALITY_MAP }
}

export default useVideoQuality