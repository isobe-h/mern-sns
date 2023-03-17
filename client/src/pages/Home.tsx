import { FC } from 'react'
import RightBar from '../components/RightBar'
import SideBar from '../components/SideBar'
import Timeline from '../components/Timeline'
import TopBar from '../components/TopBar'
import './Home.css'

const Home: FC = () => {
	return (
		<div>
			<TopBar />
			<div className="homeContainer">
				<SideBar />
				<Timeline />
				<RightBar />
			</div>
		</div>
	)
}

export default Home
