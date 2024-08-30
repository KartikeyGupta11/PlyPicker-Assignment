"use client"
import { useState } from "react"
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import { useRouter } from "next/navigation";

const NavBar = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const router = useRouter();
    
    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev);
    }

    const onLogout = async(e) => {
      e.preventDefault();
      const resp = await axios.get('/api/users/logout');

      if(resp.status === 200){
        router.push('/SignIn')
      }
    }

    const onProfile = async(e) => {
        e.preventDefault();
        router.push('/Profile')
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
                            {/* <div onClick={(e) => onProfile(e)}>
                                <a href="/profile" className="block px-4 py-2">
                                    Profile
                                </a>    
                            </div> */}
                            
                            {/* <a href="/logout" className="block px-4 py-2">
                                Notifications
                            </a> */}

                            <div onClick={(e) => onLogout(e)}>
                                <a href="/logout" className="block px-4 py-2">
                                    Logout
                                </a>
                            </div>

                        </div>
                    )}
                </div>
            </div>
        </nav>
    </div>
  )
}
export default NavBar;