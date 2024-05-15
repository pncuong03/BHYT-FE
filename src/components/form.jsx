import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dangkybaohiem = () => {
  const navigate = useNavigate();
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [tinh, setTinh] = useState("");
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedWard, setSelectedWard] = useState("");
  const [huyen, setHuyen] = useState("");
  const [xa, setXa] = useState("");
  const [soNha, setSoNha] = useState("");
  const [Ngaysinh, setNgaySinh] = useState("");
  const [userData, setUserData] = useState(null);
  const [email, setEmail] = useState("");
  const [sdt, setSdt] = useState("");

  useEffect(() => {
    const storedUserData = localStorage.getItem("id");

    if (storedUserData) {
      setUserData(storedUserData);
    }
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
      )
      .then((response) => {
        setCities(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const fetchData = async () => {
    if (!validateFields()) {
      return;
    }
    try {
      const params = new URLSearchParams({
        cccd: userData,
        Ngaysinh,
        email,
        sdt,
        tinh,
        huyen,
        xa,
        soNha,
      });
      const url = `http://localhost:8080/users?${params.toString()}`;
      axios
        .put(url)
        .then((response) => {
          alert("Khai báo thông tin thành công!");
          navigate("/");
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
    setSelectedCity(cityId);
    const selectedCityData = cities.find((city) => city.Id === cityId);
    setTinh(selectedCityData ? selectedCityData.Name : "");
    setDistricts(selectedCityData ? selectedCityData.Districts : []);
    setSelectedDistrict("");
    setWards([]);
    setSelectedWard("");
  };

  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    setSelectedDistrict(districtId);
    const selectedDistrictData = districts.find(
      (district) => district.Id === districtId
    );
    setHuyen(selectedDistrictData ? selectedDistrictData.Name : ""); // Lưu tên của huyện vào state
    setWards(selectedDistrictData ? selectedDistrictData.Wards : []);
    setSelectedWard("");
  };

  const handleWardChange = (e) => {
    const wardId = e.target.value;
    setSelectedWard(wardId);
    const selectedWardData = wards.find((ward) => ward.Id === wardId);
    setXa(selectedWardData ? selectedWardData.Name : ""); // Lưu tên của xã vào state
  };

  const goToHomePage = () => {
    navigate("/");
  };

  const validateFields = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10}$/;

    if (!Ngaysinh || !email || !sdt || !tinh || !huyen || !xa || !soNha) {
      alert("Điền và chọn đầy đủ thông tin!");
      return false;
    }

    if (!emailPattern.test(email)) {
      alert("Nhập email đúng định dạng!");
      return false;
    }

    if (!phonePattern.test(sdt)) {
      alert("Nhập số điện thoại đúng định dạng!");
      return false;
    }

    return true;
  };

  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-md">
      <h2 className="text-center text-2xl font-semibold mb-4 text-white rounded-md p-2 bg-blue-500">
        Khai báo thông tin
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
              value={userData}
              readOnly
              // onChange={(e) => setMaCccd(e.target.value)}
              className="border-gray-300 border rounded-md p-2 w-full sm:w-auto"
            />
          </div>

          <div className="flex flex-col sm:flex-row w-full sm:w-auto justify-between items-center mb-2 sm:mb-0">
            <div className="font-semibold mr-2 mb-2 sm:mb-0">Ngày sinh</div>
            <input
              type="text"
              value={Ngaysinh}
              onChange={(e) => setNgaySinh(e.target.value)}
              className="border-gray-300 border rounded-md p-2 w-full sm:w-auto"
            />
          </div>

          <div className="flex flex-col sm:flex-row w-full sm:w-auto justify-between items-center mb-2 sm:mb-0">
            <div className="font-semibold mr-2 mb-2 sm:mb-0">Email</div>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-gray-300 border rounded-md p-2 w-full sm:w-auto"
            />
          </div>

          <div className="flex flex-col sm:flex-row w-full sm:w-auto justify-between items-center mb-2 sm:mb-0">
            <div className="font-semibold mr-2 mb-2 sm:mb-0">Số điện thoại</div>
            <input
              type="text"
              value={sdt}
              onChange={(e) => setSdt(e.target.value)}
              className="border-gray-300 border rounded-md p-2 w-full sm:w-auto"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex flex-col w-full sm:w-1/3">
            <label htmlFor="selectedCity" className="font-semibold mb-1">
              Tỉnh/Thành phố
            </label>
            <select
              id="selectedCity"
              value={selectedCity}
              onChange={handleCityChange}
              className="border-gray-300 border rounded-md p-2"
            >
              <option value="">-- Chọn tỉnh thành --</option>
              {cities.map((city) => (
                <option key={city.Id} value={city.Id}>
                  {city.Name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col w-full sm:w-1/3">
            <label htmlFor="selectedDistrict" className="font-semibold mb-1">
              Quận/Huyện
            </label>
            <select
              id="selectedDistrict"
              value={selectedDistrict}
              onChange={handleDistrictChange}
              className="border-gray-300 border rounded-md p-2"
              disabled={!selectedCity}
            >
              <option value="">-- Chọn quận huyện --</option>
              {districts.map((district) => (
                <option key={district.Id} value={district.Id}>
                  {district.Name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col w-full sm:w-1/3">
            <label htmlFor="selectedWard" className="font-semibold mb-1">
              Phường/Xã
            </label>
            <select
              id="selectedWard"
              value={selectedWard}
              onChange={handleWardChange}
              className="border-gray-300 border rounded-md p-2"
              disabled={!selectedDistrict}
            >
              <option value="">-- Chọn phường xã --</option>
              {wards.map((ward) => (
                <option key={ward.Id} value={ward.Id}>
                  {ward.Name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col w-full sm:w-1/3">
            <div className="font-semibold mb-1">Số nhà</div>
            <input
              type="text"
              value={soNha}
              onChange={(e) => setSoNha(e.target.value)}
              className="border-gray-300 border rounded-md p-2 w-full sm:w-auto"
            />
          </div>
        </div>

        {/* <div className="flex flex-col justify-between sm:flex-row mb-4">
          
        </div> */}

        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={fetchData}
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dangkybaohiem;
