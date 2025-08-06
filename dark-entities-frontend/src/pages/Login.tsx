import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  const handleLoginSuccess = (user: any, token: string) => {
    // Redirige, muestra toast, etc.
    window.location.href = "/";
  };

  return <LoginForm onLoginSuccess={handleLoginSuccess} />;
}
