import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { useAtom } from 'jotai'
import ProfileRightBar from '../components/ProfileRightBar'
import SideBar from '../components/SideBar'
import Timeline from '../components/Timeline'
import TopBar from '../components/TopBar'
import './Profile.css'
import { authAtom } from '../state/auth'

const Profile: React.FC = () => {
	const { username } = useParams()
	const [user] = useAtom(authAtom)
	const getUser = async () => {
		const res = await fetch(`/api/users?username=${username}`)
		return res.json()
	}
	const follow = async () => {
		await fetch(`/api/users/${data._id}/follow`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ userId: user._id }),
		})
		window.location.reload()
	}
	const unfollow = async () => {
		await fetch(`/api/users/${data._id}/unfollow`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ userId: user._id }),
		})
		window.location.reload()
	}
	const { status, data, error } = useQuery('user', getUser)
	if (status === 'loading') {
		return <span>Loading...</span>
	}
	if (status === 'error') {
		return <span>Error: {error.message}</span>
	}
	return (
		<>
			<TopBar />
			<div className="profile">
				<SideBar username={username} />
				<div className="profileContents">
					<div className="profileContentsTop">
						<div className="profileCover">
							<img
								src={data.profilePicture || '/assets/post/3.jpeg'}
								alt=""
								className="profileCoverImg"
							/>
							<img
								src={data.profilePicture || '/assets/person/noAvatar.png'}
								alt=""
								className="profileUserImg"
							/>
						</div>
						<div className="profileInfo">
							<h4 className="profileInfoName">{data.username}</h4>
							<span className="profileInfoDesc">{data.desc}</span>
							{user?._id !== data._id && user?.followings.includes(data._id) ? (
								<button
									className="profileUnfollowButton"
									onClick={unfollow}
									type="button"
								>
									フォロー解除
								</button>
							) : (
								<button
									className="profileFollowButton"
									onClick={follow}
									type="button"
								>
									フォローする
								</button>
							)}
						</div>
						<div className="profileContentsBottom">
							<Timeline username={username} />
							<ProfileRightBar />
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Profile
