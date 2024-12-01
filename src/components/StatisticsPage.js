import React from "react";
import { Doughnut } from "react-chartjs-2";
import {     
    Chart as ChartJS,     
    ArcElement,     
    Tooltip,     
    Legend 
} from "chart.js"; 
import { useDispatch, useSelector } from "react-redux"; 
import { getProductsPerCategory } from "../services/statistics"; 
import { useEffect, useState } from "react";  

ChartJS.register(ArcElement, Tooltip, Legend);  

const StatisticsPage = () => {     
    const dispatch = useDispatch();     
    const productQuantityPerCategory = useSelector(
        state => state.statisticsReducer?.productQuantityPerCategory || []
    );     
    
    const [doughnut, setDoughnut] = useState({         
        labels: [],         
        data: [],     
    });     
    useEffect(() => {
        console.log('Raw productQuantityPerCategory:', productQuantityPerCategory);
    }, [productQuantityPerCategory]);

    useEffect(() =>{
        const labels = Array.isArray(productQuantityPerCategory) 
            ? productQuantityPerCategory.map(x => x.Key || x.key)
            : [];
        
        const data = Array.isArray(productQuantityPerCategory) 
            ? productQuantityPerCategory.map(x => x.Value || x.value)
            : [];

        console.log('Mapped Labels:', labels);
        console.log('Mapped Data:', data);

        setDoughnut({             
            labels: labels,             
            data: data,         
        })     
    }, [productQuantityPerCategory])     

    useEffect(() => {         
        getProductsPerCategory(dispatch);     
    }, [dispatch]);      

    const data = {         
        labels: doughnut.labels,         
        datasets: [             
            {                 
                data: doughnut.data,                  
                backgroundColor: [                     
                    "#007bff",                     
                    "#FF0000",                     
                    "#FFD700",                     
                    "#28a745",                     
                    "#FF00FF",                     
                    "#ff9900",                     
                    "#00FFFF",                     
                    "#d69ae5",                     
                    "#FF8F66",                     
                    "#00ff00",                 
                ],             
            },         
        ],     
    };      

    return (         
        <div             
            style={{                 
                maxWidth: "35rem",                 
                maxHeight: "35rem",                 
                margin: "auto",                 
                textAlign: "center",             
            }}         
        >             
            <h4 style={{ marginTop: "10px" }}>Products Per Category</h4>             
            {doughnut.labels.length > 0 ? (
                <Doughnut data={data} />
            ) : (
                <p>No data available</p>
            )}
        </div>     
    ); 
};  

export default StatisticsPage;