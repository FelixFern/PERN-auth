import './App.css'
import {Route, BrowserRouter as Router, Routes, Link, Navigate} from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import Home from './components/Home'
import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState<Boolean>(false)

	const verify = async (token:string | null) => {
		const response = await axios.get('http://localhost:5000/auth/verify', {
			headers: {
				'token': token
			}
		}).then((res) => {
			return res.data		
		}).catch((err) => {
			console.log(err)
		})

		if(response) {
			setIsAuthenticated(true)
			console.log(isAuthenticated)
		} 

		
	}
	useEffect(() => {
		const jwtToken = localStorage.getItem('token')
		verify(jwtToken)
		console.log(isAuthenticated)
	})

	return (
		<>
			<h1>PERN Auth</h1>
			<Router>
				<Routes>
					<Route path='/' element={!isAuthenticated ? <Home></Home> : <Navigate to='/dashboard' replace></Navigate>}></Route>
					<Route path='/login' element={!isAuthenticated ? <Login auth={setIsAuthenticated}></Login> : <Navigate to='/dashboard' replace></Navigate>}></Route>
					<Route path='/register' element={!isAuthenticated ? <Register></Register> : <Navigate to='/dashboard' replace></Navigate>}></Route>
					<Route path='/dashboard' element={isAuthenticated ? <Dashboard auth={setIsAuthenticated}></Dashboard> : <Navigate to='/' replace></Navigate>}></Route>


				</Routes>
			</Router>
		</>
	)
}

export default App
