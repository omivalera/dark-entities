import DashboardLayout from "../components/DashboardLayout";
import { Typography } from "@mui/material";
import { useCurrentUser } from "../hooks/useCurrentUser";

export default function Dashboard() {
  const { role } = useCurrentUser();

  return (
    <DashboardLayout>
    <div>
      <Typography variant="h4" gutterBottom>
        Bienvenido a tu Panel
      </Typography>
    </div>
      {role === "admin" && (
        <div>
          <Typography variant="h6">Panel de Administrador</Typography>
          {/* Aquí panel de stats, usuarios, auditoría... */}
        </div>
      )}

      {role === "organizer" && (
        <div>
          <Typography variant="h6">Panel de Organizador</Typography>
          {/* Aquí gestión de eventos, ventas, reportes... */}
        </div>
      )}

      {role === "staff" && (
        <div>
          <Typography variant="h6">Panel de Staff</Typography>
          {/* Aquí validación de tickets, control de accesos... */}
        </div>
      )}

      {role === "user" && (
        <div>
          <Typography variant="h6">Panel de Usuario</Typography>
          {/* Aquí historial de tickets, eventos próximos, etc. */}
        </div>
      )}
    </DashboardLayout>
  );
}
