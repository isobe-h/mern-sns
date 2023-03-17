import { Router } from 'express'
import { PostModel } from '../models/Post'
import { UserModel } from '../models/User'
import multer from 'multer'

export const postsRouter = Router()
postsRouter.post('/', async (req, res) => {
	const newPost = new PostModel(req.body)
	try {
		const savedPost = await newPost.save()
		return res.status(201).json(savedPost)
	} catch (error) {
		return res.status(500).json(error)
	}
})
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './uploads')
	},
	filename: (req, file, cb) => {
		cb(null, req.body.name)
	},
})
const upload = multer({ storage: storage })

postsRouter.post('/upload', upload.single('file'), (req, res) => {
	try {
		return res.status(201).json('File uploaded successfully')
	} catch (error) {
		return res.status(500).json(error)
	}
})

postsRouter.put('/:postId', async (req, res) => {
	try {
		const post = await PostModel.findById(req.params.postId)
		if (post.userId === req.body.userId) {
			await post.updateOne({ $set: req.body })
			return res.status(200).json('Edit you post')
		} else {
			return res.status(403).json('You can edit only your post')
		}
	} catch (error) {
		res.status(403).json(error)
	}
})
postsRouter.delete('/:postId', async (req, res) => {
	try {
		await PostModel.findByIdAndDelete(req.params.postId)
		res.status(200).json('Deleted you post')
	} catch (error) {
		res.status(403).json(error)
	}
})
postsRouter.get('/:postId', async (req, res) => {
	try {
		return res
			.status(200)
			.json((await PostModel.findById(req.params.postId)) || [])
	} catch (error) {
		return res.status(403).json(error)
	}
})
// プロフィール用のタイムライン
postsRouter.get('/profile/:username', async (req, res) => {
	try {
		const me = await UserModel.findOne({ username: req.params.username })
		if (!me) return res.status(404).json('User not found')
		const myPosts = await PostModel.find({ userId: me._id })
		if (!myPosts) return res.status(404).json('Post not found')
		return res.status(200).json(myPosts)
	} catch (error) {
		console.error(error)
		console.error('Failed to get timeline')
		return res.status(500).json(error.message)
	}
})
postsRouter.get('/timeline/:userId', async (req, res) => {
	try {
		const me = await UserModel.findById(req.params.userId)
		const myPosts = await PostModel.find({ userId: me._id })
		const friendsPosts = await Promise.all(
			me.followings.map((friendId) => {
				return PostModel.find({ userId: friendId })
			})
		)
		return res.status(200).json(myPosts.concat(...friendsPosts))
	} catch (error) {
		console.error(error)
		console.error(req.params.userId)
		console.error('Failed to get timeline')
		return res.status(500).json(error.message)
	}
})
postsRouter.put('/:postId/like', async (req, res) => {
	if (!req.body.userId) return res.status(403).json('Missing user id')
	try {
		const post = await PostModel.findById(req.params.postId)
		if (post.likes.includes(req.body.userId)) {
			await post.updateOne({ $pull: { likes: req.body.userId } })
			return res.status(201).json('Unlike post')
		} else {
			await post.updateOne({ $push: { likes: req.body.userId } })
			return res.status(201).json('You liked post')
		}
	} catch (error) {
		return res.status(403).json(error)
	}
})
