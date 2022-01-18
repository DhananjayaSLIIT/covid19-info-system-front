import BaseService from "./BaseService";

const getDetails = "https://covid19-info-system.herokuapp.com/api/info/get-past-month";
const vaccination_details = "https://covid19-info-system.herokuapp.com/api/application/get-vaccination-details";

class HomeServices{

  getVaccination_Death_Details(){
      return BaseService.UnSecure_get(getDetails);
  }

  getVaccinationCount(){
      return BaseService.UnSecure_get(vaccination_details)
  }
}
export default new HomeServices();