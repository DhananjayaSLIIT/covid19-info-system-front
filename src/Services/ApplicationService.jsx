import BaseService from "./BaseService";
const get_applications = `https://covid19-info-system.herokuapp.com/api/application/get-application-by-center/`;
const schedule_vaccine = "https://covid19-info-system.herokuapp.com/api/application/schedule-vaccination";
const applicationCount = "https://covid19-info-system.herokuapp.com/api/application/get-application-count/";
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