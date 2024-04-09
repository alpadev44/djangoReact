import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress"; // Importa CircularProgress
import { getToken, setAuthToken } from "../../api/axios";
import "./LoginPage.css";

export const LoginPage = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // Estado para controlar la visibilidad del CircularProgress

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Activa el CircularProgress al hacer clic en el botón

    try {
      const token = await getToken(user.username, user.password);
      setAuthToken(token);
      // Aquí puedes redirigir al usuario a la página de destino después del inicio de sesión exitoso
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    } finally {
      setLoading(false); // Desactiva el CircularProgress cuando la autenticación haya terminado
    }
  };

  return (
    <div className="container fade-in">
      <Box
        component="form"
        display="grid"
        onSubmit={handleSubmit}
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <Box alignSelf="center" justifySelf="center">
          <TextField
            sx={{ width: "250px", height: "60px" }}
            id="outlined-basic"
            value={user.username}
            onChange={(event) => {
              setUser({ ...user, username: event.target.value });
            }}
            label="Usuario"
            variant="outlined"
          />
        </Box>
        <Box alignSelf="center" justifySelf="center">
          <TextField
            sx={{ width: "250px", height: "60px" }}
            id="outlined-basic"
            value={user.password}
            onChange={(event) => {
              setUser({ ...user, password: event.target.value });
            }}
            label="Password"
            variant="outlined"
          />
        </Box>
        <Box display="grid" alignSelf="center" justifySelf="center">
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              sx={{ width: "250px" }}
              type="submit"
              disabled={loading} // Deshabilita el botón mientras se está cargando
            >
              {loading ? <CircularProgress color="primary" size={24} /> : "Login"}
            </Button>
          </Stack>
        </Box>
      </Box>
    </div>
  );
};
