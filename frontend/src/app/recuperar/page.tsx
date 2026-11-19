import type { Metadata } from "next";
import { AuthForm, AuthLink } from "@/components/auth-form";

export const metadata: Metadata = { title: "Recuperar contraseña" };

export default function RecuperarPage() {
  return (
    <AuthForm
      title="Recuperar contraseña"
      subtitle="Te enviaremos un enlace para crear una nueva."
      submitLabel="Enviar enlace"
      successMessage="Si el email está registrado, recibirás un enlace para restablecer la contraseña. (Prototipo: no se ha enviado nada.)"
      fields={[{ name: "email", label: "Email", type: "email", autoComplete: "email" }]}
      footer={<AuthLink href="/login">Volver a iniciar sesión</AuthLink>}
    />
  );
}
