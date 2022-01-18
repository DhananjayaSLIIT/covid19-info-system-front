import React, {useEffect, useState} from 'react';
import '../../css/application_css/application_details.css';
import {ImCross} from 'react-icons/im'

const ApplicationDetails = ({show, handleClose, application}) =>{
    const Classname = show ? "app-modal app-display-block":"app-modal app-display-none";
    return(
        <div className={Classname}>
            <section className="app-modal-main">
                <div className="app-inner-content">
                    <div className="app-button-container">
                        <button className="app-btn-close" onClick={handleClose}> <ImCross style={{fontSize:"24",color:"darkgray"}}/> </button>
                    </div>
                    <hr/>
                    {/*refNumber*/}
                    <div className="app-details">
                        <div className="container" id="xxx">
                            <div className="row" id="app-details-container">
                                <div className="col-3" style={{height:"30px"}}>
                                    <p className="form-check-label" htmlFor="exampleCheck1">Reference No :</p>
                                </div>
                                <div className="col-9" style={{height:"30px"}}>
                                    <input type="email" className="form-control" id="exampleInputEmail1"
                                           aria-describedby="emailHelp" placeholder={application.refNumber} disabled={true} style={{height:"30px"}}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*firstName*/}
                    <div className="app-details">
                        <div className="container" id="xxx">
                            <div className="row" id="app-details-container">
                                <div className="col-3" style={{height:"30px"}}>
                                    <p className="form-check-label" htmlFor="exampleCheck1">First name :</p>
                                </div>
                                <div className="col-9" style={{height:"30px"}}>
                                    <input type="email" className="form-control" id="exampleInputEmail1"
                                           aria-describedby="emailHelp" placeholder={application.firstName} disabled={true} style={{height:"30px"}}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*lastName*/}
                    <div className="app-details">
                        <div className="container" id="xxx">
                            <div className="row" id="app-details-container">
                                <div className="col-3" style={{height:"30px"}}>
                                    <p className="form-check-label" htmlFor="exampleCheck1">Last name :</p>
                                </div>
                                <div className="col-9" style={{height:"30px"}}>
                                    <input type="email" className="form-control" id="exampleInputEmail1"
                                           aria-describedby="emailHelp" placeholder={application.lastName} disabled={true} style={{height:"30px"}}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*NIC*/}
                    <div className="app-details">
                        <div className="container" id="xxx">
                            <div className="row" id="app-details-container">
                                <div className="col-3" style={{height:"30px"}}>
                                    <p className="form-check-label" htmlFor="exampleCheck1">NIC :</p>
                                </div>
                                <div className="col-9" style={{height:"30px"}}>
                                    <input type="email" className="form-control" id="exampleInputEmail1"
                                           aria-describedby="emailHelp" placeholder={application.NIC} disabled={true} style={{height:"30px"}}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*dob*/}
                    <div className="app-details">
                        <div className="container" id="xxx">
                            <div className="row" id="app-details-container">
                                <div className="col-3" style={{height:"30px"}}>
                                    <p className="form-check-label" htmlFor="exampleCheck1">Date of birth :</p>
                                </div>
                                <div className="col-9" style={{height:"30px"}}>
                                    <input type="email" className="form-control" id="exampleInputEmail1"
                                           aria-describedby="emailHelp" placeholder={application.dateOfBirth} disabled={true} style={{height:"30px"}}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*age*/}
                    <div className="app-details">
                        <div className="container" id="xxx">
                            <div className="row" id="app-details-container">
                                <div className="col-3" style={{height:"30px"}}>
                                    <p className="form-check-label" htmlFor="exampleCheck1">Age :</p>
                                </div>
                                <div className="col-9" style={{height:"30px"}}>
                                    <input type="email" className="form-control" id="exampleInputEmail1"
                                           aria-describedby="emailHelp" placeholder={application.age} disabled={true} style={{height:"30px"}}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*address*/}
                    <div className="app-details">
                        <div className="container" id="xxx">
                            <div className="row" id="app-details-container">
                                <div className="col-3" style={{height:"30px"}}>
                                    <p className="form-check-label" htmlFor="exampleCheck1">Address :</p>
                                </div>
                                <div className="col-9" style={{height:"30px"}}>
                                    <input type="email" className="form-control" id="exampleInputEmail1"
                                           aria-describedby="emailHelp" placeholder={application.address} disabled={true} style={{height:"30px"}}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*allergies*/}
                    <div className="app-details">
                        <div className="container" id="xxx">
                            <div className="row" id="app-details-container">
                                <div className="col-3" style={{height:"30px"}}>
                                    <p className="form-check-label" htmlFor="exampleCheck1">Allergies :</p>
                                </div>
                                <div className="col-9" style={{height:"100px"}}>
                                    <textarea className="form-control" placeholder={application.allergies} disabled={true} style={{height:"100px"}}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*description*/}
                    <div className="app-details">
                        <div className="container" id="xxx">
                            <div className="row" id="app-details-container">
                                <div className="col-3" style={{height:"30px"}}>
                                    <p className="form-check-label" htmlFor="exampleCheck1">Description :</p>
                                </div>
                                <div className="col-9" style={{height:"200px"}}>
                                    <textarea className="form-control" placeholder={application.description} disabled={true} style={{height:"200px"}} />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}
export default ApplicationDetails;