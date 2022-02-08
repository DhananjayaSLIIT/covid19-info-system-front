import React, {Component} from 'react';
import '../../css/district_management.css';
import TopStatusUser from "../TopStatusBar/TopStatusUser";
import Service from "../../Services/Service";
import AddDistrictModal from "./AddDistrictModal";

export default class DistrictManagement extends Component {
    constructor(props) {
        super(props);
        this.state ={
            show: false,
            districts:[],
            selectedID:""
        }
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.onClickDistrict = this.onClickDistrict.bind(this);
    }

    componentDidMount() {
        Service.getAllDistricts().then(response => {
            this.setState({districts:response.data.data});
        }).catch(error => {
            console.log(error);
        })
    }

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    onClickDistrict(event,item){
        window.location = `/division/${item._id}/${item.districtCode}/${item.districtName}`;
    }

    render() {
        return (
            <div>
                <TopStatusUser/>
                <div className="container-fluid dis-border-grey">
                    <h2 id="main-header">Manage Districts</h2>
                    <div className="dis-grid-container dis-border-grey" >
                        <div className="dis-grid-item _map_fadeIn_animation" id="map-id">
                            <img className="img-map" src="images/map-srilanka.jpg" useMap="#myMap"/>
                            <map name="myMap">
                                <area shape="circle" coords="80,0,50,7" alt="Computer" href="http://google.com"/>
                                <area shape="circle" coords="120,300,40,50" alt="Computer" href="http://google.com"/>
                            </map>
                        </div>
                        <div className="dis-grid-item dis-border-grey">
                            <div className="dis-card">
                                <ul className="list-border">
                                    <h3 className="header-3">Select district</h3>
                                    {this.state.districts.length > 0 &&
                                    this.state.districts.map((item, index) => (
                                        <li key={index} className="list-group-item" id="list-item"
                                            onClick={event => (this.onClickDistrict(event,item))}>
                                            {item.districtCode} | {item.districtName}
                                        </li>
                                    ))}
                                </ul>
                                <div className="new-App">
                                    <button className="btn-add" onClick={this.showModal}>Add District</button>
                                    <AddDistrictModal  showAdd={this.state.show} handleClose={this.hideModal}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

