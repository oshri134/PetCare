import React, { useState, useEffect } from 'react'
import app from '../../config/firebase.config'
import 'firebase/storage';


function Chat() {
    const [messages, setMessages] = useState([])
    useEffect(() => {
        app.firestore().collection('messages').orderBy('createdAt').limit(50).onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => doc.data()))
        })
    }, [])


    return (
        <div>
            <div>
                {messages.map(({ id, text, }) => (
                    <div key={id}>
                        <p>{text}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Chat
