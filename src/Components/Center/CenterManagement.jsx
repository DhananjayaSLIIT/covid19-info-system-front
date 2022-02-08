import React, {Component} from 'react';
import TopStatusUser from "../TopStatusBar/TopStatusUser";
import {BiPlusMedical} from "react-icons/bi";
import {RiRecycleFill} from "react-icons/ri";
import {ImBin} from "react-icons/im";
import {BsBoxArrowInRight} from "react-icons/bs";
import CenterService from "../../Services/CenterService";
import '../../css/center_css/center_management.css';
import AddCenterModal from "./AddCenterModal";
import DeleteCenterModal from "./DeleteCenterModal";
import UpdateCenterModal from "./UpdateCenterModal";

export default  class CenterManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyWord:"",
            showAdd:false,
            showUpdate:false,
            showDelete:false,
            allCenters:[],
            searchCenters:[],
            selectedID:"",
            selectedItem:""
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModalDelete = this.openModalDelete.bind(this);
        this.closeModalDelete = this.closeModalDelete.bind(this);
        this.centerOnClickHandler = this.centerOnClickHandler.bind(this);
        this.openModalUpdate = this.openModalUpdate.bind(this);
        this.closeModalUpdate = this.closeModalUpdate.bind(this);
        this.onSearchHandlerPromise = this.onSearchHandlerPromise.bind(this);
        this.searchAlgorithm = this.searchAlgorithm.bind(this);
        this.onSearchHandler = this.onSearchHandler.bind(this);
    }

    openModal = () =>{
        this.setState({showAdd:true});
    };
    closeModal = () =>{
        this.setState({showAdd:false});
    };

    openModalDelete = () =>{
        this.setState({showDelete:true});
    };
    closeModalDelete = () =>{
        this.setState({showDelete:false});
    };
    openModalUpdate = () =>{
        this.setState({showUpdate:true});
    };
    closeModalUpdate = () =>{

        this.setState({showUpdate:false});
    };

    centerOnClickHandler(event,selectedItem){
        this.setState({isActive:true});
        this.setState({selectedID:selectedItem._id});
        this.setState({selectedItem: selectedItem});
        console.log(this.state.selectedItem);
        console.log(this.state.selectedID);
    }

    componentWillMount() {
        document.addEventListener("dblclick",()=>{
            this.setState({selectedID:""});
            this.setState({selectedItem:""});
        })
    }

    componentDidMount() {
        const config = {
            header:{
                "Content-Type":"application/json"
            }
        }

        CenterService.getAllCenters(config).then(response => {
            this.setState({allCenters:response.data.data});
            this.setState({searchCenters:response.data.data});
        }).catch(error =>{
            alert(`Server error !\n${error.message}`)
        })
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
        this.state.searchCenters.filter(value => {
            if(this.state.keyWord === ""){
                arr = this.state.allCenters;
            }else if(value.centerAddress.toLowerCase().includes(this.state.keyWord.toLowerCase())){
                arr.push(value);
            }
        })
        this.setState({searchCenters:arr});
    }

    onSearchHandler(event){

        this.onSearchHandlerPromise(event).then(()=>{
            this.setState({searchCenters:this.state.allCenters})
        }).then(()=>{
            this.searchAlgorithm();
        })
    }


    render() {
        return (
            <div>
                <TopStatusUser/>
                <div className="container" id="cen-middle-container">
                    <div className="cen-conatent">
                        <div className="cen-top-container">
                            <div style={{backgroundColor:"inherit"}}>
                                <h3 style={{backgroundColor:"inherit",fontSize:"large",width:"300px"}}>Center Management</h3>
                            </div>
                            <div className="cen-add-btn-div">
                                <button  className="cen-btn-add" onClick={this.openModal}><BiPlusMedical className="cen-icons" /> CREATE CENTER</button>
                                <AddCenterModal showAdd={this.state.showAdd} handleClose={this.closeModal}/>
                            </div>
                        </div>
                        <div className="cen-middle-container">
                            <label style={{fontSize:"small",fontWeight:"medium"}}>Search Center by Address </label>
                            <input type="text" className="form-control" id="cen-search" name="keyWord"
                                   onChange={event => this.onSearchHandler(event)}
                                   />
                            <br/>

                            <button className="cen-btn-sep"
                                    style={{marginTop:"-40px",marginRight:"120px"}}
                                    disabled={this.state.selectedID === ""}
                                    onClick={this.openModalUpdate}>
                                <RiRecycleFill style={{backgroundColor:"inherit",color:"green"}}/>
                            </button>
                            <UpdateCenterModal showUpdate={this.state.showUpdate}
                                               handleClose={this.closeModalUpdate}
                                               selectedItem={this.state.selectedItem}
                                               selectedID={this.state.selectedID}
                            />

                            <button className="cen-btn-sep" style={{marginTop:"-40px"}} disabled={this.state.selectedID === ""} onClick={this.openModalDelete}>
                                <ImBin style={{backgroundColor:"inherit",color:"red"}}/>
                            </button>
                            <DeleteCenterModal
                                showDelete={this.state.showDelete}
                                handleClose={this.closeModalDelete}
                                centerID={this.state.selectedID}
                                centerCode={this.state.selectedItem.centerCode}
                            />

                        </div>
                        <div className="cen-bottom-container">
                            <table className="table cen-table">
                                <thead>
                                <tr className="cen-table-head">
                                    <th id="tbl-head-cell" scope="col">CENTER CODE</th>
                                    <th id="tbl-head-cell" scope="col">CENTER ADDRESS</th>
                                    <th id="tbl-head-cell" scope="col">PHONE NUMBER</th>
                                    <th id="tbl-head-cell" scope="col">PERSON IN-CHARGE</th>
                                    <th id="tbl-head-cell" scope="col"></th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.searchCenters.length > 0 && this.state.searchCenters.map((item, index) =>(
                                    <tr className="tbl-body-row" key={index} id={this.state.selectedID === item._id ? "tbl-body-row-focus":""}
                                        onClick={event => this.centerOnClickHandler(event,item)}>
                                        <td style={{paddingTop:"13px"}}>{item.centerCode}</td>
                                        <td style={{paddingTop:"13px"}}>{item.centerAddress}</td>
                                        <td style={{paddingTop:"13px"}}>{item.centerPhone}</td>
                                        <td style={{paddingTop:"13px"}}>{item.centerInCharge}</td>
                                        <td style={{paddingTop:"13px"}}>
                                            <a className="a-content" href={`/program/${item._id}/${item.centerCode}/${item.centerAddress}`}
                                               style={{textDecoration:"none",background:"inherit",fontSize:"large"}}>GET PROGRAMS
                                                <BsBoxArrowInRight style={{backgroundColor:"inherit"}}/>
                                            </a>
                                        </td>
                                    </tr>
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

