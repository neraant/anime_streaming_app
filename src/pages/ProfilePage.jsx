import { useEffect, useState } from 'react'
import Layout from '../components/common/Layout'
import ProfileCarousel from '../components/pages/ProfilePage/ProfileCarousel'
import ProfileDetails from '../components/pages/ProfilePage/ProfileDetails'
import { useUser } from '../contexts/UserContext'
import { getFavorites } from '../Services/firebaseFavoritesServices'
import { getHistory } from '../Services/firebaseHistoryServices'

const historyTitle = "История просмотров"
const favoritesTitle = "Понравившиеся"

const ProfilePage = () => {
	const { user } = useUser()
	const [favoriteList, setFavoriteList] = useState([])
	const [historyList, setHistoryList] = useState([])

	const getFavoritesList = async () => {
		try {
			const fetchFavoritesList = await getFavorites(user?.uid)
			setFavoriteList(fetchFavoritesList)
		} catch (error) {
			console.error("Ошибка при получении списка понравившихся: ", error)
		}
	}

	const getHisotryList = async () => {
		try {
			const fetchHistoryList = await getHistory(user?.uid)
			setHistoryList(fetchHistoryList)
		} catch (error) {
			console.error("Ошибка при получении списка истории: ", error)
		}
	}

	useEffect(() => {
		if(user?.uid) {
			getFavoritesList()
			getHisotryList()
		}
	}, [user])

	return (
		<Layout>
			<ProfileDetails />
			<ProfileCarousel 
				title={historyTitle} 
				contentList={historyList}
				setContentList={setHistoryList}
			/>
			<ProfileCarousel 
				title={favoritesTitle}
				contentList={favoriteList}
				setContentList={setFavoriteList}
			/>
		</Layout>
	)
}

export default ProfilePage