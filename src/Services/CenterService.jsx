import axios from 'axios';

const get_all_centers = `http://localhost:5000/api/center/get-all-centers`;
const get_centers_by_division = `http://localhost:5000/api/center/get-center-by-division/`
const add_new_center = `http://localhost:5000/api/center/add-center`;
const delete_center = `http://localhost:5000/api/center/delete-center/`;
const update_center = `http://localhost:5000/api/center/update-center/`;

class CenterService {
    getAllCenters(){
        return axios.get(get_all_centers);
    }
    getCentersByDivisions(id){
        return axios.get(get_centers_by_division+`${id}`);
    }
    addCenter(newCenter,config){
        return axios.post(add_new_center,newCenter,config)
    }
    deleteCenter(id){
        return axios.delete(delete_center+`${id}`);
    }
    updateCenter(id,center,config){
        return axios.patch(update_center+`${id}`,center,config);
    }
}
export default new CenterService();