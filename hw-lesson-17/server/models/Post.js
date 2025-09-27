import { createCrudService } from '../services/crudFactory.js'
import UserModel from './User.js'

class PostModel {
	constructor() {
		this.crudService = createCrudService('./data/posts.json', 'id')
	}

	async getAllPosts() {
		return await this.crudService.getAll()
	}

	async getPaginatedPosts(page, limit) {
		return await this.crudService.getPaginated(page, limit, async (posts) => {
			const users = await UserModel.getAllUsers()
			
		const reversedPosts = [...posts].reverse()
			
			return reversedPosts.map(post => {
				const author = users.find(u => u.id == post.authorId)
				return {
					...post,
					author: author 
						? { id: author.id, name: author.name, email: author.email }
						: null
				}
			})
		})
	}

	async findById(id) {
		return await this.crudService.findById(id)
	}

	async findByAuthor(authorId) {
		return await this.crudService.findBy(post => post.authorId === authorId)
	}

	async createPost(postData) {
		const { title, body, authorId } = postData
		
		return await this.crudService.create({
			title,
			body,
			authorId
		}, { 
			timestamps: true,
			customIdGenerator: async () => {
				const { v4: uuid } = await import('uuid')
				return uuid()
			}
		})
	}

	async updatePost(id, updates, userId, userRole) {
		const post = await this.findById(id)
		
		if (!post) {
			return null
		}

		if (userRole !== 'admin' && post.authorId !== userId) {
			throw new Error('Немає прав на редагування цього поста')
		}

		return await this.crudService.update(id, updates, { timestamps: true })
	}

	async deletePost(id, userId, userRole) {
		const post = await this.findById(id)
		
		if (!post) {
			return null
		}

		if (userRole !== 'admin' && post.authorId !== userId) {
			throw new Error('Немає прав на видалення цього поста')
		}

		return await this.crudService.delete(id)
	}

	async isPostOwner(postId, userId) {
		const post = await this.findById(postId)
		return post && post.authorId === userId
	}
}

export default new PostModel()
