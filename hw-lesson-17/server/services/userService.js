import UserModel from '../models/User.js'

class UserService {
	async getAllUsers(requestingUser) {
		if (requestingUser.role !== 'admin') {
			throw new Error('Доступ заборонено. Потрібні права адміністратора')
		}

		const users = await UserModel.getAllUsers()
		return users.map(user => UserModel.stripPassword(user))
	}

	async getPaginatedUsers(page, limit, requestingUser) {
		if (requestingUser.role !== 'admin') {
			throw new Error('Доступ заборонено. Потрібні права адміністратора')
		}

		const result = await UserModel.getPaginatedUsers(page, limit)
		
		result.items = result.items.map(user => UserModel.stripPassword(user))
		
		return result
	}

	async getUserById(id, requestingUser) {
		if (requestingUser.role !== 'admin' && requestingUser.id != id) {
			throw new Error('Доступ заборонено')
		}

		const user = await UserModel.findById(id)
		
		if (!user) {
			return null
		}

		return UserModel.stripPassword(user)
	}

	async createUser(userData, requestingUser) {
		if (requestingUser.role !== 'admin') {
			throw new Error('Доступ заборонено. Потрібні права адміністратора')
		}

		const { name, email, password, role = 'client' } = userData

		if (!name || !email || !password) {
			throw new Error('Всі поля обов\'язкові')
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!emailRegex.test(email)) {
			throw new Error('Невірний формат email')
		}

		if (password.length < 6) {
			throw new Error('Пароль має містити щонайменше 6 символів')
		}

		const validRoles = ['admin', 'client']
		if (!validRoles.includes(role)) {
			throw new Error('Невірна роль користувача')
		}

		return await UserModel.createUser({ name, email, password, role })
	}

	async updateUser(id, updates, requestingUser) {
		if (requestingUser.role !== 'admin' && requestingUser.id != id) {
			throw new Error('Доступ заборонено')
		}

		const user = await UserModel.findById(id)
		if (!user) {
			throw new Error('Користувача не знайдено')
		}

		const allowedUpdates = ['name', 'email', 'password']
		if (requestingUser.role === 'admin') {
			allowedUpdates.push('role')
		}

		const filteredUpdates = {}
		for (const [key, value] of Object.entries(updates)) {
			if (allowedUpdates.includes(key)) {
				filteredUpdates[key] = value
			}
		}

		if (filteredUpdates.email) {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
			if (!emailRegex.test(filteredUpdates.email)) {
				throw new Error('Невірний формат email')
			}

			const existingUser = await UserModel.findByEmail(filteredUpdates.email)
			if (existingUser && existingUser.id != id) {
				throw new Error('Користувач з таким email вже існує')
			}
		}

		if (filteredUpdates.password && filteredUpdates.password.length < 6) {
			throw new Error('Пароль має містити щонайменше 6 символів')
		}

		return await UserModel.updateUser(id, filteredUpdates)
	}

	async deleteUser(id, requestingUser) {
		if (requestingUser.role !== 'admin') {
			throw new Error('Доступ заборонено. Потрібні права адміністратора')
		}

		if (requestingUser.id == id) {
			throw new Error('Не можна видалити власний акаунт')
		}

		const user = await UserModel.findById(id)
		if (!user) {
			throw new Error('Користувача не знайдено')
		}

		const deletedUser = await UserModel.deleteUser(id)
		return UserModel.stripPassword(deletedUser)
	}

	isAdmin(user) {
		return user && user.role === 'admin'
	}

	canPerformAction(user, requiredRole = null, resourceOwnerId = null) {
		if (!user) return false
		
		if (user.role === 'admin') return true
		
		if (requiredRole && user.role !== requiredRole) return false
		
		if (resourceOwnerId && user.id == resourceOwnerId) return true
		
		return false
	}
}

export default new UserService()
