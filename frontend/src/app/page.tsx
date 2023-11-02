"use client";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <main className="h-screen flex justify-between flex-col">
      <div>
        <Navbar />
        <Separator />
      </div>

      <Hero />

      <Footer />
    </main>
  );
}
