import React from "react";
import { useAuth } from "./hooks/useAuth";
import { sendMessage } from "./services/firebase";

function MessageInput({roomId}){
    const {user} = useAuth();
    const [value, setValue] = React.useState('')

    const handleChange = (event) => {
        setValue(event.target.value)
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        sendMessage(roomId, user, value)
        setValue('');
    }

    return (
        <form onSubmit={handleSubmit} className="message-input-container">
            <input
                type="text"
                placeholder="Enter a message"
                value={value}
                onChange={handleChange}
                className="message-input bg-blue-50 rounded-md"
                required
                minLength={1}
            />
            <button type="submit" disabled={value < 1} className="send-message bg-blue-950 rounded-md text-white font-bold">
                Send
            </button>
        </form>
    );
}

export {MessageInput}