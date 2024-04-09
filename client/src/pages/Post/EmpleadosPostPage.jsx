import { useState } from "react";
import { api } from "../../api/axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import "./EmpleadosPostPage.css";

export const EmpleadosPostPage = () => {
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    tipoIdentificacion: "",
    identificacion: "",
    fechaIngreso: "",
    salarioMensual: "",
    cargo: "",
    departamento: "",
    email: "",
    tipoTelefono: "",
    numeroTelefono: "",
    indicativoTelefono: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'nombres' && value.length < 3) {
      setError('Debe contener al menos 3 caracteres');
    } 
    else if (name === 'apellidos' && value.length < 3) {
      setError('Debe contener al menos 3 caracteres');
    }
    else if (name === 'tipoIdentificacion' && value.length < 2) {
      setError('Debe contener al menos 2 caracteres');
    }
    else if (name === 'identificacion' && value.length < 6) {
      setError('Debe contener al menos 4 caracteres');
    }
    else if (name === 'fechaIngreso' && value.trim() === '') {
      setError('Este campo no puede estar en blanco');
    }
    else if (name ==='salarioMensual' && value.length < 3) {
      setError('Debe contener al menos 3 caracteres');
    }
    else if (name === 'cargo' && value.length < 4) {
      setError('Debe contener al menos 4 caracteres');
    }
    else if (name === 'departamento' && value.length < 2) {
      setError('Debe contener al menos 2 caracteres');
    }
    else if (name === 'email' && !value.includes('@')) {
      setError('El correo electrónico debe contener al menos un "@"' );
    }
    else if (name === 'tipoTelefono' && value.length < 3) {
      setError('Debe contener al menos 3 caracteres');
    }
    else if (name === 'numeroTelefono' && value.length < 3) {
      setError('Debe contener al menos 3 caracteres');
    }
    else if (name === 'indicativoTelefono' && value.length > 3) {
      setError('Debe contener menos de 3 caracteres');
    }
    else {
      setError('');
    }
    
  };

  const handleSubmit = () => {
    const empleadoData = { ...formData }; // Datos del empleado
    const emailData = { // Datos del email asociado al empleado
      email: formData.email,
    };
    const telefonoData = { // Datos del teléfono asociado al empleado
      tipo: formData.tipoTelefono,
      numero: formData.numeroTelefono,
      indicativo: formData.indicativoTelefono,
    };
  
    // Primero creamos el empleado
   api
  .post("empleados/api/v1/empleados/", empleadoData)
  .then((response) => {
    console.log("Empleado creado exitosamente:", response.data);
    const empleadoId = response.data.id; // Obtenemos el ID del empleado creado

    // Después de crear el empleado, creamos el email asociado
    api
      .post(`emails/api/v1/emails/`, { ...emailData, empleado: empleadoId })
      .then(() => {
        console.log("Then depsues de email.");
        // Después de crear el email, creamos el teléfono asociado
        api
          .post(`telefonos/api/v1/telefonos/`, { ...telefonoData, empleado: empleadoId })
          .then(() => {
            console.log("Teléfono creado exitosamente.");
            setSuccess(true);
            setError(null);
            resetForm();
          })
          .catch((error) => {
            console.error("Error al crear el teléfono:", error);
            if (error.response) {
              console.error("Error response from server:", error.response.data);
            }
            setError("Error al crear el teléfono. Por favor, inténtalo de nuevo.");
          });
      })
      .catch((error) => {
        console.error("Error al crear el email:", error);
        setError("Error al crear el email. Por favor, inténtalo de nuevo.");
      });
  })
  .catch((error) => {
    console.error("Error al crear el empleado:", error);
    setError("Error al crear el empleado. Por favor, inténtalo de nuevo.");
  });

  }
  
  const resetForm = () => {
    setFormData({
      nombres: "",
      apellidos: "",
      tipoIdentificacion: "",
      identificacion: "",
      fechaIngreso: "",
      salarioMensual: "",
      cargo: "",
      departamento: "",
      email: "",
      tipoTelefono: "",
      numeroTelefono: "",
      indicativoTelefono: "",
    });
  };

  return (
    <div className="container fade-in">
      <h1 style={{ textAlign: "center" }}>Formulario de Empleado</h1>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">Empleado, email y teléfono creados exitosamente.</Alert>}
      <Box className="subcontainer" component={"form"} sx={{
        '& .MuiTextField-root': { m: 2, width: '25ch' },
      }}>
        <TextField
          id="nombres"
          name="nombres"
          label="Nombres"
          variant="outlined"
          value={formData.nombres}
          onChange={handleInputChange}
          error={Boolean(error)}
          helperText={error}
        />
        <TextField
          id="apellidos"
          name="apellidos"
          label="Apellidos"
          variant="outlined"
          value={formData.apellidos}
          onChange={handleInputChange}
          error={Boolean(error)}
          helperText={error}
        />
        <TextField
          id="tipoIdentificacion"
          name="tipoIdentificacion"
          label="Tipo Identificación"
          variant="outlined"
          value={formData.tipoIdentificacion}
          onChange={handleInputChange}
          error={Boolean(error)}
          helperText={error}
        />
        <TextField
          id="identificacion"
          name="identificacion"
          label="# Identificación"
          variant="outlined"
          value={formData.identificacion}
          onChange={handleInputChange}
          error={Boolean(error)}
          helperText={error}
        />
        <TextField
          id="fechaIngreso"
          name="fechaIngreso"
          type="date"
          variant="outlined"
          value={formData.fechaIngreso}
          onChange={handleInputChange}
          error={Boolean(error)}
          helperText={error}
        />
        <TextField
          id="salarioMensual"
          name="salarioMensual"
          label="Salario Mensual"
          variant="outlined"
          value={formData.salarioMensual}
          onChange={handleInputChange}
          error={Boolean(error)}
          helperText={error}
        />
        <TextField
          id="cargo"
          name="cargo"
          label="Cargo"
          variant="outlined"
          value={formData.cargo}
          onChange={handleInputChange}
          error={Boolean(error)}
          helperText={error}
        />
        <TextField
          id="departamento"
          name="departamento"
          label="Departamento"
          variant="outlined"
          value={formData.departamento}
          onChange={handleInputChange}
          error={Boolean(error)}
          helperText={error}
        />
        <TextField
          id="email"
          name="email"
          label="Correo Electrónico"
          variant="outlined"
          value={formData.email}
          onChange={handleInputChange}
          error={Boolean(error)}
          helperText={error}
        />
        <TextField
          id="tipoTelefono"
          name="tipoTelefono"
          label="Tipo de Teléfono"
          variant="outlined"
          value={formData.tipoTelefono}
          onChange={handleInputChange}
          error={Boolean(error)}
          helperText={error}
        />
        <TextField
          id="numeroTelefono"
          name="numeroTelefono"
          label="Número de Teléfono"
          variant="outlined"
          value={formData.numeroTelefono}
          onChange={handleInputChange}
          error={Boolean(error)}
          helperText={error}
        />
        <TextField
          id="indicativoTelefono"
          name="indicativoTelefono"
          label="Indicativo de Teléfono"
          variant="outlined"
          value={formData.indicativoTelefono}
          onChange={handleInputChange}
          error={Boolean(error)}
          helperText={error}
        />
        <Box display={"flex"} justifyContent={"center"} mt={3}>
          <Button variant="contained" onClick={handleSubmit}>
            Guardar
          </Button>
        </Box>
      </Box>
    </div>
  );
};
