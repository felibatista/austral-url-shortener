import { User } from "@/lib/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "URL Shortener | Login",
  description:
    "Página de logueo de URL Shortener, mediante credenciales",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
