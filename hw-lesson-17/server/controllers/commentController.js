import CommentModel from '../models/Comment.js'
import PostModel from '../models/Post.js'

class CommentController {
	async getComments(req, res) {
		try {
			const { postId } = req.query

			let comments
			if (postId) {
				comments = await CommentModel.getCommentsByPost(postId)
			} else {
				comments = await CommentModel.getAllCommentsWithAuthors()
			}

			res.json(comments)
		} catch (error) {
			res.status(500).json({ error: 'Внутрішня помилка сервера' })
		}
	}

	async getCommentById(req, res) {
		try {
			const comment = await CommentModel.findById(req.params.id)
			
			if (!comment) {
				return res.status(404).json({ error: 'Коментар не знайдено' })
			}

			res.json(comment)
		} catch (error) {
			res.status(500).json({ error: 'Внутрішня помилка сервера' })
		}
	}

	async createComment(req, res) {
		try {
			const { postId, text } = req.body

			if (!postId || !text) {
				return res.status(400).json({ 
					error: 'ID поста та текст коментаря обов\'язкові' 
				})
			}

			if (text.trim().length < 1) {
				return res.status(400).json({ 
					error: 'Коментар не може бути порожнім' 
				})
			}

			if (text.trim().length > 1000) {
				return res.status(400).json({ 
					error: 'Коментар не може містити більше 1000 символів' 
				})
			}

			const post = await PostModel.findById(postId)
			if (!post) {
				return res.status(404).json({ error: 'Пост не знайдено' })
			}

			const newComment = await CommentModel.createComment({
				postId,
				text: text.trim(),
				authorId: req.user.id
			})

			res.status(201).json(newComment)
		} catch (error) {
			res.status(500).json({ error: 'Внутрішня помилка сервера' })
		}
	}

	async updateComment(req, res) {
		try {
			const { text } = req.body

			if (!text) {
				return res.status(400).json({ 
					error: 'Текст коментаря обов\'язковий' 
				})
			}

			if (text.trim().length < 1) {
				return res.status(400).json({ 
					error: 'Коментар не може бути порожнім' 
				})
			}

			if (text.trim().length > 1000) {
				return res.status(400).json({ 
					error: 'Коментар не може містити більше 1000 символів' 
				})
			}

			const updatedComment = await CommentModel.updateComment(
				req.params.id,
				{ text: text.trim() },
				req.user.id,
				req.user.role
			)

			if (!updatedComment) {
				return res.status(404).json({ error: 'Коментар не знайдено' })
			}

			res.json(updatedComment)
		} catch (error) {
			if (error.message.includes('Немає прав')) {
				return res.status(403).json({ error: error.message })
			}
			res.status(500).json({ error: 'Внутрішня помилка сервера' })
		}
	}

	async deleteComment(req, res) {
		try {
			const deletedComment = await CommentModel.deleteComment(
				req.params.id,
				req.user.id,
				req.user.role
			)

			if (!deletedComment) {
				return res.status(404).json({ error: 'Коментар не знайдено' })
			}

			res.json({ 
				message: 'Коментар успішно видалено',
				comment: deletedComment
			})
		} catch (error) {
			if (error.message.includes('Немає прав')) {
				return res.status(403).json({ error: error.message })
			}
			res.status(500).json({ error: 'Внутрішня помилка сервера' })
		}
	}

	async getCommentsByAuthor(req, res) {
		try {
			const authorId = req.params.authorId
			const comments = await CommentModel.findByAuthor(authorId)
			res.json(comments)
		} catch (error) {
			res.status(500).json({ error: 'Внутрішня помилка сервера' })
		}
	}

	async getMyComments(req, res) {
		try {
			const comments = await CommentModel.findByAuthor(req.user.id)
			res.json(comments)
		} catch (error) {
			res.status(500).json({ error: 'Внутрішня помилка сервера' })
		}
	}

	async getCommentCount(req, res) {
		try {
			const count = await CommentModel.getCommentCountByPost(req.params.postId)
			res.json({ count })
		} catch (error) {
			res.status(500).json({ error: 'Внутрішня помилка сервера' })
		}
	}
}

export default new CommentController()
