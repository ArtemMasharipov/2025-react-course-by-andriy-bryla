import { postService } from '../services/post.service.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { HttpError } from '../utils/httpError.js'

export const postController = {
  getPosts: asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query
    const result = await postService.getPosts({ limit, page })

    res.json({
      posts: result.posts,
      pagination: {
        total: result.total,
        totalPages: result.totalPages,
        currentPage: result.currentPage,
        limit: parseInt(limit),
        hasNextPage: result.currentPage < result.totalPages,
        hasPrevPage: result.currentPage > 1,
      },
    })
  }),

  createPost: asyncHandler(async (req, res) => {
    const post = await postService.createPost(req.body)
    res.status(201).json(post)
  }),

  getPostById: asyncHandler(async (req, res) => {
    const post = await postService.getPostById(req.params.id)
    if (!post) throw new HttpError(404, 'Post not found')
    res.json(post)
  }),

  updatePost: asyncHandler(async (req, res) => {
    const post = await postService.updatePost(req.params.id, req.body)
    if (!post) throw new HttpError(404, 'Post not found')
    res.json(post)
  }),

  deletePost: asyncHandler(async (req, res) => {
    const post = await postService.deletePost(req.params.id)
    if (!post) throw new HttpError(404, 'Post not found')
    res.status(204).send()
  }),
}
