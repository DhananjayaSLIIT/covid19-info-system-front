import React, {useState} from "react";
import '../../css/divisionCss/add-division.css';
import Service from "../../Services/Service";

const DeleteDivision = ({ handleClose, showDelete , divisionID }) =>{
    const showHideClassName = showDelete ? "modal display-block" : "modal display-none";

    const [divisionNumber, setDivisionNumber] = useState("");
    const [fieldError, setFieldError] = useState("");

    const submitHandler = (event) => {
        event.preventDefault();

        const config = {
            header: {
                "Content-Type": "application/json"
            }
        }

        if(!divisionNumber){
            return setFieldError("Division Code is empty !");
        }else if(divisionNumber != divisionID.divisionNumber){
            return setFieldError("Division code is incorrect !");
        }else{
            Service.deleteDivision(divisionID._id,config).then(response => {
                alert(response.data.message);
                setDivisionNumber("");
                handleClose();
            }).catch(error => {
                alert(error.message);
            })
        }
    }

    return(
      <div className={showHideClassName}>
          <section className="modal-main">
              <div className="inner-modal-main">
                  <h2 className="dis-header">Delete Division</h2>

                  <div className="alert alert-danger" role="alert" id="delete-warning">
                      To Delete <span className="divi-warn-words"> {divisionID.divisionName}</span> division type the Division Code <span className="divi-warn-words">
                      {divisionID.divisionNumber}</span>
                  </div>

                  <div className="form-group ts-1" >
                      <input type="text" className="form-control input-field" id="form-field" aria-describedby="emailHelp"
                             placeholder="Division code" name="divisionNumber" value={divisionNumber}
                             onChange={(event) =>{
                                 setDivisionNumber(event.target.value);
                                 setFieldError("");
                             }}
                      />
                  </div>
                  <p className="ts-1" style={{color:"red",fontWeight:"bold",height:"7px"}}>{fieldError}</p>
                  <div className="button-container">
                      <button type="button" className="btn-secondary btn-Style" onClick={handleClose}>
                          Close
                      </button>
                      <button type="button" className="btn-add btn-Style" onClick={submitHandler}>
                          Delete Division
                      </button>
                  </div>
              </div>
          </section>
      </div>
    );
};

export default DeleteDivision;