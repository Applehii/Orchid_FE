export const getRolesFromToken = (): string[] => {
  const token = localStorage.getItem("accessToken");
  if (!token) return [];
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    // Nếu backend trả về role dạng chuỗi ("scope": "SUPER_ADMIN")
    if (typeof payload.scope === "string") {
      // Có thể là "ADMIN" hoặc "SUPER_ADMIN" hoặc "ADMIN SUPER_ADMIN"
      return payload.scope.split(/\s+/);
    }
    // Nếu backend trả về roles dạng mảng
    if (Array.isArray(payload.roles)) {
      return payload.roles;
    }
    if (Array.isArray(payload.authorities)) {
      return payload.authorities;
    }
    return [];
  } catch (error) {
    console.error("Invalid token", error);
    return [];
  }
};
export const getAccountIdFromToken = (): number | null => {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return Number(payload.sub); // Vì backend set accountId vào "subject"
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};
