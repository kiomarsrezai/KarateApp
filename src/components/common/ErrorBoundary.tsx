"use client";

import { Component, ReactNode } from "react";
import { Button } from "~/components/ui/button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console or error reporting service
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    
    // اگر ChunkLoadError باشه، صفحه رو reload می‌کنیم
    if (error.name === "ChunkLoadError" || error.message?.includes("chunk")) {
      // یک بار reload می‌کنیم
      if (typeof window !== "undefined" && !sessionStorage.getItem("chunkErrorReloaded")) {
        sessionStorage.setItem("chunkErrorReloaded", "true");
        window.location.reload();
        return;
      }
    }
  }

  render() {
    if (this.state.hasError) {
      // اگر ChunkLoadError باشه و reload نشده باشه، منتظر می‌مونیم
      if (this.state.error?.name === "ChunkLoadError" && typeof window !== "undefined") {
        return null; // در حال reload هستیم
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <div className="text-center max-w-md">
            <h2 className="text-2xl font-bold mb-4">خطایی رخ داده است</h2>
            <p className="text-muted-foreground mb-6">
              متأسفانه مشکلی در بارگذاری صفحه رخ داده است. لطفاً صفحه را رفرش کنید.
            </p>
            <Button
              onClick={() => {
                sessionStorage.removeItem("chunkErrorReloaded");
                window.location.reload();
              }}
            >
              رفرش صفحه
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

