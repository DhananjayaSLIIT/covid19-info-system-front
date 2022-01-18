import React from "react";
import '../../css/center_css/add_center_modal.css';
import CenterService from "../../Services/CenterService";

const DeleteCenterModal = ({handleClose, showDelete, centerID, centerCode}) => {
    const Classname = showDelete ? "cen-modal cen-display-block":"cen-modal cen-display-none";

    const config = {
        header:{
            "Content-Type":"application/json"
        }
    }

    const deleteHandler = () =>{
        CenterService.deleteCenter(centerID).then(response => {
            if(response.data.success){
                alert("Center deleted successfully !");
                handleClose();
                window.location.reload(false);
            }else {
                alert("Center delete unsuccessfully !");
            }
        }).catch(error => {
            alert(`Sever error !\n${error.message}`);
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
                    </div>
                </div>
            </section>
        </div>
    )
}
export default DeleteCenterModal;
