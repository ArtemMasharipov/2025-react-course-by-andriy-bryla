import { v4 as uuid } from 'uuid'
import { readJSON, writeJSON } from '../utils/fileDb.js'

export class CrudFactory {
	constructor(filePath, idField = 'id') {
		this.filePath = filePath
		this.idField = idField
	}

	async getAll() {
		return await readJSON(this.filePath)
	}

	async getPaginated(page = 1, limit = 10, transformFn = null) {
		const items = await this.getAll()
		const pageNum = Math.max(1, parseInt(page, 10))
		const limitNum = Math.max(1, parseInt(limit, 10))

		const totalItems = items.length
		const totalPages = Math.ceil(totalItems / limitNum)

		const startIndex = (pageNum - 1) * limitNum
		const endIndex = startIndex + limitNum

		let paginatedItems = items.slice(startIndex, endIndex)
		
		if (transformFn) {
			paginatedItems = await transformFn(paginatedItems)
		}

		return {
			items: paginatedItems,
			page: pageNum,
			limit: limitNum,
			totalItems,
			totalPages
		}
	}

	async findById(id) {
		const items = await this.getAll()
		return items.find(item => item[this.idField] == id)
	}

	async findBy(predicate) {
		const items = await this.getAll()
		return items.filter(predicate)
	}

	async findOneBy(predicate) {
		const items = await this.getAll()
		return items.find(predicate)
	}

	async create(data, options = {}) {
		const items = await this.getAll()
		
		let newId
		if (options.customIdGenerator) {
			newId = await options.customIdGenerator(items)
		} else if (this.idField === 'id' && typeof items[0]?.id === 'number') {
			newId = Math.max(...items.map(item => item.id), 0) + 1
		} else {
			newId = uuid()
		}

		const newItem = {
			[this.idField]: newId,
			...data,
			...(options.timestamps && {
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString()
			})
		}

		items.push(newItem)
		await writeJSON(this.filePath, items)
		
		return newItem
	}

	async update(id, data, options = {}) {
		const items = await this.getAll()
		const index = items.findIndex(item => item[this.idField] == id)
		
		if (index === -1) {
			return null
		}

		const updatedItem = {
			...items[index],
			...data,
			...(options.timestamps && {
				updatedAt: new Date().toISOString()
			})
		}

		items[index] = updatedItem
		await writeJSON(this.filePath, items)
		
		return updatedItem
	}

	async delete(id) {
		const items = await this.getAll()
		const index = items.findIndex(item => item[this.idField] == id)
		
		if (index === -1) {
			return null
		}

		const [deletedItem] = items.splice(index, 1)
		await writeJSON(this.filePath, items)
		
		return deletedItem
	}

	async deleteBy(predicate) {
		const items = await this.getAll()
		const itemsToDelete = items.filter(predicate)
		const remainingItems = items.filter(item => !predicate(item))
		
		await writeJSON(this.filePath, remainingItems)
		
		return itemsToDelete
	}

	async exists(id) {
		const item = await this.findById(id)
		return !!item
	}

	async count(predicate = null) {
		const items = await this.getAll()
		return predicate ? items.filter(predicate).length : items.length
	}

	async transaction(operations) {
		const backup = await this.getAll()
		
		try {
			const results = []
			for (const operation of operations) {
				const result = await operation()
				results.push(result)
			}
			return results
		} catch (error) {
			await writeJSON(this.filePath, backup)
			throw error
		}
	}
}

export function createCrudService(filePath, idField = 'id') {
	return new CrudFactory(filePath, idField)
}
