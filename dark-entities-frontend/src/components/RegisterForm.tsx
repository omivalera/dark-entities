
import { useState } from "react";
import { register } from "../api/auth";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";

interface Props {
  onRegisterSuccess: (user: any) => void;
}


export default function RegisterForm({ onRegisterSuccess }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const user = await register(email, password, name, lastName, birthdate);
      setSuccess(true);
      onRegisterSuccess(user);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Registro fallido");
    }
  };

  return (
    <Box position="fixed" top={0} left={0} width="100vw" height="100vh" display="flex" alignItems="center" justifyContent="center" zIndex={1300} bgcolor="rgba(0,0,0,0.98)">
      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, width: '100%', p: 4, bgcolor: "#000000ff", borderRadius: 2, boxShadow: 2, display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h5" fontWeight={700} mb={1} color="primary" align="center">Crear cuenta</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">¡Registro exitoso! Ahora inicia sesión.</Alert>}
        <TextField
          label="Nombre(s)"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          fullWidth
          autoComplete="given-name"
        />
        <TextField
          label="Apellido(s)"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          required
          fullWidth
          autoComplete="family-name"
        />
        <TextField
          label="Fecha de nacimiento"
          type="date"
          value={birthdate}
          onChange={e => setBirthdate(e.target.value)}
          required
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
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
          autoComplete="new-password"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, fontWeight: 600 }}>
          Registrarse
        </Button>
      </Box>
    </Box>
  );
}
