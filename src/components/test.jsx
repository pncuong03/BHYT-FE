import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dangkybaohiem = () => {
  const navigate = useNavigate();

  const [MaCccd, setMaCccd] = useState("");
  const [huyen, setHuyen] = useState("");
  const [DoiTuong, setDoiTuong] = useState("");
  const [NoiKham, setNoiKham] = useState("");
  const [LoaiBaoHiem, setLoaiBaoHiem] = useState("");
  const [SoThang, setSoThang] = useState("");
  const [tinh, setTinh] = useState("");
  const [xa, setXa] = useState("");
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const params = {
        MaCccd,
        DoiTuong,
        tinh,
        huyen,
        xa,
        SoThang,
        NoiKham,
        LoaiBaoHiem,
      };

      axios
        .get("http://localhost:8080/users/tinh", { params })
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCityChange = (e) => {
    const cityId = e.target.value;
    setTinh(cityId);
    setHuyen("");
    setXa("");
  };

  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    setHuyen(districtId);
    setXa("");
  };

  const handleWardChange = (e) => {
    const wardId = e.target.value;
    setXa(wardId);
  };

  const goToHomePage = () => {
    navigate("/");
  };

  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-md">
      <h2 className="text-center text-2xl font-semibold text-white rounded-md p-2 bg-blue-500">
        Đăng ký bảo hiểm
      </h2>

      <button
        type="button"
        onClick={goToHomePage}
        className="rounded-full w-32 text-lg leading-4 font-medium bg-blue-500 hover:bg-sky-700  h-8 mt-5 text-white mb-4"
      >
        Trang chủ
      </button>
      <div>
        <h2 className="text-xl font-semibold mb-4">Thông tin cá nhân</h2>
        <div className="flex flex-col justify-between sm:flex-row mb-4">
          <div className="flex flex-col sm:flex-row w-full sm:w-auto justify-between items-center mb-2 sm:mb-0">
            <div className="font-semibold mr-2 mb-2 sm:mb-0">Số CCCD</div>
            <input
              type="text"
              value={MaCccd}
              onChange={(e) => setMaCccd(e.target.value)}
              className="border-gray-300 border rounded-md p-2 w-full sm:w-auto"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex flex-col w-full sm:w-1/3">
            <label htmlFor="tinh" className="font-semibold mb-1">
              Tỉnh/Thành phố
            </label>
            <input
              type="text"
              id="tinh"
              value={tinh}
              onChange={handleCityChange}
              className="border-gray-300 border rounded-md p-2"
              placeholder="Nhập tỉnh thành"
            />
          </div>

          <div className="flex flex-col w-full sm:w-1/3">
            <label htmlFor="huyen" className="font-semibold mb-1">
              Quận/Huyện
            </label>
            <input
              type="text"
              id="huyen"
              value={huyen}
              onChange={handleDistrictChange}
              className="border-gray-300 border rounded-md p-2"
              placeholder="Nhập quận huyện"
              disabled={!tinh}
            />
          </div>
          <div className="flex flex-col w-full sm:w-1/3">
            <label htmlFor="xa" className="font-semibold mb-1">
              Phường/Xã
            </label>
            <input
              type="text"
              id="xa"
              value={xa}
              onChange={handleWardChange}
              className="border-gray-300 border rounded-md p-2"
              placeholder="Nhập phường xã"
              disabled={!huyen}
            />
          </div>
        </div>

        <div className="flex flex-col gap-20 sm:flex-row mb-4">
          <div className="flex flex-col sm:flex-row w-full justify-between items-center">
            <div className="flex flex-col sm:flex-row w-full sm:w-auto justify-between items-center mb-2 sm:mb-0">
              <div className="font-semibold mr-2 mb-2 sm:mb-0">Đối tượng</div>
              <select
                value={DoiTuong}
                onChange={(e) => setDoiTuong(e.target.value)}
                className="border-gray-300 border rounded-md p-2 w-full sm:w-auto"
              >
                <option value="">-- Chọn đối tượng --</option>
                <option value="khac">Khác</option>
                <option value="Sinh Vien">Sinh Viên</option>
                <option value="Nguoi Lao Dong">Người Lao Động</option>
                <option value="Ho Ngheo">Hộ Nghèo</option>
                <option value="Ho Can Ngheo">Hộ Cận Nghèo</option>
              </select>
            </div>
            <div className="flex flex-col sm:flex-row w-full sm:w-auto justify-between items-center mb-2 sm:mb-0">
              <div className="font-semibold mr-2 mb-2 sm:mb-0">Nơi khám</div>
              <select
                value={NoiKham}
                onChange={(e) => setNoiKham(e.target.value)}
                className="border-gray-300 border rounded-md p-2 w-full sm:w-auto"
              >
                <option value="">-- Chọn nơi khám --</option>
                <option value="khac">Khác</option>
                <option value="Benh Vien">Bệnh Viện</option>
                <option value="Tram Y Te">Trạm Y Tế</option>
              </select>
            </div>
            <div className="flex flex-col sm:flex-row w-full sm:w-auto justify-between items-center mb-2 sm:mb-0">
              <div className="font-semibold mr-2 mb-2 sm:mb-0">
                Loại bảo hiểm
              </div>
              <select
                value={LoaiBaoHiem}
                onChange={(e) => setLoaiBaoHiem(e.target.value)}
                className="border-gray-300 border rounded-md p-2 w-full sm:w-auto"
              >
                <option value="">-- Chọn loại bảo hiểm --</option>
                <option value="khac">Khác</option>
                <option value="Co Ban">Cơ Bản</option>
                <option value="Phong Mach">Phòng Mạch</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-20 sm:flex-row mb-4">
          <div className="flex flex-col sm:flex-row w-full justify-between items-center">
            <div className="flex flex-col sm:flex-row w-full sm:w-auto justify-between items-center mb-2 sm:mb-0">
              <div className="font-semibold mr-2 mb-2 sm:mb-0">
                Phương thức đóng
              </div>
              <select
                value={SoThang}
                onChange={(e) => setSoThang(e.target.value)}
                className="border-gray-300 border rounded-md p-2 w-full sm:w-auto"
              >
                <option value="">-- Chọn phương thức đóng --</option>
                <option value="1">1 tháng</option>
                <option value="3">3 tháng</option>
                <option value="6">6 tháng</option>
                <option value="12">12 tháng</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={fetchData}
          >
            Xác nhận
          </button>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Hóa đơn</h3>
          <p className="bg-gray-100 p-4 rounded-md mb-4">Ngày bắt đầu:</p>
        </div>
      </div>
    </div>
  );
};

export default Dangkybaohiem;
