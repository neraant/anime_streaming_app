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
		return localStorage.getItem("quality") || 480;
	});
	const [isShowQuality, setIsShowQuality] = useState(false)
	const [videoUrl, setVideoUrl] = useState('')

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
		const videoQualities = []
		const episode = anime.episodes[Number(episodes.activeEpisode)]
		
		if (episode?.hls_1080) {
			videoQualities.push({
				quality: 1080, 
				videoUrl: episode.hls_1080, 
				text: "1080p"
			});
		}
		if (episode?.hls_720) {
			videoQualities.push({
				quality: 720, 
				videoUrl: episode.hls_720, 
				text: "720p"
			});
		}
		if (episode?.hls_480) {
			videoQualities.push({
				quality: 480, 
				videoUrl: episode.hls_480, 
				text: "480p"
			});
		}

		setQualities(videoQualities)
	}, [episodes?.activeEpisode])

	// Getting video url
	useEffect(() => {
    const selectedQuality = qualities.find(q => q.quality === Number(activeQuality));

    if (selectedQuality) {
      setVideoUrl(selectedQuality.videoUrl);
      localStorage.setItem("quality", activeQuality);
    }
  }, [activeQuality, qualities]);
	
	return { qualities, activeQuality, setActiveQuality, isShowQuality, setIsShowQuality, handleVideoQuality, videoUrl }
}

export default useVideoQuality