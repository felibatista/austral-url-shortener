"use client";

import { LoginForm } from "@/components/LoginForm";
import { Footer } from "@/components/Footer";

export default function Login() {
  return (
    <main className="h-screen flex items-center justify-center">
      <div className="max-w-[700px] mx-auto">
        <LoginForm />
      </div>
      <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
    </main>
  );
}
