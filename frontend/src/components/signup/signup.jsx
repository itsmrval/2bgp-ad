import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/styles/test.css';
import {useAuth} from '../../api/auth/useAuth';

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
            <form className="form" onSubmit={handleSubmit}>
                <h1 className="form-title">Inscription à la plateforme</h1>

                {error && <p className="error-message">{error}</p>}

                <div className="input-container">
                    <input
                        placeholder="Choisir un nom d'utilisateur"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-container">
                    <input
                        placeholder="Entrer un mot de passe"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button className="submit" type="submit" disabled={loading}>
                    {loading ? 'Inscription..' : 'Créer un compte'}
                </button>

                <p className="signup-link">
                    Vous disposez déjà d'un compte ?
                    <Link to="/login">Connectez-vous</Link>
                </p>
            </form>
        </div>
    );
}

export default Signup;
