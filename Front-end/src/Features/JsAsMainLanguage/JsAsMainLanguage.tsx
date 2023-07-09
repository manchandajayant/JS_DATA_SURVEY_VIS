import React, { useEffect, useRef, useState } from "react";

import useFetch from "../../Hooks/useFetch";
import { ObjectGeneric } from "../../Charts/Types/types";
import { makePieChart } from "../../Charts/PieChart";

const JsAsMainLanguage = () => {
    const [labels, setlabels] = useState<ObjectGeneric[]>([]);
    const ref = useRef<HTMLInputElement>(null);

    const { data, status } = useFetch("jsmainlangauge");

    useEffect(() => {
        if (data.length && status === "fetched") makePieChart(data, ref, setlabels);
    }, [data, status]);

    return (
        <div className="container-fluid shadow-lg bg-white rounded w-50 ms-3 mt-5 m-0 rounded" id="pie-chart">
            <p className="pie-heading p-3 pb-0 h-6">People Who would like JS to be their main language</p>
            {status === "fetched" && data.length && (
                <div>
                    <div id="chart-key">
                        {labels.map((el: ObjectGeneric, index) => {
                            return (
                                <div key={index} className="d-flex justify-content-end">
                                    <p className="pe-2 m-0" id="labels-pie-chart">
                                        {el.key}
                                    </p>
                                    <span id="circle" className="m-2" style={{ background: el.color }}></span>
                                </div>
                            );
                        })}
                    </div>
                    <div ref={ref}></div>
                </div>
            )}
        </div>
    );
};

export default JsAsMainLanguage;
