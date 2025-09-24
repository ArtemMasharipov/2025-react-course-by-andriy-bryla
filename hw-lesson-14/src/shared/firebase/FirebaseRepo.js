import {
    addDoc, collection, deleteDoc, doc, documentId, getDoc, getDocs,
    limit, orderBy, query, startAfter, updateDoc, where, writeBatch
} from 'firebase/firestore/lite'

export default class FirebaseRepo {
  constructor(db, collectionName) {
    this.db = db
    this.collection = collection(db, collectionName)
    this.collectionName = collectionName
  }

  async getAllPaginated({ 
    perPage = 20, 
    lastCursor = null, 
    sort = { field: 'createdAt', dir: 'desc' }, 
    filters = [] 
  }) {
    const constraints = []
    
    filters.forEach(({ field, op, value }) => {
      if (op === 'startsWith') {
        constraints.push(where(field, '>=', value.toLowerCase()))
        constraints.push(where(field, '<', value.toLowerCase() + '\uf8ff'))
      } else {
        constraints.push(where(field, op, value))
      }
    })

    constraints.push(orderBy(sort.field, sort.dir))
    if (sort.field !== documentId()) {
      constraints.push(orderBy(documentId(), sort.dir))
    }

    if (lastCursor) {
      const cursor = lastCursor.sortValue ? [lastCursor.sortValue, lastCursor.id] : lastCursor
      constraints.push(startAfter(...(Array.isArray(cursor) ? cursor : [cursor])))
    }

    constraints.push(limit(perPage + 1))

    const snapshot = await getDocs(query(this.collection, ...constraints))
    const docs = snapshot.docs
    const data = docs.slice(0, perPage).map(d => ({ id: d.id, ...d.data() }))
    const hasMore = docs.length > perPage

    const nextCursor = hasMore && data.length > 0 ? {
      id: docs[perPage - 1].id,
      sortValue: docs[perPage - 1].data()[sort.field]
    } : null

    return { data, nextCursor, hasMore }
  }

  async get(id) {
    const snapshot = await getDoc(doc(this.collection, id))
    return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null
  }

  async create(data) {
    const now = Date.now()
    const payload = { 
      ...data, 
      createdAt: now, 
      updatedAt: now
    }

    if (this.collectionName === 'patients' || this.collectionName === 'doctors') {
      payload.searchFullName = data.fullName?.toLowerCase() || null
    }
    
    if (this.collectionName === 'appointments' && data.patientName) {
      payload.searchPatientName = data.patientName.toLowerCase()
    }

    const ref = await addDoc(this.collection, payload)
    return { id: ref.id, ...payload }
  }

  async update(id, patch) {
    const payload = { 
      ...patch, 
      updatedAt: Date.now() 
    }

    if (this.collectionName === 'patients' || this.collectionName === 'doctors') {
      if (patch.fullName !== undefined) {
        payload.searchFullName = patch.fullName?.toLowerCase() || null
      }
    }
    
    if (this.collectionName === 'appointments' && patch.patientName !== undefined) {
      payload.searchPatientName = patch.patientName.toLowerCase()
    }

    await updateDoc(doc(this.collection, id), payload)
    return { id, ...payload }
  }

  async remove(id) {
    await deleteDoc(doc(this.collection, id))
    return { id }
  }

  async removeCascadeSimple(id, dependentCollections = []) {
    const batch = writeBatch(this.db)
    
    for (const collectionName of dependentCollections) {
      const targetCol = collection(this.db, collectionName)
      let fieldName = ''
      
      if (this.collectionName === 'doctors') {
        fieldName = 'doctorId'
      } else if (this.collectionName === 'patients') {
        fieldName = 'patientId'
      }
      
      if (fieldName) {
        const snapshot = await getDocs(query(targetCol, where(fieldName, '==', id)))
        snapshot.docs.forEach(doc => batch.delete(doc.ref))
      }
    }
    
    batch.delete(doc(this.collection, id))
    
    await batch.commit()
    return { id }
  }

  async removeCascade(id, cascadeGraph = {}) {
    const batch = writeBatch(this.db)
    const affectedCollections = new Set([this.collectionName])

    const queryPromises = Object.entries(cascadeGraph).map(async ([targetCollection, rules]) => {
      const targetCol = collection(this.db, targetCollection)
      const allDocs = []
      
      for (const rule of rules) {
        const snapshot = await getDocs(query(
          targetCol,
          where(rule.field, rule.op || '==', rule.refId || id)
        ))
        allDocs.push(...snapshot.docs)
      }
      
      if (allDocs.length > 0) {
        affectedCollections.add(targetCollection)
      }
      return allDocs
    })

    const results = await Promise.all(queryPromises)
    results.flat().forEach(doc => batch.delete(doc.ref))
    
    batch.delete(doc(this.collection, id))
    
    await batch.commit()
    return { 
      id, 
      affectedCollections: Array.from(affectedCollections)
    }
  }
}