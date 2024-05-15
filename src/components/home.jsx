import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { Link, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function MenuDefault() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = localStorage.getItem("id");

    if (storedUserData) {
      setUserData(storedUserData);
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    setUserData(null);
    navigate("/login");
  };

  return (
    <div className="bg-gray-100 p-4">
      <div className="flex justify-end items-center">
        <Menu>
          <MenuHandler>
            <Button color="gray" ripple="light">
              <div>{userData}</div>
            </Button>
          </MenuHandler>
          <MenuList>
            <MenuItem onClick={logout} color="gray" ripple="light">
              Đăng xuất
            </MenuItem>
          </MenuList>
        </Menu>
      </div>

      <div className="flex justify-center space-x-4 mt-4">
        <Button color="blue" ripple="light" className="w-96 rounded-md h-10">
          <Link to="/khaibao" className="text-white text-3xl">
            KHAI BÁO THÔNG TIN
          </Link>
        </Button>
        <Button
          color="blue"
          ripple="light"
          className="w-[340px] rounded-md h-10"
        >
          <Link to="/dangkybaohiem" className="text-white text-3xl ">
            ĐÓNG BHXH ĐIỆN TỬ
          </Link>
        </Button>
      </div>
    </div>
  );
}
