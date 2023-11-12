"use client";

import { Footer } from "@/components/Footer";
import { LoginForm } from "@/components/LoginForm";
import { Navbar } from "@/components/Navbar";
import URLTable from "@/components/dashboard/table/page";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getUser } from "@/lib/auth";
import { Url, User } from "@/lib/types";
import { getUrls } from "@/lib/url";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [data, setData] = useState<Url[]>([]);
  const [visits, setVisits] = useState<number>(0);
  const [urls, setUrls] = useState<number>(0);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getUser().then((user) => {
      if (user === null) {
        window.location.href = "/";
      }
      setUser(user);
    }).finally(() => {
      setIsLoading(false);
    });

    getUrls().then((data) => {
      setData(data);

      let visits = 0;
      let urls = 0;

      data.forEach((url) => {
        visits += url.clicks;
        urls++;
      });

      setVisits(visits);
      setUrls(urls);
    });
  }, []);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <main className="h-screen flex justify-between flex-col">
      <div>
        <div>
          <Navbar user={user} />
          <Separator />
        </div>

        <div className="w-full lg:py-4 py-2">
          <div className="max-w-[1500px] mx-auto p-4 md:p-0">
            <div className="grid lg:grid-cols-2  mx-auto lg:gap-8">
              <Card className="w-full md:p-[4rem] p-8 mt-8">
                <h1 className="text-2xl font-semibold">
                  Cantidad de visitas totales
                </h1>
                <p>
                  Se sumarán todas las visitas de todos los enlaces que hayas
                  acortado.
                </p>

                <div className="mt-4 font-bold text-4xl">{visits}</div>
              </Card>

              <Card className="w-full md:p-[4rem] p-8 mt-8">
                <h1 className="text-2xl font-semibold">
                  Cantidad de enlaces acortados
                </h1>
                <p>Se sumarán todos los enlaces que hayas acortado.</p>

                <div className="mt-4 font-bold text-4xl">{urls}</div>
              </Card>
            </div>
            <Card className="w-full md:p-[4rem] p-8 mt-8">
              <h1 className="text-2xl font-semibold">Tús enlaces acortados</h1>
              <p>
                Aquí puedes ver todos los enlaces que has acortado con nosotros.
              </p>
              <URLTable data={data} />
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
