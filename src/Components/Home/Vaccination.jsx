import React, {useEffect, useState} from 'react';
import { Bar } from 'react-chartjs-2';

const Vaccination = ({vaccinationData}) =>{

    return(
        <div style={{paddingTop:'50px'}}>
            <Bar data={vaccinationData}/>
        </div>
    )
}
export default Vaccination;