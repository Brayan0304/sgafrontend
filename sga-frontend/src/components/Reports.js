import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  Checkbox,
  Typography,
  Toolbar,
  Tooltip,
  IconButton,
  TableSortLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { visuallyHidden } from "@mui/utils";

export default function EnhancedTable() {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [selected, setSelected] = useState(new Set()); // Usando Set para selección de empleados
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState("");
  const [employees, setEmployees] = useState([]);
  const [reportData, setReportData] = useState(null);

  // Fetch reports from API
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/reports")
      .then((response) => setReports(response.data))
      .catch((error) => alert("Error fetching reports: " + error));
  }, []);

  // Fetch employees from API
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/addstaff")
      .then((response) => setEmployees(response.data))
      .catch((error) => alert("Error fetching employees: " + error));
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = new Set(employees.map((n) => n.id));
      setSelected(newSelected);
      return;
    }
    setSelected(new Set());
  };

  const handleClick = (event, id) => {
    const newSelected = new Set(selected);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) =>
    setRowsPerPage(parseInt(event.target.value, 10));

  const handleReportSelect = (event) => {
    const reportId = event.target.value;
    setSelectedReport(reportId);

    // Fetch report data by ID
    axios
      .get(`http://127.0.0.1:8000/api/reports/${reportId}`)
      .then((response) => setReportData(response.data))
      .catch((error) => alert("Error fetching report data: " + error));
  };

  const handlePrint = () => {
    if (selectedReport && selected.size > 0) {
      const employeeIds = Array.from(selected).join(";");

      const data = {
        report_id: selectedReport,
        employee_ids: employeeIds,
      };

      axios
        .post("http://127.0.0.1:8000/api/certificados", data, {
          responseType: "blob",
        })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          window.open(url, "_blank");
        })
        .catch((error) => alert("Error generating PDF: " + error));
    } else {
      alert("Seleccione un reporte y al menos un empleado para imprimir.");
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Seleccionar Reporte
        </Typography>
        <Select
          fullWidth
          value={selectedReport}
          onChange={handleReportSelect}
          displayEmpty
          inputProps={{ "aria-label": "Select Report" }}
        >
          <MenuItem value="" disabled>
            Seleccione un reporte
          </MenuItem>
          {reports.map((report) => (
            <MenuItem key={report.id} value={report.id}>
              {report.titulo}
            </MenuItem>
          ))}
        </Select>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePrint}
          sx={{ mt: 2 }}
          disabled={!selectedReport || selected.size === 0} // Desactivar si no se selecciona reporte o empleados
        >
          Imprimir
        </Button>
      </Paper>

      <Paper sx={{ width: "100%", mb: 2 }}>
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }}
        >
          <Typography sx={{ flex: "1 1 100%" }} variant="h6" id="tableTitle">
            Empleados
          </Typography>
        </Toolbar>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={
                      selected.size > 0 && selected.size < employees.length
                    }
                    checked={employees.length > 0 && selected.size === employees.length}
                    onChange={handleSelectAllClick}
                    inputProps={{ "aria-label": "select all employees" }}
                  />
                </TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Apellidos</TableCell>
                <TableCell>Cargo</TableCell>
                <TableCell>Municipio</TableCell>
                <TableCell>Departamento</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((employee, index) => {
                  const isItemSelected = selected.has(employee.id);
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, employee.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={employee.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": `enhanced-table-checkbox-${index}`,
                          }}
                        />
                      </TableCell>
                      <TableCell>{employee.name}</TableCell>
                      <TableCell>{employee.apellidos}</TableCell>
                      <TableCell>{employee.cargo}</TableCell>
                      <TableCell>{employee.municipio_expedicion}</TableCell>
                      <TableCell>{employee.departamento_expedicion}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={employees.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
