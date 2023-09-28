import { useState, useEffect } from "react";
import axios from "axios";

const worker = new Worker("./worker.js", { type: "module" });

function useApiCall(apiUrl: string) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null | unknown>(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  return { isLoading, data, error };
}

function useApiWebWorker(apiUrl: string) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null | unknown>(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        worker.postMessage({ type: "through", url: apiUrl });
        worker.onmessage = function (ev) {
          const resp = ev.data;
          setData(resp);
        };
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  return { isLoading, data, error };
}

export { useApiCall, useApiWebWorker };
