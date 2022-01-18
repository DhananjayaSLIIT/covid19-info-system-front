import axios from 'axios';
import BaseService from "./BaseService";

const send_forgot_password_email = "http://localhost:5000/api/user/forgot-password"
const reset_password = 'http://localhost:5000/api/user/reset-password-data/';
class UserServices {
    sendForgotPasswordEmail(data){
        return BaseService.UnSecure_post(send_forgot_password_email,data)
    }
    resetPassword(data,id){
        return BaseService.UnSecure_post(reset_password+`${id}`,data);
    }
}

export default new UserServices();