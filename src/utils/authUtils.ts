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
