import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/test.css';
import PlayingCard from '../PlayingCard';

function Login() {
    // Using generic identifier for login that accepts both email and username
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');

    // Form submission that works with either email or username
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login with identifier:', identifier, 'password:', password);
        
        // Here you would typically handle authentication
        // const isEmail = identifier.includes('@');
        // if (isEmail) {
        //     loginWithEmail(identifier, password);
        // } else {
        //     loginWithUsername(identifier, password);
        // }
    };

    return (
        <div className="login-container">
            {/* Section de gauche – fond noir avec le symbole $ */}
            <div className="login-left">
                <div className="circle-container">
                    <div className="circle-inner">
                        <span>$</span>
                    </div>
                    <div className="circle-dotted"></div>
                </div>
            </div>

            {/* Section de droite – fond gris clair avec le texte BELLAGIO */}
            <div className="login-right">
                <form className="form" onSubmit={handleSubmit}>
                    <p className="form-title">Join Ocean's Team</p>
                    <div className="input-container">
                        <input 
                            placeholder="Email or Username" 
                            type="text" 
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                        />
                        <span>
                            <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
                            </svg>
                        </span>
                    </div>
                    <div className="input-container">
                        <input 
                            placeholder="Enter password" 
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                        <span>
                            <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
                                <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
                            </svg>
                        </span>
                    </div>
                    <button className="submit" type="submit">
                        Sign in
                    </button>
                    <p className="signup-link">
                        No account?
                        <Link to="/signup">Sign up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
