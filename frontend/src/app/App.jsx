import { useEffect, useState } from "react";
import "./App.css";

import axios from "axios";

function App() {
   const [users, setUsers] = useState([]);

   async function getUsers() {
      const response = await axios.get("/api/users");
      const data = response.data;
      setUsers(data);
   }
   useEffect(() => {
      getUsers();
   }, []);

   return (
      <div className="app">
         <h1>Users</h1>
         <ul>
            {users.map((user) => (
               <li key={user.id}>{user.name}</li>
            ))}
         </ul>
      </div>
   );
}

export default App;
