import User from '@/models/user';
import bcryptjs from 'bcryptjs';
import dbConnect from '@/database/config';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
// import { cookies } from 'next/headers';


dbConnect();

export const POST = async(NextRequest) => {
    try {
        const body = await NextRequest.json();
        console.log(body);
        const{email, password} = body;

        if(!email || !password){
            return new Response("Please Fill all the fields",{status:401});
        }

        const user = await User.findOne({email});

        if(!user){
            return new Response("Email doesn't exist", {status: 400});
        }

        const validPassword = await bcryptjs.compare(password,user.password);
        if(!validPassword){
            return new Response("Incorrect Password",{status:400});
        }

        const role = user.role;

        const tokenData = {
            email: user.email,
            id: user._id,
        }

        const token = jwt.sign(tokenData,process.env.JWT_SECRET,{expiresIn:'1d'});
        const resp = NextResponse.json({
            message: 'Login Successfully...',
            role: role
        })

        const cook = resp.cookies.set('token',token,{httpOnly: true});
        return resp;

    } catch (error) {
        console.log(error);
        return new Response("Something Went Wrong",{status:500})
    }
}

