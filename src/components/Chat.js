import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import '../styles/Chat.css';

const Chat = ({ user }) => {
    const [groups] = useState(['Genel', 'Teknoloji', 'Eğlence']);
    const [currentGroup, setCurrentGroup] = useState('Genel');
    const [messages, setMessages] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [message, setMessage] = useState('');
    const socketRef = useRef();

    // Socket.io bağlantısını ve olaylarını başlatma
    useEffect(() => {
        // Socket.io server bağlantısı oluşturma
        socketRef.current = io('http://localhost:5000');

        // Kullanıcının belirli gruba katılmasını sağlama
        socketRef.current.emit('join', { name: user.name, avatar: user.avatar, group: currentGroup });

        // Yeni mesajları alıp mesajları güncelleme
        socketRef.current.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        // Online kullanıcıları güncelleme
        socketRef.current.on('onlineUsers', (users) => {
            setOnlineUsers(users);
        });

        // Soket bağlantısını kapatma işlemi
        return () => {
            socketRef.current.disconnect();
        };
    }, [user.name, user.avatar, currentGroup]);

    // Belirli gruba ait mesajları getirme işlemi
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`https://6681618c04acc3545a0688b5.mockapi.io/api/chatapp/messages?group=${currentGroup}`);
                setMessages(response.data);
            } catch (error) {
                console.error('Mesajları getirme hatası:', error);
                setMessages([]); // Hata durumunda mesajları boş olarak ayarla
            }
        };

        fetchMessages();
    }, [currentGroup]);

    // Mesaj gönderme işlemi
    const sendMessage = async () => {
        const newMessage = {
            message,
            from: user.name,
            avatar: user.avatar,
            group: currentGroup,
            createdAt: new Date().toISOString(),
        };

        try {
            // Veritabanına mesajı kaydetme
            await axios.post('https://6681618c04acc3545a0688b5.mockapi.io/api/chatapp/messages', newMessage);
            // Soket üzerinden mesajı gönderme
            socketRef.current.emit('sendMessage', newMessage);
            // Mesaj alanını temizleme
            setMessage('');
        } catch (error) {
            console.error('Mesaj gönderme hatası:', error);
        }
    };

    // Belirli gruba katılma işlemi
    useEffect(() => {
        socketRef.current.emit('joinGroup', currentGroup);
    }, [currentGroup]);

    // JSX dönüşü
    return (
        <div className="chat-container">
            {/* Grup listesi */}
            <div className="group-list">
                {groups.map((group) => (
                    <div
                        key={group}
                        className={`group-item ${group === currentGroup ? 'active' : ''}`}
                        onClick={() => setCurrentGroup(group)}
                    >
                        {group === 'Genel' ? (
                            <span className="group-emoji" role="img" aria-label="Dünya Emoji">
                                🌍
                            </span>
                        ) : group === 'Teknoloji' ? (
                            <span className="group-emoji" role="img" aria-label="Bilgisayar Emoji">
                                💻
                            </span>
                        ) : group === 'Eğlence' ? (
                            <span className="group-emoji" role="img" aria-label="Parti Emoji">
                                🎉
                            </span>
                        ) : null}
                        {group}
                    </div>
                ))}
            </div>
            {/* Sohbet penceresi */}
            <div className="chat-window">
                <div className="messages">
                    {messages.length > 0 ? (
                        // Mesajları listeleme
                        messages.map((msg) => (
                            <div key={msg.id} className="message" style={{ backgroundColor: getColor(msg.from) }}>
                                {/* Kullanıcı avatarı */}
                                <img src={msg.avatar} alt="avatar" className="message-avatar" />
                                {/* Kullanıcı adı */}
                                <span className="message-user">{msg.from}:</span>
                                {/* Mesaj içeriği */}
                                <span className="message-content">{msg.message}</span>
                            </div>
                        ))
                    ) : (
                        // Eğer grup boşsa mesaj
                        <p>Bu grupta henüz mesaj yok.</p>
                    )}
                </div>
                {/* Mesaj gönderme alanı */}
                <div className="message-input">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Mesajınızı yazın..."
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <button onClick={sendMessage}>Gönder</button>
                </div>
            </div>
            {/* Online kullanıcılar listesi */}
            <div className="online-users">
                <h3>Online Kullanıcılar</h3>
                {onlineUsers.map((onlineUser, index) => (
                    <div key={index} className={`user-item ${onlineUser.name === user.name ? 'current-user' : ''}`}>
                        {/* Kullanıcı avatarı */}
                        <img src={onlineUser.avatar} alt="avatar" className="user-avatar" />
                        {/* Kullanıcı adı */}
                        {onlineUser.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

// Kullanıcı adına göre renk seçimi
const getColor = (username) => {
    const colors = ['#FFD700', '#ADFF2F', '#FF69B4', '#87CEEB', '#FF4500'];
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
        hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
};

export default Chat;
