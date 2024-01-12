import Login from '../src/auth/Login';
import Home from './Home';
import Verification from './auth/Verification';
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/verification" element={<Verification/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;