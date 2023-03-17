import { useAtom } from 'jotai'
import { useQuery } from 'react-query'
import { authAtom } from '../state/auth'
import Post from './Post'
import Share from './Share'
import './Timeline.css'

type Props = {
	username?: string
}
const Timeline: React.FC<Props> = ({ username }) => {
	const [user] = useAtom(authAtom)
	const fetchData = async () => {
		const res = username
			? await fetch(`/api/posts/profile/${username}`)
			: await fetch(`/api/posts/timeline/${user._id}`)
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
				{Array.isArray(data) &&
					data
						.sort((post1, post2) => {
							return (
								new Date(post2.createdAt).getTime() -
								new Date(post1.createdAt).getTime()
							)
						})
						.map((u) => {
							return <Post key={u._id} post={u} />
						})}
			</div>
		</div>
	)
}

export default Timeline
