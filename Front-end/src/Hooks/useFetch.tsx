import { useEffect, useState } from "react";
import { LoadDataType } from "../Types/types";

const url = "http://localhost:4000";

const useFetch = (query: string) => {
  const [status, setStatus] = useState<"idle" | "fetching" | "fetched">("idle");
  const [data, setData] = useState<LoadDataType | undefined>(undefined);

  useEffect(() => {
    if (!query) return;

    const fetchData = async (): Promise<void> => {
      setStatus("fetching");
      try {
        const response = await fetch(`${url}/${query}`);
        const data = await response.json();
        setData(data);
        setStatus("fetched");
      } catch (error) {
        setStatus("idle");
        console.error(`Failed to fetch data for query '${query}':`, error);
      }
    };

    fetchData();
  }, [query]);

  return { status, data };
};

export default useFetch;
