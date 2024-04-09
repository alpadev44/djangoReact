import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api/axios";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./EmpleadosGetPage.css";

export const EmpleadosGetPage = () => {
  const [empleados, setEmpleados] = useState([]);
  const [editingEmpleadoId, setEditingEmpleadoId] = useState(null);
  const [updatedEmpleado, setUpdatedEmpleado] = useState({});
  const [emails, setEmails] = useState({});
  const [telefonos, setTelefonos] = useState({});

  useEffect(() => {
    fetchEmpleados();
    fetchEmails();
    fetchTelefonos();
  }, []);

  const fetchEmpleados = () => {
    api
      .get("empleados/api/v1/empleados/")
      .then((response) => {
        setEmpleados(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los empleados:", error);
        throw error;
      });
  };

  const fetchEmails = () => {
    api
      .get("emails/api/v1/emails/")
      .then((response) => {
        const emailsData = response.data;
        const emailsMap = {};
        emailsData.forEach((email) => {
          const empleadoId = email.empleado;
          if (!emailsMap[empleadoId]) {
            emailsMap[empleadoId] = [];
          }
          emailsMap[empleadoId].push(email);
        });
        setEmails(emailsMap);
      })
      .catch((error) => {
        console.error("Error al obtener los correos electrónicos:", error);
        throw error;
      });
  };

  const fetchTelefonos = () => {
    api
      .get("telefonos/api/v1/telefonos/")
      .then((response) => {
        const telefonosData = response.data;
        const telefonosMap = {};
        telefonosData.forEach((telefono) => {
          const empleadoId = telefono.empleado;
          if (!telefonosMap[empleadoId]) {
            telefonosMap[empleadoId] = [];
          }
          telefonosMap[empleadoId].push(telefono);
        });
        setTelefonos(telefonosMap);
      })
      .catch((error) => {
        console.error("Error al obtener los teléfonos:", error);
        throw error;
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEmpleado({
      ...updatedEmpleado,
      [name]: value,
    });
  };

  const handleEditEmpleado = (id) => {
    setEditingEmpleadoId(id);
    const empleado = empleados.find((empleado) => empleado.id === id);
    const email = emails[id] ? emails[id][0]?.email : "";
    const telefono = telefonos[id] ? telefonos[id][0] : { tipo: "", numero: "", indicativo: "" };
    setUpdatedEmpleado({ ...empleado, email, ...telefono });
  };

  const handleUpdateEmpleado = (id) => {
    const { email, tipo, numero, indicativo, ...restEmpleado } = updatedEmpleado;

    api
      .put(`empleados/api/v1/empleados/${id}/`, restEmpleado)
      .then(() => {
        if (email) {
          const emailId = emails[id] ? emails[id][0]?.id : null;
          const emailData = { email, empleado: id };

          if (emailId) {
            api
              .put(`emails/api/v1/emails/${emailId}/`, emailData)
              .then(() => {
                fetchEmails();
              })
              .catch((error) => {
                console.error("Error al actualizar el correo electrónico:", error);
                throw error;
              });
          } else {
            api
              .post("emails/api/v1/emails/", emailData)
              .then(() => {
                fetchEmails();
              })
              .catch((error) => {
                console.error("Error al crear el correo electrónico:", error);
                throw error;
              });
          }
        }

        if (tipo && numero && indicativo) {
          const telefonoData = { tipo, numero, indicativo, empleado: id };
          const telefonoId = telefonos[id] ? telefonos[id][0]?.id : null;

          if (telefonoId) {
            api
              .put(`telefonos/api/v1/telefonos/${telefonoId}/`, telefonoData)
              .then(() => {
                fetchTelefonos();
              })
              .catch((error) => {
                console.error("Error al actualizar el teléfono:", error);
                throw error;
              });
          } else {
            api
              .post("telefonos/api/v1/telefonos/", telefonoData)
              .then(() => {
                fetchTelefonos();
              })
              .catch((error) => {
                console.error("Error al crear el teléfono:", error);
                throw error;
              });
          }
        }

        fetchEmpleados();
        setEditingEmpleadoId(null);
        setUpdatedEmpleado({});
      })
      .catch((error) => {
        console.error("Error al actualizar el empleado:", error);
        throw error;
      });
  };

  const handleDeleteEmpleado = (id) => {
    api
      .delete(`empleados/api/v1/empleados/${id}`)
      .then(() => {
        fetchEmpleados();
      })
      .catch((error) => {
        console.error("Error al eliminar el empleado:", error);
        throw error;
      });
  };

  const renderTelefonoData = (empleadoId, propertyName) => {
    if (telefonos[empleadoId] && telefonos[empleadoId].length > 0) {
      return telefonos[empleadoId].map((telefono, index) => (
        <div key={index}>{telefono[propertyName]}</div>
      ));
    } else {
      return "Sin teléfono";
    }
  };

  return (
    <div className="container fade-in">
      <h1 style={{ textAlign: "center" }}>Lista de empleados</h1>
      <Box sx={{ height: "40px" }}>
        <Tooltip title="Crear nuevo empleado">
          <IconButton
            component={Link}
            to="/crear-empleados"
            style={{ color: "#757575", textDecoration: "none" }}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 1700 }} aria-label="simple table"  size="medium" padding="normal">
            <TableHead>
              <TableRow>
                <TableCell align="center">Nombres</TableCell>
                <TableCell align="center">Apellidos</TableCell>
                <TableCell align="center">Tipo identificación</TableCell>
                <TableCell align="center">Identificación</TableCell>
                <TableCell align="center">Fecha de Ingreso</TableCell>
                <TableCell align="center">Salario Mensual</TableCell>
                <TableCell align="center">Cargo</TableCell>
                <TableCell align="center">Departamento</TableCell>
                <TableCell align="center">Correo Electrónico</TableCell>
                <TableCell align="center">Tipo Teléfono</TableCell>
                <TableCell align="center">Número Teléfono</TableCell>
                <TableCell align="center">Indicativo</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {empleados.map((empleado) => (
                <TableRow key={empleado.id}>
                  <TableCell align="center">
                    {editingEmpleadoId === empleado.id ? (
                      <TextField
                        name="nombres"
                        value={updatedEmpleado.nombres || ""}
                        onChange={handleInputChange}
                      />
                    ) : (
                      empleado.nombres
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {editingEmpleadoId === empleado.id ? (
                      <TextField
                        name="apellidos"
                        value={updatedEmpleado.apellidos || ""}
                        onChange={handleInputChange}
                      />
                    ) : (
                      empleado.apellidos
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {editingEmpleadoId === empleado.id ? (
                      <TextField
                        name="tipoIdentificacion"
                        value={updatedEmpleado.tipoIdentificacion || ""}
                        onChange={handleInputChange}
                      />
                    ) : (
                      empleado.tipoIdentificacion
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {editingEmpleadoId === empleado.id ? (
                      <TextField
                        name="identificacion"
                        value={updatedEmpleado.identificacion || ""}
                        onChange={handleInputChange}
                      />
                    ) : (
                      empleado.identificacion
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {editingEmpleadoId === empleado.id ? (
                      <TextField
                        name="fechaIngreso"
                        value={updatedEmpleado.fechaIngreso || ""}
                        onChange={handleInputChange}
                      />
                    ) : (
                      empleado.fechaIngreso
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {editingEmpleadoId === empleado.id ? (
                      <TextField
                        name="salarioMensual"
                        value={updatedEmpleado.salarioMensual || ""}
                        onChange={handleInputChange}
                      />
                    ) : (
                      empleado.salarioMensual
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {editingEmpleadoId === empleado.id ? (
                      <TextField
                        name="cargo"
                        value={updatedEmpleado.cargo || ""}
                        onChange={handleInputChange}
                      />
                    ) : (
                      empleado.cargo
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {editingEmpleadoId === empleado.id ? (
                      <TextField
                        name="departamento"
                        value={updatedEmpleado.departamento || ""}
                        onChange={handleInputChange}
                      />
                    ) : (
                      empleado.departamento
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {editingEmpleadoId === empleado.id ? (
                      <TextField
                        name="email"
                        value={updatedEmpleado.email || ""}
                        onChange={handleInputChange}
                      />
                    ) : emails[empleado.id] ? (
                      emails[empleado.id].map((email, index) => (
                        <div key={index}>{email.email}</div>
                      ))
                    ) : (
                      "Sin correo electrónico"
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {editingEmpleadoId === empleado.id ? (
                      <TextField
                        name="tipo"
                        value={updatedEmpleado.tipo || ""}
                        onChange={handleInputChange}
                      />
                    ) : (
                      renderTelefonoData(empleado.id, "tipo")
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {editingEmpleadoId === empleado.id ? (
                      <TextField
                        name="numero"
                        value={updatedEmpleado.numero || ""}
                        onChange={handleInputChange}
                      />
                    ) : (
                      renderTelefonoData(empleado.id, "numero")
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {editingEmpleadoId === empleado.id ? (
                      <TextField
                        name="indicativo"
                        value={updatedEmpleado.indicativo || ""}
                        onChange={handleInputChange}
                      />
                    ) : (
                      renderTelefonoData(empleado.id, "indicativo")
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {editingEmpleadoId === empleado.id ? (
                      <Tooltip title="Guardar">
                        <IconButton
                          color="primary"
                          onClick={() => handleUpdateEmpleado(empleado.id)}
                        >
                          <CheckCircleIcon />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <>
                        <Tooltip title="Actualizar">
                          <IconButton
                            color="success"
                            onClick={() => handleEditEmpleado(empleado.id)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar">
                          <IconButton
                            color="error"
                            onClick={() => handleDeleteEmpleado(empleado.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
