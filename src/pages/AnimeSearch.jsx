import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Layout from '../components/common/Layout'
import AnimeList from '../components/pages/HomePage/AnimeList'

const AnimeSearch = () => {
	const [searchParams] = useSearchParams()
	const [animeName, setAnimeName] = useState("")
	const isSearching = Boolean(animeName)

	useEffect(() => {
		const query = searchParams.get('query')
		if(query) {
			setAnimeName(query);
		}
	}, [searchParams])

	return (
		<Layout>
			<AnimeList 
				animeInput={animeName}
				isSearching={isSearching}
			/>
		</Layout>
	)
}

export default AnimeSearch