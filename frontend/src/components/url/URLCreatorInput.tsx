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
import { PhaseUrl } from "@/lib/types";

export default function URLCreatorInput({
  setPhase,
  categories,
}: {
  setPhase: (phase: PhaseUrl) => void;
  categories: string[];
}) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Acortador de links</CardTitle>
        <CardDescription>
          Seleccione una categoría e inserte el link que desea acortar.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Input type="text" placeholder="URL " />
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={() => setPhase("loading")}> Acortar </Button>
      </CardFooter>
    </Card>
  );
}
