import { Category } from "./types";
import { getUrlAPI } from "./utils";

export async function getAllCategories() {
  const data: Category[] = await fetch(`${getUrlAPI()}/api/Category/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    return res.json()
  });

  return data;
}
