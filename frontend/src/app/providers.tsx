"use client";

import { User } from "@/lib/types";
import { ThemeProvider } from "next-themes";
import React, { useCallback, useEffect, useState } from "react";

export const Context = React.createContext({
  user: undefined as User | undefined,
  setUser: (user: User) => {},
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>();

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
      <Context.Provider value={{ user, setUser }}>{children}</Context.Provider>
    </ThemeProvider>
  );
}
