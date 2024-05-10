import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from './AuthProvider';

export default function Home() {
  const { role, token } = useContext(AuthContext);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/home', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setData(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/home/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchData(); // Gọi lại hàm fetchData để cập nhật danh sách dữ liệu
    } catch (error) {
      console.error('Lỗi khi xóa:', error);
    }
  };

  useEffect(() => {
    if (role === 'user' || role === 'admin') {
      fetchData(); // Gọi hàm fetchData khi component được render hoặc role thay đổi
    }
  }, [role]);

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          <p>ID: {item.id}</p>
          <p>Gmail: {item.gmail}</p>
          <p>Role: {item.role}</p>
          {role === 'admin' && <button onClick={() => handleDelete(item.id)}>Xóa</button>}
        </div>
      ))}
    </div>
  );
}
