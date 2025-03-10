import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

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

	// Episode per page
	const episodesPerPage = useMemo(() => {
		if (!episodesContainerRef.current) return 1;
		return Math.floor(episodesContainerRef.current.offsetWidth / 80);
	}, [episodesContainerRef.current])

	const maxOffset = useMemo(() => {
		return Math.ceil(episodes.totalEpisodesWidth / episodes.episodesOffsetWidth) - 1
	}, [episodes.totalEpisodesWidth, episodes.episodesOffsetWidth])

	// Size of episodes line
	const updateSizes = useCallback(() => {
		const container = episodesContainerRef.current
		const list = episodesListRef.current
		
		if (container && list) {
			const containerWidth = container.offsetWidth
			const totalWidth = list.scrollWidth

			setEpisodes(prev => ({
				...prev,
				episodesOffsetWidth: containerWidth,
				totalEpisodesWidth: totalWidth,
				episodesPerPage
			}))
		}
	}, [])

	// Episodes control
	const handleEpisodes = useCallback((type, key = null) => {
		setEpisodes(prev => {
			let newOffset = prev.episodesOffset

			switch (type) {
				case "next": {
					if (prev.episodesOffsetWidth > 0 && newOffset < maxOffset) {
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
					console.log("Switching to episode: ", key);
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
			handleEpisodeChange(anime?.episodes[key])
		}
	}, [anime, maxOffset, handleEpisodeChange])

	// Calc scroll offset
	useEffect(() => {
		updateSizes()
		window.addEventListener("resize", updateSizes)
		return () => {
			window.removeEventListener("resize", updateSizes)
		}
	}, [anime]);
	
	return { episodesContainerRef, episodesListRef, episodes, handleEpisodes }
}

export default useEpisodes