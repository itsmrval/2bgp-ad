import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/styles/test.css';
import useAuth from '../../api/auth/useAuth';

function Login() {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading, error } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await login(identifier, password);
            navigate('/'); 
        } catch (err) {
            console.error('Login failed:', err);
        }
    };

    return (
        <div className="login-container">
            {/* Section gauche */}
            <div className="login-left">
                <div className="circle-container">
                    <div className="circle-inner">
                        <span>$</span>
                    </div>
                    <div className="circle-dotted"></div>
                </div>
            </div>

            {/* Section droite */}
            <div className="login-right">
                <form className="form" onSubmit={handleSubmit}>
                    <p className="form-title">Join Ocean's Team</p>

                    {error && <p className="error-message">{error}</p>} {/* Affichage erreur */}
                    
                    <div className="input-container">
                        <input 
                            placeholder="Username"
                            type="text"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            required
                        />
                        <span>
                            {/* Icon */}
                        </span>
                    </div>
                    
                    <div className="input-container">
                        <input
                            placeholder="Enter password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span>
                            {/* Icon */}
                        </span>
                    </div>

                    <button className="submit" type="submit" disabled={loading}>
                        {loading ? 'Loading...' : 'Sign in'}
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
