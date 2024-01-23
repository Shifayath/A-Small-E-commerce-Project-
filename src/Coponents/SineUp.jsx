import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SineUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/')
        }
    })


    const Onfinish = async () => {
        try {
            let result = await fetch('http://localhost:3000/register', {
                method: 'POST',
                body: JSON.stringify({ name, email, password }),
                headers: { 'Content-Type': 'application/json' },
            });
            result = await result.json();
            localStorage.setItem('user', JSON.stringify(result.result));
            localStorage.setItem('token', JSON.stringify(result.auth));
            navigate('/')
        }
        catch (error) {
            console.error('Error during fetch:', error);
        }
    }

    return (
        <>
            <h1>REGISTER</h1>
            <div className="SineUpdiv">
                <input
                    className='Inputbox'
                    type='text'
                    value={name}
                    placeholder='Enter Name'
                    onChange={(e) => { setName(e.target.value) }}
                />
                <input
                    className='Inputbox'
                    type='email'
                    value={email}
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
                    type='submit' 
                    value='Sign Up' 
                    onClick={Onfinish} 
                />
            </div>
        </>
    )
}

export default SineUp;
