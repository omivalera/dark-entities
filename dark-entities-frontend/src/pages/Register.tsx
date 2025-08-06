import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {
  const handleRegisterSuccess = () => {
    // Redirige o muestra mensaje
  };

  return <RegisterForm onRegisterSuccess={handleRegisterSuccess} />;
}
