"use client";

import { useContext, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { PersonIcon } from "@radix-ui/react-icons";
import { User } from "@/lib/types";
import { Skeleton } from "./ui/skeleton";
import { logout } from "@/lib/auth";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
export function Navbar({ user }: { user: User | null | undefined }) {
  const [isHome, setIsHome] = useState<boolean>(false);
  useEffect(() => {
    setIsHome(window.location.pathname === "/");
  }, []);

  function renderButton(user: User | null | undefined) {
    switch (user) {
      case undefined:
        return <Skeleton className="w-[122px] h-[36px]"></Skeleton>;
      case null:
        return (
          <Button
            variant="default"
            onClick={() => {
              window.location.href = "/login";
            }}
          >
            Iniciar sesión
          </Button>
        );
      default:
        return (
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
                logout();
              }}
            >
              Cerrar sesión
            </Button>
          </div>
        );
    }
  }

  return (
    <nav className="p-4 h-fit w-full">
      <div className="max-w-[1500px] w-full mx-auto flex items-center justify-between flex-wrap">
        <div className="flex items-center flex-shrink-0 text-dark mr-6 gap-4">
          {isHome == false ? (
            <a
              href="/"
              className="flex items-center gap-1 hover:underline relative top-[2px] text-lg"
            >
              <ArrowLeftIcon width={20} height={20} />
              Volver al inicio
            </a>
          ) : (
            <h1 className="font-semibold text-xl tracking-tight">
              URL Shortener
            </h1>
          )}
        </div>

        {renderButton(user)}
      </div>
    </nav>
  );
}
