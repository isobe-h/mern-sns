import { useAtom } from 'jotai'
import { useQuery } from 'react-query'
import {
	MdBookmark,
	MdHome,
	MdLogout,
	MdMessage,
	MdNotifications,
	MdPerson,
	MdSearch,
	MdSettings,
} from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { RESET } from 'jotai/utils'
import { authAtom } from '../state/auth'
import CloseFriend from './CloseFriend'

import './SideBar.css'

const SideBar: React.FC = () => {
	const [user, setUser] = useAtom(authAtom)
	const navigator = useNavigate()
	const fetchData = async () => {
		const res = await fetch(`/api/users/userslist/${user._id}`)
		return res.json()
	}
	const { status, data, error } = useQuery('userList', fetchData)
	if (status === 'loading') {
		return <span>Loading...</span>
	}
	if (status === 'error') {
		return <span>Error: {error.message}</span>
	}
	return (
		<div className="sidebar">
			<nav className="sidebarWrapper">
				<ul className="sidebarList">
					<li className="sidebarListItem">
						<Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
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
							to={`/profile/${user && user.username}`}
							style={{ textDecoration: 'none', color: 'inherit' }}
						>
							<MdPerson className="sidebarIcon" />
							<span className="sidebarListItemText">プロフィール</span>
						</Link>
					</li>
					<li className="sidebarListItem">
						<MdSettings className="sidebarIcon" />
						<span className="sidebarListItemText">設定</span>
					</li>
					<li className="sidebarListItem">
						<MdLogout className="sidebarIcon" />
						<button
							className="sidebarListItemText"
							style={{
								padding: 0,
								listStyle: 'none',
								border: 'none',
								background: 'none',
								cursor: 'pointer',
							}}
							type="button"
							onClick={() => {
								setUser(RESET)
								navigator('/login')
							}}
						>
							ログアウト
						</button>
					</li>
				</ul>
				<h4 className="recommendUsers">おすすめユーザー</h4>
				<ul className="sidebarFriendList">
					{data.map((u) => {
						return <CloseFriend key={u._id} user={u} />
					})}
				</ul>
			</nav>
		</div>
	)
}

export default SideBar
