import React from "react";

const Unauthorized: React.FC = () => {
  return (
    <div style={{ textAlign: "center", marginTop: 80 }}>
      <h1>403 - Forbidden</h1>
      <p>Bạn không có quyền truy cập trang này.</p>
    </div>
  );
};

export default Unauthorized;
