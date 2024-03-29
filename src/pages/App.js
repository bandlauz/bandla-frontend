import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./css/App.css";
import Home from './Home';
import Profile from './Profile'
import Login from './Login';
import Logout from './Logout'
import WrongPath from './WrongPath';
import Footer from '../components/Footer'
import NavbarContainer from '../components/NavbarContainer';
import LoginWithTelegram from '../auth/LoginWithTelegram';

function App() {
    return (
        <div className="page-container">
            <div className="content-wrap">
                <NavbarContainer />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/login-telegram" element={<LoginWithTelegram/>} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="*" element={<WrongPath/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
            <Footer />
        </div>
    );
}

export default App;
