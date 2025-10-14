declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      AUTH_SECRET?: string;
      NEXT_PUBLIC_API_URL: string;
      NEXT_PUBLIC_FILE_URL: string;
      NEXT_PUBLIC_FRONT_URL: string;
    }
  }
}

export {};
