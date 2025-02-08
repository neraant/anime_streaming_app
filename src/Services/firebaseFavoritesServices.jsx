import { collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export const addFavorite = async (uid, animeId, anime) => {
	try {
		const favoriteRef = doc(db, `users/${uid}/favorites`, String(animeId))
		await setDoc(favoriteRef, { anime, timestamp: serverTimestamp() })
	} catch (error) {
		console.error("Ошибка при добавлении favourite: ", error)
	}
}

export const removeFavorite = async (uid, animeId) => {
	try {
		const favoriteRef = doc(db, `users/${uid}/favorites`, String(animeId))
		await deleteDoc(favoriteRef)
	} catch (error) {
		console.error("Ошибка при удалении favourite: ", error)
	}
}

export const getFavorites = async (uid) => {
	try {
		const favoritesRef = collection(db, `users/${uid}/favorites`)
		const q = query(favoritesRef, orderBy("timestamp", "desc"))

		const snapshot = await getDocs(q)
		const favorites = snapshot.docs.map(doc => ({ 
			id: doc.id, 
			action: "favorite",
			...doc.data() 
		}))
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

		const favoriteRef = doc(db, `users/${uid}/favorites`, String(animeId))
		const docSnap = await getDoc(favoriteRef)
		return docSnap.exists()
	} catch (error) {
		console.error("Ошибка при проверке является ли понравившимся: ", error)
		return false;
	}
}