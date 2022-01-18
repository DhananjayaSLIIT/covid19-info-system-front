import React, {Component, lazy, Suspense} from 'react';
import TopStatusUser from "../TopStatusBar/TopStatusUser";
import '../../css/information_css/information-by-division.css';
import AddDetail from "./AddDetail";
const InfoStatics  = lazy(()=> import('./InfoStatics')) ;


export default class InformationByDivision extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRefreshed:true
        }
        this.refreshHandler = this.refreshHandler.bind(this);
    }

    refreshHandler(value){
        this.setState({isRefreshed:value});
    }

    render() {
        return (
            <div>
                <TopStatusUser/>
                <div className="container-fluid info-outer-container" >
                    <div className="row">
                        <div className="col-5 info-left-container">
                            <AddDetail divtionID={this.props.match.params.id} divisionCode={this.props.match.params.code}
                                       divisionName={this.props.match.params.name} isRefreshed={this.refreshHandler}/>
                        </div>
                        <div className="col-7 info-right-container">
                            <Suspense fallback={<div>Loading...</div>}>
                                <InfoStatics divtionID={this.props.match.params.id} isRefreshedValue={this.props.isRefreshed}/>
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

