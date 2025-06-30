import axiosInstance from "./axiosInstance";

export interface Employee {
  accountId: number;
  accountName: string;
  email: string;
  roleName: string;
}

export const getAllEmployees = async (): Promise<Employee[]> => {
  const response = await axiosInstance.get("/accounts");
  // Map POJO Account sang Employee cho FE
  return response.data.map((acc: any) => ({
    accountId: acc.accountId,
    accountName: acc.accountName,
    email: acc.email,
    roleName: acc.role?.roleName || "",
  }));
};
