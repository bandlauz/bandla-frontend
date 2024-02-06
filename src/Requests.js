import axios from "axios";

const Requests = async (url, method, param, data) => {
    try {
        switch (method) {
            case "postWithParam": {
                return await axios.post(`${url}${param}`);
            }
            break;
            case "post" : {
                return await axios.post(url, data);
            }
            break;
            case "put": {
                return await axios.put(url, data);
            }
            default:
                throw new Error(`Invalid method: ${method}`);
        }
    } catch (error) {
        throw error;
    }
};

export default Requests;
