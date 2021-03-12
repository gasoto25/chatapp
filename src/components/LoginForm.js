import { useState } from "react"
import React from 'react'
import axios from 'axios';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const authObject = {
            'Project-ID': '1f921d3a-a84b-4a25-a7f9-f9b289b1da6b',
            'User-Name': username,
            'User-Secret': password
        }

        try {
        await axios.get('https://api.chatengine.io/chats', {headers: authObject});
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        window.location.reload();
        } catch (error) {
            setError('Incorrect username or password, please try again.');
        }

    }

    return (
        <div className="wrapper">
            <div className="form">
                <h1 className='title'>Chat App</h1>
                <form onSubmit={handleSubmit}>
                    <input type='text' className='input' required placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
                    <input type='password' className='input' required placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
                    <div align='center'>
                        <button type="submit" className='button'>
                            <span>Start Chatting</span>
                        </button>
                    </div>
                    <h2 className='error'>{error}</h2>
                </form>
            </div>
        </div>
    )
}

export default LoginForm;