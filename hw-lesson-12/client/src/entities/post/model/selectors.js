import { createSelector } from '@reduxjs/toolkit'

import { postAdapter } from './slice'

export const selectPostState = state => state.post

export const selectPostIds = createSelector([selectPostState], postState =>
  postAdapter.getIds(postState)
)

export const selectPostEntities = createSelector([selectPostState], postState =>
  postAdapter.getSelectors().selectEntities(postState)
)

export const selectAllPosts = createSelector([selectPostState], postState =>
  postAdapter.getSelectors().selectAll(postState)
)

export const selectPostById = createSelector(
  [selectPostEntities, (_, id) => id],
  (entities, id) => entities[id]
)

export const selectPostStatus = createSelector(
  [selectPostState],
  postState => postState.status
)

export const selectPostError = createSelector(
  [selectPostState],
  postState => postState.error
)

export const selectAddPostStatus = createSelector(
  [selectPostState],
  postState => postState.addStatus
)

export const selectAddPostError = createSelector(
  [selectPostState],
  postState => postState.addError
)

export const selectUpdatePostStatus = createSelector(
  [selectPostState],
  postState => postState.updateStatus
)

export const selectUpdatePostError = createSelector(
  [selectPostState],
  postState => postState.updateError
)

export const selectDeletePostStatus = createSelector(
  [selectPostState],
  postState => postState.deleteStatus
)

export const selectDeletePostError = createSelector(
  [selectPostState],
  postState => postState.deleteError
)
