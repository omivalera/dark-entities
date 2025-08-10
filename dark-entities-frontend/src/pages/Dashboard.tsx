import DashboardLayout from "../components/DashboardLayout";
import { Typography } from "@mui/material";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useEffect } from "react";
import bg from "../assets/fvo.jfif";

export default function Dashboard() {
  const { role, name, last_name } = useCurrentUser();
  useEffect(() => {
    const original = document.body.style.background;
    document.body.style.background = `url(${bg}) center center/cover no-repeat fixed`;
    document.body.style.backgroundColor = "#000000ef";
    return () => {
      document.body.style.background = original;
      document.body.style.backgroundColor = "";
    };
  }, []);
  return (
    <DashboardLayout>
      {/* Contenido principal minimalista, el header ya contiene el título */}
      {role === "admin" && (
        <div style={{
          background: "#fff",
          color: "#18122B",
          border: "1.5px solid #000000ff",
          borderRadius: 12,
          padding: 28,
          margin: "32px auto",
          maxWidth: 480,
          boxShadow: "0 2px 16px 0 #0001"
        }}>
          <Typography variant="h6">Panel de Administrador</Typography>
          {/* Aquí panel de stats, usuarios, auditoría... */}
        </div>
      )}

      {role === "organizer" && (
        <div style={{
          background: "#fff",
          color: "#18122B",
          border: "1.5px solid #000000ff",
          borderRadius: 12,
          padding: 28,
          margin: "32px auto",
          maxWidth: 480,
          boxShadow: "0 2px 16px 0 #0001"
        }}>
          <Typography variant="h6">Panel de Organizador</Typography>
          {/* Aquí gestión de eventos, ventas, reportes... */}
        </div>
      )}

      {role === "staff" && (
        <div style={{
          background: "#fff",
          color: "#18122B",
          border: "1.5px solid #FFD700",
          borderRadius: 12,
          padding: 28,
          margin: "32px auto",
          maxWidth: 480,
          boxShadow: "0 2px 16px 0 #0001"
        }}>
          <Typography variant="h6">Panel de Staff</Typography>
          {/* Aquí validación de tickets, control de accesos... */}
        </div>
      )}

      {role === "user" && (
        <div style={{
          background: "#18122b2a",
          color: "#ffffffff",
          padding: 28,
          margin: "auto",
          maxWidth: 480,
          boxShadow: "0 2px 16px 0 #0001",
        }}>
          <Typography variant="h6">Hola, {name} {last_name}</Typography>
          {/* Aquí historial de tickets, eventos próximos, etc. */}
        </div>
      )}
    </DashboardLayout>
  );
}
