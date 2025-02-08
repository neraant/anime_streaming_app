import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export const addFavorite = async (uid, animeId, anime) => {
	try {
		const favoriteRef = doc(db, `users/${uid}/favorites`, String(animeId))
		await setDoc(favoriteRef, { anime, timestamp: Date.now() })
		console.log("Favourite added!");
	} catch (error) {
		console.error("Ошибка при добавлении favourite: ", error)
	}
}

export const removeFavorite = async (uid, animeId) => {
	try {
		const favoriteRef = doc(db, `users/${uid}/favorites`, String(animeId))
		await deleteDoc(favoriteRef)
		console.log("Favourite removed!");
	} catch (error) {
		console.error("Ошибка при удалении favourite: ", error)
	}
}

export const getFavorites = async (uid) => {
	try {
		const favoritesRef = collection(db, `users/${uid}/favorites`)
		const snapshot = await getDocs(favoritesRef)
		const favorites = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
		return favorites
	} catch (error) {
		console.error("Ошибка при получении списка понравившихся: ", error)
		return []
	}
}

export const isFavorite = async (uid, animeId) => {
	try {
		if(!uid || !animeId) {
			return false
		}

		const favoriteRef = doc(db, `users/${uid}/favorites`, animeId)
		const docSnap = await getDoc(favoriteRef)
		return docSnap.exists()
	} catch (error) {
		console.error("Ошибка при проверке является ли понравившимся: ", error)
		return false;
	}
}