import axios from "axios";

const Requests =  (url, method, param) => {
    switch (method) {
        case "post": {
            try {
                return  axios.post(`${url}${param}`);
            } catch (error) {
                throw error;
            }
        }
        default:
            throw new Error(`Invalid method: ${method}`);
    }
};

export default Requests;
