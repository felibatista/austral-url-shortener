"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PhaseUrl, Url } from "@/lib/types";
import { useEffect, useState } from "react";
import { getUrl } from "@/lib/url";
import { Skeleton } from "../ui/skeleton";
import { getUrlAPI } from "@/lib/utils";

export default function URLCreatorResult({
  setPhase,
  setResultId,

  resultId
}: {
  setPhase: (phase: PhaseUrl) => void;
  setResultId: (id: number | null) => void;

  resultId: number | null;
}) {
  const [loading, setLoading] = useState<boolean>(true)
  const [url, setUrl] = useState<Url | null | undefined>(undefined)

  useEffect(() => {
    getUrl(resultId!).then((url) => setUrl(url))
  }, [])

  if (url == undefined) {
    return <Skeleton className="w-full h-[211px]" />;
  }

  if (url == null){
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>¡Link no encontrado!</CardTitle>
          <CardDescription>
            Ocurrio un error al intentar encontrar el link, intenta de nuevo.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-end">
          <Button onClick={() => setPhase("input")}> Acortar otro URL</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>¡Link convertido con exito!</CardTitle>
        <CardDescription>
          El link se ha convertido con exito, puedes compartirlo.
        </CardDescription>
      </CardHeader>
      <CardContent>
      <CardTitle className="text-base">Información del URL:</CardTitle>
        <p className="text-muted-foreground">| Link acortado: <a href={`${getUrlAPI()}/${url.urlShort}`} target="_blank" className="text-primary hover:underline">{`${getUrlAPI()}/${url.urlShort}`}</a>  </p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={() => setPhase("input")}> Acortar otro URL</Button>
      </CardFooter>
    </Card>
  );
}
