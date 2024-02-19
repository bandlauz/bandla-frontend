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

async function refreshToken(navigateToLogin) {
    try {
        const refreshToken = localStorage.getItem("refreshToken");
        var header = {
            headers: {
                'Authorization': `Bearer ${refreshToken}`
            }
        };
        const response = await sendRequest("https://api.bandla.uz/auth/refresh-token", "get", null, header);

        localStorage.removeItem("accessToken");
        localStorage.setItem("accessToken", response.data.data);
    } catch (error) {
        console.error("Refresh token failed:", error);
        navigateToLogin();
    }
}

const Request = async (url, method, param, data, isSecure, navigateToLogin) => {
    var header;
    if (param !== null) {
        url = url + param;
    }

    if (isSecure) {
        const token = localStorage.getItem("accessToken");

        if (!token) {
            navigateToLogin();
            return;
        }

        header = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
    }

    try {
        return await sendRequest(url, method, data, header)
    } catch (error) {
        if (error.response.status == 403) {
            await refreshToken(navigateToLogin);
            return await sendRequest(url, method, data, header)
        }
        throw error;
    }
};

export default Request;