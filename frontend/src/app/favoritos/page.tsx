import type { Metadata } from "next";
import { PageHeader } from "@/components/ui";
import { ListaFavoritos } from "./lista-favoritos";

export const metadata: Metadata = { title: "Favoritos" };

export default function FavoritosPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
      <PageHeader title="Favoritos" />
      <ListaFavoritos />
    </main>
  );
}
