// src/components/DatosForm.js
import React from 'react';

function DatosForm({ reportData, setReportData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReportData({ ...reportData, [name]: value });
  };

  return (
    <div>
      <h2>Datos</h2>
      <form>
        <div>
          <label>Título:</label>
          <input type="text" name="titulo" value={reportData.titulo} onChange={handleChange} />
        </div>
        <div>
          <label>Título 2:</label>
          <input type="text" name="titulo_2" value={reportData.titulo_2} onChange={handleChange} />
        </div>
        <div>
          <label>Párrafo:</label>
          <input type="text" name="parrafo" value={reportData.parrafo} onChange={handleChange} />
        </div>
        <div>
          <label>Expedición:</label>
          <input type="text" name="expedicion" value={reportData.expedicion} onChange={handleChange} />
        </div>
      </form>
    </div>
  );
}

export default DatosForm;
