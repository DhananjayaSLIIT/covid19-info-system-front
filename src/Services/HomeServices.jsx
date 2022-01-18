import BaseService from "./BaseService";

const getDetails = "http://localhost:5000/api/info/get-past-month";
const vaccination_details = "http://localhost:5000/api/application/get-vaccination-details";

class HomeServices{

  getVaccination_Death_Details(){
      return BaseService.UnSecure_get(getDetails);
  }

  getVaccinationCount(){
      return BaseService.UnSecure_get(vaccination_details)
  }
}
export default new HomeServices();