import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getUrlAPI(){
    return process.env.URL_BACKEND ?? 'http://localhost:5140';
}
