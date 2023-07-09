import React, { useEffect, useRef, useState } from "react";

import useFetch from "../../Hooks/useFetch";
import { makeBarChart } from "../../Charts/BarChart";

import Dropdown from "../../Components/Dropdown/Dropdown";
import { ObjectGeneric } from "../../Charts/PieChart";

const DataByTools = () => {
    const ref = useRef<HTMLInputElement>(null);
    const [updated, setupdated] = useState(false);
    const [selected, setSelected] = useState("");

    const clickTool = (option: any) => {
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

const getProcessedData = (data: any[]) => {
    if (!data) return [];
    var convertObjectToArray = (Object as ObjectGeneric).entries(data).map((e: ObjectGeneric) => ({ [e[0]]: e[1] }));
    return convertObjectToArray.map((el: any) => {
        return {
            tool: Object.keys(el)[0],
            ...(Object as ObjectGeneric).values(el)[0],
        };
    });
};

export default DataByTools;
