import React, {Component} from 'react';
import ProgramService from "../../Services/ProgramService";
import '../../css/program_css/getAllprogram.css';
import TopStatusUser from "../TopStatusBar/TopStatusUser";
import {BiPlusMedical} from "react-icons/bi";
import AddProgram from "./AddProgram";
import UpdateProgram from "./UpdateProgram";
import DeleteProgram from "./DeleteProgram";
import {RiRecycleFill} from "react-icons/ri";
import {ImBin} from "react-icons/im";
import {BsBoxArrowInRight} from "react-icons/bs";

export default class GetAllPrograms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyWord:"",
            allPrograms:'',
            searchPrograms:[],
            selectedID:'',
            selectedItem:'',
            showAdd:false,
            showUpdate:false,
            showDelete:false,
        }
        this.programOnClickHandler = this.programOnClickHandler.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModalDelete = this.openModalDelete.bind(this);
        this.closeModalDelete = this.closeModalDelete.bind(this);
        this.openModalUpdate = this.openModalUpdate.bind(this);
        this.closeModalUpdate = this.closeModalUpdate.bind(this);
        this.onSearchHandler = this.onSearchHandler.bind(this);
        this.onSearchHandlerPromise = this.onSearchHandlerPromise.bind(this);
        this.searchAlgorithm = this.searchAlgorithm.bind(this);
        this.statusChangeOnClick = this.statusChangeOnClick.bind(this);
    }

    componentDidMount() {
        ProgramService.getCenterPrograms(this.props.match.params.id).then(response =>{
            this.setState({allPrograms:response.data.data});
            this.setState({searchPrograms:response.data.data});
        }).catch(error =>{
            alert(`Server error !\n${error.message}`)
        })
    }

    componentWillMount() {
        document.addEventListener("dblclick",()=>{
            this.setState({selectedID:""});
            this.setState({selectedItem:""});
        })
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

    programOnClickHandler(event,selectedItem){
        this.setState({isActive:true});
        this.setState({selectedID:selectedItem._id});
        this.setState({selectedItem: selectedItem});
    }

    statusChangeOnClick(id){
        this.props.history.push(`/vaccination-status/${id}`)
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
        this.state.searchPrograms.filter(value => {
            if(this.state.keyWord === ""){
                arr = this.state.allPrograms;
            }else if(value.programNumber.toLowerCase().includes(this.state.keyWord.toLowerCase())){
                arr.push(value);
            }
        })
        this.setState({searchPrograms:arr});
    }

    onSearchHandler(event){

        this.onSearchHandlerPromise(event).then(()=>{
            this.setState({searchPrograms:this.state.allPrograms})
        }).then(()=>{
            this.searchAlgorithm();
        })
    }

    render() {
        return (
            <div>
                <TopStatusUser/>
                <div className="container" id="pro-middle-container">
                    <div className="pro-conatent">
                        <div className="pro-top-container">
                            <div style={{backgroundColor:"inherit"}}>
                                <h3 style={{backgroundColor:"inherit",fontSize:"large",width:"300px"}}>Program Management</h3>
                                <p style={{backgroundColor:"inherit"}}>{this.props.match.params.code}  {this.props.match.params.name}</p>
                            </div>
                            <div className="pro-add-btn-div">
                                <button  className="pro-btn-add" onClick={this.openModal}><BiPlusMedical className="divi-icons"/> ADD PROGRAM</button>
                                <AddProgram  showAdd={this.state.showAdd} handleClose={this.closeModal} centerID={this.props.match.params.id}/>
                            </div>
                        </div>
                        <div className="pro-middle-container">
                            <label style={{fontSize:"small",fontWeight:"medium"}}>Search Program by Number </label>
                            <input type="text" className="form-control" id="pro-search" name="keyWord"
                                   onChange={event => this.onSearchHandler(event)}/>
                            <br/>
                            <button className="pro-btn-add" style={{width:"100px"}}>SEARCH</button>

                            <button className="pro-btn-sep" style={{marginTop:"-40px",marginRight:"120px"}} disabled={this.state.selectedID === ""} onClick={this.openModalUpdate}>
                                <RiRecycleFill style={{backgroundColor:"inherit",color:"green"}}/>
                            </button>
                            <UpdateProgram showUpdate={this.state.showUpdate} handleClose={this.closeModalUpdate} programItem={this.state.selectedItem}/>

                            <button className="pro-btn-sep" style={{marginTop:"-40px"}} disabled={this.state.selectedID === ""} onClick={this.openModalDelete}>
                                <ImBin style={{backgroundColor:"inherit",color:"red"}}/>
                            </button>
                            <DeleteProgram showDelete={this.state.showDelete} handleClose={this.closeModalDelete} programItem={this.state.selectedItem}/>

                        </div>
                        <div className="pro-bottom-container">
                            <table className="table pro-table">
                                <thead>
                                <tr className="pro-table-head">
                                    <th id="tbl-head-cell" scope="col">PROGRAM NUMBER</th>
                                    <th id="tbl-head-cell" scope="col">VACCINE NAME</th>
                                    <th id="tbl-head-cell" scope="col">DOSE NUMBER</th>
                                    <th id="tbl-head-cell" scope="col">AGE GROUP</th>
                                    <th id="tbl-head-cell" scope="col">DATE</th>
                                    <th id="tbl-head-cell" scope="col">MAX COUNT</th>
                                    <th id="tbl-head-cell" scope="col-1"></th>
                                    <th id="tbl-head-cell" scope="col-1"></th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.searchPrograms.length > 0 && this.state.searchPrograms.map((item, index) =>(
                                    <tr className="tbl-body-row" key={index} id={this.state.selectedID === item._id ? "tbl-body-row-focus":""} onClick={event =>{this.programOnClickHandler(event,item)}}>
                                        <td style={{paddingTop:"13px"}}>{item.programNumber}</td>
                                        <td style={{paddingTop:"13px"}}>{item.vaccineName}</td>
                                        <td style={{paddingTop:"13px"}}>{item.doseNumber}</td>
                                        <td style={{paddingTop:"13px"}}>{item.ageGroup}</td>
                                        <td style={{paddingTop:"13px"}}>{item.date.toLocaleString().slice(0, 10)}</td>
                                        <td style={{paddingTop:"13px"}}>{item.maximumCount}</td>
                                        <td style={{paddingTop:"13px"}}>
                                            <button className="btn btn-success" onClick={event => this.statusChangeOnClick(item._id)}>
                                            Change Status</button>
                                        </td>
                                        <td style={{paddingTop:"13px"}}>
                                            <a className="a-content" href={`/application/${item.center}/${item.maximumCount}/${item._id}`}
                                               style={{textDecoration:"none",background:"inherit",fontSize:"large"}}>Assign Applications
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

