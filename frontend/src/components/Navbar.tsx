"use client";

import { useContext, useEffect } from "react";
import { Button } from "./ui/button";
import { Context } from "@/app/providers";
import { User } from "@/lib/types";
import { PersonIcon } from "@radix-ui/react-icons";

export function Navbar() {
  const { user, setUser } = useContext(Context);
  
  return (
    <nav className="p-4 h-fit w-full">
      <div className="max-w-[1500px] w-full mx-auto flex items-center justify-between flex-wrap">
        <div className="flex items-center flex-shrink-0 text-dark mr-6">
          <span className="font-semibold text-xl tracking-tight">
            URL Shortener
          </span>
        </div>

        {user != null ? (
          <div className="flex gap-4 items-center">
            <Button
              variant="default"
              onClick={() => {
                window.location.href = "/dashboard";
              }}
            >
              <PersonIcon className="mr-2" />
              Tú cuenta
            </Button>

            <Button
              variant="secondary"
              onClick={() => {
                localStorage.removeItem("user");
                window.location.href = "/";
              }}
            >
              Cerrar sesión
            </Button>
          </div>
        ) : (
          <Button
            variant="default"
            onClick={() => {
              window.location.href = "/login";
            }}
          >
            Iniciar sesión
          </Button>
        )}
      </div>
    </nav>
  );
}
