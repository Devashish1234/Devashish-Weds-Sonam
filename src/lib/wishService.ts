import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { type Wish } from '../types'
import { db } from './firebase'

const wishesCollection = collection(db, 'wishes')

export type NewWish = Pick<Wish, 'name' | 'message'>

export function subscribeToWishes(onWishes: (wishes: Wish[]) => void, onError: (error: Error) => void) {
  const wishesQuery = query(wishesCollection, orderBy('createdAt', 'desc'))

  return onSnapshot(wishesQuery, (snapshot) => {
    const wishes = snapshot.docs.flatMap((document) => {
      const data = document.data()
      const createdAt = data.createdAt
      if (
        typeof data.name !== 'string' ||
        typeof data.message !== 'string' ||
        !createdAt ||
        typeof createdAt.toMillis !== 'function'
      ) return []

      return [{
        id: document.id,
        name: data.name,
        message: data.message,
        createdAt: createdAt.toMillis(),
      }]
    })

    onWishes(wishes)
  }, (error) => onError(error))
}

export function createWish(wish: NewWish) {
  return addDoc(wishesCollection, {
    name: wish.name,
    message: wish.message,
    createdAt: serverTimestamp(),
  })
}
