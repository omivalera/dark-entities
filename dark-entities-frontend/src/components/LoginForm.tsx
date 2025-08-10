
import { useState } from "react";
import { login } from "../api/auth";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { useAuth, User } from "../context/AuthContext";




interface Props {
  onLoginSuccess: (user: User, token: string) => void;
}
export default function LoginForm({ onLoginSuccess }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login: loginCtx } = useAuth();
  
  
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    try {
      const data = await login(email, password);
      loginCtx(data.user, data.access_token);
      onLoginSuccess(data.user, data.access_token);
    } catch (err: unknown) {
      const detail = (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail;
      setError(detail || "Login failed");
    }
  };
  

  return (
    <Box position="fixed" top={0} left={0} width="100vw" height="100vh" display="flex" alignItems="center" justifyContent="center" zIndex={1300} bgcolor="rgba(0,0,0,0.98)">
      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, width: '100%', p: 4, bgcolor: "#000000ff", borderRadius: 2, boxShadow: 2, display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h5" fontWeight={700} mb={1} color="primary" align="center">Iniciar sesión</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label="Correo"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          fullWidth
          autoComplete="email"
        />
        <TextField
          label="Contraseña"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          fullWidth
          autoComplete="current-password"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, fontWeight: 600 }}>
          Ingresar
        </Button>
      </Box>
    </Box>
  );
}
