import { dummyUsers } from '../dummy/Users'
import Online from './Online'
import './RightBar.css'

const RightBar: React.FC = () => {
	return (
		<aside className="rightBar">
			<div className="rightBarWrapper">
				<div className="eventContainer">
					<img src="/assets/star.png" className="starImg" alt="" />
					<span className="eventText">
						<b>フォロワー限定</b>イベント開催中
					</span>
				</div>
				<img className="rightBarAd" src="/assets/ad.jpeg" alt="" />
				<h4 className="rightBarTitle">オンラインの友達</h4>
				<ul className="rightBarFriendList">
					{dummyUsers.map((u) => {
						return <Online key={u.id} user={u} />
					})}
				</ul>
				<p className="promotionTitle">広告</p>
				<img
					src="/assets/promotion/promotion1.jpeg"
					alt=""
					className="rightBarPromotionImg"
				/>
				<p className="promotionTitle">エンジニア転職ならMERN</p>
				<img
					src="/assets/promotion/engineer.webp"
					alt=""
					className="rightBarPromotionImg"
				/>
				<p className="promotionTitle">MERN SNS Corporation</p>
				<img
					src="/assets/promotion/promotion3.jpeg"
					alt=""
					className="rightBarPromotionImg"
				/>
			</div>
		</aside>
	)
}

export default RightBar
