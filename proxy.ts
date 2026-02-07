import { NextRequest, NextResponse } from 'next/server';
import { UserRole } from './constant/type';
import { userService } from "./service/user/user.service";
import path from 'path';




export const proxy = async (req: NextRequest, res: NextResponse) => {
    const pathUrl = req.nextUrl.pathname
    const { data, error } = await userService.getSession();

    let isAuthenticated = null;
    let isAdmin = false;
    let isProvider = false;
    let isCustomer = false;

    if (data) {
        isAuthenticated = true;
        isAdmin = data?.user?.role === UserRole.Admin ? true : false;
        isProvider = data?.user?.role === UserRole.Provider ? true : false;
        isCustomer = data?.user?.role === UserRole.Customer ? true : false;
    }

    if (!isAuthenticated) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    if (pathUrl.startsWith('/dashboard/providerId') || pathUrl.startsWith('/dashboard/menu-management') || pathUrl.startsWith('/dashboard/order-management') || pathUrl.startsWith('/dashboard/settings')) {
        if (!isProvider && !isAdmin) {
            return NextResponse.redirect(new URL('/unauthorized', req.url));
        }
    }
    
    if (pathUrl.startsWith('/customer') ) {
        if (!isCustomer && !isAdmin) {
            return NextResponse.redirect(new URL('/unauthorized', req.url));
        }
    }



    return NextResponse.next();

};


export const config = {
    matcher: [
        // provider 
        "/dashboard/menu-management/:path*",
        "/dashboard/order-management/:path*", 
        "/dashboard/providerId/:path*",
        "/dashboard/settings/:path*"
    ],
}