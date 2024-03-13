"use client";

import { Url } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import { AlertRemoveURL } from "./modal-remove";
import React from "react";
import { getUrlAPI } from "@/lib/utils";

export const columns: ColumnDef<Url>[] = [
  {
    accessorKey: "id",
    header: "ID",
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "urlShort",
    header: "URL Corta",
  },
  {
    accessorKey: "urlLong",
    header: "URL Larga",
  },
  {
    accessorKey: "categoryId",
    header: "Categorias",
  },
  {
    accessorKey: "clicks",
    enableHiding: false,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Visitas
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];
