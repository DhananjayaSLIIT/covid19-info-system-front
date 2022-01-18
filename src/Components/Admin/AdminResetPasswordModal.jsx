import React from "react";

const AdminResetPasswordModal = (props) => {

    return(
        <div>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row ts-1">
                                <div className="col-6 form-group">
                                    <input type="password" className="form-control input-field" aria-describedby="emailHelp"
                                           placeholder="Enter new password" name="password" value={this.state.password} onChange={this.onchangeHandler}/>
                                </div>

                                <div className="col-6 form-group">
                                    <input type="password" className="form-control input-field" aria-describedby="emailHelp"
                                           placeholder="Confirm password" name="passwordConf" value={this.state.passwordConf} onChange={this.onchangeHandler}/>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Update password</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminResetPasswordModal;
