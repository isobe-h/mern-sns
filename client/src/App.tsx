import { FC } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useAtom } from 'jotai'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import { userAtom } from './state/loginUser'

const queryClient = new QueryClient()

const App: FC = () => {
	const [user] = useAtom(userAtom)
	const router = createBrowserRouter([
		{
			path: '/',
			element: user?.username ? <Home /> : <Login />,
		},
		{
			path: '/register',
			// element: user ? <Navigate to="/" /> : <Register />,
			element: <Register />,
		},
		{
			path: '/login',
			element: user?.username ? <Navigate to="/" /> : <Login />,
		},
		{
			path: '/profile/:username',
			element: user?.username ? <Profile /> : <Login />,
		},
	])
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	)
}

export default App
