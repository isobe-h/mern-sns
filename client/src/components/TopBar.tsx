import { useAtom } from 'jotai'
import { MdSearch, MdChat, MdNotifications } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { authAtom } from '../state/auth'
import './TopBar.css'

const TopBar: React.FC = () => {
	const [user] = useAtom(authAtom)
	return (
		<div className="topBarContainer">
			<div className="topBarLeft">
				<Link to="/" style={{ textDecoration: 'none' }}>
					<span className="logo">MERN SNS</span>
				</Link>
			</div>
			<div className="topBarCenter">
				<div className="searchBar">
					<MdSearch className="searchIcon" />
					<input type="text" className="searchInput" placeholder="検索" />
				</div>
			</div>
			<div className="topBarRight">
				<div className="topBarIconsItems">
					<div className="topBarIcon">
						<MdChat />
						<span className="topBarIconBadge">1</span>
					</div>
					<div className="topBarIcon">
						<MdNotifications />
						<span className="topBarIconBadge">2</span>
					</div>
				</div>
				<Link to={`/profile/${user.username}`}>
					<img
						src={user.profilePicture || '/assets/person/noAvatar.png'}
						alt=""
						className="topBarImg"
					/>
				</Link>
			</div>
		</div>
	)
}

export default TopBar
