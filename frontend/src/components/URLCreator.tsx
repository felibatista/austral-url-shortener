import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function URLCreator({ categories }: { categories: string[] }) {
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
        <Button> Acortar </Button>
      </CardFooter>
    </Card>
  );
}
