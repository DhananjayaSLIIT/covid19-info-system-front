import React, {useEffect, useState} from "react";
import '../../css/program_css/program_modal.css';
import ProgramService from "../../Services/ProgramService";

const DeleteProgram = ({ handleClose, showDelete, programItem }) => {
    const Classname = showDelete ? "pro-modal pro-display-block":"pro-modal pro-display-none";

    const onClickDeleteHandler = function (){
        ProgramService.deleteProgram(programItem._id).then(response => {
            if(response.data.success){
                alert("Program removed successfully !");
                handleClose();
                window.location.reload(false);
            }
        }).catch(error =>{
            alert("Server error !\n"+error.message);
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
                    </div>
                </div>
            </section>
        </div>
    );
}
export default DeleteProgram;