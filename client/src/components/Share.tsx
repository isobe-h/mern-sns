/* eslint-disable no-underscore-dangle */
import { useAtom } from 'jotai'
import { useRef, useState } from 'react'
import { MdAnalytics, MdFace, MdGif, MdImage } from 'react-icons/md'
import { authAtom } from '../state/auth'
import './Share.css'

const Share: React.FC = () => {
	const [user] = useAtom(authAtom)
	const [attachment, setAttachment] = useState<File | null>(null)
	const inputText = useRef<HTMLInputElement>(null)
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const text = inputText.current?.value
		if (text && user?._id) {
			const newPost = {
				userId: user?._id,
				desc: text,
				img: '',
				likes: [],
				comment: [],
			}
			if (attachment) {
				const data = new FormData()
				// attachment.nameにディレクトリ名が含まれて入れば削除する
				const newName = attachment.name.replace(/^.*[\\/]/, '')
				const fileName = `${Date.now()}_${newName}`
				data.append('name', fileName)
				data.append('file', attachment)
				newPost.img = fileName
				try {
					await fetch('/api/posts/upload', {
						method: 'POST',
						body: data,
					})
				} catch (err) {
					console.log(err)
				}
			}
			const res = await fetch('/api/posts', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newPost),
			})
			if (res.status === 201) {
				window.location.reload()
			} else alert(res.statusText)
		}
	}
	return (
		<div className="share">
			<div className="shareWrapper">
				<div className="shareTop">
					<img
						src={user?.profilePicture || '/assets/person/noAvatar.png'}
						alt="share"
						className="shareProfileImg"
					/>
					<input
						type="text"
						className="shareInput"
						placeholder="いまなにしてる？"
						ref={inputText}
					/>
					{attachment && (
						<span
							style={{
								fontSize: '0.5rem',
							}}
						>
							{attachment.name}
						</span>
					)}
				</div>
				<hr className="shareHr" />
				<form className="shareButtons" onSubmit={handleSubmit}>
					<div className="shareOptions">
						<label className="shareOption" htmlFor="file">
							<MdImage className="shareIcon" color="blue" />
							<span className="shareText">写真</span>
							<input
								type="file"
								id="file"
								accept="image/png, image/jpeg"
								style={{ display: 'none' }}
								onChange={(e) =>
									e.target.files && setAttachment(e.target.files[0])
								}
							/>
						</label>
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
				</form>
			</div>
		</div>
	)
}

export default Share
