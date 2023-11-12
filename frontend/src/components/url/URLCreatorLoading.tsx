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

export default function URLCreatorLoading({setPhase}: {setPhase: (phase: PhaseUrl) => void}) {
  const [phase, setPhaseLoading] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  
  function startRender() {
    setDescription("Iniciando conexiones con el servidor...");
    setPhaseLoading(1);

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
      setPhase("result");
    }, 4500);
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
