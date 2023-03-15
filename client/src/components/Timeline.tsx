import { useQuery } from 'react-query'
import Post from './Post'
import Share from './Share'
import './Timeline.css'

type Props = {
	username?: string
}
const Timeline: React.FC<Props> = ({ username }) => {
	const fetchData = async () => {
		const res = username
			? await fetch(`/api/posts/profile/${username}`)
			: await fetch('/api/posts/timeline/640bf923b56f17140bd0ff97')
		return res.json()
	}
	const { status, data, error } = useQuery('timeline', fetchData)
	if (status === 'loading') {
		return <span>Loading...</span>
	}
	if (status === 'error') {
		return <span>Error: {error.message}</span>
	}
	return (
		<div className="timeline">
			<div className="timelineWrapper">
				<Share />
				{data.map((u) => {
					return <Post key={u._id} post={u} />
				})}
			</div>
		</div>
	)
}

export default Timeline
