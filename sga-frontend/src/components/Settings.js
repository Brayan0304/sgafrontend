import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Box, TextField, Button, Typography } from '@mui/material';

function ReportForm() {
  const [reportData, setReportData] = useState({
    id: null,
    titulo: '',
    titulo_2: '',
    parrafo: '',
    expedicion: '',
    tamano_letra_titulo: '',
    tamano_letra_titulo_2: '',
    tamano_letra_parrafo: '',
    tamano_letra_expedicion: '',
    margen_izquierdo: '',
    margen_derecho: '',
    margen_superior: '',
    margen_inferior: '',
    tamano_hoja: 'carta',
    estilo_letra_titulo: '',
    estilo_letra_titulo_2: '',
    estilo_parrafo: '',
    estilo_expedicion: '',
  });

  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios.get('/api/reports')
      .then(response => setReports(response.data))
      .catch(error => console.error('Error al cargar reportes:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReportData({ ...reportData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reportData.id) {
      axios.put(`/api/reports/${reportData.id}`, reportData)
        .then(response => {
          setReports(reports.map(report => (report.id === reportData.id ? response.data.data : report)));
          setReportData({});
        })
        .catch(error => console.error('Error al actualizar reporte:', error));
    } else {
      axios.post('/api/reports', reportData)
        .then(response => {
          setReports([...reports, response.data.data]);
          setReportData({});
        })
        .catch(error => console.error('Error al crear reporte:', error));
    }
  };

  const handleEdit = (report) => {
    setReportData(report);
  };

  const handleDelete = (id) => {
    axios.delete(`/api/reports/${id}`)
      .then(() => {
        setReports(reports.filter(report => report.id !== id));
      })
      .catch(error => console.error('Error al eliminar reporte:', error));
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Configuración de Reportes
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Título"
              fullWidth
              name="titulo"
              value={reportData.titulo}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Subtítulo"
              fullWidth
              name="titulo_2"
              value={reportData.titulo_2}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Parrafo"
              fullWidth
              name="parrafo"
              value={reportData.parrafo}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Expedición"
              fullWidth
              name="expedicion"
              value={reportData.expedicion}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Tamaño de Letra Título"
              fullWidth
              name="tamano_letra_titulo"
              value={reportData.tamano_letra_titulo}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Tamaño de Letra Subtítulo"
              fullWidth
              name="tamano_letra_titulo_2"
              value={reportData.tamano_letra_titulo_2}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Tamaño de Letra Párrafo"
              fullWidth
              name="tamano_letra_parrafo"
              value={reportData.tamano_letra_parrafo}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Tamaño de Letra Expedición"
              fullWidth
              name="tamano_letra_expedicion"
              value={reportData.tamano_letra_expedicion}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Margen Izquierdo"
              fullWidth
              name="margen_izquierdo"
              value={reportData.margen_izquierdo}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Margen Derecho"
              fullWidth
              name="margen_derecho"
              value={reportData.margen_derecho}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Margen Superior"
              fullWidth
              name="margen_superior"
              value={reportData.margen_superior}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Margen Inferior"
              fullWidth
              name="margen_inferior"
              value={reportData.margen_inferior}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Tamaño de Hoja"
              fullWidth
              name="tamano_hoja"
              value={reportData.tamano_hoja}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Estilo de Letra Título"
              fullWidth
              name="estilo_letra_titulo"
              value={reportData.estilo_letra_titulo}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Estilo de Letra Subtítulo"
              fullWidth
              name="estilo_letra_titulo_2"
              value={reportData.estilo_letra_titulo_2}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Estilo de Letra Párrafo"
              fullWidth
              name="estilo_parrafo"
              value={reportData.estilo_parrafo}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Estilo de Letra Expedición"
              fullWidth
              name="estilo_expedicion"
              value={reportData.estilo_expedicion}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" type="submit">
              {reportData.id ? 'Actualizar Reporte' : 'Crear Reporte'}
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Listado de reportes */}
      <Box mt={4}>
        <Typography variant="h5">Listado de Reportes</Typography>
        <ul>
          {reports.map((report) => (
            <li key={report.id}>
              {report.titulo}
              <Button onClick={() => handleEdit(report)}>Editar</Button>
              <Button onClick={() => handleDelete(report.id)}>Eliminar</Button>
            </li>
          ))}
        </ul>
      </Box>
    </Box>
  );
}

export default ReportForm;
