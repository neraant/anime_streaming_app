import { useGSAP } from '@gsap/react'
import gsap from 'gsap/gsap-core'
import { useState } from 'react'
import Layout from '../components/common/Layout'
import AnimeList from '../components/pages/HomePage/AnimeList'
import HomeContent from '../components/pages/HomePage/HomeContent'

const Home = () => {
	const [animeInput, setAnimeInput] = useState("")

	useGSAP(() => {
		gsap.to(".main-content", {
			opacity: 1,
			y: 0,
			duration: 0.5
		})
	}, [])

	return (
		<div className='main-content flex flex-col w-full h-[100dvh] translate-y-3 opacity-0'>
			<Layout>
        <HomeContent animeInput={animeInput} setAnimeInput={setAnimeInput} />
				<AnimeList animeInput={animeInput} />
			</Layout>
		</div>
	)
}

export default Home