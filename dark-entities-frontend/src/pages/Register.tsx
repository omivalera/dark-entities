
import RegisterForm from "../components/RegisterForm";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const handleRegisterSuccess = () => {
    navigate("/login");
  };

  return <RegisterForm onRegisterSuccess={handleRegisterSuccess} />;
}
