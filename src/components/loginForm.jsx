import React, { useState, useEffect } from 'react'
import { login } from '../utils/api'

const LoginForm = () => {
    console.log("[LoginPage]Connected")

    const positioning = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    }

    const loginFormStyle = {
        background: 'rgba(210, 210, 210, 0.8)',
        width: '500px',
        height: '500px'
    }

    const [id, setId] = useState('')
    const [password, setPassword] = useState('')

    const onChangeId = (e) => {
        e.preventDefault()
        setId(e.target.value)
    }

    const onChangePassword = (e) => {
        e.preventDefault()
        setPassword(e.target.value)
    }

    const onClickLogin = async() => {
        const res = await login(id, password)
        console.log(res.data)
        if(res.data.isSuccess === true){
            alert("Login Success")
        }
        else{
            alert("Login Failed")
        }
    }
    return(
        <>
            <div style={positioning}>
                <div style={loginFormStyle}>
                    <div>
                        <div>ID</div>
                        <input type="text" name="input_id" value={id} onChange={onChangeId}></input>
                    </div>
                    <div>
                        <div>Password</div>
                        <input type="text" name="input_password" value={password} onChange={onChangePassword}></input>
                    </div>
                    <button type="button" onClick={onClickLogin}>Login</button>
                </div>
            </div>
        </>
    )
}

export default LoginForm