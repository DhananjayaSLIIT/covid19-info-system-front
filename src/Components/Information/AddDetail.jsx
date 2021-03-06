import React, {Component} from 'react';
import {RiHeartPulseLine} from 'react-icons/ri';
import {GiSyringe} from 'react-icons/gi';
import Service from "../../Services/Service";
import MessageModal from "../Message/MessageModal";

export default class AddDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show:false,
            message:'',
            statusCode:'',
            lastUpdate: "",
            infoDate: ``,
            deathCases: "",
            vaccinatedCount: "",
            division:this.props.divtionID,
            fieldError: ""
        }
        this.conChangeHandler = this.conChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.setTime = this.setTime.bind(this);
        this.getDetails = this.getDetails.bind(this);

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
        this.setState({deathCases:""});
        this.setState({vaccinatedCount:""});
        this.getDetails();
        window.location.reload(false);
    }
    /**Reset message */
    resetMessage(){
        this.setState({message:''});
        this.setState({statusCode:''});
    }
    /**-------------*/

    componentDidMount() {
        this.getDetails();
    }

    setTime(){
        let date = new Date();
        return date.toLocaleString(`en-US`,{timeZone:`Asia/Colombo`});
    }

    getDetails(){
        Service.getLastUpdate(this.props.divtionID).then(response => {
            if(response.data.data != null){
                this.setState({lastUpdate:response.data.data.infoDate});
            }
        }).catch(error=>{
            alert(`Server error\n${error.message}`)
        })
    }

    conChangeHandler(event){
        this.setState({[event.target.name]:event.target.value});
        this.setState({infoDate:this.setTime()});
        this.setState({fieldError:""});
    }

    onSubmitHandler(){
        let newInfo = {
            infoDate:this.state.infoDate,
            deathCases:this.state.deathCases,
            vaccinatedCount:this.state.vaccinatedCount,
            division:this.state.division
        }

        const config = {
            header: {
                "Content-Type": "application/json"
            }
        }

        if(!this.state.deathCases || !this.state.vaccinatedCount){
            return this.setState({fieldError:"Empty fields !"})
        }else{
            Service.addInfo(newInfo,config).then(result => {
                if(result.data.success){
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
                    alert(result.data.error.message);
                }

                // this.props.isRefreshed(true);
                // window.location.reload(false);
            }).catch(error => {
                this.setStatePromise(error.message).then(()=>{
                    if(!error.response){
                        this.setState({statusCode:500})
                    }else{
                        this.setState({statusCode:error.response.status})
                    }
                }).then(()=>{
                    this.openMessageModal();
                })
            })
        }
    }

    render() {
        return (
            <div className="info-form-container">
                <div className="info-top-container">
                    <h3 style={{backgroundColor:"inherit",fontSize:"large"}}>Update Division Information</h3>
                    <p style={{background:"inherit",fontWeight:"bold",color:"navy"}}>{this.props.divisionCode} : {this.props.divisionName}</p>
                    <p style={{background:"inherit"}}>Last update : {this.state.lastUpdate.toLocaleString().slice(0, 10)}</p>
                </div>
                <div className="info-bottom-container">
                    <div className="alert alert-danger info-alert" role="alert" style={{height:"100px",display:"flex"}}>
                        <RiHeartPulseLine className="info-form-icons"/>
                        <div className="form-group" style={{width:"100%",background:"inherit",margin:"auto"}}>
                            <input type="number" className="form-control" id="exampleInputPassword1"
                                   placeholder="Daily Death Cases" name="deathCases" value={this.state.deathCases}
                                   onChange={this.conChangeHandler}/>
                        </div>
                    </div>
                    <div className="alert alert-primary info-alert" role="alert" style={{height:"100px",display:"flex"}}>
                        <GiSyringe className="info-form-icons"/>
                        <div className="form-group" style={{width:"100%",background:"inherit",margin:"auto"}}>
                            <input type="number" className="form-control" id="exampleInputPassword1"
                                   placeholder="Daily Vaccinated Count" name="vaccinatedCount" value={this.state.vaccinatedCount}
                                   onChange={this.conChangeHandler}
                            />
                        </div>
                    </div>
                    <p style={{height:"20px",fontWeight:"bold",color:"red"}}>{this.state.fieldError}</p>
                    <button className="info-btn-add" onClick={this.onSubmitHandler}>Update Daily Details</button>
                    <MessageModal
                        show={this.state.show}
                        message={this.state.message}
                        closeHandler={this.closeMessageModal}
                        messageReset={this.resetMessage}
                        responseCode={this.state.statusCode}
                    />
                </div>
            </div>
        );
    }
}

