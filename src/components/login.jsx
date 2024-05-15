import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [check, setCheck] = useState(false);
  const { setIsLoggedIn } = useContext(AuthContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        (user.username || "").trim() !== "" &&
        (user.password || "").trim() !== ""
      ) {
        const response = await fetch(`http://localhost:8080/users/check_log`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });

        const res = await response.json();

        if (res) {
          setCheck(res);
          localStorage.setItem("id", user.username);
          localStorage.setItem("isLoggedIn", res);
          setIsLoggedIn(res);
          alert("Đăng nhập thành công!");
          navigate("/");
        } else {
          alert("Tài khoản hoặc mật khẩu không chính xác!");
        }
      } else {
        alert("Nhập thông tin tài khoản, mật khẩu!");
      }
    } catch (error) {
      alert("Đã xảy ra lỗi! Vui lòng thử lại sau.");
    }
  };

  return (
    <div className="bg-[#0e387a] h-screen mx-auto">
      <h1 className="text-center text-3xl text-[#9fafca]  font-extrabold pt-10 pb-10">
        Đăng nhập
      </h1>
      <form className="max-w-sm mx-auto w-full">
        <div className="flex flex-col pt-10">
          <label htmlFor="email" className="text-white">
            CCCD
          </label>
          <input
            type="text"
            className="border-none mb-3 rounded-md"
            name="username"
            onChange={handleInputChange}
            required
          />
          <label htmlFor="password" className="text-white">
            Mật khẩu
          </label>
          <div className="relative w-full">
            <input
              type="password"
              className="rounded-md border-none pr-48"
              name="password"
              onChange={handleInputChange}
              required
            />
          </div>
          <button
            type="submit"
            className="rounded-full text-lg leading-4 font-medium bg-blue-500 hover:bg-sky-700 h-8 mt-5 text-white"
            onClick={handleSubmit}
          >
            <Link to={check ? "/" : "/login"}>Đăng nhập</Link>
          </button>
          <div className="rounded-full text-lg  cursor-pointer  leading-4 font-medium bg-blue-500 hover:bg-sky-700 h-8 mt-5 text-white">
            <Link
              className="w-full h-full flex items-center justify-center"
              to={"/register"}
            >
              Đăng ký
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
