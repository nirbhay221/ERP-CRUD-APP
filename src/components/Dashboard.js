import React, { useEffect, useState } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { getProductsPerCategory } from "../services/statistics";
import ProductListView from "./productListView";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Dashboard = () => {
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

    const totalProducts = productQuantityPerCategory.length;
    const totalQuantityUsed = productQuantityPerCategory.reduce((acc, curr) => acc + (curr.Value || curr.value), 0);

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
                fontFamily: "'Poppins', sans-serif",
                backgroundColor: "#f8f9fa",
                borderRadius: "10px",
            }}
        >
            <h3
                style={{
                    textAlign: "center",
                    fontSize: "30px",
                    fontWeight: "600",
                    color: "#333",
                    marginBottom: "40px",
                }}
            >
                Dashboard
            </h3>

            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    justifyContent: "space-between",
                    marginBottom: "30px",
                }}
            >
                <div
                    style={{
                        flex: 1,
                        backgroundColor: "#fff",
                        border: "1px solid #ddd",
                        borderRadius: "12px",
                        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
                        padding: "30px 20px",
                        textAlign: "center",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    }}
                >
                    <h5 style={{ color: "#555", fontSize: "18px", marginBottom: "10px" }}>Total Products</h5>
                    <p style={{ fontSize: "30px", fontWeight: "600", color: "#333" }}>{totalProducts}</p>
                </div>

                <div
                    style={{
                        flex: 1,
                        backgroundColor: "#fff",
                        border: "1px solid #ddd",
                        borderRadius: "12px",
                        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
                        padding: "30px 20px",
                        textAlign: "center",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    }}
                >
                    <h5 style={{ color: "#555", fontSize: "18px", marginBottom: "10px" }}>Quantity Used</h5>
                    <p style={{ fontSize: "30px", fontWeight: "600", color: "#333" }}>{totalQuantityUsed}</p>
                </div>
            </div>

            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    justifyContent: "space-between",
                    marginBottom: "30px",
                }}
            >
                <div
                    style={{
                        flex: 3,
                        backgroundColor: "#fff",
                        border: "1px solid #ddd",
                        borderRadius: "12px",
                        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
                        padding: "30px",
                    }}
                >
                    <h5 style={{ marginBottom: "20px", fontSize: "22px", color: "#333" }}>Product List</h5>
                    <ProductListView />
                </div>

                <div
                    style={{
                        flex: 2,
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "#fff",
                            border: "1px solid #ddd",
                            borderRadius: "12px",
                            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
                            padding: "20px",
                            height: "300px",
                            transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        }}
                    >
                        <h5 style={{ color: "#555", fontSize: "18px", marginBottom: "15px" }}>Pie Chart</h5>
                        <div style={{ height: "230px" }}>
                            {chartData.labels.length > 0 ? (
                                <Doughnut data={doughnutData} options={doughnutOptions} />
                            ) : (
                                <p>No data available</p>
                            )}
                        </div>
                    </div>

                    <div
                        style={{
                            backgroundColor: "#fff",
                            border: "1px solid #ddd",
                            borderRadius: "12px",
                            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
                            padding: "20px",
                            height: "300px",
                            transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        }}
                    >
                        <h5 style={{ color: "#555", fontSize: "18px", marginBottom: "15px" }}>Bar Chart</h5>
                        <div style={{ height: "230px" }}>
                            {chartData.labels.length > 0 ? (
                                <Bar data={barData} options={barOptions} />
                            ) : (
                                <p>No data available</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
