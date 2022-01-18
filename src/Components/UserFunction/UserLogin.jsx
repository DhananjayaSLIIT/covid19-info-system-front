import React, { Component } from 'react';
import '../../css/user_login.css';
import NormalTopStatusUser from "../TopStatusBar/NormalTopStatusBar";
import Footer from "../Footer/Footer";
import { RiHeartPulseLine } from "react-icons/ri";
import { GiLoveInjection } from "react-icons/gi";
import Service from "../../Services/Service";

export default class UserLogin extends Component {
    constructor(props) {
        super(props);
        this.state ={
            deathCases:'',
            vaccinatedCount:'',
            userName:"",
            password:"",
            error:""
        }
        this.loginHandler = this.loginHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    componentDidMount() {
        Service.getTotalInfo().then(response =>{
            this.setState({deathCases:response.data.data.deathCases});
            this.setState({vaccinatedCount:response.data.data.vaccinatedCount});
        })
    }

    loginHandler(event){
        event.preventDefault();

        const config = {
            header:{
                "Content-Type":"application/json",
            },
        };

        let user = {
            userName:this.state.userName,
            password:this.state.password
        }
        Service.signIn(user,config).then(res=>{
            if(res.data.success){
                localStorage.setItem("authToken",res.data.token);
                localStorage.setItem("privilege",res.data.privilege);
                this.props.history.push('/');
            }else if(!res.data.success){
                this.setState({error: res.data.error});
            }
        }).catch(error=>{
            alert(error.data.error);
        })
    }

    onChangeHandler(event){
        this.setState({error:""});
        this.setState({[event.target.name]:event.target.value});
    }

    render() {
        return (
            <div>
                <NormalTopStatusUser/>
                <div className="container-fluid login-main-container">
                    <div className="login-grid-container border-grey">
                        <div className="login-grid-item " style={{padding:"20px 20px 20px 20px"}}>
                            <p style={{fontSize:"medium",fontWeight:"bold"}}></p>
                            <div className="alert alert-danger notice" role="alert">
                                <RiHeartPulseLine className="alert-icon"/>
                                <div style={{paddingLeft:"50px",backgroundColor:"inherit"}}>
                                    <p style={{fontSize:"xx-large",width:"80%",backgroundColor:"inherit",color:"black"}}>{this.state.deathCases}</p>
                                    <p style={{fontSize:"large",width:"80%",backgroundColor:"inherit",color:"black"}}>Deaths</p>
                                </div>

                            </div>
                            <div className="alert alert-primary notice" role="alert">
                                <GiLoveInjection className="alert-icon border-grey"/>
                                <div style={{paddingLeft:"50px",backgroundColor:"inherit"}}>
                                    <p style={{fontSize:"xx-large",width:"80%",backgroundColor:"inherit",color:"black"}}>{this.state.vaccinatedCount}</p>
                                    <p style={{fontSize:"large",width:"80%",backgroundColor:"inherit",color:"black"}}>Vaccinated today</p>
                                </div>
                            </div>
                        </div>

                        <div className="login-grid-item border-grey" style={{padding:"20px 20px 20px 20px"}}>
                            <div className="form-card">
                                <div className="card-body">
                                    <h2 className="heading-font">Sign-in</h2>
                                    <div className="mb-3">
                                        <label className="form-label" id="input-label">Username</label>
                                        <input type="text" className="form-control" name="userName"
                                               value={this.state.userName} onChange={this.onChangeHandler}/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" id="input-label">Password</label>
                                        <input type="password" className="form-control" name="password"
                                               value={this.state.password} onChange={this.onChangeHandler}/>
                                    </div>
                                    <div style={{height:"40px"}}><p style={{color:"red",fontWeight:"bold"}}>{this.state.error}</p></div>
                                    <div style={{display:"flex",flexDirection: 'column',justifyContent: 'space-around',height:"30px",textAlign:"right"}}>
                                        <a href="/forgot-password">
                                            <p style={{color:"#0D4588",fontWeight:"bold",fontSize:"12px"}}>Forgot your password ?</p>
                                        </a>
                                    </div>
                                    <div className="mb-3">
                                        <button type="button" className="btn-add" onClick={this.loginHandler}>Sign-in</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
