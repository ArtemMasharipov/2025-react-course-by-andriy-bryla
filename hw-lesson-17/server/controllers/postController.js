import CommentModel from '../models/Comment.js'
import PostModel from '../models/Post.js'

class PostController {
	async getAllPosts(req, res) {
		try {
			const posts = await PostModel.getAllPosts()
			res.json(posts)
		} catch (error) {
			res.status(500).json({ error: 'Внутрішня помилка сервера' })
		}
	}

	async getPaginatedPosts(req, res) {
		try {
			const page = parseInt(req.query.page) || 1
			const limit = parseInt(req.query.limit) || 10

			const result = await PostModel.getPaginatedPosts(page, limit)
			res.json(result)
		} catch (error) {
			res.status(500).json({ error: 'Внутрішня помилка сервера' })
		}
	}

	async getPostById(req, res) {
		try {
			const post = await PostModel.findById(req.params.id)
			
			if (!post) {
				return res.status(404).json({ error: 'Пост не знайдено' })
			}

			res.json(post)
		} catch (error) {
			res.status(500).json({ error: 'Внутрішня помилка сервера' })
		}
	}

	async createPost(req, res) {
		try {
			const { title, body } = req.body

			if (!title || !body) {
				return res.status(400).json({ 
					error: 'Заголовок та зміст поста обов\'язкові' 
				})
			}

			if (title.trim().length < 3) {
				return res.status(400).json({ 
					error: 'Заголовок має містити щонайменше 3 символи' 
				})
			}

			if (body.trim().length < 10) {
				return res.status(400).json({ 
					error: 'Зміст поста має містити щонайменше 10 символів' 
				})
			}

			const newPost = await PostModel.createPost({
				title: title.trim(),
				body: body.trim(),
				authorId: req.user.id
			})

			res.status(201).json(newPost)
		} catch (error) {
			res.status(500).json({ error: 'Внутрішня помилка сервера' })
		}
	}

	async updatePost(req, res) {
		try {
			const { title, body } = req.body
			const updates = {}

			if (title !== undefined) {
				if (title.trim().length < 3) {
					return res.status(400).json({ 
						error: 'Заголовок має містити щонайменше 3 символи' 
					})
				}
				updates.title = title.trim()
			}

			if (body !== undefined) {
				if (body.trim().length < 10) {
					return res.status(400).json({ 
						error: 'Зміст поста має містити щонайменше 10 символів' 
					})
				}
				updates.body = body.trim()
			}

			const updatedPost = await PostModel.updatePost(
				req.params.id,
				updates,
				req.user.id,
				req.user.role
			)

			if (!updatedPost) {
				return res.status(404).json({ error: 'Пост не знайдено' })
			}

			res.json(updatedPost)
		} catch (error) {
			if (error.message.includes('Немає прав')) {
				return res.status(403).json({ error: error.message })
			}
			res.status(500).json({ error: 'Внутрішня помилка сервера' })
		}
	}

	async deletePost(req, res) {
		try {
			const postId = req.params.id

			const deletedPost = await PostModel.deletePost(
				postId,
				req.user.id,
				req.user.role
			)

			if (!deletedPost) {
				return res.status(404).json({ error: 'Пост не знайдено' })
			}

			await CommentModel.deleteCommentsByPost(postId)

			res.json({ 
				message: 'Пост і всі його коментарі успішно видалено',
				post: deletedPost
			})
		} catch (error) {
			if (error.message.includes('Немає прав')) {
				return res.status(403).json({ error: error.message })
			}
			res.status(500).json({ error: 'Внутрішня помилка сервера' })
		}
	}

	async getPostsByAuthor(req, res) {
		try {
			const authorId = req.params.authorId
			const posts = await PostModel.findByAuthor(authorId)
			res.json(posts)
		} catch (error) {
			res.status(500).json({ error: 'Внутрішня помилка сервера' })
		}
	}

	async getMyPosts(req, res) {
		try {
			const posts = await PostModel.findByAuthor(req.user.id)
			res.json(posts)
		} catch (error) {
			res.status(500).json({ error: 'Внутрішня помилка сервера' })
		}
	}
}

export default new PostController()
