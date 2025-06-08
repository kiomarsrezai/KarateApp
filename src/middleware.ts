import { NextResponse } from "next/server";
import { auth } from "./lib/auth";

export const middleware = auth((req) => {
  const pathname = req.nextUrl.pathname;
  const user = req.auth?.user;

  console.log({ user });

  const isDashboard = pathname.startsWith("/dashboard");

  // Redirect to login if not logged in
  if (!user && isDashboard) {
    const loginUrl = new URL(`/`, req.url);
    return NextResponse.redirect(loginUrl);
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
