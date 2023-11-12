"use client"

import { useEffect, useState } from "react";
import URLCreator from "./url/URLCreator";
import { getAllCategories } from "@/lib/categories";
import { Category } from "@/lib/types";

export function Hero() {
  const [categories, setCategorires] = useState<Category[] | undefined>(undefined);

  useEffect(() => {
    getAllCategories().then(categories => {
      setCategorires(categories)
    })
  }, []);

  return (
    <div className="flex flex-col w-full justify-center items-center flex-1 p-4 max-w-[900px] mx-auto gap-8">
      <div className="text-center flex flex-col gap-4 max-w-[700px] mx-auto p-4">
        <h1 className="font-bold text-6xl ">
          Links más <span className="text-[#2563EB]">cortos</span>, con más{" "}
          <span className="text-[#2563EB]">información</span>
        </h1>
        <p className="text-lg">
          Descubre nuestra plataforma líder en acortamiento de URL, la solución
          perfecta para simplificar tus enlaces y optimizar tu experiencia en
          línea. Obtén enlaces más limpios y efectivos con facilidad. Recibe
          información sobre ellos y sobre quienes entraron.
        </p>
      </div>
      <URLCreator categories={categories!} />
    </div>
  );
}
