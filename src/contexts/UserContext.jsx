import { createContext, useContext, useEffect, useState } from "react";
import { getUser } from "../Services/firebaseUserServices";

const UserContext = createContext()

export const useUser = () => {
	return useContext(UserContext)
}

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(localStorage.getItem("user") || null);
	const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
			setIsLoading(true)
			try {
				const userId = JSON.parse(localStorage.getItem("user"))?.uid;
				if (userId) {
					const userData = await getUser(userId);
					setUser(userData);
				}				
			} catch (error) {
				console.error("Проблемы с авторизацией пользователя: ", error)
			} finally {
				setIsLoading(false)
			}
    };
		
    fetchUser();
  }, []);

	const isAuthenticated = !!user

  return ( 
		<UserContext.Provider value={{ user, setUser, isAuthenticated, isLoading }}>
			{children}
		</UserContext.Provider>
	)
}