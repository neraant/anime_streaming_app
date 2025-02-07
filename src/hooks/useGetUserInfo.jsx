import { useState } from 'react'

const useGetUserInfo = () => {
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem("user")) || null
	)
	
	return { user, setUser }
}

export default useGetUserInfo