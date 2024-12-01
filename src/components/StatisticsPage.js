import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const StatisticsPage = () => {
    const data = {
        labels: ["Product1", "Product2", "Product3"],
        datasets: [
            {
                data: [10, 3, 7], 
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
            <Doughnut data={data} />
        </div>
    );
};

export default StatisticsPage;
