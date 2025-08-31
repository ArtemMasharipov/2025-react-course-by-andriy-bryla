import Post from '../models/Post.js'

export const postService = {
  async getPosts({ limit = 10, page = 1 } = {}) {
    const sanitizedLimit = Math.min(Math.max(parseInt(limit) || 10, 1), 100)
    const sanitizedPage = Math.max(parseInt(page) || 1, 1)
    const skip = (sanitizedPage - 1) * sanitizedLimit

    const [posts, total] = await Promise.all([
      Post.find()
        .limit(sanitizedLimit)
        .skip(skip)
        .sort({ createdAt: -1 })
        .lean(),
      Post.countDocuments()
    ])

    return {
      posts,
      total,
      totalPages: Math.ceil(total / sanitizedLimit),
      currentPage: sanitizedPage
    }
  },

  async createPost(postData) {
    return await new Post(postData).save()
  },

  async getPostById(id) {
    return await Post.findById(id).lean()
  },

  async updatePost(id, postData) {
    return await Post.findByIdAndUpdate(id, postData, {
      new: true,
      runValidators: true,
      lean: true
    })
  },

  async deletePost(id) {
    return await Post.findByIdAndDelete(id).lean()
  }
}
