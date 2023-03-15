import { useAtom } from 'jotai'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'

import { useRef, useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import { userAtom } from '../state/loginUser'

const Login: React.FC = () => {
	const [inputType, setInputType] = useState<'password' | 'text'>('password')
	const navigator = useNavigate()
	const [, setUser] = useAtom(userAtom)
	const onClick = () => {
		if (inputType === 'password') setInputType('text')
		else setInputType('password')
	}
	const email = useRef<HTMLInputElement>(null)
	const password = useRef<HTMLInputElement>(null)
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const emailValue = email.current?.value
		const passwordValue = password.current?.value
		if (emailValue && passwordValue) {
			const res = await fetch(`/api/auth/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email: emailValue, password: passwordValue }),
			})
			setUser(await res.json())
			if (res.status === 200) navigator('/')
			else alert(res.statusText)
		}
	}
	return (
		<div className="login">
			<div className="loginWrapper">
				<div className="loginLeft">
					<h3 className="loginLogo">MERN SNS</h3>
					<span className="loginDesc">MERNで提供する本格SNSサービス</span>
				</div>
				<div className="loginRight">
					<div className="loginBox">
						<form onSubmit={handleSubmit}>
							<div className="loginInputContainer">
								<input
									type="email"
									className="loginInput"
									required
									placeholder="メールアドレス"
									ref={email}
								/>
							</div>
							<div className="loginInputContainer">
								<input
									type={inputType}
									className="loginInput"
									required
									placeholder="パスワード"
									minLength={8}
									ref={password}
								/>
								{inputType === 'password' ? (
									<MdVisibility className="cursor" onClick={onClick} />
								) : (
									<MdVisibilityOff className="cursor" onClick={onClick} />
								)}
							</div>
							<button type="submit" className="loginButton">
								ログイン
							</button>
						</form>
						<span className="loginForgot">パスワードを忘れた場合</span>
						<button
							type="button"
							className="loginRegisterButton"
							onClick={(e) => {
								e.preventDefault()
								navigator('/register')
							}}
						>
							新規登録
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login
