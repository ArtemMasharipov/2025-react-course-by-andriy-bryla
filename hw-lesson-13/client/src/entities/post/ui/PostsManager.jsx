import { useState } from 'react'
import { Link } from 'react-router-dom'

import { ROUTES } from '@app/router/routes.constants'

import { PostList } from '@entities/post/ui/PostList'
import { PostTabs } from '@entities/post/ui/PostTabs'

const PostsManager = () => {
  const [activeTab, setActiveTab] = useState('pagination')

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-0">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-emerald-900 mb-2">Posts Manager</h1>
        <p className="text-emerald-600 text-sm sm:text-base">
          Manage your posts with RTK Query - {activeTab === 'pagination' ? 'Pagination' : 'Infinite Scroll'} mode
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-emerald-200 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <PostTabs activeTab={activeTab} onTabChange={setActiveTab} />
          <Link
            to={ROUTES.CREATE_POST}
            className="w-full sm:w-auto px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-md hover:bg-emerald-700 transition-colors text-center"
          >
            Create Post
          </Link>
        </div>

        <div className="mt-4 sm:mt-6">
          <PostList mode={activeTab} />
        </div>
      </div>
    </div>
  )
}

export { PostsManager }
