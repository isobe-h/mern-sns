type Props = {
	user: any
}
const Online: React.FC<Props> = ({ user }) => {
	return (
		<li className="rightBarFriend">
			<div className="rightBarProfileImgContainer">
				<img src={user.profilePicture} alt="" className="rightBarProfileImg" />
				<span className="rightBarOnline" />
			</div>
			<span className="rightBarUserName">{user.username}</span>
		</li>
	)
}

export default Online
