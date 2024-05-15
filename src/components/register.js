import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [ten, setTen] = useState("");
  const [mabh, setMabh] = useState("");
  const [cccd, setCccd] = useState("");
  const [email, setEmail] = useState("");
  const [sdt, setSdt] = useState("");
  const [diaChi, setDiaChi] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ten || !cccd || !email || !sdt || !diaChi) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    try {
      await axios.post(`http://localhost:8080/users`, {
        ten,
        // mabh,
        cccd,
        email,
        sdt,
        diaChi,
      });
      alert("Đăng ký tài khoản thành công!");
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      }
    }
  };

  const handleKeyPress = (event) => {
    const charCode = event.charCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  };

  return (
    <div className="bg-[#0e387a] h-screen mx-auto">
      <h1 className="text-center text-3xl text-[#9fafca] font-extrabold pt-10 pb-10">
        Register
      </h1>
      <form className="max-w-sm mx-auto w-full" onSubmit={handleSubmit}>
        <div className="flex flex-col pt-10">
          <label htmlFor="ten" className="text-white">
            Họ và tên
          </label>
          <input
            type="text"
            className="border-none mb-3 rounded-md"
            onChange={(e) => setTen(e.target.value)}
            value={ten}
            required
          />
          {/* <label htmlFor="  mabh" className="text-white">
            Mã bảo hiểm
          </label>
          <input
            type="text"
            className="border-none mb-3 rounded-md"
            onChange={(e) => setMabh(e.target.value)}
            value={mabh}
            required
          /> */}
          <label htmlFor="cccd" className="text-white">
            CCCD
          </label>
          <input
            type="text"
            className="border-none mb-3 rounded-md"
            onChange={(e) => setCccd(e.target.value)}
            value={cccd}
            required
            pattern="[0-9]*"
            onKeyPress={handleKeyPress}
          />
          <label htmlFor="email" className="text-white">
            Email
          </label>
          <input
            type="email"
            className="border-none mb-3 rounded-md"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <label htmlFor="sdt" className="text-white">
            Số điện thoại
          </label>
          <input
            type="text"
            className="border-none mb-3 rounded-md"
            onChange={(e) => setSdt(e.target.value)}
            value={sdt}
            required
            pattern="[0-9]*"
            onKeyPress={handleKeyPress}
          />
          <label htmlFor="diaChi" className="text-white">
            Địa chỉ
          </label>
          <input
            type="text"
            className="border-none mb-3 rounded-md"
            onChange={(e) => setDiaChi(e.target.value)}
            value={diaChi}
            required
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="rounded-full text-lg leading-4 font-medium bg-blue-500 hover:bg-sky-700 h-8 mt-5 text-white"
          >
            Đăng ký
          </button>
          <div className="rounded-full cursor-pointer text-lg leading-4 font-medium bg-blue-500 hover:bg-sky-700 h-8 mt-5 text-white">
            <Link
              className="w-full h-full flex items-center justify-center"
              to={"/login"}
            >
              Đăng nhập
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
