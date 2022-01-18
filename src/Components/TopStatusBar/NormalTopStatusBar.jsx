import '../../css/top_status_bar.css';
import React from "react";

const NormalTopStatusUser = ({history}) =>{
    return(
        <div >
            <div className="container-fluid top_status_outer_container">
                <div className="main-blocks">
                    <div className="block_item logo-block ">
                        <div className="logo_and_dept" id="logo_and_dept_id">
                            <img className="gov-logo" src={"/images/government.png"} alt="cannot display"/>
                            <p className="logo-text">Ministry of Health</p>
                        </div>
                    </div>
                    <div className="block_item heading-container" id="_align_to_start">
                        <div id="_background_color_id">
                            <h2 className="heading-text">Covid-19 Information System</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default NormalTopStatusUser;