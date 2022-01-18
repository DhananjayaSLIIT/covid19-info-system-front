import React, {Component} from 'react';
import '../../css/application_css/application_details.css';
import ApplicationService from "../../Services/ApplicationService";


export default class ConfirmAssign extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hour:"",
            minute:"",
            time:"AM",
            giveTime:"",
            checkedItems:[],
            errorField:"",
            assignedItems:[]
        }
        this.text1 = React.createRef();
        this.text2 = React.createRef();
        this.text3 = React.createRef();
        this.onTextFiledType = this.onTextFiledType.bind(this);
        this.assignOnClick = this.assignOnClick.bind(this);
        this.closeHandler = this.closeHandler.bind(this);
        this.addCheckedItems = this.addCheckedItems.bind(this);
        this.timeOnChangePromise = this.timeOnChangePromise.bind(this);
        this.onTextFiledTypePromise = this.onTextFiledTypePromise.bind(this);
        this.inputFiledSkip = this.inputFiledSkip.bind(this);
    }


    /** Time on change Promise */
    timeOnChangePromise(event){
        return new Promise(resolve =>
            resolve(
                this.setState({time:event.target.value})
            )
        )
    }

    /** Drop down on type method */
    timeOnchange(event){
        this.timeOnChangePromise(event).then(()=>{
            console.log(this.state.time);
        })
    }


    /** Time fields onType method Promise*/
    onTextFiledTypePromise(event,to){
        return new Promise(resolve =>
            resolve(
                this.inputFiledSkip(event,to)
            ),
        )
    }

    inputFiledSkip(event,to){
        this.setState({errorField:""});
        let length = event.target.value.length;
        let max = event.target.maxLength;
        if(!isNaN(event.target.value)){
            if(event.target.name === "hour"){
                if(parseInt(event.target.value) > 12){
                    this.setState({[event.target.name]:""});
                }else{
                    if(length === max){
                        this.setState({[event.target.name]:event.target.value});
                        to.current.focus();
                    }else{
                        this.setState({[event.target.name]:event.target.value});
                    }
                }
            }else if(event.target.name === "minute"){
                if(parseInt(event.target.value) > 59){
                    this.setState({[event.target.name]:""});
                }else{
                    if(length === max){
                        this.setState({[event.target.name]:event.target.value});
                        to.current.focus();
                    }else{
                        this.setState({[event.target.name]:event.target.value});
                    }
                }
            }
        }else{
            this.setState({[event.target.name]:""});
        }
    }

    /** Time fields onType method */
    onTextFiledType(event,to){
        this.setState({errorField:""});
        this.onTextFiledTypePromise(event,to).then(()=>{
        })
    }

    /** CheckedItems Promise */
    addCheckedItems(){
        return new Promise(((resolve, reject) => {
            setTimeout(()=>{
                resolve(
                    this.state.checkedItems.map(item =>{
                        let appointTime = this.state.hour+"."+this.state.minute+" "+this.state.time;
                        let temp = {
                            applicationID:item._id,
                            programID:this.props.programID,
                            centerID:item.center,
                            scheduledDate:new Date(),
                            appointmentTime:appointTime,
                            isVaccinated:"Pending",
                        }
                        this.state.assignedItems.push(temp);
                    })
                )
            })
        }));
    }

    /** ASSIGN button on click method */
    assignOnClick(){
        console.log(this.props.checkedItems);
        this.setState({checkedItems:this.props.checkedItems});
        if(this.props.checkedItems.length > 0){
            if(this.state.hour === "" || this.state.minute === "" || this.state.time === ""){
                this.setState({errorField:"Please enter appointed time !"})
            }else if(this.props.applicationCount > this.props.maxCount){
                this.setState({errorField:"Maximum mount  !"})
            } else{
                this.addCheckedItems().then(()=>{
                    let data = {
                        data:this.state.assignedItems
                    }
                    ApplicationService.scheduleVaccination(data).then(response =>{
                        /** Service response handle */
                        alert(response.data.message);
                        this.closeHandler();
                    }).catch(error =>{
                        alert(error.response.data.data);
                    })
                    window.location.reload(false);
                })
            }
        }else{
            this.setState({errorField:"Please check the applications to proceed !"})
        }
    }

    /** ASSIGN modal close handler */
    closeHandler(){
        this.setState({errorField:""});
        this.setState({hour: ""});
        this.setState({minute: ""});
        this.setState({time: "AM"});
        this.props.handleClose();
    }

    render() {
        const Classname = this.props.showConfirm ? "app-modal app-display-block":"app-modal app-display-none";
        return (
            <div className={Classname}>
                <section className="app-modal-main">
                    <div className="app-inner-content">
                        <div className="app-details">
                            <div className="container" id="xxx">
                                <div className="row" id="app-details-container">
                                    <form>
                                        <div>
                                            <p style={{fontSize:"large",fontWeight:"bold"}}>Scheduled count : {this.props.checkedItems.length}</p>
                                        </div>
                                        <div className="col-3" style={{height:"30px",width:"auto"}}>
                                            <p className="form-check-label" htmlFor="exampleCheck1" style={{fontSize:"large",fontWeight:"bold"}}>Appointment Time :</p>
                                        </div>
                                        <div className="col-9" id="app-add-time-filed-container" style={{height:"100px"}}>
                                            <select className="form-control" ref={this.text3} style={{height:"40px", textAlign: "center"}} name="time"
                                                onChange={event =>this.timeOnchange(event)}
                                            >
                                                <option value="AM">AM</option>
                                                <option value="PM">PM</option>
                                            </select>

                                            <input type="text" className="form-control" id="field2" name="minute" style={{height:"40px", textAlign: "center"}}
                                                   placeholder="Min" maxLength={2}
                                                   value={this.state.minute}  ref={this.text2}
                                                   onChange={event => this.onTextFiledType(event,this.text3)}
                                            />

                                            <input type="text" className="form-control" id="field3" name="hour" style={{height:"40px",textAlign: "center"}}
                                                   placeholder="Hr" maxLength={2}
                                                   value={this.state.hour}  ref={this.text1}
                                                   onChange={event => this.onTextFiledType(event,this.text2)}
                                            />
                                        </div>
                                        <div style={{height:"30px"}}>
                                            <p style={{color:"red", fontWeight:"bold"}}>{this.state.errorField}</p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="cen-button-container">
                            <button type="button" className="cen-btn-close" onClick={this.closeHandler}>
                                Close
                            </button>
                            <button type="button" className="btn-add btn-Style" onClick={this.assignOnClick}>
                                ASSIGN
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
