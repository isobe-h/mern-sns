import { useAtom } from 'jotai'
import { useQuery } from 'react-query'
import { authAtom } from '../state/auth'
import CloseFriend from './CloseFriend'
import './RightBar.css'

const ProfileRightBar: React.FC = () => {
	const [user] = useAtom(authAtom)
	const fetchData = async () => {
		const res = await fetch(`/api/users/followuserslist/${user._id}`)
		return res.json()
	}
	const { status, data, error } = useQuery('profileUserList', fetchData)
	if (status === 'loading') {
		return <span>Loading...</span>
	}
	if (status === 'error') {
		return <span>Error: {error.message}</span>
	}
	return (
		<aside className="rightBar">
			<div className="rightBarWrapper">
				<div className="birthdayContainer">
					<h4>ユーザー情報</h4>
					<p>出身：{user?.city || '未設定'}</p>
				</div>
				<h4 className="rightBarTitle">あなたの友達</h4>
				<ul className="rightBarFriendList">
					{data.map((u) => {
						return <CloseFriend key={u.id} user={u} />
					})}
				</ul>
			</div>
		</aside>
	)
}

export default ProfileRightBar
