import { useState } from 'react'
import { useQuery } from 'react-query'
import TimeAgo from 'react-timeago'
import jaStrings from 'react-timeago/lib/language-strings/ja'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import { FiMoreVertical } from 'react-icons/fi'

import './Post.css'
import { Link } from 'react-router-dom'
import { useAtom } from 'jotai'
import { PostType } from '../type'
import { authAtom } from '../state/auth'

const formatter = buildFormatter(jaStrings)

type Props = {
	post: PostType
}

const Post: React.FC<Props> = ({ post }) => {
	const [like, setLike] = useState(post.likes)
	const [user] = useAtom(authAtom)
	const [isLiked, setIsLiked] = useState(post.likes.includes(user?._id))
	const getUser = async () => {
		const res = await fetch(`/api/users?userId=${post.userId}`)
		return res.json()
	}
	const { status, data, error } = useQuery('user', getUser)
	if (status === 'loading') {
		return <span>Loading...</span>
	}
	if (status === 'error') {
		return <span>Error: {error.message}</span>
	}
	const handleGood = async () => {
		try {
			await fetch(`/api/posts/${post._id}/like`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ userId: user._id }),
			})
		} catch (error) {
			console.log(error)
		}
		setIsLiked(!isLiked)
		setLike(isLiked ? like - 1 : like + 1)
	}
	return (
		<div className="post">
			<div className="postWrapper">
				<div className="postTop">
					<div className="postTopLeft">
						<Link to={`/profile/${data.username}`}>
							<img
								src={data.profilePicture || '/assets/person/noAvatar.png'}
								className="postProfileImg"
								alt=""
							/>
						</Link>
						<span className="postUsername">{data.username}</span>
						<span className="postDate">
							<TimeAgo date={post.createdAt} formatter={formatter} />
						</span>
					</div>
					<div className="postTopRight">
						<FiMoreVertical />
					</div>
				</div>
				<div className="postCenter">
					<span className="postText">{post.desc}</span>
					<img src={`/uploads/${post.img}`} className="postImg" alt="" />
				</div>
				<div className="postBottom">
					<div className="postBottomLeft">
						<button type="button" onClick={handleGood} className="likeButton">
							{isLiked ? (
								<img src="/assets/heart.png" alt="" className="likeIcon" />
							) : (
								<img
									src="/assets/empty_heart.png"
									alt=""
									className="likeIcon"
								/>
							)}
						</button>
						<span className="postLikeCounter">
							{post.likes.length + isLiked}人がいいね
						</span>
					</div>
					<div className="postBottomRight">
						<span className="postCommentText">
							{post.comment.length}人のコメント
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Post
