import { useEffect, useRef, useState } from 'react'

const useEpisodes = (anime, handleEpisodeChange) => {
	const episodesContainerRef = useRef()
	const episodesListRef = useRef()

	const [episodes, setEpisodes] = useState({
		activeEpisode: null,
		episodesOffset: 0,
		episodesOffsetWidth: 0,
		totalEpisodesWidth: 0,
		episodesPerPage: 1,
	})

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
					return { 
						...prev, 
						activeEpisode: key 
					};
				}
				default:
					break;
			}

			return { ...prev, episodesOffset: newOffset };
		})

		if(type === "change" && key !== null) {
			handleEpisodeChange(anime.episodes[key])
		}
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
	
	return { episodesContainerRef, episodesListRef, episodes, handleEpisodes }
}

export default useEpisodes