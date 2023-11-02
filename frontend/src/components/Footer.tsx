"use client";

import { Separator } from "./ui/separator";
import { ModeToggle } from "./ThemeToggle";

export function Footer() {
  return (
    <footer className="h-fit w-full">
      <Separator />
      <div className="max-w-[1500px] mx-auto p-4 flex justify-between items-center">
        <h3>
          Hecho por{" "}
          <a
            className="hover:underline"
            target="_blank"
            href="https://github.com/felibatista"
          >
            @felibatista
          </a>
        </h3>

        <div className="flex gap-4">
          <ModeToggle />
        </div>
      </div>
    </footer>
  );
}
