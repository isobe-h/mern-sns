import { useAtom } from 'jotai'
import { Link } from 'react-router-dom'
import { authAtom } from '../state/auth'

const CloseFriend: React.FC = () => {
	const [user] = useAtom(authAtom)
	return (
		<li className="sidebarFriend">
			<Link
				to={user.username ? `/profile/${user.username}` : '/'}
				style={{ textDecoration: 'none', color: 'inherit' }}
			>
				<img
					src={user.profilePicture || '/assets/person/noAvatar.png'}
					alt=""
					className="sidebarFriendImg"
				/>
				{user.username}
			</Link>
		</li>
	)
}

export default CloseFriend
