import Request from './Requests';
import { useNavigate } from "react-router-dom";
const Token = () => {
    const navigate = useNavigate();
    try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = Request("https://api.bandla.uz/auth/refresh-token", "get", null, null, true, refreshToken);

        localStorage.removeItem("accessToken");
        localStorage.setItem("accessToken", response.data.data);
    } catch (error) {
        navigate("/login");
    }
}
export default Token; 