import { getRequest } from "../config/axios";

export const fetchUserSubstringHistory = async () => {
  const response: any = await getRequest("/substring/history");
  return response.data;
};

export const fetchUserTreeHistory = async () => {
  const response: any = await getRequest("/binary-trees/history");
  return response.data;
};

export const fetchAllUsers = async () => {
  const response: any = await getRequest("/users");
  return response.data;
};
