import React, {useEffect, useState} from "react";
import '../../css/program_css/program_modal.css';
import Select from "react-select";
import ProgramService from "../../Services/ProgramService";
import MessageModal from "../Message/MessageModal";

const AddProgram = ({ handleClose, showAdd, centerID}) => {
    const Classname = showAdd ? "pro-modal pro-display-block":"pro-modal pro-display-none";

    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    const [statusCode, setStatusCode] = useState(0);

    const [programNumber, setProgramNumber] = useState('');
    const [vaccineName, setVaccineName] = useState('');
    const [doseNumber, setDoseNumber] = useState('');
    const [ageGroup, setAgeGroup] = useState('');
    const [date, setDate] = useState('');
    const [maximumCount, setMaximumCount] = useState('');
    const [fieldError, setFieldError] = useState("");

    useEffect(()=>{
        ProgramService.getNumber().then(response => {
            setProgramNumber(response.data.number);
        }).catch(error =>{
            alert("Server error\n"+error.message);
        })
    },[showAdd])

    const vaccines = [
        {
            value:"1",
            label:"Moderna"
        },
        {
            value:"2",
            label:"Pfizer"
        },
        {
            value:"3",
            label:"Sputnik V"
        },
        {
            value:"4",
            label:"Sinopharm"
        },
        {
            value:"5",
            label:"AstraZeneca"
        },
    ]

    const config = {
        header:{
            "Content-Type":"application/json"
        }
    }

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
        restField();
        handleClose();
        window.location.reload(false);
    }
    /**Reset message */
    const resetMessage = () => {
        setMessage('');
        setStatusCode(0);
    }
    /**-------------*/

    const onSelectHandler = selected =>{
        setVaccineName(selected.label);
        setFieldError("");
    }

    const restField =() => {
        setProgramNumber("");
        setVaccineName("");
        setDoseNumber("");
        setAgeGroup("");
        setDate("");
        setMaximumCount("");
        setFieldError("");
    }

    const closeModal = () => {
        restField();
        handleClose();
    }

    const submitHandler = () =>{

        if(vaccineName === ""){
            return setFieldError("Vaccine name is empty !");
        }else if(doseNumber === ""){
            return setFieldError("Dose number is empty !");
        }else if(ageGroup === ""){
            return setFieldError("Age group is empty !");
        }else if(date === ""){
            return setFieldError("Date is empty !");
        }else if(maximumCount === ""){
            return setFieldError("Number of doses is empty !");
        }else{
            const newProgram = {
                programNumber:programNumber,
                vaccineName:vaccineName,
                doseNumber:doseNumber,
                ageGroup:ageGroup,
                date:date,
                center:centerID,
                maximumCount:maximumCount
            }

            ProgramService.addNewProgram(newProgram,config).then(result =>{
                if(result.data.success){
                    alert(result.data.message);
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
            }).catch(error =>{
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
        <div className={Classname} >
            <section className="pro-modal-main">
                <div className="pro-inner-content">
                    <h2 className="pro-header">Organize New Program</h2>
                    <div className="form-group ts-1" >
                        <input type="text" className="form-control pro-input-field" id="form-field"
                               placeholder="Program number" name="programNumber" value={programNumber}
                               onChange={(event) =>{
                                   setProgramNumber(event.target.value);
                                   setFieldError("");
                               }}
                               disabled={true}
                        />
                    </div>

                    <div className="form-group ts-1 pro-input-field" id="form-field">
                        <Select placeholder="Select vaccine" options={vaccines} value={vaccines.find(x => x.label === vaccineName)}
                                onChange={onSelectHandler}
                                tabIndex={1}
                        />
                    </div>

                    <div className="form-group ts-1" >
                        <input type="number" className="form-control pro-input-field" id="form-field"
                               placeholder="Dose number" name="programNumber" value={doseNumber}
                               onChange={(event) =>{
                                   setDoseNumber(event.target.value);
                                   setFieldError("");
                               }}
                               tabIndex={2}
                        />
                    </div>

                    <div className="form-group ts-1" >
                        <input type="text" className="form-control pro-input-field" id="form-field"
                               placeholder="Age group" name="ageGroup" value={ageGroup}
                               onChange={(event) =>{
                                   setAgeGroup(event.target.value);
                                   setFieldError("");
                               }}
                               tabIndex={3}
                        />
                    </div>

                    <div className="form-group ts-1" >
                        <input type="date" className="form-control pro-input-field" id="form-field"
                               placeholder="Program number" name="date" value={date}
                               onChange={(event) =>{
                                   setDate(event.target.value);
                                   setFieldError("");
                               }}
                               tabIndex={4}
                        />
                    </div>

                    <div className="form-group ts-1" >
                        <input type="number" className="form-control pro-input-field" id="form-field"
                               placeholder="Number of doses" name="maximumCount" value={maximumCount}
                               onChange={(event) =>{
                                   setMaximumCount(event.target.value);
                                   setFieldError("");
                               }}
                               tabIndex={5}
                        />
                    </div>


                    <p className="pro-warn-field">{fieldError}</p>
                    <div className="pro-button-container">
                        <button type="button" className="pro-btn-close" onClick={closeModal}>
                            Close
                        </button>
                        <button type="button" className="btn-add btn-Style" onClick={submitHandler} tabIndex={6}>
                            Add Program
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
}
export default AddProgram;