"use client";

import { User } from "@/lib/types";
import { ThemeProvider } from "next-themes";
import React, { useCallback, useEffect, useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
      {children}
    </ThemeProvider>
  );
}
