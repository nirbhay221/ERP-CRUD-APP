import React, { useEffect, useState } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import { 
    Chart as ChartJS, 
    ArcElement, 
    Tooltip, 
    Legend, 
    CategoryScale, 
    LinearScale, 
    BarElement 
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { getProductsPerCategory } from "../services/statistics";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const StatisticsPage = () => {
    const dispatch = useDispatch();
    const productQuantityPerCategory = useSelector(
        (state) => state.statisticsReducer?.productQuantityPerCategory || []
    );

    const [chartData, setChartData] = useState({ labels: [], data: [] });

    useEffect(() => {
        const labels = productQuantityPerCategory.map((x) => x.Key || x.key);
        const data = productQuantityPerCategory.map((x) => x.Value || x.value);

        setChartData({ labels, data });
    }, [productQuantityPerCategory]);

    useEffect(() => {
        getProductsPerCategory(dispatch);
    }, [dispatch]);

    const doughnutData = {
        labels: chartData.labels,
        datasets: [
            {
                data: chartData.data,
                backgroundColor: [
                    "rgba(0, 123, 255, 0.8)",
                    "rgba(255, 99, 132, 0.8)",
                    "rgba(255, 205, 86, 0.8)",
                    "rgba(40, 167, 69, 0.8)",
                    "rgba(153, 102, 255, 0.8)",
                    "rgba(255, 159, 64, 0.8)",
                ],
                hoverBackgroundColor: [
                    "rgba(0, 123, 255, 1)",
                    "rgba(255, 99, 132, 1)",
                    "rgba(255, 205, 86, 1)",
                    "rgba(40, 167, 69, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 2,
                borderColor: "rgba(255, 255, 255, 1)",
                hoverOffset: 10,
            },
        ],
    };

    const doughnutOptions = {
        plugins: {
            legend: {
                display: true,
                position: "right",
                labels: {
                    font: {
                        size: 14,
                    },
                    color: "#333",
                },
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: (tooltipItem) => {
                        const value = tooltipItem.raw;
                        const label = tooltipItem.label || "";
                        return `${label}: ${value} items`;
                    },
                },
            },
        },
        responsive: true,
        maintainAspectRatio: false,
        cutout: "60%",
    };

    const barData = {
        labels: chartData.labels,
        datasets: [
            {
                label: "Quantity",
                data: chartData.data,
                backgroundColor: "rgba(54, 162, 235, 0.8)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 2,
                hoverBackgroundColor: "rgba(54, 162, 235, 1)",
                barThickness: 40,
            },
        ],
    };

    const barOptions = {
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: (tooltipItem) => {
                        return `${tooltipItem.raw} items`;
                    },
                },
            },
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                ticks: {
                    color: "#333",
                    font: {
                        size: 14,
                    },
                },
                grid: {
                    display: false,
                },
            },
            y: {
                ticks: {
                    color: "#333",
                    font: {
                        size: 14,
                    },
                },
                grid: {
                    color: "rgba(200, 200, 200, 0.2)",
                },
            },
        },
    };

    return (
        <div
            style={{
                maxWidth: "1200px",
                margin: "auto",
                padding: "20px",
                textAlign: "center",
            }}
        >
            <h4 style={{ marginBottom: "20px" }}>Product Statistics</h4>

            <div style={{ display: "flex", flexDirection: "row", gap: "20px", justifyContent: "space-between" }}>
                <div style={{ flex: 1, height: "400px" }}>
                    {chartData.labels.length > 0 ? (
                        <Doughnut data={doughnutData} options={doughnutOptions} />
                    ) : (
                        <p>No data available</p>
                    )}
                </div>

                <div style={{ flex: 1, height: "400px" }}>
                    {chartData.labels.length > 0 ? (
                        <Bar data={barData} options={barOptions} />
                    ) : (
                        <p>No data available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StatisticsPage;
