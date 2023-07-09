import React, { useEffect, useRef, useState } from "react";

import useFetch from "../../Hooks/useFetch";
import { makeBarChart } from "../../Charts/BarChart";

import Dropdown from "../../Components/Dropdown/Dropdown";

const DataByTools = () => {
    const ref = useRef(null);
    const [updated, setupdated] = useState(false);
    const [selected, setSelected] = useState("");

    const clickTool = (option) => {
        setSelected(option.tool);
        setupdated(true);
    };

    const { data, status } = useFetch("dataByTools");

    const processData = getProcessedData(data);

    useEffect(() => {
        if (processData.length && !selected) {
            makeBarChart(processData, updated, setupdated, ref);
        }
    }, [processData]);

    useEffect(() => {
        if (updated) makeBarChart(processData, updated, setupdated, ref, selected);
    }, [updated]);

    return (
        <div className="container-fluid shadow-lg bg-white rounded w-50 ms-3 mt-5 m-0 rounded" id="bar-chart">
            <p className="pie-heading p-3 pb-0 h-6">Preference By JS Tool</p>

            {status === "fetched" && (
                <div>
                    <Dropdown
                        selected={selected ? selected : processData[0].tool}
                        onClick={clickTool}
                        data={processData}
                    />
                    <div ref={ref}></div>
                </div>
            )}
        </div>
    );
};

const getProcessedData = (data) => {
    if (!data) return [];
    var convertObjectToArray = Object.entries(data).map((e) => ({ [e[0]]: e[1] }));
    return convertObjectToArray.map((el) => {
        return {
            tool: Object.keys(el)[0],
            ...Object.values(el)[0],
        };
    });
};

export default DataByTools;
