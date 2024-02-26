import * as React from 'react';
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate('/');
        window.location.reload();
    }, [])
    return (
        <h1>Logout</h1>
    );
}
export default Logout;