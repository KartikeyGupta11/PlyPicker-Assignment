"use client"
import { useEffect, useState } from "react"

const Profile = ({token}) => {
  const [user,setUser] = useState(null);

  useEffect(() => {
    console.log("token: ",token);

    const fetchUser = async() => {
      try {
        const resp = await fetch('api/users/profile')

        if(!resp.ok){
          throw new Error('Network response is not Ok...')
        }
        const data = await resp.json();
        setUser(data);
      } catch (error) {
        console.error(error);
        setError('Failed to load products...');
      }
    }
    fetchUser();
  },[token])
  // console.log(user);

  return (
    <div>
      profile
    </div>
  )
}
export default Profile;