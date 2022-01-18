import axios from 'axios';

const config = {
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`
    }
}

class BaseService {
    Secure_get(api){
        return axios.get(api,config);
    }
    Secure_post(api,data){
        return axios.post(api,data,config);
    }
    Secure_delete(api){
        return axios.delete(api,config);
    }
    Secure_put(api,data){
        return axios.put(api,data,config);
    }
    UnSecure_get(api){
        return axios.get(api);
    }
    UnSecure_post(api,data){
        return axios.post(api,data);
    }
    UnSecure_delete(api){
        return axios.delete(api);
    }
    UnSecure_put(api,data){
        return axios.put(api,data);
    }
}
export default new BaseService();