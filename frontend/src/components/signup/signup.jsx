import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/styles/test.css';
import useAuth from '../../api/auth/useAuth';

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { register, loading, error } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(username, password);
            navigate('/intro'); 
        } catch (err) {
            console.error("Erreur lors de l'inscription :", err);
        }
    };

    return (
        <div className="login-container">
            <div className="login-left">
                <div className="circle-container">
                    <div className="circle-inner">
                        <span>$</span>
                    </div>
                    <div className="circle-dotted"></div>
                </div>
            </div>

            <div className="login-right">
                <form className="form" onSubmit={handleSubmit}>
                    <p className="form-title">Join Ocean's Team</p>

                    <div className="input-container">
                        <input
                            placeholder="Enter username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <input
                            placeholder="Enter password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <button className="submit" type="submit" disabled={loading}>
                        {loading ? 'Signing up...' : 'Sign up'}
                    </button>

                    <p className="signup-link">
                        Already have an account?
                        <Link to="/login">Log in</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Signup;
