import { NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { getRoleByStartPath } from "./components/features/user/utils";

export const middleware = auth((req) => {
  const pathname = req.nextUrl.pathname;
  const user = req.auth?.user;
  console.log(user);

  const panel = getRoleByStartPath(pathname);
  const hasAccess = user?.roles.includes(panel?.value ?? 99);

  // Redirect to login if not logged in
  if (panel && !hasAccess) {
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
