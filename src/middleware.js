import { NextResponse } from "next/server";

export function middleware(request){
    const path = request.nextUrl.pathname;
    const isPublicPath = path === '/SignIn' || path === '/Register' || path === '/AdminDashboard' || path === '/TeamMemberDashboard';
    const token = request.cookies.get('token')?.value || "";

    if(isPublicPath && token){
        return NextResponse.redirect(new URL(path,request.nextUrl));
    }

    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/SignIn',request.nextUrl));
    }
}

export const config = {
    matcher: ['/','/SignIn','/Register','/AdminDashboard','/TeamMemberDashboard']
}