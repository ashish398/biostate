import axios, { AxiosError } from "axios";

const instance = axios.create({
  baseURL: `http://localhost:3001/api`,
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

const handleError = (error: unknown): never => {
  if (error instanceof AxiosError) {
    const status = error.response?.status ?? 500;
    const message = error.message || "An error occurred";
    throw new Error(`HTTP ${status}: ${message}`);
  }
  throw new Error("An unexpected error occurred");
};

export const getRequest = async (url: string) => {
  try {
    const res = await instance.get(url);
    return res;
  } catch (error) {
    handleError(error);
  }
};

export const postRequest = async (url: string, data: any = {}, config = {}) => {
  try {
    console.log("sending post request");
    const res = await instance.post(url, data, { ...config });
    return res;
  } catch (error) {
    handleError(error);
  }
};

export const deleteRequest = async (url: string) => {
  try {
    const res = await instance.delete(url);
    return res;
  } catch (error) {
    handleError(error);
  }
};

export const putRequest = async (url: string, data: any = {}, config = {}) => {
  try {
    const res = await instance.put(url, data, { ...config });
    return res;
  } catch (error) {
    handleError(error);
  }
};
