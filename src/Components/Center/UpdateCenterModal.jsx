import React, {useEffect, useState, lazy, Suspense} from 'react';
import '../../css/center_css/add_center_modal.css';
import Select from 'react-select';
import Service from "../../Services/Service";
import CenterService from "../../Services/CenterService";
import MessageModal from "../Message/MessageModal";

const UpdateCenterModal = ({ handleClose, showUpdate, selectedItem, selectedID }) =>{
    const Classname = showUpdate ? "cen-modal cen-display-block":"cen-modal cen-display-none";

    const [isLoading, setIsLoading] = useState(true);
    const [loadingIcon, setLoadingIcon] = useState('_content_display _center_image');
    const [formClass, setFormClass] = useState('_content_display_none');

    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    const [statusCode, setStatusCode] = useState(0);

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
        setIsLoading(true)
        setFormClass('_content_display_none');
        setLoadingIcon('_content_display _center_image')
        Service.getAllDivisions(config).then(response => {
            if(response.data !== ''){
                setIsLoading(false);
            }
            if(isLoading !== true){
                setFormClass('_content_display');
                setLoadingIcon('_content_display_none');
            }
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
            setCenterCode(selectedItem.centerCode);
            setCenterAddress(selectedItem.centerAddress);
            setCenterPhone(selectedItem.centerPhone);
            setCenterInCharge(selectedItem.centerInCharge);
            setDivision(selectedItem.division);
        })
    },[showUpdate]);

    /** Alert modal */
    const setStatePromise = (message) => {
        return new Promise(resolve => {
            resolve(
                setMessage(message)
            )
        });
    }
    /**Message modal popup*/
    const openMessageModal = () => {
        setShow(true);
    }
    /**Message modal close*/
    const closeMessageModal = () => {
        setShow(false);
        resetMessage();
        reset();
        handleClose();
        window.location.reload(false);
    }
    /**Reset message */
    const resetMessage = () => {
        setMessage('');
        setStatusCode(0);
    }
    /**-------------*/

    const reset = function (){
        setIsLoading(true)
        setFormClass('_content_display_none');
        setLoadingIcon('')
        setCenterCode("");
        setCenterAddress("");
        setCenterPhone("");
        setCenterInCharge("");
        setDivision("");
        setFieldError('');
    }

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
            let center = {
                centerCode:centerCode,
                centerAddress:centerAddress,
                centerPhone:centerPhone,
                centerInCharge:centerInCharge,
                division:division
            }

            CenterService.updateCenter(selectedID,center,config).then(result => {
                console.log(result.data.success);
                if(result.data.success){
                    setStatePromise(result.data.message).then(()=>{
                        setStatusCode(result.status);
                    }).then(()=>{
                        openMessageModal();
                    })
                }else{
                    setStatePromise(result.data.error.message).then(()=>{
                        setStatusCode(result.data.error.status)
                    }).then(()=>{
                        openMessageModal();
                    })
                }
            }).catch(error => {
                setStatePromise(error.message).then(()=>{
                    if(!error.response){
                        setStatusCode(500);
                    }else{
                        setStatusCode(error.response.status);
                    }
                }).then(()=>{
                    openMessageModal();
                })
            })
        }
    }

    return(
        <div className={Classname}>
            <section className="cen-modal-main">
                <div className="cen-inner-content">
                    <h2 className="cen-header">Update Center Details</h2>
                    <div className={loadingIcon}>
                        <img className={loadingIcon} src="/images/loading.webp"/>
                    </div>
                    <div className={formClass}>
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
                                Update Center
                            </button>
                            <MessageModal
                                show={show}
                                message={message}
                                closeHandler={closeMessageModal}
                                messageReset={resetMessage}
                                responseCode={statusCode}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )

}
export default UpdateCenterModal;