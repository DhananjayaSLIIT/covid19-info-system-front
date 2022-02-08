import React, {Component} from 'react';
import NormalTopStatusUser from "../TopStatusBar/NormalTopStatusBar";
import '../../css/forgot_password_email.css';
import UserServices from "../../Services/UserServices";
import MessageModal from "../Message/MessageModal";

export default class ForgotPasswordEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show:false,
            message:'',
            statusCode:'',
            userEmail:'',
            errorField:''
        }
        this.onButtonClick = this.onButtonClick.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);

        this.openMessageModal = this.openMessageModal.bind(this);
        this.closeMessageModal = this.closeMessageModal.bind(this);
        this.setStatePromise = this.setStatePromise.bind(this);
        this.resetMessage = this.resetMessage.bind(this);
    }

    /** Alert modal */
    setStatePromise(message){
        return new Promise(resolve => {
            resolve(
                this.setState({message:message})
            )
        });
    }
    /**Message modal popup*/
    openMessageModal(){
        this.setState({show:true});
    }
    /**Message modal close*/
    closeMessageModal(){
        this.setState({show:false});
        this.resetMessage();
        window.location.href = "/login";
    }
    /**Reset message */
    resetMessage(){
        this.setState({message:''});
        this.setState({statusCode:''});
    }
    /**-------------*/

    onButtonClick(){
        let data = {
            email:this.state.userEmail
        }

        UserServices.sendForgotPasswordEmail(data).then(result =>{
            if(result.status === 200){
                this.setStatePromise(result.data.message).then(()=>{
                    this.setState({statusCode:result.status})
                }).then(()=>{
                    this.openMessageModal();
                })
            }else{
                this.setStatePromise(result.data.error.message).then(()=>{
                    this.setState({statusCode:result.data.error.status})
                }).then(()=>{
                    this.openMessageModal();
                })
            }
        }).catch(error=>{
            this.setStatePromise(error.message).then(()=>{
                if(!error.response){
                    this.setState({statusCode:500})
                }else{
                    this.setState({statusCode:error.response.status})
                }
            }).then(()=>{
                this.openMessageModal();
            })
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
                            <MessageModal
                                show={this.state.show}
                                message={this.state.message}
                                closeHandler={this.closeMessageModal}
                                messageReset={this.resetMessage}
                                responseCode={this.state.statusCode}
                            />
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
