import { useState } from "react";
import { login } from "../api/auth";




interface Props {
  onLoginSuccess: (user: any, token: string) => void;
}
export default function LoginForm({ onLoginSuccess }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("role", data.user.role);
      onLoginSuccess(data.user, data.access_token);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Login failed");
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Iniciar sesión</h2>
      {error && <div className="mb-2 text-red-600">{error}</div>}
      <input
        type="email"
        placeholder="Correo"
        className="w-full mb-3 p-2 border rounded"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        className="w-full mb-3 p-2 border rounded"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type="submit" className="w-full bg-black text-white p-2 rounded hover:bg-gray-800">
        Ingresar
      </button>
    </form>
  );
}
