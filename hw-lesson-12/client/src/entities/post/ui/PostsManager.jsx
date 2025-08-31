import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { ROUTES } from '@/app/router/routes.constants'
import { InfiniteScrollList } from '@/features/infinite-scroll'

import { setViewMode } from '../model/slice'
import { PaginatedPostList } from './PaginatedPostList'
import { PostTabs } from './PostTabs'

const PostsManager = () => {
  const [activeTab, setActiveTab] = useState('pagination')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setViewMode(activeTab))
  }, [dispatch, activeTab])

  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
    dispatch(setViewMode(tabId))
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-emerald-900 mb-2">Posts Manager</h1>
        <p className="text-emerald-600">Manage your posts with different viewing options</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-emerald-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <PostTabs activeTab={activeTab} onTabChange={handleTabChange} />
          <Link
            to={ROUTES.CREATE_POST}
            className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-md hover:bg-emerald-700 transition-colors"
          >
            Create Post
          </Link>
        </div>

        <div className="mt-6">
          {activeTab === 'pagination' ? <PaginatedPostList /> : <InfiniteScrollList />}
        </div>
      </div>
    </div>
  )
}

export default PostsManager
