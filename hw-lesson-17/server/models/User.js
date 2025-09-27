import bcrypt from 'bcrypt'
import { createCrudService } from '../services/crudFactory.js'

class UserModel {
	constructor() {
		this.crudService = createCrudService('./data/users.json', 'id')
	}

	async getAllUsers() {
		return await this.crudService.getAll()
	}

	async getPaginatedUsers(page, limit) {
		return await this.crudService.getPaginated(page, limit)
	}

	async findById(id) {
		return await this.crudService.findById(id)
	}

	async findByEmail(email) {
		return await this.crudService.findOneBy(user => user.email === email)
	}

	async createUser(userData) {
		const { name, email, password, role = 'client' } = userData

		const existingUser = await this.findByEmail(email)
		if (existingUser) {
			throw new Error('Користувач з таким email вже існує')
		}

		const saltRounds = 10
		const hashedPassword = await bcrypt.hash(password, saltRounds)

		const newUser = await this.crudService.create({
			name,
			email,
			password: hashedPassword,
			role
		})
		const { password: _, ...userWithoutPassword } = newUser
		return userWithoutPassword
	}

	async deleteUser(id) {
		return await this.crudService.delete(id)
	}

	async updateUser(id, updates) {
		if (updates.password) {
			const saltRounds = 10
			updates.password = await bcrypt.hash(updates.password, saltRounds)
		}

		const updatedUser = await this.crudService.update(id, updates)
		
		if (updatedUser) {
			const { password: _, ...userWithoutPassword } = updatedUser
			return userWithoutPassword
		}
		
		return null
	}

	async validatePassword(user, password) {
		return await bcrypt.compare(password, user.password)
	}

	stripPassword(user) {
		if (!user) return null
		const { password: _, ...userWithoutPassword } = user
		return userWithoutPassword
	}
}

export default new UserModel()
