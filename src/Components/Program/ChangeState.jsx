import React, {Component} from 'react';
import '../../css/program_css/getAllprogram.css';
import TopStatusUser from "../TopStatusBar/TopStatusUser";
import { FaUserCircle } from 'react-icons/fa';
import ProgramService from "../../Services/ProgramService";
import Select from 'react-select';
import update from 'react-addons-update';
import MessageModal from "../Message/MessageModal";

function getIdName(state){
    if(state === "Pending"){
        return '_pending_state';
    }else if(state === "Reject"){
        return '_reject_state';
    }else if(state === "Absent"){
        return '_absent_state';
    }else if(state === "Vaccinated"){
        return '_vaccinated_state';
    }
}

export default class ChangeState extends Component {
    constructor(props) {
        super(props);
        this.state={
            show:false,
            message:'',
            statusCode:'',
            keyWord:"",
            options:[
                {
                    value:"1",
                    label:"Pending"
                },
                {
                    value:"2",
                    label:"Reject"
                },
                {
                    value:"3",
                    label:"Absent"
                },
                {
                    value:"4",
                    label:"Vaccinated"
                },
            ],
            applications:"",
            searchApplications:[],
            stateChanged:[],
            colorState:[],
            myText:'',
            id:'',
            viewTable:'table pro-table'
        }

        this.setStateHandler = this.setStateHandler.bind(this);
        this.setStateHandlerPromise = this.setStateHandlerPromise.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.onSearchHandlerPromise = this.onSearchHandlerPromise.bind(this);
        this.searchAlgorithm = this.searchAlgorithm.bind(this);
        this.onSearchHandler = this.onSearchHandler.bind(this);
        this.displayTable = this.displayTable.bind(this);

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

    displayTable(){
        this.setState({viewTable:'_table_display_none'});
    }

    /**Message modal popup*/
    openMessageModal(){
        this.displayTable();
        this.setState({show:true});
    }
    /**Message modal close*/
    closeMessageModal(){
        this.setState({show:false});
        this.resetMessage();
        window.location.reload(false);
    }
    /**Reset message */
    resetMessage(){
        this.setState({message:''});
        this.setState({statusCode:''});
    }
    /**-------------*/

    componentDidMount() {
        try {
            //TODO:Remove primary key
            ProgramService.getAllScheduledApplications(this.props.match.params.id).then(response =>{
                if(response.data.data.length > 0){
                    response.data.data.map(element =>{
                        let idName = getIdName(element.isVaccinated);

                        let data = {
                            _id:element._id,
                            applicationID:element.applicationID,
                            programID:element.programID,
                            centerID:element.centerID,
                            appointmentTime:element.appointmentTime,
                            scheduledDate:element.scheduledDate.toLocaleString().slice(0,10),
                            isVaccinated:element.isVaccinated,
                            idName:idName
                        }
                        this.state.colorState.push(data)
                    })
                }

            }).then(()=>{
                this.setState({applications:this.state.colorState});
                this.setState({searchApplications:this.state.colorState});
            })
        }catch (error){
            alert(error.error.message)
        }
    }

    /** Save changes */
    saveChanges(){
        let list = this.state.stateChanged;
        if(this.state.stateChanged.length > 0){
            try {
                console.log(list);
                ProgramService.saveStatus(list).then(result =>{
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
                        //alert(result.data.error.message);
                    }
                })
            }catch (error){
                this.setStatePromise(error.message).then(()=>{
                    if(!error.response){
                        this.setState({statusCode:500})
                    }else{
                        this.setState({statusCode:error.response.status})
                    }
                }).then(()=>{
                    this.openMessageModal();
                })
            }
        }else{
            this.setStatePromise("Status not changed !").then(()=>{
                this.setState({statusCode:400})
            }).then(()=>{
                this.openMessageModal();
            })
        }
    }


    stateChangeHandler(event,object){
        this.setStateHandlerPromise(event,object).then(()=>{
            console.log("Done");
        })
    }

    setStateHandlerPromise(event,item){
        return new Promise(resolve => {
            resolve(
                this.setStateHandler(event,item)
            )
        })
    }

