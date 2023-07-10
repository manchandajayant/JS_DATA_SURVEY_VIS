import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import useFetch from "../../Hooks/useFetch";
import { DataByMainLanguageAnswerType, ObjectGeneric } from "../../Types/types";
import { makePieChart } from "../../Charts/PieChart";

const JsAsMainLanguage: React.FC = (): JSX.Element => {
  const [labels, setLabels] = useState<ObjectGeneric[]>([]);
  const ref = useRef<HTMLInputElement>(null);

  const { data, status } = useFetch("jsmainlangauge");

  useEffect(() => {
    if (data?.length && status === "fetched") {
      makePieChart(data as DataByMainLanguageAnswerType[], ref, setLabels);
    }
  }, [data, status]);

  const renderLabels = useCallback(
    () =>
      labels.map((el: ObjectGeneric, index) => (
        <div key={index} className="d-flex justify-content-end">
          <p className="pe-2 m-0" id="labels-pie-chart">
            {el.key}
          </p>
          <span id="circle" className="m-2" style={colorCircleAnnotationStyle(el)}></span>
        </div>
      )),
    [labels]
  );

  const renderedLabels = useMemo(renderLabels, [labels]);

  return (
    <div className="container-fluid shadow-lg bg-white rounded w-50 ms-3 mt-5 m-0 rounded" id="pie-chart">
      <p className="pie-heading p-3 pb-0 h-6">People Who would like JS to be their main language</p>
      {status === "fetched" && data?.length && (
        <div>
          <div id="chart-key">{renderedLabels}</div>
          <div ref={ref}></div>
        </div>
      )}
    </div>
  );
};

const colorCircleAnnotationStyle = (el: ObjectGeneric) => ({ background: el.color });

export default JsAsMainLanguage;
