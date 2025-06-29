import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/styles/test.css';
import {useAuth} from '../../api/auth/useAuth';

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
            <form className="form" onSubmit={handleSubmit}>
                <h1 className="form-title">Connexion à votre compte</h1>
                
                {error && <p className="error-message">{error}</p>} 
                
                <div className="input-container">
                    <input 
                        placeholder="Nom d'utilisateur"
                        type="text"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        required
                    />
                </div>
                
                <div className="input-container">
                    <input
                        placeholder="Mot de passe"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button className="submit" type="submit" disabled={loading}>
                    {loading ? 'Connexion en cours..' : 'Se connecter au compte'}
                </button>

                <p className="signup-link">
                    Nouveau dans l'aventure ?<Link to="/signup">Créer un compte ici</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
