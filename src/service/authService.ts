import axios from "./axiosInstance";
import { setToken, removeToken, getToken } from "./localStorageService";

// Login
export const login = async (email: string, password: string): Promise<any> => {
  const response = await axios.post(
    "http://localhost:8080/auth/signin",
    {
      email,
      password,
    }
  );

  const token  = response.data;
  setToken(token);
  return response.data.result; // trả về thông tin user
};


// Logout – xóa token ở localStorage
export const logOut = () => {
  removeToken();
  window.location.href = "/login"; // Chuyển về login nếu cần
};


export interface UserCreationRequest {
    accountName: string;
    email: string;
    password: string;
  }

export const registerUser = async (user: UserCreationRequest): Promise<any> => {
  const response = await axios.post(
    "http://localhost:8080/auth/signup",
    user
  );
  return response.data.result;
};
export const refreshAccessToken = async (): Promise<string> => {
  const currentToken = getToken();

  const response = await axios.post(
    "http://localhost:8080/auth/refresh",
    {
      token: currentToken,
    }
  );

  const { token } = response.data;
  return token;
};

// Lấy danh sách order của user hiện tại
export const getMyOrders = async (): Promise<any[]> => {
  const response = await axios.get("http://localhost:8080/orders/accounts/me/orders");
  return response.data;
};

