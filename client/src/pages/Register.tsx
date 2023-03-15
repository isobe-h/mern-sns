import { useRef, useState } from 'react'
import './Register.css'
import { useNavigate } from 'react-router-dom'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'

const Register: React.FC = () => {
	const [inputType, setInputType] = useState<'password' | 'text'>('password')
	const onClick = () => {
		if (inputType === 'password') setInputType('text')
		else setInputType('password')
	}
	const email = useRef<HTMLInputElement>(null)
	const password = useRef<HTMLInputElement>(null)
	const username = useRef<HTMLInputElement>(null)
	const navigater = useNavigate()
	const handleRegister = async (e) => {
		e.preventDefault()
		const emailValue = email.current?.value
		const passwordValue = password.current?.value
		const usernameValue = username.current?.value
		if (emailValue && passwordValue && usernameValue) {
			const res = await fetch(`api/auth/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: emailValue,
					password: passwordValue,
					username: usernameValue,
				}),
			})
			if (res.status === 200) navigater('/login')
			else alert(res.statusText)
		}
	}

	return (
		<div className="register">
			<div className="registerWrapper">
				<div className="registerLeft">
					<h3 className="registerLogo">MERN SNS</h3>
					<span className="registerDesc">MERNで本格SNSアプリを作る</span>
				</div>
				<div className="registerRight">
					<div className="registerBox">
						<h3>新規登録</h3>
						<input
							type="text"
							className="registerInput"
							placeholder="ユーザー名"
							ref={username}
							required
						/>
						<input
							type="email"
							className="registerInput"
							placeholder="メールアドレス"
							ref={email}
							required
						/>
						<div className="loginInputContainer">
							<input
								required
								type={inputType}
								className="registerInput"
								placeholder="パスワード"
								ref={password}
								minLength={8}
							/>
							{inputType === 'password' ? (
								<MdVisibility className="cursor" onClick={onClick} />
							) : (
								<MdVisibilityOff className="cursor" onClick={onClick} />
							)}
						</div>
						<button
							type="submit"
							className="registerButton"
							onClick={handleRegister}
						>
							サインアップ
						</button>
						<a href="/login" className="registerMsg">
							登録済みですか？
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Register
