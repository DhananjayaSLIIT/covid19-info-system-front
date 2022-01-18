import React, {useEffect, useState} from 'react';
import '../../css/divisionCss/add-division.css';
import Service from "../../Services/Service";
import Select from 'react-select';


const AddDivision = ({ handleClose, showAdd }) =>{
    const showHideClassName = showAdd ? "modal display-block" : "modal display-none";

    const [districts , setDistricts] = useState([]);
    const [divisionNumber, setDivisionNumber] = useState("");
    const [divisionName, setDivisionName] = useState("");
    const [officeAddress, setOfficeAddress] = useState("");
    const [officePhone, setOfficePhone] = useState("");
    const [district, setDistrict] = useState("");
    const [fieldError, setFieldError] = useState("");

    useEffect( ()=>{
       Service.getAllDistricts().then(response => {
            const districtList = response.data.data
            let element = [];
            districtList.map((item, index)=>{
                let district = {
                    value:item._id,
                    label:item.districtName
                }
                element.push(district);
            })
            setDistricts(element);

        }).catch(error => {
            alert(error.message);
        })
    },[showAdd]);

    const submitHandler = function (event) {
        event.preventDefault();

        const config = {
            header: {
                "Content-Type": "application/json"
            }
        }
        if(!divisionNumber){
            return setFieldError("Division code is empty !");
        }else if(!divisionName){
            return setFieldError("Division name is empty !");
        }else if(!officeAddress){
            return setFieldError("Division address is empty !");
        }else if(!officePhone){
            return setFieldError("Phone number is empty !");
        }else if(officePhone.length != 10){
            return setFieldError("Phone number is invalid !");
        }else{
            let newDivision= {
                divisionNumber:divisionNumber,
                divisionName:divisionName,
                officeAddress:officeAddress,
                officePhone:officePhone,
                district:district
            }
            Service.addDivision(newDivision,config).then(response => {
                alert(response.data.message);
                handleClose();
                window.location.reload(false);
            }).catch(error =>{
                alert(error.message);
                console.log(error)
            })
        }
    }

    const onSelectHandler = selected =>{
        setDistrict(selected.value);
    }

    return(
        <div className={showHideClassName}>
            <section className="modal-main">
                <div className="inner-modal-main">
                    <h2 className="dis-header">Add Division</h2>
                    <div className="form-group ts-1" >
                        <input type="text" className="form-control input-field" id="form-field" aria-describedby="emailHelp"
                               placeholder="Division code" name="divisionNumber" value={divisionNumber}
                               onChange={(event) =>{
                                   setDivisionNumber(event.target.value);
                                   setFieldError("");
                               }}
                        />
                    </div>
                    <div className="form-group ts-1" id="form-field">
                        <input type="text" className="form-control input-field" id="form-field" aria-describedby="emailHelp"
                               placeholder="Division name" name="divisionName" value={divisionName}
                               onChange={event => {
                                   setDivisionName(event.target.value);
                                   setFieldError("");
                               }}
                        />
                    </div>
                    <div className="form-group ts-1" id="form-field">
                        <input type="text" className="form-control input-field" id="form-field" aria-describedby="emailHelp"
                               placeholder="Division address" name="officeAddress" value={officeAddress}
                               onChange={event => {
                                   setOfficeAddress(event.target.value);
                                   setFieldError("");
                               }}
                        />
                    </div>
                    <div className="form-group ts-1" id="form-field">
                        <input type="number" className="form-control input-field" id="form-field" aria-describedby="emailHelp"
                               placeholder="Division phone number" name="officePhone" value={officePhone}
                                onChange={event => {
                                    setOfficePhone(event.target.value);
                                    setFieldError("");
                                }}
                        />
                    </div>
                    <div className="form-group ts-1" id="form-field">
                        <Select placeholder="Select district" options={districts} value={districts.find(x => x.value === district)}
                                onChange={onSelectHandler}
                        />
                    </div>
                    <p className="ts-1" style={{color:"red",fontWeight:"bold",height:"7px"}}>{fieldError}</p>
                    <div className="button-container">
                        <button type="button" className="btn-secondary btn-Style" onClick={handleClose}>
                            Close
                        </button>
                        <button type="button" className="btn-add btn-Style" onClick={submitHandler}>
                            Add Division
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
};
export default AddDivision;