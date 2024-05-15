import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dangkybaohiem = () => {
  const navigate = useNavigate();
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [DoiTuong, setDoiTuong] = useState("");
  const [NoiKham, setNoiKham] = useState("");
  const [LoaiBaoHiem, setLoaiBaoHiem] = useState("");
  const [SoThang, setSoThang] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [tinh, setTinh] = useState("");
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedWard, setSelectedWard] = useState("");
  const [huyen, setHuyen] = useState("");
  const [xa, setXa] = useState("");
  const [data, setData] = useState(null);
  const [visible, setVisible] = useState(false);

  const [userData, setUserData] = useState(null);

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
      const params = {
        MaCccd: userData,
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
          setVisible(true);
          alert("Đăng ký bảo hiểm thành công!");
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

    if (
      !DoiTuong ||
      !SoThang ||
      !NoiKham ||
      !tinh ||
      !huyen ||
      !xa ||
      !LoaiBaoHiem
    ) {
      alert("Chọn đầy đủ thông tin!");
      return false;
    }

    return true;
  };

  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-md">
      <h2 className="text-center text-2xl font-semibold mb-4 text-white rounded-md p-2 bg-blue-500">
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
              value={userData}
              readOnly
              // onChange={(e) => setMaCccd(e.target.value)}
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

        {visible && (
          <form className="bg-gray-100 p-4 rounded-md mb-4 flex flex-wrap justify-between">
            <div className="mb-4 flex-grow">
              <label htmlFor="maHoaDon" className="font-semibold block">
                Mã hóa đơn:
              </label>
              <input
                type="text"
                id="maHoaDon"
                value={data?.maHoaDon}
                readOnly
                className="border-gray-300 border rounded-md p-2 mt-2"
              />
            </div>
            <div className="mb-4 flex-grow">
              <label htmlFor="ngayTao" className="font-semibold block">
                Ngày tạo:
              </label>
              <input
                type="text"
                id="ngayTao"
                value={data?.ngayTao}
                readOnly
                className="border-gray-300 border rounded-md p-2 mt-2"
              />
            </div>
            <div className="mb-4 flex-grow">
              <label htmlFor="hoTro" className="font-semibold block">
                Tiền hỗ trợ: (VND)
              </label>
              <input
                type="text"
                id="hoTro"
                value={data?.hoTro}
                readOnly
                className="border-gray-300 border rounded-md p-2 mt-2"
              />
            </div>
            <div className="mb-4 flex-grow">
              <label htmlFor="tongTien" className="font-semibold block">
                Tổng tiền: (VND)
              </label>
              <input
                type="text"
                id="tongTien"
                value={data?.tongTien}
                readOnly
                className="border-gray-300 border rounded-md p-2 mt-2"
              />
            </div>
            <div className="mb-4 flex-grow">
              <label htmlFor="tienNop" className="font-semibold block">
                Tiền phải nộp: (VND)
              </label>
              <input
                type="text"
                id="tienNop"
                value={data?.tienNop}
                readOnly
                className="border-gray-300 border rounded-md p-2 mt-2"
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Dangkybaohiem;
