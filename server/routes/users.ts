import { Router } from 'express'
import { UserModel } from '../models/User'

// CRUD
export const userRouter = Router()
userRouter.get('/', async (req, res) => {
	const userId = req.query.userId
	const username = req.query.username
	console.log(userId, username)
	try {
		const user = userId
			? await UserModel.findById(userId)
			: await UserModel.findOne({ username: username })
		const { password, updatedAt, ...other } = user.toJSON()
		res.status(200).json(other)
	} catch (err) {
		res.status(403).json('Invalid User ID')
	}
})
userRouter.delete('/:id', async (req, res) => {
	if (req.body.userId === req.params.id || req.body.isAdmin) {
		try {
			await UserModel.findByIdAndDelete(req.params.id)
			res.status(200).json('Deleted User')
		} catch (err) {
			res.status(403).json('Invalid User ID')
		}
	}
})
userRouter.put('/:id', async (req, res) => {
	if (req.body.userId === req.params.id || req.body.isAdmin) {
		try {
			const user = await UserModel.findByIdAndUpdate(req.params.id, {
				$set: req.body,
			})
			res.status(200).json('Update user information')
		} catch (err) {
			return res.status(500).json(err)
		}
	} else {
		return res.status(403).json('アカウントが違います')
	}
})
userRouter.put('/:id/follow', async (req, res) => {
	if (req.params.id === req.body.userId)
		return res.status(500).json('Cannot follow yourself')
	try {
		const user = await UserModel.findById(req.params.id)
		const currentUser = await UserModel.findById(req.body.userId)
		if (user.followers.includes(req.body.userId))
			return res.status(403).json("You've followed user")
		await user.updateOne({ $push: { followers: req.body.userId } })
		await currentUser.updateOne({ $push: { followings: req.params.id } })
		res.status(200).json('Followed')
	} catch (error) {
		return res.status(500).json(error)
	}
})
userRouter.put('/:id/unfollow', async (req, res) => {
	if (req.params.id === req.body.userId)
		return res.status(500).json('Cannot unfollow yourself')
	try {
		const user = await UserModel.findById(req.params.id)
		const currentUser = await UserModel.findById(req.body.userId)
		if (!user.followers.includes(req.body.userId))
			return res.status(403).json("You haven't followed user")
		await user.updateOne({ $pull: { followers: req.body.userId } })
		await currentUser.updateOne({ $pull: { followings: req.params.id } })
		res.status(200).json('Unfollow')
	} catch (error) {
		return res.status(500).json(error)
	}
})
