import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    useEffect(()=>{
    const auth = localStorage.getItem('name');
    if(auth) navigate('/')
    },[])

    const Onfinish = async () => {
        try {
            let result = await fetch('http://localhost:3000/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' },
            });
            result = await result.json();
            console.log('Response status:', result);
            if (result.auth) {
                localStorage.setItem('user', JSON.stringify(result.user));
                localStorage.setItem('token', JSON.stringify(result.auth))
                navigate('/')
            } else {
                alert('Please enter correct email & Password')
            }
        }
        catch (error) {
            console.error('Error during fetch:', error);
        }
    }



    return (
        <>
            <h1>Login</h1>
            <div className="SineUpdiv">
                <input
                    className='Inputbox'
                    type='email' value={email}
                    placeholder='Enter Email'
                    onChange={(e) => { setEmail(e.target.value) }}
                />

                <input
                    className='Inputbox'
                    type='password'
                    value={password}
                    placeholder='Enter Password'
                    onChange={(e) => { setPassword(e.target.value) }}
                />
                <input
                    className='SignUp-Button'
                    type='submit' value='Login'
                    onClick={Onfinish}
                />
            </div>
        </>);
}

export default Login;