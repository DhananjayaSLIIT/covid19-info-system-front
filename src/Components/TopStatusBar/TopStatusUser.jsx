import React, {useEffect, useState} from 'react';
import '../../css/top_status_bar.css';
import Service from "../../Services/Service";
import SideNavigation from "../SideNavigation/SideNavigation";
import NavDrawer from '../SideNavigation/NavDrawer';
import BackDrawer from "../SideNavigation/BackDrawer";
import {Redirect, withRouter} from 'react-router-dom';

const TopStatusUser = ({history}) =>{

    const [sidBarOpen, setOpen] = useState(false);

    useEffect(()=>{
        if(!localStorage.getItem("authToken")){
            history.push("/login");
        }

        const fetchPrivateData = async () => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            }

            try {
                await Service.checkToken(config).then(res=>{
                }).catch(error=>{
                    localStorage.setItem("authToken","");
                    localStorage.setItem("privilege","");
                    this.props.history.push('/');
                })
            } catch (error) {
                localStorage.setItem("authToken","");
                localStorage.setItem("privilege","");
                this.props.history.push('/');
            }
        }

        fetchPrivateData().then(()=>{

        }).catch(()=>{

        });

    },[ history ]);

    const signOut = () =>{
        localStorage.setItem("authToken","");
        localStorage.setItem("privilege","");
    }


    const drawerToggleClickHandler = () =>{
        console.log(!sidBarOpen);
        setOpen(!sidBarOpen);
    }

    const backDrawerClickHandler = () => {
        setOpen(false);
    }

    let backDrawer;

    if(sidBarOpen){
        backDrawer = <BackDrawer click={backDrawerClickHandler}/>;
    }
    return(
        <div >
            <div className="container-fluid top_status_outer_container">
                <div className="main-blocks">
                    <div className="block_item logo-block">
                        <div className="logo_and_dept" id="logo_and_dept_id">
                            <SideNavigation sidBarClickHandler={drawerToggleClickHandler}/>
                            <NavDrawer show={sidBarOpen}/>
                            {backDrawer}
                            <img className="gov-logo" src={"/images/government.png"} alt="cannot display"/>
                            <p className="logo-text" id="logo_text_id">Ministry of Health</p>
                        </div>
                    </div>
                    <div className="block_item heading-container" id="_space_between_id">
                        <div id="_background_color_id">
                            <h2 className="heading-text">Covid-19 Information System</h2>
                        </div>
                        <div className="_sign_out_btn_container" id="_background_color_id">
                            <a href="/login" className="btn _btn_sign_out" id="btn-sign-out" onClick={signOut}>Sign out</a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
export default withRouter(TopStatusUser);