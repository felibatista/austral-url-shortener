import { User } from "@/lib/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "URL Shortener | Dashboard",
  description:
    "Página de información y estadísticas de los links acortados por el usuario.",	
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
