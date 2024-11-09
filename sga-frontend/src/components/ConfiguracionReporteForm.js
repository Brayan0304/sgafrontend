// src/components/ConfiguracionReporteForm.js
import React from 'react';

function ConfiguracionReporteForm({ reportData, setReportData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReportData({ ...reportData, [name]: value });
  };

  return (
    <div>
      <h2>Configuración del Reporte</h2>
      <form>
        <div>
          <label>Tamaño Letra Título:</label>
          <input type="text" name="tamano_letra_titulo" value={reportData.tamano_letra_titulo} onChange={handleChange} />
        </div>
        {/* Añade los demás campos aquí */}
      </form>
    </div>
  );
}

export default ConfiguracionReporteForm;
