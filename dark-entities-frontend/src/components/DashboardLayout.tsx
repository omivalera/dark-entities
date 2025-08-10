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
import "../dashboard-tml.css";
import { Event, ConfirmationNumber, Logout, Group } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { role } = useCurrentUser();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex", minHeight: '100vh', background: 'none' }}>
      {/* Sidebar */}
      <Drawer variant="permanent" anchor="left" PaperProps={{ className: 'dashboard-tml-sidebar', sx: { width: 240 } }}>
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
      <Box component="main" sx={{ flexGrow: 1, p: { xs: 1, sm: 3 }, background: 'none' }}>
        <AppBar position="fixed" className="dashboard-tml-header" sx={{ zIndex: 1201, left: 240, width: 'calc(100% - 240px)', boxShadow: 'none', background: 'none' }}>
          <Toolbar sx={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 110, background: 'none' }}>
            <Typography variant="h6" className="dashboard-tml-subtitle" sx={{ width: '100%', textAlign: 'center', fontWeight: 400, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
              Bienvenido a
            </Typography>
            <Typography variant="h4" className="dashboard-tml-title" sx={{ width: '100%', textAlign: 'center', mb: 0.5 }}>
              Dark Entities
            </Typography>
          </Toolbar>
        </AppBar>
        <Toolbar sx={{ minHeight: 110 }} />
        <AppBar position="fixed" className="dashboard-tml-header" sx={{ zIndex: 1201, left: 240, width: 'calc(100% - 240px)', boxShadow: 'none', background: 'none' }}>
          <Toolbar sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', minHeight: 110, background: 'none', width: '100%' }}>
            {/* <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography variant="h4" className="dashboard-tml-title" sx={{ textAlign: 'left', mb: 0.5 }}>
                Dark Entities
              </Typography>
              <Typography variant="h6" className="dashboard-tml-subtitle" sx={{ textAlign: 'left', fontWeight: 400, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                Bienvenido a tu Panel
              </Typography>
            </Box> */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-start', height: '100%' }}>
              <Box className="dashboard-tml-main" sx={{ margin: 0, padding: 0, minHeight: 0, boxShadow: 'none', background: 'none' }}>
                {children}
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
        <Toolbar sx={{ minHeight: 110 }} />
      </Box>
    </Box>
  );
}
