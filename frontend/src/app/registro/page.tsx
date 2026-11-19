import type { Metadata } from "next";
import { AuthForm, AuthLink } from "@/components/auth-form";

export const metadata: Metadata = { title: "Crear cuenta" };

export default function RegistroPage() {
  return (
    <AuthForm
      title="Crear cuenta"
      subtitle="Tu perfil musical, tus recomendaciones y tus favoritos."
      submitLabel="Crear cuenta"
      redirectTo="/mi-musica"
      fields={[
        { name: "name", label: "Nombre", type: "text", autoComplete: "name" },
        { name: "email", label: "Email", type: "email", autoComplete: "email" },
        { name: "password", label: "Contraseña", type: "password", autoComplete: "new-password" },
      ]}
      footer={
        <>
          ¿Ya tienes cuenta? <AuthLink href="/login">Iniciar sesión</AuthLink>
        </>
      }
    />
  );
}
