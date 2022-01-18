import React, {useEffect, useState} from "react";
import '../../css/program_css/program_modal.css';
import Select from "react-select";
import ProgramService from "../../Services/ProgramService";

const UpdateProgram = ({ handleClose, showUpdate, programItem }) =>{
    const Classname = showUpdate ? "pro-modal pro-display-block":"pro-modal pro-display-none";

    const [programNumber, setProgramNumber] = useState("");
    const [vaccineName, setVaccineName] = useState("");
    const [doseNumber, setDoseNumber] = useState("");
    const [ageGroup, setAgeGroup] = useState("");
    const [date, setDate] = useState("");
    const [maximumCount, setMaximumCount] = useState("");
    const [fieldError, setFieldError] = useState("");



    useEffect(() => {
        if(programItem === ""){

        }else{
            setProgramNumber(programItem.programNumber);
            setVaccineName(programItem.vaccineName);
            setDoseNumber(programItem.doseNumber);
            setAgeGroup(programItem.ageGroup);
            setDate(programItem.date.toLocaleString().slice(0, 10));
            setMaximumCount(programItem.maximumCount);
        }
    },[showUpdate]);

    const vaccines = [
        {
            value:"1",
            label:" Moderna"
        },
        {
            value:"2",
            label:" Pfizer"
        },
        {
            value:"3",
            label:" Sputnik V"
        },
        {
            value:"4",
            label:" Sinopharm"
        },
        {
            value:"5",
            label:" Sinopharm"
        },
    ]

    const config = {
        header:{
            "Content-Type":"application/json"
        }
    }

    const onSelectHandler = selected =>{
        setVaccineName(selected.label);
        setFieldError("");
    }

    const minDate = () => {
        const today = new Date(programItem.date);
        return `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
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
                center:programItem.center,
                maximumCount:maximumCount
            }

            ProgramService.update(programItem._id,newProgram,config).then(response =>{
                if(response.data.success){
                    alert("New program added !");
                }
                restField();
                handleClose();
            }).catch(error =>{
                alert(`Server error !\n${error.message}`);
            })
        }
    }

    return(
        <div className={Classname} >
            <section className="pro-modal-main">
                <div className="pro-inner-content">
                    <h2 className="pro-header">Update Program Details</h2>
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
                               min={minDate}
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
                            Update Program
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );

}
export default UpdateProgram;