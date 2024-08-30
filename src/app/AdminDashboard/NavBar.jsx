"use client"
import { useState } from "react"
import Notifications from "./Notifications";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import { useRouter } from "next/navigation";

const NavBar = ({notifications}) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    const router = useRouter();
    
    const toggleDropdown = () => {
      setShowDropdown((prev) => !prev);
    }

    const toggleNotifications = () => {
      setShowNotifications((prev) => !prev);

    };

    const onLogout = async(e) => {
      e.preventDefault();
      const resp = await axios.get('/api/users/logout');

      if(resp.status === 200){
        router.push('/SignIn')
      }
    }

  return (
    <div>
      <nav className="p-4 bg-gray-800 text-white flex justify-between items-center">
        <div></div>

        <div className="flex items-center">
          <div className="relative">
            <button onClick={toggleDropdown} className="flex items-center space-x-2">
              <CgProfile className="w-8 h-8 rounded-full"/>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                {/* <a href="/profile" className="block px-4 py-2 cursor-pointer">
                  Profile
                </a> */}

                <div className="block px-4 py-2 cursor-pointer" onClick={toggleNotifications}>
                  Pending Updates 
                  {notifications.length > 0 && `(${notifications.length})`}
                </div>

                <div onClick={(e) => onLogout(e)}>
                  <a href="/logout" className="block px-4 py-2">
                    Logout
                  </a>
                </div>

                {notifications.length > 0 && (
                  <div className="p-4">
                    <ul className="mt-2">
                      {notifications.map((notification, index) => (
                        <li key={index} className="border-b p-2">
                          {notification.message}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
      {showNotifications && <Notifications />}
    </div>
  )
}
export default NavBar;