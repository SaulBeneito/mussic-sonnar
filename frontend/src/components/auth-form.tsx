"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent, type ReactNode } from "react";
import { Logo } from "./site-header";
import { DemoBadge, inputClass } from "./ui";

export interface Field {
  name: string;
  label: string;
  type: "text" | "email" | "password";
  autoComplete: string;
}

// Formulario de cuenta del prototipo: no envía nada. En la Fase 2 se conecta al backend.
export function AuthForm({
  title,
  subtitle,
  fields,
  submitLabel,
  redirectTo,
  successMessage,
  footer,
  extra,
}: {
  title: string;
  subtitle: string;
  fields: Field[];
  submitLabel: string;
  redirectTo?: string;
  successMessage?: string;
  footer: ReactNode;
  extra?: ReactNode;
}) {
  const router = useRouter();
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (redirectTo) router.push(redirectTo);
    else setDone(true);
  }

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex items-center justify-between">
          <Logo />
          <DemoBadge />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-2 text-sm text-muted">{subtitle}</p>
        {done ? (
          <p role="status" className="mt-8 rounded-xl border border-accent/40 bg-accent/10 p-4 text-sm">
            {successMessage}
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            {fields.map((f) => (
              <div key={f.name}>
                <label htmlFor={f.name} className="mb-1.5 block text-sm">
                  {f.label}
                </label>
                <input id={f.name} name={f.name} type={f.type} autoComplete={f.autoComplete} required className={inputClass} />
              </div>
            ))}
            {extra}
            <button type="submit" className="w-full rounded-xl bg-accent py-3 text-sm font-medium text-white transition hover:bg-accent-strong">
              {submitLabel}
            </button>
            <p className="text-center text-xs text-muted">Prototipo: no se envía ni se guarda nada.</p>
          </form>
        )}
        <div className="mt-8 text-center text-sm text-muted">{footer}</div>
      </div>
    </main>
  );
}

export function AuthLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="text-accent-soft hover:underline">
      {children}
    </Link>
  );
}
