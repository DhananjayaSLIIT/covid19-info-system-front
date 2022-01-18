import BaseService from "./BaseService";
const get_applications = `http://localhost:5000/api/application/get-application-by-center/`;
const schedule_vaccine = "http://localhost:5000/api/application/schedule-vaccination";
const applicationCount = "http://192.168.1.6:5000/api/application/get-application-count/";
class ApplicationService{

    getApplicationByCenterId(id){
        return BaseService.Secure_get(get_applications+`${id}`);
    }
    getApplicationCount(id){
        return BaseService.UnSecure_get(applicationCount+`${id}`);
    }
    scheduleVaccination(data){
        return BaseService.UnSecure_post(schedule_vaccine,data);
    }

}
export default new ApplicationService();