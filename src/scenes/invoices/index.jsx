import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";

const Invoices = () => {
  


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "Products",
      headerName: "Products",
      flex: 0.3,
      cellClassName: "name-column--cell",
    },
    {
      field: "OF",
      headerName: "OF",
      flex: 0.3,
    },
    {
      field: "departement", 
  headerName: "Departement" , 
  flex: 0.5 , 
  },
    {
      field: "defauts",
      headerName: "Defauts",
      flex: 0.5, //,,?  m3ak tawa bhy  naaml get mtaa line chart m app user lenaa? enehi l page w donner eneho
     
    },
    {
      field: "date",
      headerName: "Date",
      flex: 0.5,
    },
    
  ];

  return (
    <Box m="20px">
      <Header title="REPORTS" subtitle="List of Reports" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid 
        
        checkboxSelection 
         rows={mockDataInvoices}
        columns={columns} 
        //components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Invoices;