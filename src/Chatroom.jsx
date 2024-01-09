import { Link ,useParams } from "react-router-dom";
import { chatRooms } from "./data/chatRooms";
import "./App.css";
import { MessageInput } from "./MessageInput";
import { MessageList } from "./MessageList";


// import ButtonSignOut from "./signout";

function Chatroom(){
    const params = useParams()

    const room = chatRooms.find((x) => x.id === params.id)
    if (!room) {
        alert("Room is Under Development")
    }
    
    /*The code defines a function called ChatRoom. 
    Inside the function, it assigns the value of 
    useParams() to the params variable. It then uses 
    the find method on the chatRooms array to find an 
    object that has an id property matching the params.id 
    value. If no matching object is found, it leaves a 
    comment indicating that a 404 page needs to be implemented.*/

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-center my-2">{room.title}</h2>
            <div className="text-center bn3637 bn38">
                <Link to="/">⬅️ Back to all rooms</Link>
            </div>
            <div className="messages-container my-10 bg-green-50">
                <MessageList roomId = {room.id}/>
                <MessageInput roomId = {room.id}/>
            </div>

            {/* <ButtonSignOut/> */}
        </div>
    )
}

export {Chatroom};