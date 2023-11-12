"use client";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";
import { getUser } from "@/lib/auth";
import { User } from "@/lib/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    getUser().then((user) => setUser(user))
  }, []);


  return (
    <main className="h-screen flex justify-between flex-col">
      <div>
        <Navbar user={user} />
        <Separator />
      </div>

      <Hero />

      <Footer />
    </main>
  );
}
