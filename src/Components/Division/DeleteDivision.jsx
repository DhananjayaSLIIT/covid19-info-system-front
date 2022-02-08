import React, {useState} from "react";
import '../../css/divisionCss/add-division.css';
import Service from "../../Services/Service";
import MessageModal from "../Message/MessageModal";

const DeleteDivision = ({ handleClose, showDelete , divisionID }) =>{
    const showHideClassName = showDelete ? "modal display-block" : "modal display-none";

    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    const [statusCode, setStatusCode] = useState(0);

    const [divisionNumber, setDivisionNumber] = useState("");
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
            Service.deleteDivision(divisionID._id,config).then(result => {
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

export default DeleteDivision;