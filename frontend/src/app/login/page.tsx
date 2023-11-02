"use client";
import { LoginForm } from "@/components/LoginForm";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import URLCreator from "@/components/URLCreator";
import { Separator } from "@/components/ui/separator";

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
