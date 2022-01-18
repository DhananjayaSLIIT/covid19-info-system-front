import React, {Component} from 'react';
import TopStatusUser from "../TopStatusBar/TopStatusUser";
import '../../css/division-manage.css';
import {BiPlusMedical} from 'react-icons/bi';
import {BsBoxArrowInRight} from 'react-icons/bs';
import {RiRecycleFill} from 'react-icons/ri';
import {ImBin} from 'react-icons/im';
import Service from "../../Services/Service";
import AddDivision from "./AddDivision";
import UpdateDivision from "./UpdateDivision";
import DeleteDivision from "./DeleteDivision";


export default class DivisionByDistrictID extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keyWord:"",
            showAdd: false,
            showUpdate:false,
            showDelete:false,
            divisions:[],
            selectedID:"",
            selectedItem:"",
            searchDivisions:[]
        }
        this.showModalAdd = this.showModalAdd.bind(this);
        this.hideModalAdd = this.hideModalAdd.bind(this);
        this.showModalUpdate = this.showModalUpdate.bind(this);
        this.hideModalUpdate = this.hideModalUpdate.bind(this);
        this.showModalDelete = this.showModalDelete.bind(this);
        this.hideModalDelete = this.hideModalDelete.bind(this);
        this.divisionOnClickHandler = this.divisionOnClickHandler.bind(this);
        this.onSearchHandler = this.onSearchHandler.bind(this);
    }

    componentWillMount() {
        document.addEventListener("dblclick",()=>{
            this.setState({selectedID:""});
        })
    }

    componentDidMount() {
        const config = {
            header:{
                "Content-Type":"application/json"
            }
        }
        Service.getDivisionsByDiscID(this.props.match.params.id,config).then(response => {
            this.setState({divisions:response.data.data});
            this.setState({searchDivisions:response.data.data});
        })
    }

    divisionOnClickHandler(event,selectedItem){
        this.setState({isActive:true});
        this.setState({selectedID:selectedItem._id});
        this.setState({selectedItem: selectedItem});
    }

    showModalAdd() {
        this.setState({ showAdd: true });
    };
    hideModalAdd = () => {
        this.setState({ showAdd: false });
    };
    showModalUpdate = () =>{
        this.setState({ showUpdate: true });
    };
    hideModalUpdate = () => {
        this.setState({ showUpdate: false });
    };
    showModalDelete() {
        this.setState({ showDelete: true });
    };

    hideModalDelete = () => {
        this.setState({ showDelete: false });
        window.location.reload(false);
    };

    onSearchHandlerPromise(event){
        return new Promise(resolve => {
            resolve(
                this.setState({keyWord:event.target.value})
            )
        })
    }

    searchAlgorithm(){
        let arr = [];
        this.state.searchDivisions.filter(value => {
            if(this.state.keyWord === ""){
                arr = this.state.divisions;
            }else if(value.divisionName.toLowerCase().includes(this.state.keyWord.toLowerCase())){
                arr.push(value);
            }
        })
        this.setState({searchDivisions:arr});
    }

    onSearchHandler(event){

        this.onSearchHandlerPromise(event).then(()=>{
            this.setState({searchDivisions:this.state.divisions})
        }).then(()=>{
            this.searchAlgorithm();
        })
    }

    render() {
        return (
            <div>
                <TopStatusUser/>
                <div className="container" id="divi-middle-container">
                    <div className="divi-conatent">
                        <div className="divi-top-container">
                            <div style={{backgroundColor:"inherit"}}>
                                <h3 style={{backgroundColor:"inherit",fontSize:"large",width:"300px"}}>Division Management</h3>
                                <p style={{backgroundColor:"inherit"}}>{this.props.match.params.code}  {this.props.match.params.name}</p>
                            </div>
                            <div className="divi-add-btn-div">
                                <button  className="divi-btn-add" onClick={this.showModalAdd}><BiPlusMedical className="divi-icons"/> ADD DIVISION</button>
                                <AddDivision  showAdd={this.state.showAdd} handleClose={this.hideModalAdd}/>
                            </div>
                        </div>
                        <div className="divi-middle-container">
                            <label style={{fontSize:"small",fontWeight:"medium"}}>Search Division Name </label>
                            <input type="text" className="form-control" id="divi-search" name="keyWord"
                                   onChange={this.onSearchHandler}/>
                            <br/>

                            <button className="divi-btn-sep" style={{marginTop:"-40px",marginRight:"120px"}} disabled={this.state.selectedID === ""} onClick={this.showModalUpdate}>
                                <RiRecycleFill style={{backgroundColor:"inherit",color:"green"}}/>
                            </button>
                            <UpdateDivision divisionID={this.state.selectedItem}  showUpdate={this.state.showUpdate} handleClose={this.hideModalUpdate}/>

                            <button className="divi-btn-sep" style={{marginTop:"-40px"}} disabled={this.state.selectedID === ""} onClick={this.showModalDelete}>
                                <ImBin style={{backgroundColor:"inherit",color:"red"}}/>
                            </button>
                            <DeleteDivision divisionID={this.state.selectedItem}  showDelete={this.state.showDelete} handleClose={this.hideModalDelete}/>

                        </div>
                        <div className="divi-bottom-container">
                            <table className="table divi-table">
                                <thead>
                                <tr className="divi-table-head">
                                    <th id="tbl-head-cell" scope="col">DIVISION CODE</th>
                                    <th id="tbl-head-cell" scope="col">DIVISION NAME</th>
                                    <th id="tbl-head-cell" scope="col">ADDRESS</th>
                                    <th id="tbl-head-cell" scope="col">PHONE NUMBER</th>
                                    <th id="tbl-head-cell" scope="col-1"></th>
                                    <th id="tbl-head-cell" scope="col-1"></th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.searchDivisions.length > 0 && this.state.searchDivisions.map((item, index) =>(
                                    <tr className="tbl-body-row" key={index} id={this.state.selectedID === item._id ? "tbl-body-row-focus":""} onClick={event =>{this.divisionOnClickHandler(event,item)}}>
                                        <td style={{paddingTop:"13px"}}>{item.divisionNumber}</td>
                                        <td style={{paddingTop:"13px"}}>{item.divisionName}</td>
                                        <td style={{paddingTop:"13px"}}>{item.officeAddress}</td>
                                        <td style={{paddingTop:"13px"}}>{item.officePhone}</td>
                                        <td style={{paddingTop:"13px"}}>
                                            <a className="a-content" href={`/center/${item._id}/${item.divisionNumber}/${item.divisionName}`}
                                               style={{textDecoration:"none",background:"inherit",fontSize:"large"}}>CENTERS
                                                <BsBoxArrowInRight style={{backgroundColor:"inherit"}}/>
                                            </a>
                                        </td>
                                        <td style={{paddingTop:"13px"}}>
                                            <a className="a-content" href={`/info/${item._id}/${item.divisionNumber}/${item.divisionName}`} style={{textDecoration:"none",background:"inherit",fontSize:"large"}}>INFO
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

