import { useState } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import type { User } from "../context/AuthContext";
import { api } from "../api/auth"; // instancia axios con baseURL localhost y withCredentials: true

interface Props {
  onLoginSuccess: (user: User, token: string) => void;
}

type LoginResponse = {
  ok?: boolean;
  access_token?: string; // si tu backend lo devuelve, lo usamos; si no, queda ""
  user?: User;
};

export default function LoginForm({ onLoginSuccess }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login: loginCtx } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1) Login (OAuth2PasswordRequestForm: username + password en x-www-form-urlencoded)
      const { data: loginData } = await api.post<LoginResponse>(
        "/auth/login",
        new URLSearchParams({ username: email, password })
      );

      // 2) Hidratar sesión: fuerza no-cache para evitar 304
      const { data: me } = await api.get<User>("/auth/me", {
        headers: { "Cache-Control": "no-cache" },
      });

      // 3) Actualizar contexto y notificar al padre
      const token = loginData?.access_token ?? "";
      loginCtx(me, token);
      onLoginSuccess(me, token);
    } catch (err: any) {
      const detail = err?.response?.data?.detail;
      setError(detail || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box position="fixed" top={0} left={0} width="100vw" height="100vh" display="flex" alignItems="center" justifyContent="center" zIndex={1300} bgcolor="rgba(0,0,0,0.98)">
      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, width: '100%', p: 4, bgcolor: "#000000ff", borderRadius: 2, boxShadow: 2, display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h5" fontWeight={700} mb={1} color="primary" align="center">Iniciar sesión</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField label="Correo" type="email" value={email} onChange={e => setEmail(e.target.value)} required fullWidth autoComplete="email" />
        <TextField label="Contraseña" type="password" value={password} onChange={e => setPassword(e.target.value)} required fullWidth autoComplete="current-password" />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, fontWeight: 600 }} disabled={loading}>
          {loading ? "Ingresando..." : "Ingresar"}
        </Button>
      </Box>
    </Box>
  );
}
