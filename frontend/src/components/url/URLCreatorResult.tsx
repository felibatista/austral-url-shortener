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

export default function URLCreatorResult({
  setPhase,
}: {
  setPhase: (phase: PhaseUrl) => void;
}) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Link convertido</CardTitle>
        <CardDescription>
          
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Input type="text" placeholder="URL " />
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={() => setPhase("input")}> Acortar otro URL</Button>
      </CardFooter>
    </Card>
  );
}
