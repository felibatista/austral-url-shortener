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
import { getUrlAPI } from "@/lib/utils";
import { User } from "@/lib/types";
import { useContext } from "react";
import { Context } from "@/app/providers";

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
  const { user, setUser } = useContext(Context);

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

    const jwt = fetch(getUrlAPI() + "/api/Authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((res) => res.json());

    jwt.then((body) => {
      if (body.token) {
        const token = body.token;
        const userId = body.userId;

        const user = fetch(getUrlAPI() + "/api/User/" + userId, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => res.json());

        user.then((userBody) => {
          const userAuth: User = {
            id: userBody.id,
            username: userBody.username,
            email: userBody.email,
            role: userBody.role,
            firstName: userBody.firstName,
            lastName: userBody.lastName,
            token: token,
          };

          setUser(userAuth);
        });
      } else {
        alert("Usuario o contraseña incorrectos.");
      }
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
                    <Input {...field} />
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
            <Button type="submit">Ingresar</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
