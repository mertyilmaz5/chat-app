import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Login.css';

const Login = ({ onLogin }) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState('');
    const [avatars, setAvatars] = useState([]);
    const [selectedAvatar, setSelectedAvatar] = useState(null);

    useEffect(() => {
        const fetchAvatars = () => {
            const avatarUrls = [];
            for (let i = 1; i <= 100; i++) {
                avatarUrls.push(`https://avatar.iran.liara.run/public/${i}`);
            }
            const randomAvatars = avatarUrls.sort(() => 0.5 - Math.random()).slice(0, 5);
            setAvatars(randomAvatars);
        };
        fetchAvatars();
    }, []);

    const handleLogin = async () => {
        try {
            const response = await axios.get(`https://6681618c04acc3545a0688b5.mockapi.io/api/chatapp/users?name=${username}`);
            if (response.data.length > 0) {
                onLogin(response.data[0]);
            } else {
                alert('Kullanıcı bulunamadı. Lütfen kayıt olun.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    const handleRegister = async () => {
        if (!selectedAvatar) {
            alert('Lütfen bir avatar seçin.');
            return;
        }

        try {
            const newUser = {
                name: username,
                avatar: selectedAvatar,
                createdAt: new Date().toISOString(),
            };
            const response = await axios.post('https://6681618c04acc3545a0688b5.mockapi.io/api/chatapp/users', newUser);
            onLogin(response.data);
        } catch (error) {
            console.error('Error registering:', error);
        }
    };

    return (
        <div className="login-container">
            <h2>{isRegistering ? 'Kayıt Ol' : 'Giriş Yap'}</h2>
            <input
                type="text"
                placeholder="Kullanıcı adı"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            {isRegistering && (
                <div className="avatar-selection">
                    {avatars.map((avatar) => (
                        <img
                            key={avatar}
                            src={avatar}
                            alt="avatar"
                            className={`avatar ${selectedAvatar === avatar ? 'selected' : ''}`}
                            onClick={() => setSelectedAvatar(avatar)}
                        />
                    ))}
                </div>
            )}
            <button onClick={isRegistering ? handleRegister : handleLogin}>
                {isRegistering ? 'Kayıt Ol' : 'Giriş Yap'}
            </button>
            <button onClick={() => setIsRegistering(!isRegistering)}>
                {isRegistering ? 'Giriş Yap' : 'Kayıt Ol'}
            </button>
        </div>
    );
};

export default Login;
