import { dummyUsers } from '../dummy/Users'
import CloseFriend from './CloseFriend'
import './RightBar.css'

const ProfileRightBar: React.FC = () => {
	return (
		<aside className="rightBar">
			<div className="rightBarWrapper">
				<div className="birthdayContainer">
					<h4>ユーザー情報</h4>
					<p>出身：東京都</p>
					<p>生年月日：1990年4月12日</p>
				</div>
				<h4 className="rightBarTitle">あなたの友達</h4>
				<ul className="rightBarFriendList">
					{dummyUsers.map((u) => {
						return <CloseFriend key={u.id} user={u} />
					})}
				</ul>
			</div>
		</aside>
	)
}

export default ProfileRightBar
