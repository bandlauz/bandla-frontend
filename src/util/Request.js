import axios from "axios";

async function sendRequest(url, method, data, header) {
    if (data == null) {
        return await axios[method](url, header);
    }
    if (header == null) {
        return await axios[method](url, data);
    }
    return await axios[method](url, data, header);
}

function refreshToken(navigate) {
    try {
        const refreshToken = localStorage.getItem("refreshToken");
        var header = {
            headers: {
                'Authorization': `Bearer ${refreshToken}`
            }
        };
        const response = sendRequest("https://api.bandla.uz/auth/refresh-token", "get", null, header);

        localStorage.removeItem("accessToken");
        localStorage.setItem("accessToken", response.data.data);
    } catch (error) {
        navigate("/login");
    }
}

const Request = (url, method, param, data, isSecure, navigate) => {
    var header;
    if (param !== null) {
        url = url + param;
    }

    if (isSecure) {
        const token = localStorage.getItem("accessToken");

        if (!token) {
            navigate("/login");
            return;
        }

        header = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
    }

    try {
        return sendRequest(url, method, data, header)
    } catch (error) {
        if (error.response.status == 403) {
            refreshToken(navigate);
            return sendRequest(url, method, data, header)
        }
    }
};

export default Request;