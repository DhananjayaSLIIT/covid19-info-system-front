import React, {Component} from 'react';
import '../../css/information_css/information-by-division.css';
import Select from "react-select";
import { Bar } from 'react-chartjs-2';
import Service from "../../Services/Service";

export default class InfoStatics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            divisionID:this.props.divtionID,
            allInfo:[],
            options:[
                {value:7,label:"Last week"},
                {value:30,label:"Last month"},
                {value:60,label:"Last two month"}
            ],
            selected:"",
            graphData:""
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.getDetails = this.getDetails.bind(this);
        this.onClickGetDetails = this.onClickGetDetails.bind(this);
    }

    componentDidMount() {
        this.getDetails();
    }

    getDetails(){

        const config = {
            header: {
                "Content-Type": "application/json"
            }
        }

        Service.getInfoByDivision(this.state.divisionID,config).then(response => {
            this.setState({allInfo:response.data.data});
            if(this.state.allInfo.length > 0){
                let tempLabels = [];
                let tempDSet = [];
                let tempVSet = [];
                this.state.allInfo.map((item, index) =>{
                    let day = item.infoDate.slice(0,10);
                    let deaths = item.deathCases;
                    let vaccinated = item.vaccinatedCount;
                    tempLabels.push(day);
                    tempDSet.push(deaths);
                    tempVSet.push(vaccinated);
                })

                const newDataset = {
                    labels: tempLabels,
                    datasets: [
                        {
                            backgroundColor:"#FF6600",
                            label: 'Death Cases (D)',
                            data: tempDSet
                        },
                        {
                            backgroundColor:"#0200FF",
                            label: 'Daily Vaccination (V)',
                            data:tempVSet
                        }
                    ]
                }
                this.setState({graphData:newDataset});
            }
        })
    }

    onChangeHandler(event){
        this.setState({selected:event.value});
    }

    onClickGetDetails(){
        let startDate = new Date();
        let endDate = new Date();
        endDate.setDate(endDate.getDate() - this.state.selected);

        const config = {
            header: {
                "Content-Type": "application/json"
            }
        }

        let reqData = {
            division:this.state.divisionID,
            start:startDate,
            end:endDate
        }
        
        Service.getTimeLine(reqData,config).then(response => {
            this.setState({allInfo:response.data.data});
            if(this.state.allInfo.length > 0){
                let tempLabels = [];
                let tempDSet = [];
                let tempVSet = [];
                this.state.allInfo.map((item, index) =>{
                    let day = item.infoDate.slice(0,10);
                    let deaths = item.deathCases;
                    let vaccinated = item.vaccinatedCount;
                    tempLabels.push(day);
                    tempDSet.push(deaths);
                    tempVSet.push(vaccinated);
                })

                const newDataset = {
                    labels: tempLabels,
                    datasets: [
                        {
                            backgroundColor:"#FF6600",
                            label: 'Death Cases (D)',
                            data: tempDSet
                        },
                        {
                            backgroundColor:"#0200FF",
                            label: 'Daily Vaccination (V)',
                            data:tempVSet
                        }
                    ]
                }
                this.setState({graphData:newDataset});
            }else{
                this.setState({graphData:""});
            }
        })
    }

    render() {

        return (
            <div className="info-static-container">
                <div className="l-top-container">
                    <div className="col-9">
                        <Select className="form-control" id="info-dropdown" style={{width:"200px"}}
                                options={this.state.options}
                                placeHoider="Select time range"
                                // value={this.state.options.find((index) => index.value === this.state.selected)}
                                onChange={this.onChangeHandler}
                        />
                    </div>
                    <div className="col-3" style={{display:"flex",flexDirection:"column",justifyContent:"space-around"}}>
                        <button className="info-btn-add" onClick={this.onClickGetDetails}> Get details</button>
                    </div>
                </div>
                <div className="info-graph">
                    <Bar data={this.state.graphData} style={{width:"100%"}}/>
                </div>
            </div>
        );
    }
}

