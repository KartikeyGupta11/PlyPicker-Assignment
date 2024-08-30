import { cookies } from "next/headers";
import Profile from "./page";
import { NextResponse } from 'next/server';


const ProfilePage = () => {
    try {
      const resp = NextResponse.json({
        success:true
      })

      resp.cookies.get('token',"",{httpOnly:true});
    } catch (error) {
      console.log(error);
      return new Response("Something Went Wrong",{status:500})
    }
  return (
    <Profile token={Token}></Profile>
  )
}
export default ProfilePage