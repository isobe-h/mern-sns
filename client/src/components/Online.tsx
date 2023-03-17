import { Link } from 'react-router-dom'
import { UserType } from '../type'

type Props = {
	user: UserType
}
const Online: React.FC<Props> = ({ user }) => {
	return (
		<li className="rightBarFriend">
			<div className="rightBarProfileImgContainer">
				<Link
					to={user.username ? `/profile/${user.username}` : '/'}
					style={{ textDecoration: 'none', color: 'inherit' }}
				>
					<img
						src={user.profilePicture || '/assets/person/noAvatar.png'}
						alt=""
						className="rightBarProfileImg"
					/>
					<span className="rightBarOnline" />
				</Link>
			</div>
			<span className="rightBarUserName">{user.username}</span>
		</li>
	)
}

export default Online
