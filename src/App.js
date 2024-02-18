import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./App.css";
import Login from '../src/auth/Login';
import Home from './Home';
import Logout from '../src/auth/Logout'
import Profile from '../src/Profile'
import Footer from './components/Footer'

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
