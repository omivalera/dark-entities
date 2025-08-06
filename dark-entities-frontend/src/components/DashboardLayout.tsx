import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import { Event, ConfirmationNumber, Logout, Group } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// Hook simple para obtener el rol actual
function useCurrentUser() {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  return { role, token };
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { role } = useCurrentUser();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Drawer variant="permanent" anchor="left">
        <Toolbar />
        <Box sx={{ width: 240 }}>
          <List>
            {/* Acceso general */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/dashboard")}>
                <ListItemIcon>
                  <Event />
                </ListItemIcon>
                <ListItemText primary="Eventos" />
              </ListItemButton>
            </ListItem>
            
            {/* Menú para Organizer */}
            {role === "organizer" && (
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate("/dashboard/mis-eventos")}>
                  <ListItemIcon>
                    <ConfirmationNumber />
                  </ListItemIcon>
                  <ListItemText primary="Mis eventos" />
                </ListItemButton>
              </ListItem>
            )}

            {/* Menú para Admin */}
            {role === "admin" && (
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate("/dashboard/usuarios")}>
                  <ListItemIcon>
                    <Group />
                  </ListItemIcon>
                  <ListItemText primary="Gestión de usuarios" />
                </ListItemButton>
              </ListItem>
            )}

            {/* Menú para Staff */}
            {role === "staff" && (
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate("/dashboard/validar-tickets")}>
                  <ListItemIcon>
                    <ConfirmationNumber />
                  </ListItemIcon>
                  <ListItemText primary="Validar tickets" />
                </ListItemButton>
              </ListItem>
            )}

            {/* Menú general: mis tickets (para user y organizer) */}
            {(role === "user" || role === "organizer") && (
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate("/dashboard/tickets")}>
                  <ListItemIcon>
                    <ConfirmationNumber />
                  </ListItemIcon>
                  <ListItemText primary="Mis tickets" />
                </ListItemButton>
              </ListItem>
            )}

            {/* Logout */}
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                <ListItemText primary="Salir" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <AppBar position="fixed" sx={{ zIndex: 1201 }}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              Dark Entities
            </Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
