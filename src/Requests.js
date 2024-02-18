import axios from "axios";
import Token from "./util/Token"
const Requests = async (url, method, param, data, isSecure, token) => {
    if (isSecure) {
        if (token == null) {
            token = localStorage.getItem("accessToken");
        }

        if (!token) {
            return;
        }

        var header = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        try {
            switch (method) {
                case "get": {
                    return await axios.get(url, header)
                }
            }

        } catch (error) {
            if (error.response.status == 403) {
                Token();
                Requests(error.config.url,error.response.config.method,null,null,true,null);
                return;
            }
            throw error;
        }
        return;
    }

    try {
        switch (method) {
            case "postWithParam": {
                return await axios.post(`${url}${param}`);
            }
            case "post": {
                return await axios.post(url, data);
            }
            case "put": {
                return await axios.put(url, data);
            }
            case "get": {
                return await axios.get(url, data)
            }
            default:
                throw new Error(`Invalid method: ${method}`);
        }
    } catch (error) {
        throw error;
    }
};

export default Requests;