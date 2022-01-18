import React from 'react';
import '../../css/sideBarCss/nav-drawer.css';
import {GoHome} from 'react-icons/go';
import {GiLoveInjection} from 'react-icons/gi';
import {FaUsersCog} from 'react-icons/fa';
import {BiMapPin, BiSitemap} from 'react-icons/bi';


const NavDrawer = props => {
    // let idName="";
    // if (localStorage.getItem('privilege') === ''){
    //     idName = 'list-item'
    // }
    let navDrawerClass ='nav-Drawer';
    if(props.show){
        navDrawerClass = 'nav-Drawer open';
    }
    return (
        <nav className={navDrawerClass}>
            <div className="nav-logo-container">
                <img src={`/images/logoCovid.jpg`} style={{width:"100px",height:"100px"}}/>
            </div>
            <br/>
            <a className="list-item" href="https://mystifying-leavitt-4de6a7.netlify.app/">
                <div style={{backgroundColor:"inherit",paddingRight:"20px"}}>
                    <GoHome style={{backgroundColor:"inherit",fontSize:"x-large"}}/>
                </div>
                HOME
            </a>
            <a className="list-item" href="https://mystifying-leavitt-4de6a7.netlify.app/district">
                <div style={{backgroundColor:"inherit",paddingRight:"20px"}}>
                    <BiMapPin style={{backgroundColor:"inherit",fontSize:"x-large"}}/>
                </div>
                DISTRICT
            </a>
            <a className="list-item" href="https://mystifying-leavitt-4de6a7.netlify.app/division">
                <div style={{backgroundColor:"inherit",paddingRight:"20px"}}>
                    <BiSitemap style={{backgroundColor:"inherit",fontSize:"x-large"}}/>
                </div>
                DIVISION
            </a>
            <a className="list-item" href="https://mystifying-leavitt-4de6a7.netlify.app/center">
                <div style={{backgroundColor:"inherit",paddingRight:"20px"}}>
                    <GiLoveInjection style={{backgroundColor:"inherit",fontSize:"x-large"}}/>
                </div>
                CENTER
            </a>
            <a className="list-item" href="https://mystifying-leavitt-4de6a7.netlify.app/get-all-user">
                <div style={{backgroundColor:"inherit",paddingRight:"20px"}}>
                    <FaUsersCog style={{backgroundColor:"inherit",fontSize:"x-large"}}/>
                </div>
                USER MANAGE
            </a>
        </nav>
    );
}
export default NavDrawer;