    /**Handling all state changes*/
    setStateHandler(event,object){
        let tempSearchApplications = [...this.state.searchApplications];
        let data = {
            _id: object._id,
            state:event.label
        }
        let found = false;
        if(this.state.stateChanged.length === 0){
            for(let i = 0; i < this.state.searchApplications.length ; i++ ){
                if(this.state.searchApplications[i]._id === object._id){
                    if(event.label === this.state.searchApplications[i].isVaccinated){
                        break;
                    }else{
                        this.state.stateChanged.push(data);
                        let singleItem = {...tempSearchApplications[i]};
                        singleItem.idName = getIdName(event.label);
                        singleItem.isVaccinated = event.label;
                        tempSearchApplications[i] = singleItem;
                        this.setState({searchApplications:tempSearchApplications});
                        break;
                    }
                }
            }
            console.log(this.state.stateChanged);
        }else{
            for(let i = 0;i < this.state.stateChanged.length;i++){
                if(object._id === this.state.stateChanged[i]._id){ // search for _id
                    found = true;
                    for(let j = 0;j < this.state.applications.length;j++){
                        if(object._id === this.state.applications[j]._id){   // check for same state
                            if(event.label === this.state.applications[j].isVaccinated){
                                //Remove Item from stateChange
                                let singleItem = {...tempSearchApplications[i]};
                                singleItem.idName = getIdName(event.label);
                                singleItem.isVaccinated = event.label;
                                tempSearchApplications[i] = singleItem;
                                this.setState({searchApplications:tempSearchApplications});
                                this.state.stateChanged.splice(i,1);
                            }else{
                                if(event.label === this.state.searchApplications[j].isVaccinated){
                                    //Do nothing
                                    let singleItem = {...tempSearchApplications[i]};
                                    singleItem.idName = getIdName(event.label);
                                    singleItem.isVaccinated = event.label;
                                    tempSearchApplications[i] = singleItem;
                                    this.setState({searchApplications:tempSearchApplications});
                                    break;
                                }else{
                                    let singleItem = {...tempSearchApplications[i]};
                                    singleItem.idName = getIdName(event.label);
                                    singleItem.isVaccinated = event.label;
                                    tempSearchApplications[i] = singleItem;
                                    this.setState({searchApplications:tempSearchApplications});
                                    this.state.stateChanged[i].state = event.label
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            if(found !== true){
                for(let i = 0; i < this.state.searchApplications.length ; i++ ){
                    if(this.state.searchApplications[i]._id === object._id){
                        if(event.label === this.state.searchApplications[i].isVaccinated){
                            break;
                        }else{
                            this.state.stateChanged.push(data);
                            let singleItem = {...tempSearchApplications[i]};
                            singleItem.idName = getIdName(event.label);
                            singleItem.isVaccinated = event.label;
                            tempSearchApplications[i] = singleItem;
                            this.setState({searchApplications:tempSearchApplications});
                            break;
                        }
                    }
                }
            }
            found = false;
            console.log(this.state.stateChanged);
        }
    }


    /** Search */
    onSearchHandlerPromise(event){
        return new Promise(resolve => {
            resolve(
                this.setState({keyWord:event.target.value})
            )
        })
    }

    searchAlgorithm(){
        let arr = [];
        this.state.searchApplications.filter(value => {
            if(this.state.keyWord === ""){
                arr = this.state.applications;
            }else if(value.applicationID.NIC.toLowerCase().includes(this.state.keyWord.toLowerCase())){
                arr.push(value);
            }
        })
        this.setState({searchApplications:arr});
    }

    onSearchHandler(event){

        this.onSearchHandlerPromise(event).then(()=>{
            this.setState({searchApplications:this.state.applications})
        }).then(()=>{
            this.searchAlgorithm();
        })
    }

    render() {
        return (
            <div id="page">
                <TopStatusUser/>
                <div className="container" id="pro-middle-container">
                    <div className="pro-conatent">
                        <div className="pro-top-container">
                            <div style={{backgroundColor:"inherit"}}>
                                <h3 style={{backgroundColor:"inherit",fontSize:"large",width:"300px"}}>Change Vaccination Status</h3>
                                <h3 id={this.state.id}>{this.state.myText}</h3>
                                {/*<p style={{backgroundColor:"inherit"}}>{this.props.match.params.code}  {this.props.match.params.name}</p>*/}
                            </div>
                            <div className="pro-add-btn-div">
                                <button  className="pro-btn-add" onClick={this.saveChanges}> SAVE CHANGES</button>
                                <MessageModal
                                    show={this.state.show}
                                    message={this.state.message}
                                    closeHandler={this.closeMessageModal}
                                    messageReset={this.resetMessage}
                                    responseCode={this.state.statusCode}
                                />
                            </div>
                        </div>
                        <div className="pro-middle-container" id="bottom-con">
                            <label style={{fontSize:"small",fontWeight:"medium"}}>Search Application by NIC </label>
                            <input type="text" className="form-control" id="pro-search" name="keyWord"
                                   onChange={event => this.onSearchHandler(event)}/>
                            <br/>
                        </div>
                        <div className="pro-bottom-container">
                            <table className={this.state.viewTable}>
                                <tbody>
                                    {this.state.searchApplications.length > 0 && this.state.searchApplications.map((item, index) =>(
                                        <div key={index} style={{paddingBottom:"20px"}}>
                                            <div className="card" style={{minWidth:"600px",height:"100vh-300px"}} id={this.state.searchApplications[index].idName}>
                                                <div className="avatar-container">
                                                    <FaUserCircle className="avatar-icon"/>
                                                    <h6 className="pro-nic-number">NIC  : {item.applicationID.NIC}</h6>
                                                </div>
                                                <hr className="_horizontal_line"/>
                                                <div className="_row_flex_direction" >
                                                    <div className="_column_flex_direction"  style={{width:"80%"}}>
                                                        <small className="_para_user_details"> <strong>Name : </strong> {item.applicationID.firstName} {item.applicationID.lastName}</small>
                                                        <small className="_para_user_details"> <strong>Application Date : </strong> {item.applicationID.applicationDate}</small>
                                                        <small className="_para_user_details"> <strong>Appointment  Date : </strong> {item.scheduledDate}</small>
                                                    </div>
                                                    <div className="_column_flex_direction _state_change_container" >
                                                        <div className="_row_flex_direction " >
                                                            <p style={{padding:"7px"}}>State</p>
                                                            <Select className="_state_drop_down" style={{height:"40px"}}
                                                                    options={this.state.options}
                                                                    onChange={event => this.stateChangeHandler(event,item)}
                                                                    value={this.state.options.find(
                                                                        (x) => x.label === this.state.searchApplications[index].isVaccinated
                                                                    )}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
