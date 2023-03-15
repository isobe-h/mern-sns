export type UserType = {
	username: string
	email: string
	password: string
	profilePicture: string
	followers: string[]
	followings: string[]
	isAdmin: boolean
	desc: string
	city: string
}

export type PostType = {
	_id: string
	userId: string
	desc: string
	img: string
	likes: Array<string>
	comment: string
	createdAt: string
}
