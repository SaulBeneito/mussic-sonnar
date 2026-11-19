import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm, AuthLink } from "@/components/auth-form";

export const metadata: Metadata = { title: "Iniciar sesión" };

export default function LoginPage() {
  return (
    <AuthForm
      title="Iniciar sesión"
      subtitle="Vuelve a tus recomendaciones."
      submitLabel="Entrar"
      redirectTo="/descubrir"
      fields={[
        { name: "email", label: "Email", type: "email", autoComplete: "email" },
        { name: "password", label: "Contraseña", type: "password", autoComplete: "current-password" },
      ]}
      extra={
        <div className="text-right">
          <Link href="/recuperar" className="text-xs text-muted hover:text-foreground">
            ¿Has olvidado la contraseña?
          </Link>
        </div>
      }
      footer={
        <>
          ¿No tienes cuenta? <AuthLink href="/registro">Crear cuenta</AuthLink>
        </>
      }
    />
  );
}
