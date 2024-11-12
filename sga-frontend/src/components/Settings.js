import React, { useState, useEffect } from 'react';

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
    tamano_hoja: 'carta', // Valor predeterminado
    estilo_letra_titulo: '',
    estilo_letra_titulo_2: '',
    estilo_parrafo: '',
    estilo_expedicion: '',
  });
  const [reports, setReports] = useState([]);
  const [editing, setEditing] = useState(false);
  const [currentReportId, setCurrentReportId] = useState(null);

  // Obtener todos los reportes
  const fetchReports = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/reports');
      const data = await response.json();
      setReports(data);
    } catch (error) {
      console.error('Error al obtener los reportes:', error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Guardar o actualizar el reporte
  const saveOrUpdateReport = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/reports${editing ? `/${currentReportId}` : ''}`,
        {
          method: editing ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reportData),
        }
      );
      await response.json();
      fetchReports();
      setEditing(false);
      setReportData({
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
    } catch (error) {
      console.error(editing ? 'Error al actualizar el reporte:' : 'Error al guardar el reporte:', error);
    }
  };

  // Editar reporte
  const editReport = (report) => {
    setReportData(report);
    setEditing(true);
    setCurrentReportId(report.id);
  };

  // Eliminar reporte
  const deleteReport = async (id) => {
    try {
      await fetch(`http://127.0.0.1:8000/api/reports/${id}`, { method: 'DELETE' });
      fetchReports();
    } catch (error) {
      console.error('Error al eliminar el reporte:', error);
    }
  };

  return (
    <div>
      <h1>SGA Gestión - Reporte</h1>
      
      <input
        type="text"
        placeholder="Título"
        value={reportData.titulo}
        onChange={(e) => setReportData({ ...reportData, titulo: e.target.value })}
      />
      <input
        type="text"
        placeholder="Título 2"
        value={reportData.titulo_2}
        onChange={(e) => setReportData({ ...reportData, titulo_2: e.target.value })}
      />
      <textarea
        placeholder="Párrafo"
        value={reportData.parrafo}
        onChange={(e) => setReportData({ ...reportData, parrafo: e.target.value })}
      />
      <input
        type="text"
        placeholder="Expedición"
        value={reportData.expedicion}
        onChange={(e) => setReportData({ ...reportData, expedicion: e.target.value })}
      />
      {/* Selección del tamaño de hoja */}
      <label>Tamaño de Hoja:</label>
      <select
        value={reportData.tamano_hoja}
        onChange={(e) => setReportData({ ...reportData, tamano_hoja: e.target.value })}
      >
        <option value="carta">Carta</option>
        <option value="a4">A4</option>
        <option value="oficio">Oficio</option>
        <option value="folio">Folio</option>
      </select>

      <button onClick={saveOrUpdateReport}>
        {editing ? 'Actualizar Reporte' : 'Guardar Reporte'}
      </button>

      <h2>Lista de Reportes</h2>
      <ul>
        {reports.map((report) => (
          <li key={report.id}>
            {report.titulo} - {report.titulo_2} - {report.parrafo}
            <button onClick={() => editReport(report)}>Editar</button>
            <button onClick={() => deleteReport(report.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
