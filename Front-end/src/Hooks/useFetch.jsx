import { useState, useEffect } from "react";

const url = "http://localhost:4000";

const useFetch = (query) => {
    const [status, setStatus] = useState("idle");
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!query) return;

        const fetchData = async () => {
            setStatus("fetching");
            const response = await fetch(`${url}/${query}`);
            const data = await response.json();
            setData(data);
            setStatus("fetched");
        };

        fetchData();
    }, [query]);

    return { status, data };
};

export default useFetch;
