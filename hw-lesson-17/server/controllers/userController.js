import UserService from '../services/userService.js'

class UserController {
	async getAllUsers(req, res) {
		try {
			const users = await UserService.getAllUsers(req.user)
			res.json(users)
		} catch (error) {
			res.status(403).json({ error: error.message })
		}
	}

	async getPaginatedUsers(req, res) {
		try {
			const page = parseInt(req.query.page) || 1
			const limit = parseInt(req.query.limit) || 10

			const result = await UserService.getPaginatedUsers(page, limit, req.user)
			res.json(result)
		} catch (error) {
			res.status(403).json({ error: error.message })
		}
	}

	async getUserById(req, res) {
		try {
			const user = await UserService.getUserById(req.params.id, req.user)
			
			if (!user) {
				return res.status(404).json({ error: 'Користувача не знайдено' })
			}

			res.json(user)
		} catch (error) {
			if (error.message.includes('Доступ заборонено')) {
				return res.status(403).json({ error: error.message })
			}
			res.status(500).json({ error: 'Внутрішня помилка сервера' })
		}
	}

	async createUser(req, res) {
		try {
			const newUser = await UserService.createUser(req.body, req.user)
			res.status(201).json(newUser)
		} catch (error) {
			if (error.message.includes('Доступ заборонено')) {
				return res.status(403).json({ error: error.message })
			}
			if (error.message.includes('існує') || 
				error.message.includes('обов\'язкові') ||
				error.message.includes('формат') ||
				error.message.includes('символів') ||
				error.message.includes('роль')) {
				return res.status(400).json({ error: error.message })
			}
			res.status(500).json({ error: 'Внутрішня помилка сервера' })
		}
	}

	async updateUser(req, res) {
		try {
			const updatedUser = await UserService.updateUser(
				req.params.id, 
				req.body, 
				req.user
			)

			if (!updatedUser) {
				return res.status(404).json({ error: 'Користувача не знайдено' })
			}

			res.json(updatedUser)
		} catch (error) {
			if (error.message.includes('Доступ заборонено')) {
				return res.status(403).json({ error: error.message })
			}
			if (error.message.includes('не знайдено')) {
				return res.status(404).json({ error: error.message })
			}
			if (error.message.includes('існує') || 
				error.message.includes('формат') ||
				error.message.includes('символів')) {
				return res.status(400).json({ error: error.message })
			}
			res.status(500).json({ error: 'Внутрішня помилка сервера' })
		}
	}

	async deleteUser(req, res) {
		try {
			const deletedUser = await UserService.deleteUser(req.params.id, req.user)
			
			res.json({ 
				message: `Користувач ${deletedUser.name} успішно видалений`,
				user: deletedUser
			})
		} catch (error) {
			if (error.message.includes('Доступ заборонено')) {
				return res.status(403).json({ error: error.message })
			}
			if (error.message.includes('не знайдено')) {
				return res.status(404).json({ error: error.message })
			}
			if (error.message.includes('власний акаунт')) {
				return res.status(400).json({ error: error.message })
			}
			res.status(500).json({ error: 'Внутрішня помилка сервера' })
		}
	}

	async getProfile(req, res) {
		try {
			const user = await UserService.getUserById(req.user.id, req.user)
			res.json(user)
		} catch (error) {
			res.status(500).json({ error: 'Внутрішня помилка сервера' })
		}
	}

	async updateProfile(req, res) {
		try {
			const updatedUser = await UserService.updateUser(
				req.user.id, 
				req.body, 
				req.user
			)

			res.json(updatedUser)
		} catch (error) {
			if (error.message.includes('існує') || 
				error.message.includes('формат') ||
				error.message.includes('символів')) {
				return res.status(400).json({ error: error.message })
			}
			res.status(500).json({ error: 'Внутрішня помилка сервера' })
		}
	}
}

export default new UserController()
