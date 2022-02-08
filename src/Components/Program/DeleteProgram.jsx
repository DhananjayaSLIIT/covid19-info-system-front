import React, {useEffect, useState} from "react";
import '../../css/program_css/program_modal.css';
import ProgramService from "../../Services/ProgramService";
import MessageModal from "../Message/MessageModal";

const DeleteProgram = ({ handleClose, showDelete, programItem }) => {
    const Classname = showDelete ? "pro-modal pro-display-block":"pro-modal pro-display-none";

    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    const [statusCode, setStatusCode] = useState(0);

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

    const onClickDeleteHandler = function (){
        ProgramService.deleteProgram(programItem._id).then(result => {
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

    return(
        <div className={Classname} >
            <section className="pro-modal-main">
                <div className="pro-inner-content">
                    <h2 className="pro-header">Remove Program Details</h2>

                    <div className="alert alert-danger" role="alert" id="delete-warning">
                        Confirm remove <span className="pro-warn-words"> {programItem.programNumber}</span>
                    </div>

                    <div className="pro-button-container">
                        <button type="button" className="pro-btn-close" onClick={handleClose}>
                            Close
                        </button>
                        <button type="button" className="btn-add btn-Style" onClick={onClickDeleteHandler}>
                            Confirm
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
export default DeleteProgram;