import { useState } from "react";
import { register } from "../api/auth";

interface Props {
  onRegisterSuccess: (user: any) => void;
}

export default function RegisterForm({ onRegisterSuccess }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const user = await register(email, password);
      setSuccess(true);
      onRegisterSuccess(user);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Registro fallido");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Crear cuenta</h2>
      {error && <div className="mb-2 text-red-600">{error}</div>}
      {success && <div className="mb-2 text-green-600">¡Registro exitoso! Ahora inicia sesión.</div>}
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
        Registrarse
      </button>
    </form>
  );
}
