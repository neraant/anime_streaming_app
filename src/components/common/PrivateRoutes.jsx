import React from 'react'
import { Navigate } from 'react-router-dom'
import { useUser } from '../../contexts/UserContext'
import Preloader from './Preloader'

const PrivateRoutes = ({ children }) => {
	const { isLoading, isAuthenticated } = useUser()

	if(isLoading) {
		return <Preloader />
	}

	return isAuthenticated ? children : <Navigate to="/sign" />
}

export default PrivateRoutes