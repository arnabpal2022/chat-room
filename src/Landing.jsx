import { Link } from "react-router-dom";
import { chatRooms } from "./data/chatRooms";

function Landing() {
  return (
    <div className="flex flex-col items-center ">
      <h2>Choose A Chat Room</h2>
      <ul className = "flex flex-col items-center sm:flex-row">
        {chatRooms.map((room) => (
          <li key={room.id} className = "font-bold montserrat m-5 border p-10 w-80 text-center hover:text-blue-900 hover:underline bg-blue-50 rounded-lg">
            <Link to={`/room/${room.id}`}>{room.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}


export { Landing };
