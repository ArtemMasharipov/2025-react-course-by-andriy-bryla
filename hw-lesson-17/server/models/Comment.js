import { createCrudService } from '../services/crudFactory.js'
import UserModel from './User.js'

class CommentModel {
	constructor() {
		this.crudService = createCrudService('./data/comments.json', 'id')
	}

	async getAllComments() {
		return await this.crudService.getAll()
	}

	async getCommentsByPost(postId) {
		const comments = await this.crudService.findBy(comment => comment.postId == postId)
		const users = await UserModel.getAllUsers()

		const reversedComments = [...comments].reverse()

		return reversedComments.map(comment => ({
			...comment,
			authorName: this.getAuthorName(comment.authorId, users)
		}))
	}

	async getAllCommentsWithAuthors() {
		const comments = await this.getAllComments()
		const users = await UserModel.getAllUsers()

		const reversedComments = [...comments].reverse()

		return reversedComments.map(comment => ({
			...comment,
			authorName: this.getAuthorName(comment.authorId, users)
		}))
	}

	async findById(id) {
		return await this.crudService.findById(id)
	}

	async findByAuthor(authorId) {
		return await this.crudService.findBy(comment => comment.authorId === authorId)
	}

	async createComment(commentData) {
		const { postId, text, authorId } = commentData
		
		return await this.crudService.create({
			postId,
			text,
			authorId
		}, { 
			timestamps: true,
			customIdGenerator: async () => {
				const { v4: uuid } = await import('uuid')
				return uuid()
			}
		})
	}

	async updateComment(id, updates, userId, userRole) {
		const comment = await this.findById(id)
		
		if (!comment) {
			return null
		}

		if (userRole !== 'admin' && comment.authorId !== userId) {
			throw new Error('Немає прав на редагування цього коментаря')
		}

		return await this.crudService.update(id, updates, { timestamps: true })
	}

	async deleteComment(id, userId, userRole) {
		const comment = await this.findById(id)
		
		if (!comment) {
			return null
		}

		if (userRole !== 'admin' && comment.authorId !== userId) {
			throw new Error('Немає прав на видалення цього коментаря')
		}

		return await this.crudService.delete(id)
	}

	async deleteCommentsByPost(postId) {
		return await this.crudService.deleteBy(comment => comment.postId == postId)
	}

	getAuthorName(authorId, users) {
		const user = users.find(u => u.id == authorId)
		return user ? user.name : 'Unknown'
	}

	async isCommentOwner(commentId, userId) {
		const comment = await this.findById(commentId)
		return comment && comment.authorId === userId
	}

	async getCommentCountByPost(postId) {
		return await this.crudService.count(comment => comment.postId == postId)
	}
}

export default new CommentModel()
