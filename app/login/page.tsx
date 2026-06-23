"use client";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { loginAction } from "@/lib/authActions";

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="bg-primary text-primary-foreground p-2 rounded">
      {pending ? "Processing..." : label}
    </button>
  );
}

export default function LoginPage() {
  const [state, action] = useActionState(loginAction, undefined);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <form action={action} className="flex flex-col gap-4">
        {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
        <input name="username" placeholder="Username" required className="p-2 border rounded" />
        <input name="password" type="password" placeholder="Password" required className="p-2 border rounded" />
        <SubmitButton label="Login" />
      </form>
    </div>
  );
}