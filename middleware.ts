import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
    // return NextResponse.redirect(new URL("/home", request.url));
    // console.log({ req: req.nextUrl.pathname });
    const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");
    const id = req.nextUrl.pathname.replace("/api/entries/", "");
    // if (!checkMongoIDRegExp.test(id)) {
    //     return new NextResponse(
    //         JSON.stringify({
    //             success: false,
    //             message: `${id} is not a valid MongoID`,
    //         }),
    //         { status: 400, headers: { 'content-type': 'application/json' } }
    //     )
    // }
    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    // matcher: "/about/:path*",
    matcher: [
        // "/api/:path*",
        "/api/entries/:path*"],
};
