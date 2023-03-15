import {
	MdBookmark,
	MdHome,
	MdMessage,
	MdNotifications,
	MdPerson,
	MdSearch,
	MdSettings,
} from 'react-icons/md'
import { Link } from 'react-router-dom'
import { dummyUsers } from '../dummy/Users'
import CloseFriend from './CloseFriend'
import './SideBar.css'
type Props = {
	username: string
}
const SideBar: React.FC<Props> = ({ username }) => {
	return (
		<div className="sidebar">
			<nav className="sidebarWrapper">
				<ul className="sidebarList">
					<li className="sidebarListItem">
						<Link to="/" style={{ textDecoration: 'none' }}>
							<MdHome className="sidebarIcon" />
							<span className="sidebarListItemText">ホーム</span>
						</Link>
					</li>
					<li className="sidebarListItem">
						<MdSearch className="sidebarIcon" />
						<span className="sidebarListItemText">検索</span>
					</li>
					<li className="sidebarListItem">
						<MdNotifications className="sidebarIcon" />
						<span className="sidebarListItemText">通知</span>
					</li>
					<li className="sidebarListItem">
						<MdMessage className="sidebarIcon" />
						<span className="sidebarListItemText">メッセージ</span>
					</li>
					<li className="sidebarListItem">
						<MdBookmark className="sidebarIcon" />
						<span className="sidebarListItemText">ブックマーク</span>
					</li>
					<li className="sidebarListItem">
						<Link
							to={username ? `/profile/${username}` : '/'}
							style={{ textDecoration: 'none' }}
						>
							<MdPerson className="sidebarIcon" />
							<span className="sidebarListItemText">プロフィール</span>
						</Link>
					</li>
					<li className="sidebarListItem">
						<MdSettings className="sidebarIcon" />
						<span className="sidebarListItemText">設定</span>
					</li>
				</ul>
				<h4 className="recommendUsers">おすすめのユーザー</h4>
				<ul className="sidebarFriendList">
					{dummyUsers.map((u) => {
						return <CloseFriend key={u._id} user={u} />
					})}
				</ul>
			</nav>
		</div>
	)
}

export default SideBar
