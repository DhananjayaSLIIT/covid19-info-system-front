import React from 'react';
import '../../css/sideBarCss/side-navgation.css';

const SideNavigation = props => (
    <button className="toggle-button" onClick={props.sidBarClickHandler}>
        <div className="toggle-button_line"/>
        <div className="toggle-button_line"/>
        <div className="toggle-button_line"/>
    </button>
);

export default SideNavigation;
