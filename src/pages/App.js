import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from '../components/Footer';
import NavbarContainer from '../components/NavbarContainer';
import './css/App.css';

const Home = React.lazy(() => import('./Home'));
const Login = React.lazy(() => import('./Login'));
const LoginWithTelegram = React.lazy(() => import('../auth/LoginWithTelegram'));
const Logout = React.lazy(() => import('./Logout'));
const Profile = React.lazy(() => import('./Profile'));
const About = React.lazy(() => import('./About'));
const Company = React.lazy(() => import('./Company'));
const WrongPath = React.lazy(() => import('./WrongPath'));

function App() {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <NavbarContainer />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login-telegram" element={<LoginWithTelegram />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/company" element={<Company />} />
            <Route path="*" element={<WrongPath />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </div>
  );
}

export default App;
