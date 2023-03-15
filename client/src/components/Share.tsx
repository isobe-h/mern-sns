import { MdAnalytics, MdFace, MdGif, MdImage } from 'react-icons/md'
import './Share.css'

const Share: React.FC = () => {
	return (
		<div className="share">
			<div className="shareWrapper">
				<div className="shareTop">
					<img
						src="/assets/person/noAvatar.png"
						alt="share"
						className="shareProfileImg"
					/>
					<input
						type="text"
						className="shareInput"
						placeholder="What are you doing?"
					/>
				</div>
				<hr className="shareHr" />
				<div className="shareButtons">
					<div className="shareOptions">
						<div className="shareOption">
							<MdImage className="shareIcon" color="blue" />
							<span className="shareText">写真</span>
						</div>
					</div>
					<div className="shareOptions">
						<div className="shareOption">
							<MdGif className="shareIcon" color="hotPink" />
							<span className="shareText">GIF</span>
						</div>
					</div>
					<div className="shareOptions">
						<div className="shareOption">
							<MdFace className="shareIcon" color="green" />
							<span className="shareText">気持ち</span>
						</div>
					</div>
					<div className="shareOptions">
						<div className="shareOption">
							<MdAnalytics className="shareIcon" color="red" />
							<span className="shareText">投票</span>
						</div>
					</div>
					<button type="submit" className="shareButton">
						投稿
					</button>
				</div>
			</div>
		</div>
	)
}

export default Share
