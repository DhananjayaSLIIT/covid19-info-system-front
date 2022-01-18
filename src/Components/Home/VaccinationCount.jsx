import React, {useEffect, useState} from 'react';
import { Doughnut } from 'react-chartjs-2';
import HomeServices from "../../Services/HomeServices";

const VaccinationCount = ({}) => {

    const [graphData, setDate] = useState('');

    useEffect(()=>{
        HomeServices.getVaccinationCount().then(response =>{

            let tempLabel = [];
            let tempData = []

            if(response.data.data.length > 0){
                response.data.data.map(item =>{
                    item._id.vaccineName.map(element =>{
                        tempLabel.push(element);
                    })
                    tempData.push(item.count);
                })
            }


            let newData = {
                labels: tempLabel,
                datasets: [
                    {
                        label: 'Total Vaccination',
                        data: tempData,
                        backgroundColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1,
                    },
                ],
            }


            setDate(newData);
        })
    },[])
    return(
        <div>
            <Doughnut data={graphData}></Doughnut>
        </div>
    )
}
export default  VaccinationCount;