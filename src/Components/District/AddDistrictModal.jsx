import React, {Component, useState} from 'react';
import '../../css/add_district_modal.css';
import Service from "../../Services/Service";
import MessageModal from "../Message/MessageModal";

const AddDistrictModal = ({ handleClose, showAdd}) => {
    const showHideClassName = showAdd ? "modal display-block" : "modal display-none";

    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    const [statusCode, setStatusCode] = useState(0);

    const [districtCode, setDistrictCode] = useState("");
    const [districtName, setDistrictName] = useState("");
    const [fieldError, setFieldError] = useState("");

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
        handleClose();
        window.location.reload(false);
    }
    /**Reset message */
    const resetMessage = () => {
        setMessage('');
        setStatusCode(0);
    }
    /**-------------*/

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

            Service.addDistrict(newDistrict,config).then(result => {
                if(result.data.success){
                    setStatePromise(result.data.message).then(()=>{
                        setStatusCode(result.status);
                    }).then(()=>{
                        openMessageModal();
                    })

                    setDistrictCode("");
                    setDistrictName("");
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
                        <MessageModal
                            show={show}
                            message={message}
                            closeHandler={closeMessageModal}
                            messageReset={resetMessage}
                            responseCode={statusCode}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AddDistrictModal;

