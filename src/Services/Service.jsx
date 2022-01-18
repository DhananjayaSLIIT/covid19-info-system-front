import axios from 'axios';
import BaseService from "./BaseService";

const check_userName = `https://covid19-info-system.herokuapp.com/api/user/user-name-check/`;
const addUser = `https://covid19-info-system.herokuapp.com/api/user/add`;
const login = `https://covid19-info-system.herokuapp.com/api/user/validate`;
const token_check = `https://covid19-info-system.herokuapp.com/api/protect/user`;
const get_all_users = `https://covid19-info-system.herokuapp.com/api/user/get-all-users`;
const get_single_user = `https://covid19-info-system.herokuapp.com/api/user/get-single-user/`;
const update_user = `https://covid19-info-system.herokuapp.com/api/user/update-user/`;
const remove_user = `https://covid19-info-system.herokuapp.com/api/user/remove-user-by/`;
const get_all_districts = `https://covid19-info-system.herokuapp.com/api/district/get-all-district`;
const add_district = `https://covid19-info-system.herokuapp.com/api/district/add-district`;
const get_all_divisions = `https://covid19-info-system.herokuapp.com/api/division/get-all-division`;
const get_division_by_disc_id = `https://covid19-info-system.herokuapp.com/api/division/get-divisions-by-district/`;
const add_division = 'https://covid19-info-system.herokuapp.com/api/division/add-division';
const search_by_division = `https://covid19-info-system.herokuapp.com/api/division/search-division`;
const update_division = `https://covid19-info-system.herokuapp.com/api/division/update-division/`;
const delete_division = `https://covid19-info-system.herokuapp.com/api/division/delete-division/`;
const add_info = `https://covid19-info-system.herokuapp.com/api/info/add-info`;
const get_info_by_division = `https://covid19-info-system.herokuapp.com/api/info/get-info-division/`;
const get_last_update = `https://covid19-info-system.herokuapp.com/api/info/update-last/`;
const get_by_time = `https://covid19-info-system.herokuapp.com/api/info/get-by-time`;
const get_total_info = "https://covid19-info-system.herokuapp.com/api/info/get-total-info";

class Services{
    userNameAvailable(usrName){
        return axios.get(check_userName+`${usrName}`);
    }
    addUser(newUser){
        return axios.post(addUser,newUser);
    };

    getTotalInfo(){
        return BaseService.UnSecure_get(get_total_info);
    }

    signIn(user,config){
        return axios.post(login,user,config);
    }
    checkToken(config){
        return axios.get(token_check,config);
    }
    getAllUsers(){
        return axios.get(get_all_users);
    }
    getSingleUser(id){
        return axios.get(get_single_user+`${id}`);
    }
    updateUser(id,newUser){
        return axios.put(update_user+`${id}`,newUser);
    }
    removeUser(id,config){
        return axios.delete(remove_user+`${id}`,config);
    }

    getAllDistricts(){
        return axios.get(get_all_districts);
    }
    addDistrict(newDistrict,config){
        return axios.post(add_district,newDistrict,config);
    }
    /** Get all divisions by district */
    getAllDivisions(config){
        return axios.get(get_all_divisions)
    }
    getDivisionsByDiscID(id,config){
        return axios.get(get_division_by_disc_id+`${id}`,config);
    }
    /** Add division */
    addDivision(newDivision,config){
        return axios.post(add_division,newDivision,config);
    }
    /** Search division */
    searchDivisionByCode(id){
        return axios.post(search_by_division,id);
    }
    /**Update division */
    update_Division(newDivision,id,config){
        return axios.put(update_division+`${id}`,newDivision,config);
    }
    /**Delete division*/
    deleteDivision(id,config){
        return axios.delete(delete_division+`${id}`,config);
    }
    /** Add division information */
    addInfo(newInfo,config){
        return axios.post(add_info,newInfo,config);
    }
    /** Get Information by division */
    getInfoByDivision(divisionID,config){
        return axios.get(get_info_by_division+`${divisionID}`,config);
    }
    /** Get last update time */
    getLastUpdate(id){
        return axios.get(get_last_update+`${id}`);
    }
    /** Get for time range */
    getTimeLine(reqData,config){
        return axios.post(get_by_time,reqData,config);
    }
}
export default new Services();


