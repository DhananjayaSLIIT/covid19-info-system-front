import React, {Component} from 'react';
import '../../css/admin_add_users.css';
import Service from "../../Services/Service";
import TopStatusUser from "../TopStatusBar/TopStatusUser";
import MessageModal from "../Message/MessageModal";

export default class AdminUpdateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show:false,
            message:'',
            statusCode:'',
            firstName:'',
            lastName:'',
            NIC:'',
            occupation:"",
            email:'',
            userName:'',
            fieldError:""
        }
        this.onchangeHandler = this.onchangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);

        this.openMessageModal = this.openMessageModal.bind(this);
        this.closeMessageModal = this.closeMessageModal.bind(this);
        this.setStatePromise = this.setStatePromise.bind(this);
        this.resetMessage = this.resetMessage.bind(this);
    }

    componentDidMount() {
        Service.getSingleUser(this.props.match.params.id)
        .then(res => {
            this.setState({
                firstName:res.data.data.firstName,
                lastName:res.data.data.lastName,
                NIC:res.data.data.NIC,
                occupation:res.data.data.occupation,
                email:res.data.data.email,
                userName:res.data.data.userName
            })
        })
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
        this.props.history.push(`/get-all-user`);
    }
    /**Reset message */
    resetMessage(){
        this.setState({message:''});
        this.setState({statusCode:''});
    }
    /**-------------*/

    onchangeHandler(event){
        this.setState({[event.target.name]:event.target.value});
    }

    onSubmitHandler(event){
        event.preventDefault();
        let newUser = {
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            NIC:this.state.NIC,
            occupation:this.state.occupation,
            email:this.state.email,
            userName:this.state.userName,
        }

        if(!this.state.firstName){
            return this.setState({fieldError:"First name is empty"});
        }else if(!this.state.lastName){
            return this.setState({fieldError:"Last name is empty"});
        }else if(!this.state.NIC){
            return this.setState({fieldError:"NIC is empty"});
        }else if(!this.state.occupation){
            return this.setState({fieldError:"Occupation is empty"});
        }else if(!this.state.email){
            return this.setState({fieldError:"Email is empty"});
        }else if(!this.state.userName){
            return this.setState({fieldError:"UserName is empty"});
        }else{
            Service.userNameAvailable(this.state.userName).then(response => {
                if(!response.data.success){
                    this.setState({fieldError:response.data.message})
                }else {
                    Service.updateUser(this.props.match.params.id,newUser).then(result=>{
                        if(result.data.success){
                            this.setStatePromise(result.data.message).then(()=>{
                                this.setState({statusCode:response.status})
                            }).then(()=>{
                                this.openMessageModal();
                            })
                        }else{
                            this.setStatePromise(result.data.error.message).then(()=>{
                                this.setState({statusCode:result.data.error.status})
                            }).then(()=>{
                                this.openMessageModal();
                            })
                            alert(result.data.error.message);
                        }
                    }).catch(error=>{
                        this.setStatePromise(error.message).then(()=>{
                            this.setState({statusCode:error.response.status})
                        }).then(()=>{
                            this.openMessageModal();
                        })
                        console.error(new Error(error));
                    })
                }
            })
        }
    }
    render() {
        return (
            <div>
                <TopStatusUser/>
                <div className="container-fluid add-user-main-container add-user-border-grey">
                    <div className="add-user-grid-container add-user-border-grey">
                        <div className="add-user-grid-item add-form-container">
                            <div>
                                <h2 className="heading-font">Update user </h2>
                            </div>
                            <div className="row " id="form-sa">
                                <div className="col-6 form-group">
                                    <input type="text" className="form-control input-field" aria-describedby="emailHelp"
                                           placeholder="Enter first name" name="firstName" value={this.state.firstName} onChange={this.onchangeHandler}/>
                                </div>
                                <div className="col-6 form-group">
                                    <input type="text" className="form-control input-field" aria-describedby="emailHelp"
                                           placeholder="Enter last name" name="lastName" value={this.state.lastName} onChange={this.onchangeHandler}/>
                                </div>
                            </div>
                            <div className="row ts-1">
                                <div className="col-6 form-group">
                                    <input type="text" className="form-control input-field" aria-describedby="emailHelp"
                                           placeholder="Enter NIC" name="NIC" value={this.state.NIC} onChange={this.onchangeHandler}/>
                                </div>

                                <div className="col-6 form-group">
                                    <input type="text" className="form-control input-field" aria-describedby="emailHelp"
                                           placeholder="Enter occupation" name="occupation" value={this.state.occupation} onChange={this.onchangeHandler}/>
                                </div>
                            </div>

                            <div className="ts-1 form-group">
                                <input type="email" className="form-control input-field" aria-describedby="emailHelp"
                                       placeholder="Enter email" name="email" value={this.state.email} onChange={this.onchangeHandler}/>
                            </div>

                            <div className="row ts-1">
                                <div className="col-12 form-group">
                                    <input type="text" className="form-control input-field" aria-describedby="emailHelp"
                                           placeholder="Enter user name" name="userName" value={this.state.userName} onChange={this.onchangeHandler}/>
                                </div>
                            </div>
                            <p className="ts-1" style={{color:"red",fontWeight:"bold", height:"7px"}}>{this.state.fieldError}</p>
                            <div className="ts-1 form-group">

                                <input type="submit" value="Update user" className="btn btn-add" aria-describedby="emailHelp"
                                       onClick={this.onSubmitHandler}/>
                            </div>
                            <MessageModal
                                show={this.state.show}
                                message={this.state.message}
                                closeHandler={this.closeMessageModal}
                                messageReset={this.resetMessage}
                                responseCode={this.state.statusCode}
                            />
                        </div>
                        <div className="add-user-grid-item">
                            <img src="/images/add-user.png" id="left-container-img"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

