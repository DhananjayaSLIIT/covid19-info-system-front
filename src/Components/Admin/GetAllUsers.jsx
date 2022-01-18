import React, {Component} from 'react';
import TopStatusUser from "../TopStatusBar/TopStatusUser";
import {BiPlusMedical} from "react-icons/bi";
import {RiRecycleFill} from "react-icons/ri";
import AdminDeleteUserModal from "./AdminDeleteUserModal";
import {ImBin} from "react-icons/im";
import Service from "../../Services/Service";
import AdminResetPasswordModal from "./AdminResetPasswordModal";
import '../../css/admin_get_all_users.css';

export default class GetAllUsers extends Component {
    constructor(props) {
        super(props);
        this.state={
            users:[],
            singleUser:"",
            showDelete:false,
            selectedID:"",
            selectedItem:""
        }
        this.itemOnclick = this.itemOnclick.bind(this);
        this.onClickUpdateDetails = this.onClickUpdateDetails.bind(this);
        this.onClickResetPassword = this.onClickResetPassword.bind(this);
        this.addUserOnClick = this.addUserOnClick.bind(this);
        this.userOnClickHandler = this.userOnClickHandler.bind(this);
        this.showModalDelete = this.showModalDelete.bind(this);
        this.hideModalDelete = this.hideModalDelete.bind(this);
        this.onSearchHandler = this.onSearchHandler.bind(this);
    }

    componentWillMount() {
        document.addEventListener("dblclick",()=>{
            this.setState({selectedID:""});
        })
    }

    componentDidMount() {
        Service.getAllUsers().then(res => {
            this.setState({users:res.data.data});
        }).catch(error => {
            console.log(error.error);
        })
    }

    userOnClickHandler(event,selectedItem){
        this.setState({isActive:true});
        this.setState({selectedID:selectedItem._id});
        this.setState({selectedItem: selectedItem});
        console.log(this.state.selectedID);
        console.log(this.state.selectedItem);
    }

    itemOnclick(event, thisItem){
        this.setState({singleUser:thisItem});
    }

    onClickUpdateDetails(){
        window.location = `/update-user/${this.state.selectedID}`
    }

    onClickResetPassword(){
        return <AdminResetPasswordModal/>
    }

    addUserOnClick(){
        this.props.history.push(`/add-user`);
    }

    showModalDelete() {
        this.setState({ showDelete: true });
    };

    hideModalDelete = () => {
        this.setState({ showDelete: false });
        window.location.reload(false);
    };

    onSearchHandler(event){

    }

    render() {
        return (
            <div>
                <TopStatusUser/>
                <div className="container" id="user-middle-container">
                    <div className="user-conatent">
                        <div className="user-top-container">
                            <div style={{backgroundColor:"inherit"}}>
                                <h3 style={{backgroundColor:"inherit",fontSize:"large",width:"300px"}}>User Management</h3>
                            </div>
                            <div className="user-add-btn-div">
                                <button  className="user-btn-add" onClick={this.addUserOnClick}><BiPlusMedical className="user-icons"/> ADD USER</button>
                            </div>
                        </div>
                        <div className="user-middle-container">
                            <label style={{fontSize:"small",fontWeight:"medium"}}>Search Users By NIC </label>
                            <input type="text" className="form-control" id="user-search" name="keyWord"
                                   onChange={this.onSearchHandler}/>
                            <br/>

                            <button className="user-btn-sep" style={{marginTop:"-40px",marginRight:"120px"}} disabled={this.state.selectedID === ""} onClick={this.onClickUpdateDetails}>
                                <RiRecycleFill style={{backgroundColor:"inherit",color:"green"}}/>
                            </button>

                            <button className="user-btn-sep" style={{marginTop:"-40px"}} disabled={this.state.selectedID === ""} onClick={this.showModalDelete}>
                                <ImBin style={{backgroundColor:"inherit",color:"red"}}/>
                            </button>
                            <AdminDeleteUserModal userID={this.state.selectedID} userName={this.state.selectedItem.userName}  showDelete={this.state.showDelete} handleClose={this.hideModalDelete}/>

                        </div>
                        <div className="user-bottom-container">
                            <table className="table user-table">
                                <thead>
                                <tr className="user-table-head">
                                    <th id="tbl-head-cell" scope="col">User name</th>
                                    <th id="tbl-head-cell" scope="col">NIC</th>
                                    <th id="tbl-head-cell" scope="col">Occupation</th>
                                    <th id="tbl-head-cell" scope="col">Email</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.users.length > 0 && this.state.users.map((item, index) =>(
                                    <tr className="tbl-body-row" key={index} id={this.state.selectedID === item._id ? "tbl-body-row-focus":""} onClick={event =>{this.userOnClickHandler(event,item)}}>
                                        <td style={{paddingTop:"13px"}}>{item.userName}</td>
                                        <td style={{paddingTop:"13px"}}>{item.NIC}</td>
                                        <td style={{paddingTop:"13px"}}>{item.occupation}</td>
                                        <td style={{paddingTop:"13px"}}>{item.email}</td>
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

