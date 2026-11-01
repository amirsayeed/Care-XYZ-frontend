"use client";

import { useActionState } from "react";
import { Button, Description, Input, Label, TextField } from "@heroui/react";
import { registerAction } from "@/lib/actions/auth";
import { ErrorMessage } from "@/components/ui/form";
import { AuthDivider, GoogleButton } from "./google-button";

export function RegisterForm({ next }: { next: string }) {
  const [state, formAction, pending] = useActionState(registerAction, undefined);

  return (
    <div className="space-y-6">
    <GoogleButton next={next} />
    <AuthDivider />
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="next" value={next} />

      <TextField name="name" isRequired className="w-full">
        <Label>Full name</Label>
        <Input autoComplete="name" minLength={2} />
      </TextField>

      <TextField name="email" type="email" isRequired className="w-full">
        <Label>Email</Label>
        <Input placeholder="you@example.com" autoComplete="email" />
      </TextField>

      <TextField name="contact" type="tel" isRequired className="w-full">
        <Label>Contact number</Label>
        <Input autoComplete="tel" minLength={10} />
      </TextField>

      <TextField name="nid" isRequired className="w-full">
        <Label>NID number</Label>
        <Input
          inputMode="numeric"
          pattern="\d{13,17}"
          title="NID must be 13 to 17 digits"
        />
        <Description>13 to 17 digits</Description>
      </TextField>

      <TextField name="password" type="password" isRequired className="w-full">
        <Label>Password</Label>
        <Input
          autoComplete="new-password"
          minLength={6}
          pattern="(?=.*[a-z])(?=.*[A-Z]).{6,}"
          title="At least 6 characters, with 1 uppercase and 1 lowercase letter"
        />
        <Description>At least 6 characters, with 1 uppercase and 1 lowercase letter</Description>
      </TextField>

      <ErrorMessage message={state?.error} />

      <Button type="submit" isDisabled={pending} className="w-full">
        {pending ? "Creating account..." : "Create account"}
      </Button>
    </form>
    </div>
  );
}