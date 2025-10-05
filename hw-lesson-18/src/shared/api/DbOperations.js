import db from '@/shared/config/firebase-config'
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query,
    setDoc,
    startAfter,
    updateDoc,
} from 'firebase/firestore/lite'

class DbOperations {
  // --- CARTS SPECIALIZED METHODS ---
  // get cart object for user_id
  async getCartByUserId(userId) {
    const snap = await getDoc(doc(this.collectionRef, userId))
    if (!snap.exists()) return {}
    return snap.data() // { product_id: { ... } }
  }

  // set full cart object for user_id
  async setCartByUserId(userId, cartObj) {
    await setDoc(doc(this.collectionRef, userId), cartObj)
    return true
  }

  async updateCart(userId, updates) {
    const cart = await this.getCartByUserId(userId)
    const updatedCart = { ...cart, ...updates }
    await this.setCartByUserId(userId, updatedCart)
    return true
  }
  constructor(name) {
    this.collectionRef = collection(db, name)
  }

  async getAll() {
    const snapshot = await getDocs(this.collectionRef)
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  }

  async getAllPaginated({ page = 1, perPage = 6, cursors = [] }) {
    let q

    const realLimit = perPage + 1

    if (page === 1) {
      q = query(this.collectionRef, orderBy('title'), limit(realLimit))
    } else {
      const cursor = cursors[page - 2]
      if (!cursor) throw new Error('Cursor not found')
      q = query(
        this.collectionRef,
        orderBy('title'),
        startAfter(cursor),
        limit(realLimit)
      )
    }

    const snapshot = await getDocs(q)
    const docs = snapshot.docs

    const hasMore = docs.length > perPage

    const data = docs
      .slice(0, perPage)
      .map((doc) => ({ id: doc.id, ...doc.data() }))
    const lastVisible = docs[docs.length - 2] || null

    return { data, cursor: lastVisible, hasMore }
  }

  async getById(id) {
    const snap = await getDoc(doc(this.collectionRef, id))
    return { id: snap.id, ...snap.data() }
  }

  async setWithId(id, data) {
    await setDoc(doc(this.collectionRef, id), data)
    return true
  }

  async add(data) {
    await addDoc(this.collectionRef, data)
    return true
  }
  async update(id, data) {
    await updateDoc(doc(this.collectionRef, id), data)
    return true
  }
  async delete(id) {
    await deleteDoc(doc(this.collectionRef, id))
    return true
  }
}

export default DbOperations
