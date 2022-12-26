import React, { useState } from 'react'
import axios from 'axios'
import { redirect } from 'react-router-dom'

const Register = () => {
    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    
    const handleRegister = async () => {
        const registerData = {
            'user_name': username,
            'user_email': email, 
            'user_password' : password
        }
        
        
        axios.post('http://localhost:5000/auth/register', registerData)
            .then((res) => {
                if(res.data.token) {
                    console.log(res.data)
                }
            }).catch((err) => {
                console.log(err)
            })
            
        }
        
        return (
            <div>
            <h3>Register</h3>
            <input placeholder='username' type='text' value={username} onChange={(e) => setUsername(e.target.value)}></input>
            <input placeholder='email' type='text' value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <input placeholder='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <button onClick={()=>{
                handleRegister()            
                redirect('/')
            }}>Register</button>
        </div>
    )
}

export default Register