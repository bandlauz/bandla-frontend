import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./css/App.css";
import Home from './Home';
import Profile from './Profile'
import Login from './Login';
import Logout from './Logout'
import Footer from '../components/Footer'

function App() {
    return (
        <div className="page-container">
            <div className="content-wrap">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/profile" element={<Profile />} />
                    </Routes>
                </BrowserRouter>
            </div>
            <Footer />
        </div>
    );
}

export default App;