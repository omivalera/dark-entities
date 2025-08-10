import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    // Ya tenemos cookie + /auth/me OK → no rebota
    navigate("/dashboard", { replace: true });
  };

    return <LoginForm onLoginSuccess={handleLoginSuccess} />;
  }