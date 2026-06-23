"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BASE_URL = process.env.DARKBAY_API_URL;

export type AuthState = { error?: string } | undefined;

export async function loginAction(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) return { error: "Invalid username or password" };

  const { access_token } = await res.json();
  const cookieStore = await cookies();
  cookieStore.set("jwt", access_token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", maxAge: 86400 });
  
  redirect("/auctions");
}

export async function registerAction(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    console.error("Backend returned error:", errorData);
    return { error: errorData.message || "Registration failed." };
  }

  redirect("/login");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("jwt");
  redirect("/login");
}