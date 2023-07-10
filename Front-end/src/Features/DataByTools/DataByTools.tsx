import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import useFetch from "../../Hooks/useFetch";
import { makeBarChart } from "../../Charts/BarChart";
import Dropdown from "../../Components/Dropdown/Dropdown";
import { DataByToolTypeMap, LoadDataType, ObjectGeneric } from "../../Types/types";

const DataByTools: React.FC = (): JSX.Element => {
    const ref = useRef<HTMLInputElement>(null);
    const [updated, setUpdated] = useState<boolean>(false);
    const [selected, setSelected] = useState<string>("");

    const clickTool = useCallback((option: DataByToolTypeMap) => {
        setSelected(option.tool);
        setUpdated(true);
    }, []);

    const { data, status } = useFetch("dataByTools");

    const processData = getProcessedData(data);

    useEffect(() => {
        if (processData.length && !selected) {
            makeBarChart(processData, updated, setUpdated, ref);
        }
    }, [processData, selected, updated]);

    useEffect(() => {
        if (updated) {
            makeBarChart(processData, updated, setUpdated, ref, selected);
        }
    }, [processData, selected, updated]);

    return (
        <div className="container-fluid shadow-lg bg-white rounded w-50 ms-3 mt-5 m-0 rounded" id="bar-chart">
            <p className="pie-heading p-3 pb-0 h-6">Preference By JS Tool</p>

            {status === "fetched" && (
                <div>
                    <Dropdown
                        selected={selected ? selected : processData[0]?.tool}
                        onClick={clickTool}
                        data={processData}
                    />
                    <div ref={ref}></div>
                </div>
            )}
        </div>
    );
};

const getProcessedData = (data: LoadDataType): DataByToolTypeMap[] => {
    if (!data) {
        return [];
    }

    const convertObjectToArray = (Object as ObjectGeneric)
        .entries(data)
        .map((element: ObjectGeneric) => ({ [element[0]]: element[1] }));
    return convertObjectToArray.map((value: LoadDataType) => ({
        tool: (Object as ObjectGeneric).keys(value)[0],
        ...(Object as ObjectGeneric).values(value)[0],
    }));
};

export default DataByTools;
