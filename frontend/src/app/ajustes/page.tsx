import type { Metadata } from "next";
import { PageHeader } from "@/components/ui";
import { Ajustes } from "./ajustes";

export const metadata: Metadata = { title: "Ajustes de cuenta" };

export default function AjustesPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
      <PageHeader title="Ajustes" subtitle="Tu cuenta, tu conexión con Spotify y tu privacidad." />
      <Ajustes />
    </main>
  );
}
