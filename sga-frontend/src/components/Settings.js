// src/App.js
import React, { useState } from 'react';
import DatosForm from './DatosForm';
import ConfiguracionReporteForm from './ConfiguracionReporteForm';

function App() {
  const [reportData, setReportData] = useState({
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
    tamano_hoja: '',
    estilo_letra_titulo: '',
    estilo_letra_titulo_2: '',
    estilo_parrafo: '',
    estilo_expedicion: '',
  });

  // Función para guardar el reporte
  const saveReport = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportData),
      });
      const data = await response.json();
      console.log('Reporte guardado:', data);
    } catch (error) {
      console.error('Error al guardar el reporte:', error);
    }
  };

  return (
    <div>
      <h1>SGA Gestión - Reporte</h1>
      <DatosForm reportData={reportData} setReportData={setReportData} />
      <ConfiguracionReporteForm reportData={reportData} setReportData={setReportData} />
      <button onClick={saveReport}>Guardar Reporte</button>
    </div>
  );
}

export default App;
