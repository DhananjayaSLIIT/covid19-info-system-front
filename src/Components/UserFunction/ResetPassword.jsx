import React, {Component} from 'react';
import NormalTopStatusUser from "../TopStatusBar/NormalTopStatusBar";
import UserServices from "../../Services/UserServices";

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            passwordOne:'',
            passwordTwo:'',
            errorField:''
        }
        this.onClickButton = this.onClickButton.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    onClickButton(){
        if(this.state.passwordOne !== this.state.passwordTwo){
            this.setState({errorField:"Password does not match !"});
        }else{
            let data = {
                password:this.state.passwordTwo
            }
            this.setState({errorField:""});
            UserServices.resetPassword(data,this.props.match.params.id).then(response =>{
                if(response.status === 200){
                    alert(response.data.message);
                    window.location.href = "/login";
                }
            }).catch(err =>{
                if(err.response.status === 401){
                    alert(err.response.data.message)
                }else{
                    alert('Something went wrong !');
                }
            })
        }
    }
    onChangeHandler(event){
        this.setState({[event.target.name]:event.target.value});
    }
    render() {
        return (
            <div>
                <NormalTopStatusUser/>
                <div className="container-fluid _forget_email_main_container">
                    <div className="_forget_email_grid_container">
                        <div className="_forget_email_grid-item _forget_email_border">
                            <h2 className="heading-font">Reset password</h2>
                            <div className="mb-3" style={{paddingTop:'20px'}}>
                                <label className="form-label" id="input-label">New password</label>
                                <input type="password" className="form-control" name="passwordOne"
                                    value={this.state.passwordOne} onChange={this.onChangeHandler}
                                />
                            </div>
                            <div className="mb-3" style={{paddingTop:'20px'}}>
                                <label className="form-label" id="input-label">Confirm password</label>
                                <input type="password" className="form-control" name="passwordTwo"
                                    value={this.state.passwordTwo} onChange={this.onChangeHandler}
                                />
                            </div>
                            <p style={{height:'30px',color:"red",fontWeight:"bold",padding:"0px"}}>{this.state.errorField}</p>
                            <div className="mb-3">
                                <button type="button" className="btn-add" onClick={this.onClickButton}>Confirm</button>
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