import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const Pricing = () => {
    const [jsonDataArray, setJsonDataArray] = useState([]);
    const [chartData, setChartData] = useState(null);
    const [chartType, setChartType] = useState("daily");

    useEffect(() => {
        const fetchData = async () => {
        try {
            // Fetch all JSON files from frontend_json_dataset folder
            const context = require.context(
            "/src/frontend_json_dataset", false, /\.json$/);
            const fileKeys = context.keys();
            
            // Import all JSON files
            const files = await Promise.all(
            fileKeys.map(async (key) => {
                try {
                    const file = await import(
                    `/src/frontend_json_dataset/${key.slice(2)}`
                    );
                    return file.default;
                } catch (error) {
                    console.error(`Error loading JSON file: ${key}`, error);
                    return null;
                }
            }));

            const jsonDataArray = files.filter((file) => file !== null);

            // Function to convert Array into Hashmap; array[0]["Name"] to specify key
            const convertArraysToHashMaps = (arrays) =>
            arrays.reduce((acc, array) => {
                acc[array[0]["Name"]] = array;
                return acc;
            }, {});
            
            const jsonDataDict = convertArraysToHashMaps(jsonDataArray);
            setJsonDataArray(jsonDataDict);
        } catch (error) {
            console.error("Error fetching JSON files:", error);
        }
        };
        fetchData();
    }, []);

    // Upon jsonDataArray change, process data into chart data
    useEffect(() => {
        if (jsonDataArray) {
            const chartData = Object.entries(jsonDataArray).map(
            ([currency, data]) => processChartData(data, chartType)
        );
        setChartData(chartData);
        }
    }, [jsonDataArray, chartType]);

    // Function to process JSON data into chart data
    const processChartData = (data, type) => {
        if (!data || data.length === 0) {
        return null;
        }
        
        // Set interval to 1 day by default:
        let interval = 1;
        if (type === "quarterly") {
            interval = 90;
        } else if (type === "yearly") {
            interval = 365;
        }
    
        const labels = [];
        const prices = [];
        
        // Loop through data and push Date and Close values into labels and prices arrays
        for (let i = 0; i < data.length; i += interval) {
            const item = data[i];
            if (item.Date && item.Close) {
                labels.push(item.Date);
                prices.push(parseFloat(item.Close));
            }
        }
    
        if (labels.length !== prices.length) {
            return null;
        }
        
        // Format of chartData
        const chartData = {
            name: data[0].Name,
            data: prices.map((price, index) => ({ 
                x: labels[index], 
                y: price 
            })),
        };
    
        return chartData;
    };

    // Function to change chart type between daily, quarterly, and yearly
    const handleChartTypeChange = (type) => {
        setChartType(type);
    };

    // Chart Options (ApexCharts)
    const options = {
        chart: {
            type: "line",
            toolbar: {
                show: true,
                offsetY: -25,
            },
        },
        xaxis: {
            type: "datetime",
            title: {
                text: "Date (dd/mm/yyyy)",
                style: {
                fontSize: "14px",
                },
            },
        },
        yaxis: {
            opposite: false,
            title: {
                text: "Price ($)",
                style: {
                    fontSize: "14px",
                },
            },
        },
        dataLabels: {
            enabled: false,
        },
        tooltip: {
            x: {
                format: "dd MMM yyyy",
            },
        },
    };

    return (
        <div>
            <div>
                <button onClick={() => handleChartTypeChange("daily")}>
                    Daily
                </button>
                <button onClick={() => handleChartTypeChange("quarterly")}>
                Quarterly
                </button>
                <button onClick={() => handleChartTypeChange("yearly")}>
                    Yearly
                </button>
            </div>
            <div id="line-chart" className="line-chart">
                {chartData && (
                <ReactApexChart
                    options={options}
                    series={chartData}
                    type="line"
                    height={500}
                />
                )}
                <p>Filter Graphs by clicking on their Legend</p>
            </div>
        </div>
    );
};

export default Pricing;