import axios from 'axios'
import React, { useState } from 'react'
import { redirect } from 'react-router-dom'

type LoginProps = {
    auth: (param:Boolean) => void
}


const Login = ({auth} : LoginProps) => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    
    const handleLogin = () => {
        const loginData = {
            'user_email': email,
            'user_password' : password
        }
        axios.post('http://localhost:5000/auth/login', loginData)
            .then((res) => {
                if(res.data.token) {
                    localStorage.setItem("token" ,res.data.token) 
                    auth(true)
                }
            }).catch((err) => {
                console.log(err)
        })
    }
    return (
        <div>
            <h3>Login</h3>
            <input placeholder='email' type='text' value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <input placeholder='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <button onClick={()=>{
                handleLogin()            
            }}>Login</button>    
        </div>
    )
}

export default Login