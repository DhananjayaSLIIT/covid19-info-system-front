import axios from 'axios';
import BaseService from "./BaseService";
const get_allPrograms = `http://localhost:5000/api/program/get-all-program`;
const addNewProgram = `http://localhost:5000/api/program/add-program`;
const prg_number = `http://localhost:5000/api/program/programNumber`;
const getProgram = 'http://localhost:5000/api/program/get-program/';
const update_prg = `http://localhost:5000/api/program/update-program/`;
const get_program_by_center = `http://localhost:5000/api/program/get-program-by-center/`;
const delete_Program = `http://localhost:5000/api/program/delete-program/`;
const get_scheduled_applications = "http://localhost:5000/api/application/get-schedule-vaccination/";
const save_changes = "http://localhost:5000/api/application/saveStatus";

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