import dbConnect from '@/database/config';
import { NextResponse } from 'next/server';

dbConnect();

export const GET = async(NextRequest) => {
    try {
        const resp = NextResponse.json({
            message: 'Logout Successfully...',
            success:true,
        })

        resp.cookies.set('token',"",{httpOnly: true, expires: new Date(0)});
        resp.cookies.delete();
        return resp;

    } catch (error) {
        console.log(error);
        return new Response("Something Went Wrong",{status:500})
    }
}

