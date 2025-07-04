import axios from "./axiosInstance";

export interface Category {
  categoryId: string;
  categoryName: string;
}

export interface Orchid {
  orchidId: string;
  isNatural: boolean;
  orchidDescription: string;
  orchidName: string;
  orchidUrl: string;
  price: number;
  category: Category;
}

const API_BASE_URL = "http://localhost:8080/orchids";

// Lấy danh sách hoa lan có phân trang & lọc
export const getOrchids = async (params: {
  name?: string;
  categoryId?: string;
  isNatural?: boolean;
  from?: number;
  to?: number;
  page?: number;
  size?: number;
}): Promise<any> => {
  const response = await axios.get(API_BASE_URL, { params });
  return response.data;
};

// Lấy chi tiết hoa lan theo ID
export const getOrchidById = async (id: string): Promise<Orchid> => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data;
};

// Tạo mới hoa lan
export const createOrchid = async (orchid: Orchid): Promise<Orchid> => {
  const response = await axios.post(API_BASE_URL, orchid);
  return response.data;
};

// Cập nhật hoa lan
export const updateOrchid = async (
  id: string,
  orchid: Orchid
): Promise<Orchid> => {
  const response = await axios.patch(`${API_BASE_URL}/${id}`, orchid);
  return response.data;
};

// Xóa hoa lan
export const deleteOrchid = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};
