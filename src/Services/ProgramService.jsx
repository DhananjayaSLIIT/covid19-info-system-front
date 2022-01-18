import axios from 'axios';
import BaseService from "./BaseService";
const get_allPrograms = `https://covid19-info-system.herokuapp.com/api/program/get-all-program`;
const addNewProgram = `https://covid19-info-system.herokuapp.com/api/program/add-program`;
const prg_number = `https://covid19-info-system.herokuapp.com/api/program/programNumber`;
const getProgram = 'https://covid19-info-system.herokuapp.com/api/program/get-program/';
const update_prg = `https://covid19-info-system.herokuapp.com/api/program/update-program/`;
const get_program_by_center = `https://covid19-info-system.herokuapp.com/api/program/get-program-by-center/`;
const delete_Program = `https://covid19-info-system.herokuapp.com/api/program/delete-program/`;
const get_scheduled_applications = "https://covid19-info-system.herokuapp.com/api/application/get-schedule-vaccination/";
const save_changes = "https://covid19-info-system.herokuapp.com/api/application/saveStatus";

class ProgramService {
    getCenterPrograms(id){
        return axios.get(get_program_by_center+`${id}`);
    }
    addNewProgram(newProgram,config){
        return axios.post(addNewProgram,newProgram,config);
    }
    getNumber(){
        return axios.get(prg_number);
    }
    getProgram(id){
        return axios.get(getProgram+`${id}`);
    }
    update(prgId,program,config){
        return axios.put(update_prg+`${prgId}`,program,config);
    }
    deleteProgram(id){
        return axios.delete(delete_Program+`${id}`);
    }
    getAllScheduledApplications(id){
        return BaseService.UnSecure_get(get_scheduled_applications+id);
    }
    saveStatus(data){
        return BaseService.UnSecure_put(save_changes,data);
    }
}
export default new ProgramService();