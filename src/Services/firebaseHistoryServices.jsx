import { collection, doc, getDocs, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'

export const addHistory = async (uid, animeId, anime) => {
	try {
		const historyRef = doc(db, `users/${uid}/history`, String(animeId))
		await setDoc(historyRef, { anime, timestamp: serverTimestamp() })
	} catch (error) {
		console.error("Ошибка при добавлении history: ", error)
	}
}

export const getHistory = async (uid) => {
	try {
		const historyRef = collection(db, `users/${uid}/history`)
		const q = query(historyRef, orderBy("timestamp", "desc"))

		const snapshot = await getDocs(q)
		const hisotry = snapshot.docs.map(doc => ({
			id: doc.id,
			action: "history",
			...doc.data(),
		})) 
		return hisotry
	} catch (error) {
		console.error("Ошибка при получении списка истории: ", error)
		return []
	}
}