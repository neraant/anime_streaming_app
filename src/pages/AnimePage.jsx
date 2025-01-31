import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { fetchAnimeData } from '../api/anilibriaApi';
import AnimeDetails from '../components/AnimeDetails';
import Layout from '../components/Layout';

const useQueryParams = () => {
	return new URLSearchParams(useLocation().search)
}

const AnimePage = () => {
	const query = useQueryParams()
	const animeId = query.get("id")

	const { data, isLoading, isError, error } = useQuery(
		["anime", animeId], 
		() => fetchAnimeData(animeId),
		{ enabled: !!animeId, retry: 3, retryDelay: 5000, refetchOnWindowFocus: false }
	)

	console.log(data);

	if(isLoading) {
		return <div>Loading..</div>
	}

	if(isError || !data) { 
		return <div>{error?.message || "Something went wrong!"}</div>
	}

	return (
		<>
			<Layout>
				<div className="screen-max-width">
					<AnimeDetails anime={data} />
				</div>
			</Layout>
		</>
	)
}

export default AnimePage