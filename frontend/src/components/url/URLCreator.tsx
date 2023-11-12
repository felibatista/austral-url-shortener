import { useEffect, useState } from "react";
import { Category, PhaseUrl, User } from "@/lib/types";
import { getUser } from "@/lib/auth";

import URLCreatorLoading from "./URLCreatorLoading";
import URLCreatorInput from "./URLCreatorInput";
import URLCreatorResult from "./URLCreatorResult";
import { Skeleton } from "../ui/skeleton";

export default function URLCreator({
  categories,
}: {
  categories: Category[] | undefined;
}) {
  const [phase, setPhase] = useState<PhaseUrl>("input");
  const [user, setUser] = useState<User | null | undefined>(undefined);

  const [url, setUrl] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("Default");

  const [resultId, setResultId] = useState<number | null>(null);

  useEffect(() => {
    getUser().then((user) => setUser(user));
  }, []);

  if (phase === "loading") {
    return (
      <URLCreatorLoading
        setPhase={setPhase}
        url={url}
        name={name}
        category={category}
        setResultId={setResultId}
      />
    );
  } else if (phase === "input") {
    if (categories == undefined) {
      return <Skeleton className="w-full h-[211px]" />;
    }

    return (
      <URLCreatorInput
        categories={categories}
        user={user}
        setPhase={setPhase}
        setUrl={setUrl}
        setName={setName}
        setCategory={setCategory}
        url={url}
        name={name}
        category={category}
      />
    );
  } else if (phase === "result") {
    return <URLCreatorResult setPhase={setPhase} resultId={resultId} setResultId={setResultId} />;
  }
}
