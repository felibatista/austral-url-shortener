"use client";

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

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Category, PhaseUrl, User } from "@/lib/types";
import { Label } from "../ui/label";
import { validURL } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function URLCreatorInput({
  categories,
  user,

  setUrl,
  setName,
  setCategory,
  setPhase,

  url,
  name,
  category,
}: {
  categories: Category[];
  user: User | undefined | null;

  setPhase: (phase: PhaseUrl) => void;
  setUrl: (url: string) => void;
  setCategory: (category: string) => void;
  setName: (name: string) => void;

  url: string;
  name: string;
  category: string;
}) {
  const [nameError, setNameError] = useState<string | null>(null);
  const [urlError, setUrlError] = useState<string | null>(null);

  function verifyName(nameVerify: string) {
    if (nameVerify.length < 3) {
      return {
        error: true,
        message: "El nombre debe tener más de 3 caracteres.",
      };
    }

    if (nameVerify.length > 20) {
      return {
        error: true,
        message: "El nombre no puede tener más de 20 caracteres.",
      };
    }

    return {
      error: false,
    };
  }

  function verifyUrl(urlVerify: string) {
    if (urlVerify.length < 6) {
      return {
        error: true,
        message: "El URL debe tener más de 6 caracteres.",
      };
    }

    if (!validURL(urlVerify)) {
      return {
        error: true,
        message: "Ingrese una URL válida.",
      };
    }

    return {
      error: false,
    };
  }

  function onSubmit() {
    setNameError(null);
    setUrlError(null);

    const nameError = verifyName(name);
    const urlError = verifyUrl(url);

    if (nameError.error) {
      setNameError(nameError.message!);
    }

    if (urlError.error) {
      setUrlError(urlError.message!);
    }

    if (nameError.error || urlError.error) {
      return;
    }

    setPhase("loading");
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Acortador de links</CardTitle>
        <CardDescription>
          Seleccione una categoría e inserte el link que desea acortar.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label>Nombre del URL</Label>
            <Input
              type="text"
              onChange={(name) => setName(name.target.value)}
              placeholder="Nombre"
            />
            <p className="text-red-500">{nameError}</p>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Categoria</Label>
            <Select>
              <SelectTrigger className="">
                <SelectValue defaultValue={"default"} placeholder="Normal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Normal</SelectItem>
                {categories
                  .filter((category) => category.name != "Default")
                  .map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <Label>Link del URL</Label>
          <Input
            type="text"
            onChange={(url) => setUrl(url.target.value)}
            placeholder="URL"
          />
          <p className="text-red-500">{urlError}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          disabled={user == undefined || user == null ? true : false}
          onClick={() => onSubmit()}
        >
          {" "}
          Acortar{" "}
        </Button>
      </CardFooter>
    </Card>
  );
}
