import Layout from '../components/common/Layout'
import ProfileCarousel from '../components/pages/ProfilePage/ProfileCarousel'
import ProfileDetails from '../components/pages/ProfilePage/ProfileDetails'

const ProfilePage = () => {
	const favoritesTitle = "Понравившиеся"
	const historyTitle = "История просмотров"

	return (
		<Layout>
			<ProfileDetails />
			{/* <ProfileCarousel title={historyTitle} /> */}
			<ProfileCarousel title={favoritesTitle} />
		</Layout>
	)
}

export default ProfilePage