import NextAuth from "next-auth";
import { cache } from "react";
import { authConfig } from "./auth-config";

const { handlers, auth: uncachedAuth } = NextAuth(authConfig);

const auth = cache(uncachedAuth);

export { auth, handlers };
