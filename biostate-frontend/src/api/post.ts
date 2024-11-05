import { postRequest, putRequest } from "../config/axios";

export const postPathSum = async (postData: any) => {
  const response = await postRequest("/binary-trees/calculate", postData);
  return response;
};

export const calculateLongestSubstring = async (inputString: string) => {
  const response: any = await postRequest("/substring/calculate", {
    input: inputString,
  });
  return response.data;
};

export const authenticateUser = async (postData: any) => {
  const response = await postRequest("/auth/login", postData);
  return response;
};

export const registerUser = async (postData: any) => {
  const response = await postRequest("/auth/register", postData);
  return response;
};

export const saveSubstringResult = async (result: any) => {
  const response: any = await postRequest("/substring/save", result);
  return response.data;
};

export const saveTreeResult = async (input: any) => {
  const response: any = await postRequest("/binary-trees/save", {
    input,
  });
  return response.data;
};

export const saveTree = async (input: any) => {
  const response: any = await postRequest("/binary-trees/save", {
    input,
  });
  return response.data;
};

export const calculateMaxPathAny = async (input: any) => {
  const response: any = await postRequest(
    "/binary-trees/calculate-max-path-any",
    {
      input,
    }
  );
  return response.data;
};

export const calculateMaxPathLeaf = async (input: any) => {
  const response: any = await postRequest(
    "/binary-trees/calculate-max-path-leaf",
    {
      input,
    }
  );
  return response.data;
};

export const updateUserRole = async ({
  userId,
  role,
}: {
  userId: any;
  role: any;
}) => {
  await putRequest(`/users/${userId}/role`, { role });
};
