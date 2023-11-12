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
import { useState } from "react";
import { PhaseUrl } from "@/lib/types";
import URLCreatorLoading from "./URLCreatorLoading";
import URLCreatorInput from "./URLCreatorInput";
import URLCreatorResult from "./URLCreatorResult";

export default function URLCreator({ categories }: { categories: string[] }) {
  const [phase, setPhase] = useState<PhaseUrl>("input");

  if (phase === "loading") {
    return <URLCreatorLoading setPhase={setPhase} />;
  } else if (phase === "input") {
    return <URLCreatorInput setPhase={setPhase} categories={categories} />;
  } else if (phase === "result") {
    return <URLCreatorResult setPhase={setPhase} />;
  }
}
