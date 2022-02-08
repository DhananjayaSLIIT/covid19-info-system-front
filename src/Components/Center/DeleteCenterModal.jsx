import React, {useState} from "react";
import '../../css/center_css/add_center_modal.css';
import CenterService from "../../Services/CenterService";
import MessageModal from "../Message/MessageModal";

const DeleteCenterModal = ({handleClose, showDelete, centerID, centerCode}) => {
    const Classname = showDelete ? "cen-modal cen-display-block":"cen-modal cen-display-none";

    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    const [statusCode, setStatusCode] = useState(0);

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
        handleClose();
        window.location.reload(false);
    }
    /**Reset message */
    const resetMessage = () => {
        setMessage('');
        setStatusCode(0);
    }
    /**-------------*/

    const deleteHandler = () =>{
        CenterService.deleteCenter(centerID).then(result => {
            if(result.data.success){
                setStatePromise(result.data.message).then(()=>{
                    setStatusCode(result.status);
                }).then(()=>{
                    openMessageModal();
                })
            }else {
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
            console.log(error.status);
        })
    }

    return(
        <div className={Classname}>
            <section className="cen-modal-main">
                <div className="cen-inner-content">
                    <h2 className="cen-header">Remove Center</h2>
                    <p className="cen-delete-warn">Confirm remove center {centerCode}</p>
                    <div className="cen-button-container">
                        <button type="button" className="cen-btn-close" onClick={handleClose}>
                            Close
                        </button>
                        <button type="button" className="btn-add btn-Style" onClick={deleteHandler}>
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
    )
}
export default DeleteCenterModal;
