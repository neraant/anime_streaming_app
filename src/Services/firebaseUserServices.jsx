import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'

export const createUser = async (user) => {
	try {
		const userRef = doc(db, "Users", user.uid) 
		const docSnap = await getDoc(userRef)

		if(!docSnap.exists()) {
			await setDoc(userRef, {
				uid: user.uid,
				email: user.email,
				displayName: user.displayName || "Пользователь",
				photoURL: 'https://www.pngkey.com/png/detail/146-1460159_saitama-sticker-one-punch-man-saitama-ok.png',
				createdAt: new Date(),
			})
		}
	} catch (error) {
		console.error("Ошибка при создании пользователя:", error);
	}
}

export const getUser = async (uid) => {
	try {
		const userRef = doc(db, "Users", uid)
		const docSnap = await getDoc(userRef)

		if(docSnap.exists()) {
			return docSnap.data()
		} else {
			console.log("Пользователь не существует!");
		}
	} catch (error) {
		console.error(error)
	}
}

export const updateUser = async (uid, displayName) => {
	try {
		const userRef = doc(db, "Users", uid)
		await updateDoc(userRef, {
			displayName,
		})
	} catch (error) {
		console.error(error)
	}
}

export const deleteUser = async () => {
	// Deleting user 
}