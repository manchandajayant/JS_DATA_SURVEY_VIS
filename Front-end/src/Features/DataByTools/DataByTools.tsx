import React, { useEffect, useRef, useState } from "react";

import useFetch from "../../Hooks/useFetch";
import { makeBarChart } from "../../Charts/BarChart";

import Dropdown from "../../Components/Dropdown/Dropdown";
import { DataByToolTypeMap, LoadDataByToolTypeMap, ObjectGeneric } from "../../Types/types";

const DataByTools = () => {
    const ref = useRef<HTMLInputElement>(null);
    const [updated, setupdated] = useState<boolean>(false);
    const [selected, setSelected] = useState<string>("");

    const clickTool = (option: DataByToolTypeMap) => {
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

const getProcessedData = (data: LoadDataByToolTypeMap[]): DataByToolTypeMap[] | [] => {
    if (!data) return [];
    var convertObjectToArray = (Object as ObjectGeneric)
        .entries(data)
        .map((element: ObjectGeneric) => ({ [element[0]]: element[1] }));
    return convertObjectToArray.map((value: LoadDataByToolTypeMap): DataByToolTypeMap[] => ({
        tool: Object.keys(value)[0],
        ...(Object as ObjectGeneric).values(value)[0],
    }));
};

export default DataByTools;
