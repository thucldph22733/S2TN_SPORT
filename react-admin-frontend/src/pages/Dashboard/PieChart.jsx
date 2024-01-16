import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import DashboardService from "~/service/DashboardService";

function PieChart({ filter }) {
    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                data: [],
                backgroundColor: [
                    "#5a76f3",
                    "#f7f5f6",
                    "#f28c5b",
                    "#37c7a1",
                    "#f3ba2f",
                    "#2a71d0",
                ],
                borderColor: "black",
                borderWidth: 1,
            },
        ],
    });

    const getTotalOrdersByStatus = async () => {
        try {
            const response = await DashboardService.getTotalOrdersByStatus(filter);

            // Kiểm tra xem response có tồn tại và có thuộc tính map không
            if (Array.isArray(response)) {
                const formattedData = {
                    labels: response.map((item) => item.statusName),
                    datasets: [
                        {
                            label: "Số đơn",
                            data: response.map((item) => item.orderCount),
                            backgroundColor: [
                                "#5a76f3",
                                "#f28c5b",
                                "#37c7a1",
                                "#f3ba2f",
                                "#2a71d0",
                            ],
                            borderColor: "black",
                            borderWidth: 1,
                        },
                    ],
                };
                setData(formattedData);
                console.log(response);
            } else {
                console.error("Invalid response format:", response);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getTotalOrdersByStatus();
    }, [filter]);

    return <Pie data={data}
        options={{ maintainAspectRatio: false }} />;
}

export default PieChart;