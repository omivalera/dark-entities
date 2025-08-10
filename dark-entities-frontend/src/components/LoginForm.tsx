
import { useState } from "react";
import { login } from "../api/auth";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";




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
      localStorage.setItem("name", data.user.name);
      localStorage.setItem("last_name", data.user.last_name);
      onLoginSuccess(data.user, data.access_token);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Login failed");
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
