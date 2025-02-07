import { auth, provider } from '../firebase/firebaseConfig';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createUser } from './firebaseUserServices';

export const signInWithEmail = async (email, password) => {
	try {
		const userCredential = await signInWithEmailAndPassword(auth, email, password)
		return userCredential.user
	} catch (error) {
		console.error("Ошибка при входе в аккаунт с помощью email: ", error)
		throw error
	}
}

export const signUpWithEmail = async (email, password) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password)
		const user = userCredential.user

		await createUser(user)
		
		return userCredential.user
	} catch (error) {
		console.error("Ошибка входа через Email:", error)
		if(error.message === "Firebase: Error (auth/email-already-in-use).") {
			throw new Error("Пользователь с таким email уже зарегистрирован!")
		}
		throw error
	}
}

export const signWithGoogle = async () => {
	try {
		const result = await signInWithPopup(auth, provider)
		const user = result.user

		await createUser(user)

		return user
	} catch (error) {
		console.error("Ошибка входа через Google:", error);
		
		if(error.message === "Firebase: Error (auth/popup-closed-by-user).") {
			throw new Error("Ошибка входа через Google!")
		}
		
		throw error
	}
}

export const logOut = async () => {
	try {
		await signOut(auth)
		localStorage.removeItem("user")
	} catch (error) {
		console.error("Ошибка при выходе из системы: ", error)
	}
}