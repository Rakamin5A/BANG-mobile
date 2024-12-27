import { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = process.env.EXPO_PUBLIC_BASE_URL;

const useAxios = (axiosParams) => {
  const [response, setResponse] = useState(undefined);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const sendRequest = async (params) => {
    try {
      const result = await axios.request(params);

      setResponse(result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    sendRequest(axiosParams);
  }, []);

  return { response, error, loading, sendRequest };
};

export default useAxios;
