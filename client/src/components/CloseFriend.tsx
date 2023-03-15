const CloseFriend: React.FC = ({ user }) => {
	return (
		<li className="sidebarFriend">
			<img src={user.profilePicture} alt="" className="sidebarFriendImg" />
			{user.username}
		</li>
	)
}

export default CloseFriend
