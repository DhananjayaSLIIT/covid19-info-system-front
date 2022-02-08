import React, {useEffect, useState} from 'react';
import Service from "../../Services/Service";

const AdminDeleteUserModal = ({ handleClose, showDelete, userID, userName}) =>{
    const showHideClassName = showDelete ? "modal display-block" : "modal display-none";

    const submitHandler =() => {
        const config = {
            header: {
                "Content-Type": "application/json"
            }
        }
        Service.removeUser(userID,config).then(response => {
            handleClose();
        }).catch(error =>{
            alert(`Server error\n${error.message}`);
            console.log(error.message);
        })
    }

    return(
        <div className={showHideClassName}>
            <section className="modal-main">
                <div className="inner-modal-main">
                    <h2 className="dis-header">Remove User</h2>
                    <div className="alert alert-danger"
                         role="alert"
                         style={{display:"flex", alignItem:"center", justifyContent:"center",fontSize:"xx-large"}}>
                            {userName}
                    </div>
                    <div className="button-container">
                        <button type="button" className="btn-secondary btn-Style "
                                style={{ borderRadius: "5px", webkitTransition: "all 0.3s ease-out", webkitTransform: "scale(1.05)"}}
                                onClick={handleClose}>
                            Close
                        </button>
                        <button type="button" className="btn-add btn-Style" onClick={submitHandler}>
                            Confirm Remove
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default AdminDeleteUserModal;