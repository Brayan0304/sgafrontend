import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import sgaImage from '../images/SGA.jpg';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Link,
} from "@mui/material";

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login",
        formData
      );
      alert(`Bienvenido ${response.data.user.name}`);
      onLogin(); // Activa la autenticación en el componente principal
      navigate("/"); // Redirige al Home
    } catch (error) {
      console.error(error.response.data);
      alert("Credenciales incorrectas");
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register",
        formData
      );
      alert(response.data.message);
      setShowRegister(false); // Cambia a la pantalla de login tras registro exitoso
    } catch (error) {
      console.error(error.response.data);
      alert("Error en el registro");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        style={{
          padding: "2rem",
          marginTop: "2rem",
          backgroundImage: `url(${sgaImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          {showRegister ? "Registro" : "Iniciar Sesión"}
        </Typography>
        <form
          onSubmit={showRegister ? handleRegisterSubmit : handleLoginSubmit}
        >
          <Grid container spacing={2}>
            {showRegister && (
              <>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="id"
                    label="NIT de la Empresa"
                    variant="outlined"
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="name"
                    label="Nombre"
                    variant="outlined"
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="direccion"
                    label="Dirección"
                    variant="outlined"
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="telefono"
                    label="Teléfono"
                    variant="outlined"
                    onChange={handleChange}
                    required
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="email"
                label="Correo"
                type="email"
                variant="outlined"
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                variant="outlined"
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
              >
                {showRegister ? "Registrar" : "Iniciar Sesión"}
              </Button>
            </Grid>
            <Grid item xs={12} align="center">
              <Link
                component="button"
                variant="body2"
                onClick={() => setShowRegister(!showRegister)}
              >
                {showRegister
                  ? "¿Ya tienes una cuenta? Inicia sesión"
                  : "¿No tienes una cuenta? Regístrate"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
