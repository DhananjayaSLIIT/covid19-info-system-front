import React, {Component, useState} from 'react';
import '../../css/add_district_modal.css';
import Service from "../../Services/Service";

const AddDistrictModal = ({ handleClose, show}) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    const [districtCode, setDistrictCode] = useState("");
    const [districtName, setDistrictName] = useState("");
    const [fieldError, setFieldError] = useState("");

    const submitHandler = function (event){
        event.preventDefault();

        const config = {
            header:{
                "Content-Type":"application/json"
            }
        }

        if(!districtCode){
            return setFieldError("District Code is empty !");
        }else if(!districtName){
            return setFieldError("District name is empty !");
        }else{

            let newDistrict = {
                districtCode:districtCode,
                districtName:districtName
            };

            Service.addDistrict(newDistrict,config).then(response => {
                setDistrictCode("");
                setDistrictName("");
                handleClose();
                window.location.reload(false);
            }).catch(error => {
                alert(error.message);
            })
        }
    }

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <div className="inner-modal-main">
                    <h2 className="dis-header">Add District</h2>
                    <div className="form-group ts-1" >
                        <input type="text" className="form-control input-field" id="form-field" aria-describedby="emailHelp"
                               placeholder="Enter district code" name="districtCode" value={districtCode}
                               onChange={(event => setDistrictCode(event.target.value))}
                        />
                    </div>
                    <div className="form-group ts-1" id="form-field">
                        <input type="text" className="form-control input-field" id="form-field" aria-describedby="emailHelp"
                               placeholder="District name" name="districtName" value={districtName}
                               onChange={event => setDistrictName(event.target.value)}
                        />
                    </div>
                    <p className="ts-1" style={{color:"red",fontWeight:"bold",height:"7px"}}>{fieldError}</p>
                    <div className="button-container">
                        <button type="button" className="btn-secondary btn-Style" onClick={handleClose}>
                            Close
                        </button>
                        <button type="button" className="btn-add btn-Style" onClick={submitHandler}>
                            Add District
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AddDistrictModal;

