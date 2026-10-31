"use client";

import { useActionState } from "react";
import { Button, Input, Label, TextField } from "@heroui/react";
import { loginAction } from "@/lib/actions/auth";
import { ErrorMessage } from "@/components/ui/form";

export function LoginForm({ next }: { next: string }) {
  const [state, formAction, pending] = useActionState(loginAction, undefined);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="next" value={next} />

      <TextField name="email" type="email" isRequired className="w-full">
        <Label>Email</Label>
        <Input placeholder="you@example.com" autoComplete="email" />
      </TextField>

      <TextField name="password" type="password" isRequired className="w-full">
        <Label>Password</Label>
        <Input autoComplete="current-password" />
      </TextField>

      <ErrorMessage message={state?.error} />

      <Button type="submit" isDisabled={pending} className="w-full">
        {pending ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}