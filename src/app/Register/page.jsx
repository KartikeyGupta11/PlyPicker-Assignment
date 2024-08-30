"use client";
import { useState } from "react";
import Image from "next/image";
import register from '@/app/assets/SignIn1.png';
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from 'axios';

const defaultData = {name: "", email: "", password: "", role: ""};

const Register = () => {
  const [data, setData] = useState(defaultData);
  const router = useRouter();

  const onValueChange = (e) => {
    setData({...data,[e.target.name]:e.target.value})
  }

  const onRegister = async(e) =>{
    e.preventDefault();

    console.log("name: ",data.name)
    console.log("email: ",data.email)
    console.log("password: ",data.password)
    console.log("role: ",data.role)

    if(!data.name || !data.email || !data.password || !data.role){
      alert("Please fill all the fields...");
      return;
    }

    if(data.password.length < 6){
      alert("Password must have atleast 6 Characters");
      return;
    }

    try {
      const resp = await axios.post('api/users/register',data);
      setData(defaultData);

      if(resp.status === 200){
        console.log(data.role);
        if(data.role === 'admin'){
          router.push("/AdminDashboard");
        }
        else{
          router.push("/TeamMemberDashboard");
        }
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen flex justify-start space-x-15 items-center" id="register">
      <div className="bg-gray-100 px-16 pt-8 pb-12 mb-4 ml-64 border rounded-md">
        <h1 className="text-3xl mb-4 text-center">Register</h1>

        <form className="flex flex-col mb-4">

          <label className="mb-2">Name: </label>
          <input type="text" id="name" name="name" value={data.name} 
            className="w-full p-2 text-sm text-gray-600 border border-gray-400 rounded-md mb-6"
            onChange={(e) => onValueChange(e)}>
          </input>

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

          <div className="mr-2 mb-4">
            <input type="radio" id="admin" name="role" value="admin" checked={data.role === 'admin'} className="mr-1" onChange={(e) => onValueChange(e)}></input>
            <label className="mr-4 text-[17px]">Admin</label>

            <input type="radio" id="teamMember" name="role" value="teamMember" checked={data.role === 'teamMember'} className="mr-1" onChange={(e) => onValueChange(e)}></input>
            <label className="mr-4">Team Member</label>
          </div>

          <Link href="/SignIn" className="mb-4 text-[13px] text-gray-600 hover:text-blue-700 cursor-pointer hover:underline">
            Already have an account? {""}
          </Link>

          <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full w-full"
            onClick={(e) => onRegister(e)}
          >
            Register
          </button>

          
        </form>
      </div>

      <div>
        <Image src={register} width={800} height={800} alt="Register"></Image>
      </div>
    </div>
  )
}
export default Register