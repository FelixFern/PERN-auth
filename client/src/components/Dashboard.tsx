import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { redirect } from 'react-router-dom'

type DashboardProps = {
    auth: (param:Boolean) => void
}


const Dashboard = ({auth} : DashboardProps) => {
    const [username, setUsername] = useState<string>('')
    const getUserInfo = (token:string | null) => {
        axios.get('http://localhost:5000/dashboard', 
            {
                headers: {
					'token': token
				}
            }
        ).then((res) => {
            setUsername(res.data.user_name)
        }).catch((err) => {
            console.log(err)
        })
    }
    
    const logout = () => {
        localStorage.removeItem('token')
        auth(false)
    }

    useEffect(() => {
        getUserInfo(localStorage.getItem('token'))
    }, [])
    return (
        <div>
            <h3>Dashboard</h3>
            <p>Hi {username}</p>
            <button onClick={() => {
                logout()
                redirect('/')
            }}>Logout</button>
        </div>
    )
}

export default Dashboard