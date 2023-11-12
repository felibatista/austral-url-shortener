export type User = {
  id: number;
  token: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  role: string;
}

export type Url = {
  id: string
  name: string
  urlShort: string
  urlLong: string
  clicks: number
  categoryId: number
}

export type Category = {
  id: number,
  name: string
}

export const phases = ["input", "loading", "result"] as const;
export type PhaseUrl = typeof phases[number];


