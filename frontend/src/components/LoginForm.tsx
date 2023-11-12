"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { authenticate } from "@/lib/auth";
import { useState } from "react";
import { Loading } from "./ui/loading";

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "El nombre de usuario tiene que tener más de 2 caracteres.",
    })
    .max(50, {
      message: "El nombre de usuario no puede tener más de 50 caracteres.",
    }),
  password: z
    .string()
    .min(8, {
      message: "La contraseña tiene que tener más de 8 caracteres.",
    })
    .max(50, {
      message: "La contraseña no puede tener más de 50 caracteres.",
    })
    .refine((value) => /(?=.*?[#?!@$%^&*-])/.test(value), {
      message: "La contraseña tiene que tener al menos un caracter especial.",
    }),
});

export function LoginForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const username = values.username;
    const password = values.password;

    setLoading(true);

    authenticate({ username, password })
      .then((succes) => {
        if (succes) {
          window.location.href = "/";
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Iniciar sesión</CardTitle>
        <CardDescription>
          Ingrese sus credenciales para acceder al sistema.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 relative justify-end flex flex-col"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de usuario</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormMessage />
            <div className="flex flex-col items-center text-sm text-[#2563EB] p-1">
              <a
                className=" text-opacity-80 hover:text-opacity-100 hover:scale-105 transition-all"
                href="/recovery"
              >
                ¿Olvidaste tu contraseña?
              </a>
              <a
                className=" text-opacity-80 hover:text-opacity-100 hover:scale-105 transition-all"
                href="/register"
              >
                ¿No tienes una cuenta? Regístrate
              </a>
            </div>
            <Button disabled={loading} type="submit">
              Ingresar
              {loading === true ? (
                <span className="animate-pulse">...</span>
              ) : null}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
