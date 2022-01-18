import React, {Component} from 'react';
import NormalTopStatusUser from "../TopStatusBar/NormalTopStatusBar";
import '../../css/forgot_password_email.css';
import UserServices from "../../Services/UserServices";

export default class ForgotPasswordEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userEmail:'',
            errorField:''
        }
        this.onButtonClick = this.onButtonClick.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    onButtonClick(){
        let data = {
            email:this.state.userEmail
        }

        UserServices.sendForgotPasswordEmail(data).then(response =>{
            if(response.status === 200){
                alert("Request sent to the email.\nPlease check you emails !");
                window.location.href = "/login";
            }
        }).catch(err=>{
            if(err.response.status === 401){
                alert(err.response.data.message);
            }else {
                alert("Something went wrong");
            }
        });
    }

    onChangeHandler(event){
        this.setState({userEmail:event.target.value});
    }

    render() {
        return (
            <div>
                <NormalTopStatusUser/>
                <div className="container-fluid _forget_email_main_container">
                    <div className="_forget_email_grid_container">
                        <div className="_forget_email_grid-item _forget_email_border">
                            <h2 className="heading-font">Forgot password</h2>
                            <div className="mb-3" style={{paddingTop:'20px'}}>
                                <label className="form-label" id="input-label">Email address</label>
                                <input type="email" className="form-control" name="userEmail"
                                        value={this.state.userName} onChange={this.onChangeHandler}
                                />
                            </div>
                            <div className="mb-3">
                                <button type="button" className="btn-add" onClick={this.onButtonClick}>Send request</button>
                            </div>
                        </div>
                        <div className="_forget_email_grid-item ">
                            <img src="/images/emailType.jpg" id='_forget_email_img'/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
