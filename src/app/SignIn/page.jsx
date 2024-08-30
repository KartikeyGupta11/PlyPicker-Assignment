"use client";
import { useState } from "react";
import Image from "next/image";
import signIn from '@/app/assets/Login.png';
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from 'axios';

const defaultData = {email: "", password: "", role: ""};

const SignIn = () => {
  const [data, setData] = useState(defaultData);
  const router = useRouter();

  const onValueChange = (e) => {
    setData({...data,[e.target.name]:e.target.value})
  }

  const onSignIn = async(e) =>{
    e.preventDefault();

    if(!data.email || !data.password){
      alert("Please fill all the fields...");
      return;
    }

    if(data.password.length < 6){
      alert("Password must have atleast 6 Characters");
      return;
    }

    try {
      const resp = await axios.post('api/users/signIn',data);
      setData(defaultData);

      if(resp.status === 200){

        const userRole = resp.data.role;
        
        if(userRole === 'admin'){
          router.push("/AdminDashboard");
        }
        else{
          router.push("/TeamMemberDashboard");
        }
      }

    } catch (error) {
      console.log(error);
      alert("Login failed. Please check your credentials.");
    }

  }

  return (
    <div className="min-h-screen flex justify-start space-x-15 items-center" id="register">
      <div className="bg-gray-100 px-16 pt-8 pb-12 mb-4 ml-64 border rounded-md">
        <h1 className="text-3xl mb-4 text-center">Sign In</h1>

        <form className="flex flex-col mb-4">

          <label className="mb-2">Email: </label>
          <input type="text" id="email" name="email" value={data.email} 
            className="w-full p-2 text-sm text-gray-600 border border-gray-400 rounded-md mb-6"
            onChange={(e) => onValueChange(e)}>
          </input>

          <label className="mb-2">Password: </label>
          <input type="password" id="password" name="password" value={data.password} 
            className="w-full p-2 text-sm text-gray-600 border border-gray-400 rounded-md mb-6"
            onChange={(e) => onValueChange(e)}>
          </input>

          <Link href="/Register" className="mb-4 text-[13px] text-gray-600 hover:text-blue-700 cursor-pointer hover:underline">
            Do you have an account? {""}
          </Link>

          <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full w-full"
            onClick={(e) => onSignIn(e)}
          >
            Login
          </button>

          
        </form>
      </div>

      <div>
        <Image src={signIn} width={800} height={800} alt="Sign In" className="ml-28"></Image>
      </div>
    </div>
  )
}
export default SignIn;