import React, { useState, useEffect } from "react";

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import DashboardService from "~/service/DashboardService";

function BarChart({ year }) {
    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                data: [],
                backgroundColor: [
                    '#5a76f3',
                    '#f7f5f6',
                    '#f28c5b',
                    '#37c7a1',
                    "#f3ba2f",
                    "#2a71d0",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0",
                ],
                borderColor: "black",
                borderWidth: 1,

            },
        ],
    });

    const getRevenueByMonthForCurrentYear = async () => {
        try {
            const response = await DashboardService.getRevenueByMonthForCurrentYear(year);

            // Kiểm tra xem response có tồn tại và có thuộc tính map không
            if (response && response.map) {
                const formattedData = {
                    labels: response.map((item) => "Tháng " + item.month),
                    datasets: [
                        {
                            label: "Tổng doanh thu",
                            data: response.map((item) => item.totalRevenue),
                            backgroundColor: [
                                "rgba(75,192,192,1)",
                                "#ecf0f1",
                                "#50AF95",
                                "#f3ba2f",
                                "#2a71d0",
                            ],
                            borderColor: "black",
                            borderWidth: 1,
                        },
                    ],
                };
                setData(formattedData);
            } else {
                console.error("Invalid response format:", response);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getRevenueByMonthForCurrentYear();
    }, [year]);

    return <Bar data={data} width={"100%"} height={'500px'}
        options={{ maintainAspectRatio: false }} />;
}
export default BarChart;