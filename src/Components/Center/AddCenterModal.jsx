import React, {useEffect, useState} from 'react';
import '../../css/center_css/add_center_modal.css';
import Select from 'react-select';
import Service from "../../Services/Service";
import CenterService from "../../Services/CenterService";


const AddCenterModal = ({ handleClose, showAdd }) =>{
    const Classname = showAdd ? "cen-modal cen-display-block":"cen-modal cen-display-none";

    const [divisions, setDivisions] = useState([]);
    const [centerCode, setCenterCode] = useState("");
    const [centerAddress, setCenterAddress] = useState("");
    const [centerPhone, setCenterPhone] = useState("");
    const [centerInCharge, setCenterInCharge] = useState("");
    const [division, setDivision] = useState("");
    const [fieldError, setFieldError] = useState("");

    const config = {
        header:{
            "Content-Type":"application/json"
        }
    }
    useEffect(() => {
        Service.getAllDivisions(config).then(response => {
            if (response.data.data.length > 0){
                let tempData = [];
                response.data.data.map((item) =>{
                    let data = {
                        value:item._id,
                        label:item.divisionName
                    }
                    tempData.push(data);
                })
                setDivisions(tempData);
            }
        })
    },[showAdd]);

    const onSelectHandler = selected =>{
        setDivision(selected.value);
    }

    const submitHandler = () =>{
        if (!centerCode){
            return setFieldError("Center code is empty !");
        }else if(!centerAddress){
            return setFieldError("Center address is empty !");
        }else if(!centerPhone){
            return setFieldError("Center phone is empty !");
        }else if(!centerInCharge){
            return setFieldError("Center in-charge is empty !");
        }else if(!division){
            return setFieldError("Division is empty !");
        }else {
            let newCenter = {
                centerCode:centerCode,
                centerAddress:centerAddress,
                centerPhone:centerPhone,
                centerInCharge:centerInCharge,
                division:division
            }
            console.log(newCenter);
            CenterService.addCenter(newCenter,config).then(response => {
                if(response.data.success){
                    alert("New Center created successfully !");
                    setCenterCode("");
                    setCenterAddress("");
                    setCenterPhone("");
                    setCenterInCharge("");
                    setDivision("");
                    setFieldError('');
                    handleClose();
                    window.location.reload(false);
                }else{
                    alert("New Center created unsuccessful !");
                }
            }).catch(error => {
                alert(`Server error !\n${error.message}`)
            })
        }
    }

    return(

        <div className={Classname}>
            <section className="cen-modal-main">
                <div className="cen-inner-content">
                    <h2 className="cen-header">Add Center Details</h2>
                    <div className="form-group ts-1" >
                        <input type="text" className="form-control cen-input-field" id="form-field"
                               placeholder="Center code" name="centerCode" value={centerCode}
                               onChange={(event) =>{
                                   setCenterCode(event.target.value);
                                   setFieldError("");
                               }}
                        />
                    </div>
                    <div className="form-group ts-1" >
                        <input type="text" className="form-control cen-input-field" id="form-field"
                               placeholder="Center address" name="centerAddress" value={centerAddress}
                               onChange={(event) =>{
                                   setCenterAddress(event.target.value);
                                   setFieldError("");
                               }}
                        />
                    </div>
                    <div className="form-group ts-1" >
                        <input type="text" className="form-control cen-input-field" id="form-field"
                               placeholder="Center phone" name="centerPhone" value={centerPhone}
                               onChange={(event) =>{
                                   setCenterPhone(event.target.value);
                                   setFieldError("");
                               }}
                        />
                    </div>
                    <div className="form-group ts-1" >
                        <input type="text" className="form-control cen-input-field" id="form-field"
                               placeholder="Center in charge" name="centerInCharge" value={centerInCharge}
                               onChange={(event) =>{
                                   setCenterInCharge(event.target.value);
                                   setFieldError("");
                               }}
                        />
                    </div>
                    <div className="form-group ts-1 cen-input-field" id="form-field">
                        <Select placeholder="Select division" options={divisions} value={divisions.find(x => x.value === division)}
                                onChange={onSelectHandler}
                        />
                    </div>
                    <p className="cen-warn-field">{fieldError}</p>
                    <div className="cen-button-container">
                        <button type="button" className="cen-btn-close" onClick={handleClose}>
                            Close
                        </button>
                        <button type="button" className="btn-add btn-Style" onClick={submitHandler}>
                            Add Center
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default AddCenterModal;