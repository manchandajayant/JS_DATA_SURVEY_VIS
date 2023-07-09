import { useState, useEffect } from "react";
import { DataByMainLanguageAnswerType, LoadDataByToolTypeMap, LoadDataType } from "../Types/types";

const url: string = "http://localhost:4000";

const useFetch = (query: string) => {
    const [status, setStatus] = useState<string>("idle");
    const [data, setData] = useState<LoadDataType>();

    useEffect(() => {
        if (!query) return;

        const fetchData = async (): Promise<void> => {
            setStatus("fetching");
            const response = await fetch(`${url}/${query}`);
            const data = await response.json();
            setData(data);
            setStatus("fetched");
        };
        fetchData();
    }, [query as string]);

    return { status, data };
};

export default useFetch;
