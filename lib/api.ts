import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BASE_URL = process.env.DARKBAY_API_URL;

export async function fetchAPI(path: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (res.status === 401) {
    cookieStore.delete("jwt");
    redirect("/login");
  }

  return res;
}