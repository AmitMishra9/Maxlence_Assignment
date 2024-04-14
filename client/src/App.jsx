import './App.css';
import { Route, Routes } from 'react-router-dom'; 

import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Users from './pages/userlist/Users';
import Adduser from './pages/userlist/Adduser';
import Profile from './pages/profile/Profile';
function App() {
    return (
        
            <div>
               
                <Routes>
                    <Route path="/" element=<Login/> />
                    <Route path="/register" element=<Register/> />
                    <Route path="/home" element=<Users/> />
                    <Route path="/profile" element=<Profile/> />
                    <Route path="/adduser" element=<Adduser/> />
                </Routes>
            </div>
        
    );
}

export default App;
