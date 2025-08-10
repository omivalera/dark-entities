
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../assets/as.png";
import bg from "../assets/pexels-pachon-in-motion-426015731-18337643.jpg";
import { useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    const original = document.body.style.background;
    document.body.style.background = `url(${bg}) center center/cover no-repeat fixed`;
    document.body.style.backgroundColor = "#ffffffef";
    return () => {
      document.body.style.background = original;
      document.body.style.backgroundColor = "";
    };
  }, []);
  return (
    <Box position="fixed" top={0} left={0} width="100vw" height="100vh" minHeight="100vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center" >
      <img src={logo} alt="Logo" style={{ width: 290, marginBottom: 0, marginTop: 200, borderWidth: 2, borderStyle: "none" }} />
      <Typography variant="h3" color="#ffffffff" fontWeight={700} mb={2} align="center">
        Dark Entities
      </Typography>
      <Typography variant="h6" color="#ffffffff" mb={4} align="center">
        Bienvenido a la plataforma
      </Typography>
      <Box display="flex" gap={2}>
        <Button variant="contained" color="primary" size="large" onClick={() => navigate("/login")}>Iniciar sesión</Button>
        <Button variant="outlined" color="primary" size="large" onClick={() => navigate("/register")}>Registrarse</Button>
      </Box>
      <Box display="flex" gap={2} mt={4}>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          startIcon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" rx="6" fill="#fff"/>
              <path d="M12 7.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6zm0 7.8a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm4.95-8.1a1.125 1.125 0 1 1-2.25 0 1.125 1.125 0 0 1 2.25 0z" fill="#E1306C"/>
            </svg>
          }
          onClick={() => window.open('https://www.instagram.com/', '_blank')}
        >
          Instagram
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          startIcon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" rx="6" fill="#fff"/>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.198.297-.767.967-.94 1.166-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.58-.487-.501-.67-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.099 3.205 5.077 4.372.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347z" fill="#25D366"/>
            </svg>
          }
          onClick={() => window.open('https://wa.me/', '_blank')}
        >
          WhatsApp
        </Button>
      </Box>
    </Box>
  );
}


