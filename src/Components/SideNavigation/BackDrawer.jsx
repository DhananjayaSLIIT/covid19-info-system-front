import React from 'react';
import '../../css/sideBarCss/back-drawer.css';

const BackDrawer = props =>(
    <div className="back-drawer" onClick={props.click}/>
);

export default BackDrawer;