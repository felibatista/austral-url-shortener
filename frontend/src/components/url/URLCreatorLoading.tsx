import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Progress } from "../ui/progress";
import { useEffect, useState } from "react";
import { PhaseUrl } from "@/lib/types";
import { addUrl } from "@/lib/url";

export default function URLCreatorLoading({
  setPhase,
  setResultId,

  url,
  name,
  category,
}: {
  setPhase: (phase: PhaseUrl) => void;
  setResultId: (id: number | null) => void;

  url: string;
  name: string;
  category: string;
}) {
  const [phase, setPhaseLoading] = useState<number>(0);
  const [description, setDescription] = useState<string>("");

  function startRender() {
    setDescription("Iniciando conexiones con el servidor...");
    setPhaseLoading(1);

    addUrl(name, url, category).then((success) => {
      console.log(success);
      let error = "";
      let ready = false;

      if (!success.id) {
        error = "Ocurrio un error, intenta de nuevo.";
        ready = true;
      }

      ready = true;

      setTimeout(() => {
        setPhaseLoading(2);
        setDescription("Conexiones iniciadas, esperando respuesta...");
      }, 1500);

      setTimeout(() => {
        setPhaseLoading(3);
        setDescription("Respuesta recibida, procesando...");
      }, 2500);

      setTimeout(() => {
        setPhaseLoading(4);
        setDescription("Procesando respuesta, casi listo...");
      }, 3500);

      setTimeout(() => {
        setPhaseLoading(5);
        setDescription("¡Listo!");

        if (ready) {
          setDescription("¡Listo! Redirigiendo...");
          setResultId(success.id);
          setPhase("result");
        } else {
          setDescription("Ocurrio un error, intenta de nuevo.");
          setPhase("input");
        }
      }, 4500);
    });
  }

  useEffect(() => {
    startRender();
  }, []);

  return (
    <Card className="w-full h-[211px] grid items-center ">
      <CardContent className="flex flex-col gap-4 items-center px-[5rem]">
        <h3 className="text-lg">{description}</h3>
        <Progress className="transition-all" value={phase * 25} />
      </CardContent>
    </Card>
  );
}
