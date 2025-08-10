import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#000000ff",
      paper: "#00000082"
    },
    primary: {
      main: "#ffffffff"
    },
    secondary: {
      main: "#ffffffff"
    },
    text: {
      primary: "#f5e9d6",
      secondary: "#ffffffff"
    }
  },
  typography: {
    fontFamily: [
      'Inter',
      'Montserrat',
      'Segoe UI',
      'Arial',
      'sans-serif'
    ].join(','),
    h6: {
      fontWeight: 500,
      letterSpacing: 0.5
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          textTransform: 'none',
          fontWeight: 500,
          boxShadow: 'none',
          background: 'none',
          color: '#ffffffff',
          border: '1px solid #ffffffff',
          '&:hover': {
            background: '#ffffffff',
            color: '#fff',
            border: '1px solid #ffffffff',
            boxShadow: 'none',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          background: 'none',
          borderRadius: 6,
          color: '#ffffffff',
        },
      },
      defaultProps: {
        variant: 'outlined',
        InputLabelProps: {
          style: { color: '#ffffffff' }
        },
        InputProps: {
          style: {
            color: '#ffffffff',
            borderColor: '#ffffffff',
            background: 'none',
            borderRadius: 6,
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          background: 'none',
          color: '#ffffffff',
          '& fieldset': {
            borderColor: '#ffffffff',
          },
          '&:hover fieldset': {
            borderColor: '#ffffffff',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#ffffffff',
          },
        },
        input: {
          color: '#ffffffff',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#ffffffff',
        },
      },
    },
  },
});

export default theme;
