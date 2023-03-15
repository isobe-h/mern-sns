import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import ProfileRightBar from '../components/ProfileRightBar'
import SideBar from '../components/SideBar'
import Timeline from '../components/Timeline'
import TopBar from '../components/TopBar'
import './Profile.css'

const Profile: React.FC = () => {
	const { username } = useParams()
	const getUser = async () => {
		const res = await fetch(`/api/users?username=${username}`)
		return res.json()
	}
	const { status, data, error } = useQuery('user', getUser)
	if (status === 'loading') {
		return <span>Loading...</span>
	}
	if (status === 'error') {
		return <span>Error: {error.message}</span>
	}
	return (
		<div>
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
						</div>
					</div>
					<div className="profileContentsBottom">
						<Timeline username={username} />
						<ProfileRightBar />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Profile
