import React, {Component} from 'react';
import '../../css/admin_add_users.css';
import TopStatusUser from "../TopStatusBar/TopStatusUser";
import Services from '../../Services/Service';


export default class AdminAddUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName:'',
            lastName:'',
            NIC:'',
            occupation:"",
            email:'',
            userName:'',
            password:'',
            fieldError:""
        }
        this.onchangeHandler = this.onchangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

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
            password:this.state.password
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
        }else if(!this.state.password){
            return this.setState({fieldError:"Password is empty"});
        }else{
            Services.userNameAvailable(this.state.userName).then(response => {
                if(!response.data.success){
                    this.setState({fieldError:response.data.message})
                }else {
                    Services.addUser(newUser).then(result=>{
                        if(result.data.success){
                            alert(result.data.message);
                            this.props.history.push(`/get-all-user`);
                        }else{
                            alert(result.data.error.message);
                        }
                    }).catch(error=>{
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
                                <h2 className="heading-font">Add new user </h2>
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
                                <div className="col-6 form-group">
                                    <input type="text" className="form-control input-field" aria-describedby="emailHelp"
                                           placeholder="Enter user name" name="userName" value={this.state.userName} onChange={this.onchangeHandler}/>
                                </div>

                                <div className="col-6 form-group">
                                    <input type="password" className="form-control input-field" aria-describedby="emailHelp"
                                           placeholder="Enter password" name="password" value={this.state.password} onChange={this.onchangeHandler}/>
                                </div>
                            </div>
                            <p className="ts-1" style={{color:"red",fontWeight:"bold", height:"7px"}}>{this.state.fieldError}</p>
                            <div className="ts-1 form-group">

                                <input type="submit" value="Add user" className="btn btn-add" aria-describedby="emailHelp"
                                onClick={this.onSubmitHandler}/>
                            </div>
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

