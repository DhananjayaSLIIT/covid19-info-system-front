import React, {useEffect, useState} from 'react';
import { Bar } from 'react-chartjs-2';
import HomeServices from "../../Services/HomeServices";

const DeathCases = ({deathCasesData}) =>{

    return(

      <div style={{paddingTop:'50px'}}>
        <Bar data={deathCasesData}/>
      </div>
    );
}
export default DeathCases;