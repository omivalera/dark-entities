import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  const handleLoginSuccess = () => {
    // Redirige, muestra toast, etc.
    window.location.href = "/dashboard";
  };

  return <LoginForm onLoginSuccess={handleLoginSuccess} />;
}
