import React from "react";
import { useNavigate } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
    const navigate = useNavigate();

    const productData = [
        { id: 1, name: "Product A", category: "Category 1", quantity: 50 },
        { id: 2, name: "Product B", category: "Category 2", quantity: 30 },
        { id: 3, name: "Product C", category: "Category 3", quantity: 20 },
    ];

    const chartData = {
        labels: ["Category 1", "Category 2", "Category 3"],
        datasets: [
            {
                data: [50, 30, 20],
                backgroundColor: [
                    "rgba(0, 123, 255, 0.8)",
                    "rgba(255, 99, 132, 0.8)",
                    "rgba(40, 167, 69, 0.8)",
                ],
                hoverBackgroundColor: [
                    "rgba(0, 123, 255, 1)",
                    "rgba(255, 99, 132, 1)",
                    "rgba(40, 167, 69, 1)",
                ],
                borderWidth: 2,
                borderColor: "rgba(255, 255, 255, 1)",
                hoverOffset: 10,
            },
        ],
    };

    const chartOptions = {
        plugins: {
            legend: {
                display: true,
                position: "right",
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div style={{ maxWidth: "1200px", margin: "auto", padding: "20px" }}>
            <h3>Dashboard</h3>
            <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
                <div
                    style={{
                        flex: 2,
                        backgroundColor: "#fff",
                        border: "1px solid #ddd",
                        borderRadius: "10px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        padding: "20px",
                        cursor: "pointer",
                        transition: "transform 0.2s, box-shadow 0.2s",
                    }}
                    onClick={() => navigate("/products")}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.02)";
                        e.currentTarget.style.boxShadow =
                            "0 8px 16px rgba(0, 0, 0, 0.2)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.boxShadow =
                            "0 4px 8px rgba(0, 0, 0, 0.1)";
                    }}
                >
                    <h5 style={{ marginBottom: "10px" }}>Product Table</h5>
                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            textAlign: "left",
                        }}
                    >
                        <thead>
                            <tr>
                                <th
                                    style={{
                                        border: "1px solid #ddd",
                                        padding: "8px",
                                    }}
                                >
                                    ID
                                </th>
                                <th
                                    style={{
                                        border: "1px solid #ddd",
                                        padding: "8px",
                                    }}
                                >
                                    Name
                                </th>
                                <th
                                    style={{
                                        border: "1px solid #ddd",
                                        padding: "8px",
                                    }}
                                >
                                    Category
                                </th>
                                <th
                                    style={{
                                        border: "1px solid #ddd",
                                        padding: "8px",
                                    }}
                                >
                                    Quantity
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {productData.map((product) => (
                                <tr key={product.id}>
                                    <td
                                        style={{
                                            border: "1px solid #ddd",
                                            padding: "8px",
                                        }}
                                    >
                                        {product.id}
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #ddd",
                                            padding: "8px",
                                        }}
                                    >
                                        {product.name}
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #ddd",
                                            padding: "8px",
                                        }}
                                    >
                                        {product.category}
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #ddd",
                                            padding: "8px",
                                        }}
                                    >
                                        {product.quantity}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div
                    style={{
                        flex: 1,
                        backgroundColor: "#fff",
                        border: "1px solid #ddd",
                        borderRadius: "10px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        padding: "20px",
                        cursor: "pointer",
                        transition: "transform 0.2s, box-shadow 0.2s",
                    }}
                    onClick={() => navigate("/statistics")}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.02)";
                        e.currentTarget.style.boxShadow =
                            "0 8px 16px rgba(0, 0, 0, 0.2)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.boxShadow =
                            "0 4px 8px rgba(0, 0, 0, 0.1)";
                    }}
                >
                    <h5 style={{ marginBottom: "10px" }}>Statistics</h5>
                    <div style={{ height: "300px" }}>
                        <Doughnut data={chartData} options={chartOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
