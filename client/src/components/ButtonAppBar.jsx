import * as React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { useEffect } from "react";

export default function ButtonAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
 
  const [login, setLogin] = useState(localStorage.getItem('token'))
  
  useEffect(() => {
    console.log(login)
  },[login])
  

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Limpiar el token de autenticación del almacenamiento local
    localStorage.removeItem('token');
    // Redirigir al usuario a la página de inicio de sesión
    window.location.href = '/login';
};

  return (
    <AppBar position="fixed" sx={{ width: "100vw" }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          aria-controls="menu"
          aria-haspopup="true"
          onClick={handleMenuOpen}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>Gestion de empleados</Link>
        </Typography>
        {login &&
        <Button color="inherit" style={{ color: "white" }} onClick={()=>handleLogout()}>
          <Typography fontWeight="medium" component="div" sx={{ flexGrow: 1 }}>
            Salir
          </Typography>
        </Button>}
      </Toolbar>
      {login &&
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <Link to="/crear-empleados" style={{ textDecoration: "none", color: "black" }}>Crear Empleado</Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link to="/mostrar-empleados" style={{ textDecoration: "none", color: "black" }}>Mostrar Empleado</Link>
        </MenuItem>
      </Menu>}
    </AppBar>
  );
}
