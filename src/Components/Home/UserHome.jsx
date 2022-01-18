import React, {Component, lazy, Suspense} from 'react';
import '../../css/user_home.css';
import TopStatusUser from "../TopStatusBar/TopStatusUser";
import HomeServices from "../../Services/HomeServices";
import { VscLoading } from 'react-icons/vsc';
import SlideShow from "./SlideShow";
const DeathCases = lazy(()=> import('./DeathCases'));
const Vaccination = lazy(()=> import('./Vaccination'));
const VaccinationCount = lazy(()=> import ('./VaccinationCount'));

export default class UserHome extends Component {

    constructor() {
        super();
        this.state = {
            responseData:[],
            deathCases:"",
            vaccination:"",
        }
        this.itemOnclick = this.itemOnclick.bind(this);
    }

    componentDidMount() {
        HomeServices.getVaccination_Death_Details().then(data =>{
            this.setState({responseData:data.data.data});

            if(this.state.responseData.length > 0){
                let tempLabels = [];
                let tempDSet = [];
                let tempVSet = [];
                this.state.responseData.map((item, index) =>{
                    let day = item.infoDate.slice(0,10);
                    let deaths = item.deathCases;
                    let vaccinated = item.vaccinatedCount;
                    tempLabels.push(day);
                    tempDSet.push(deaths);
                    tempVSet.push(vaccinated);
                })

                const newDataset1 = {
                    labels: tempLabels,
                    datasets: [
                        {
                            backgroundColor:"#F78DA7",
                            label: 'Death Cases (D)',
                            data: tempDSet
                        },
                    ]
                }

                const newDataset2 = {
                    labels: tempLabels,
                    datasets: [

                        {
                            backgroundColor:"#03A9F4",
                            label: 'Daily Vaccination (V)',
                            data:tempVSet
                        }
                    ]
                }
                this.setState({deathCases:newDataset1});
                this.setState({vaccination:newDataset2});
                console.log(newDataset1)
            }
        }).catch(error => {

        })
    }

    itemOnclick(url){
        this.props.history.push(url)
    }


    render() {
        return (
            <div>
                <TopStatusUser/>
                <SlideShow/>
                <div className="grid-container _fadeIn_animation" >
                    <div className="grid-item" onClick={event => this.itemOnclick("/division")}>
                        <div className="grid-middle-content-tp" id="graph-items">
                            <div className="top-content">
                                <h2>Division Management</h2>
                                <hr/>
                                <div className="list-content">
                                    <ul style={{listStyleType:"disc"}}>
                                        <li>Add new Division</li>
                                        <li>Update Existing Division</li>
                                        <li>Delete Existing Division</li>
                                        <li>Update Division Covid-19 Information</li>
                                    </ul>
                                </div>
                                <hr/>
                            </div>
                        </div>
                    </div>

                    <div className="grid-item" onClick={event => this.itemOnclick("/center")}>
                        <div className="grid-middle-content-tp" id="graph-items">
                            <div className="top-content">
                                <h2>Center Management</h2>
                                <hr/>
                                <div className="list-content">
                                    <ul style={{listStyleType:"disc"}}>
                                        <li>Add new Center</li>
                                        <li>Update Existing Center</li>
                                        <li>Delete Existing Center</li>
                                        <li>Get Center Programs</li>
                                    </ul>
                                </div>
                                <hr/>
                            </div>
                        </div>
                    </div>

                    <div className="grid-item">
                        <div className="grid-middle-content-tp" id="graph-items">
                            <div className="top-content">
                                <h2>Program Management</h2>
                                <hr/>
                                <div className="list-content">
                                    <ul style={{listStyleType:"disc"}}>
                                        <li>Organize new Program</li>
                                        <li>Update Existing Program</li>
                                        <li>Delete Existing Program</li>
                                        <li>Schedule Vaccination</li>
                                    </ul>
                                </div>
                                <hr/>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{paddingLeft:"20px",paddingRight:"20px",paddingBottom:"20px"}}>
                    <div style={{border:"1px solid lightgrey",borderRadius:"10px",padding:"5px"}}>
                        <h2 style={{textAlign:"center",paddingTop:"20px",fontWeight:"bold"}}>COVID-19 STATISTICS</h2>

                        <div className="grid-container">
                            <div className="grid-item">
                                <div className="grid-middle-content" >
                                    <Suspense fallback={<div className="fallback-home"> <VscLoading className="fallback-icon"/>  </div>}>
                                        <DeathCases deathCasesData={this.state.deathCases}/>
                                    </Suspense>
                                </div>
                            </div>

                            <div className="grid-item">
                                <div className="grid-middle-content" >
                                    <Suspense fallback={<div className="fallback-home"> <VscLoading className="fallback-icon"/>  </div>}>
                                        <Vaccination vaccinationData={this.state.vaccination} />
                                    </Suspense>
                                </div>
                            </div>

                            <div className="grid-item">
                                <div className="grid-middle-content" style={{display: 'flex',alignItems: 'center',justifyContent: 'center'}}>
                                    <Suspense fallback={<div className="fallback-home"> <VscLoading className="fallback-icon"/>  </div>}>
                                        <VaccinationCount />
                                    </Suspense>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

