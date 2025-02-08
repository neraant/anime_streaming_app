import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { useDebounce } from 'use-debounce'
import { fetchAllAnimeData } from '../../api/anilibriaApi'

const useAnimeList = (animeInput) => {
	const [debouncedAnimeInput] = useDebounce(animeInput, 700)
	const [isFading, setIsFading] = useState(false)
	const [visibleAnime, setVisibleAnime] = useState(20)
	const [page, setPage] = useState(1)
	const [animeList, setAnimeList] = useState([])
	const [meta, setMeta] = useState({pagination: {
		current_page: 1,
		total: 0,
		total_pages: 1,
	}})

	const { mutate, data, isLoading, isError } = useMutation(
		({ animeName, page }) => fetchAllAnimeData({ animeName, page })
	)

	const loadMore = () => {
		if (meta.pagination.total > visibleAnime) {
			setPage(prev => prev + 1)
			setVisibleAnime(prev => Math.min(prev + 20, meta.pagination.total));
			mutate({ animeName: debouncedAnimeInput.trim(), page: page + 1 });
		}
	}

	useEffect(() => {
    setAnimeList([]);
    setPage(1);
    setVisibleAnime(20);
		setMeta({ pagination: { current_page: 1, total: 0, total_pages: 1 } });
    mutate({ animeName: debouncedAnimeInput.trim(), page: 1 });
	}, [debouncedAnimeInput]);

	useEffect(() => {
		if(!data) return

		const normalizedData = Array.isArray(data.data) 
			? data.data 
			: Array.isArray(data) 
			? data 
			: [];

		const normalizedMeta = data?.meta || { 
			pagination: { total: normalizedData.length } 
		};

		setAnimeList(prev => ([...prev, ...normalizedData]))
		setMeta(normalizedMeta)

		setIsFading(true)
		const timeout = setTimeout(() => {
			setIsFading(false)
		}, 300)

		return () => {
			clearTimeout(timeout)
		}
	}, [data])
	
	return { animeList, meta, isLoading, isError, isFading, loadMore }
}

export default useAnimeList