import * as meetingSvc from '../services/meeting.service.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const assign = asyncHandler(async (req, res) => {
  const meeting = await meetingSvc.assign(req.params.teacherId)
  res.json({ data: meeting })
})

export const unassign = asyncHandler(async (req, res) => {
  const meeting = await meetingSvc.unassign(req.params.teacherId)
  res.json({ data: meeting })
})

export const list = asyncHandler(async (req, res) => {
  const meeting = await meetingSvc.list()
  res.json({ data: meeting })
})
